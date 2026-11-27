"use client";
import Lenis from "lenis";
import { useEffect } from "react";

/**
 * A varyantının hareket katmanı (Apple tarzı):
 * yumuşak kaydırma, kaydırmayla aydınlanan kelimeler, API kutusunun yatıp doğrulması,
 * aşağı inerken saklanan / yukarı çıkınca beliren navbar, girişler ve sayaçlar.
 * React'in yönettiği style/class'lara dokunulmaz; her şey CSS değişkenleri ve data-* ile sürülür.
 */
export function AMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const page = document.querySelector<HTMLElement>(".la-page");
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

    const words = Array.from(page.querySelectorAll<HTMLElement>("[data-words]"));
    const tilts = Array.from(page.querySelectorAll<HTMLElement>("[data-tilt]"));
    let lastY = scrollY, ticking = false;

    const update = () => {
      ticking = false;
      const y = scrollY, vh = innerHeight;
      root.dataset.laScrolled = String(y > 8);
      if (!root.dataset.laMenu) root.dataset.laNav = y > 320 && y > lastY + 2 ? "hidden" : y < lastY - 2 || y < 320 ? "shown" : root.dataset.laNav ?? "shown";
      lastY = y;
      for (const el of words) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const n = Number(el.dataset.words) || 0;
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.15)));
        el.style.setProperty("--wl", (p * (n + 2)).toFixed(1));
      }
      if (!reduce) for (const el of tilts) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, 1 - (r.top - vh * 0.25) / (vh * 0.6)));
        el.style.setProperty("--tp", (1 - Math.pow(1 - p, 3)).toFixed(3));
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    update();
    cleanups.push(() => {
      removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll);
      delete root.dataset.laNav; delete root.dataset.laScrolled;
    });

    // Girişler: hydration bittikten sonra
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

    return () => cleanups.forEach((fn) => fn());
  }, []);
  return null;
}
