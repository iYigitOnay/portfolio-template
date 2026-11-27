"use client";
import type { MouseEvent } from "react";

export const THEME_KEY = "lab-a-theme";

/** Boyamadan önce çalışır: kayıtlı temayı .la-page'e yazar (yanıp sönme olmaz). */
export const themeBootScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t)document.currentScript.parentElement.dataset.theme=t}catch(e){}`;

function currentTheme(root: HTMLElement) {
  const t = root.dataset.theme;
  if (t === "light" || t === "dark") return t;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Açık/koyu geçişi: destekleyen tarayıcıda butondan yayılan bir daireyle. */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.querySelector<HTMLElement>(".la-page");
    if (!root) return;
    const next = currentTheme(root) === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem(THEME_KEY, next); } catch {}
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply();
    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.documentElement.dataset.vt = "theme";
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.28, 0.11, 0.32, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
    vt.finished.finally(() => delete document.documentElement.dataset.vt);
  };
  return (
    <button type="button" className={className} onClick={toggle} aria-label="Açık ve koyu tema arasında geçiş yap" title="Tema">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <mask id="la-moon"><rect width="24" height="24" fill="#fff" /><circle className="la-moonCut" cx="17" cy="7" r="6" fill="#000" /></mask>
        <circle className="la-sunCore" cx="12" cy="12" r="5" fill="currentColor" mask="url(#la-moon)" />
        <g className="la-sunRays" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
