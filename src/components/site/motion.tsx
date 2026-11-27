"use client";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Sitenin hareket katmanı (Apple tarzı):
 * yumuşak kaydırma, aşağı inerken saklanan / yukarı çıkınca beliren navbar, girişler ve sayaçlar.
 * Kaydırmaya bağlı görsel efektler (kelime aydınlanması, API kutusu, okuma çubuğu) site.css'te
 * animation-timeline ile yapılır; React'in elementlerine buradan stil yazılmaz.
 */
// Sayfa hazır sinyali: her sayfanın sonundaki <PageReady /> hydrate olunca bu yolu işaretler.
let readyPath: string | null = null;
const readyListeners = new Set<() => void>();

/** Her sayfanın en sonuna konur; efektleri o sayfa hydrate olduktan sonra başlatır. */
export function PageReady() {
  const pathname = usePathname();
  useEffect(() => {
    readyPath = pathname;
    readyListeners.forEach((fn) => fn());
  }, [pathname]);
  return null;
}

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const page = document.querySelector<HTMLElement>(".s-page");
    if (!page) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    let lenis: Lenis | null = null;
    if (!reduce && !navigator.webdriver) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -72 } });
      let frame = requestAnimationFrame(function raf(t) { lenis!.raf(t); frame = requestAnimationFrame(raf); });
      cleanups.push(() => { cancelAnimationFrame(frame); lenis!.destroy(); });
    }
    const toTop = (e: Event) => {
      const a = (e.target as HTMLElement).closest("[data-to-top]");
      if (!a) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(0, { duration: 1.4 }); else scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };
    document.addEventListener("click", toTop);
    cleanups.push(() => document.removeEventListener("click", toTop));

    let lastY = scrollY, ticking = false;

    const update = () => {
      ticking = false;
      const y = scrollY;
      root.dataset.sScrolled = String(y > 8);
      if (!root.dataset.sMenu) root.dataset.sNav = y > 320 && y > lastY + 2 ? "hidden" : y < lastY - 2 || y < 320 ? "shown" : root.dataset.sNav ?? "shown";
      lastY = y;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    cleanups.push(() => {
      removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll);
      delete root.dataset.sNav; delete root.dataset.sScrolled;
    });

    // Girişler ve sayaçlar: sayfa hydrate olduktan sonra (bkz. PageReady), yoksa HTML uyuşmazlığı olur.
    const start = () => {
    update();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute("data-in", ""); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    page.querySelectorAll("[data-r], [data-reveal-group]").forEach((el) => io.observe(el));

    const counters = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        counters.unobserve(e.target);
        const el = e.target as HTMLElement;
        const to = Number(el.dataset.count);
        if (reduce || !Number.isFinite(to)) return;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1600);
          el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
      { threshold: 0.6 },
    );
    page.querySelectorAll("[data-count]").forEach((el) => counters.observe(el));
    cleanups.push(() => { io.disconnect(); counters.disconnect(); });
    };
    let started = false;
    const tryStart = () => { if (!started && readyPath === pathname) { started = true; start(); } };
    readyListeners.add(tryStart);
    tryStart();
    cleanups.push(() => readyListeners.delete(tryStart));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);
  return null;
}
