"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme";

type Item = { href: string; title: string; meta: string };
type Menu = "isler" | "yazilar";

export function ANav({ name, initials, projects, posts }: { name: string; initials: string; projects: Item[]; posts: Item[] }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [pill, setPill] = useState({ x: 0, w: 0, on: false });
  const linksRef = useRef<HTMLDivElement>(null);
  const closeT = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    if (open || menu) root.dataset.laMenu = "1"; else delete root.dataset.laMenu;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setMenu(null); } };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, menu]);

  const moveTo = (el: HTMLElement) => {
    const base = linksRef.current?.getBoundingClientRect().left ?? 0;
    const r = el.getBoundingClientRect();
    setPill({ x: r.left - base, w: r.width, on: true });
  };
  const show = (m: Menu | null) => { clearTimeout(closeT.current); setMenu(m); };
  const hide = () => { clearTimeout(closeT.current); closeT.current = window.setTimeout(() => setMenu(null), 180); };

  const links: { href: string; label: string; menu?: Menu }[] = [
    { href: "#isler", label: "İşler", menu: "isler" },
    { href: "#araclar", label: "Araçlar" },
    { href: "#yazilar", label: "Yazılar", menu: "yazilar" },
    { href: "#api", label: "API" },
  ];
  const flyouts: Record<Menu, { title: string; items: Item[]; all: Item }> = {
    isler: { title: "Seçili işler", items: projects, all: { href: "#isler", title: "Tüm işler", meta: "" } },
    yazilar: { title: "Son yazılar", items: posts, all: { href: "/blog", title: "Tüm yazılar", meta: "" } },
  };

  return (
    <>
      <header className="la-nav" data-open={open} data-menu={menu ?? undefined} onMouseLeave={hide}>
        <div className="la-navInner">
          <Link href="/lab/a" className="la-brand" aria-label="Ana sayfa" onMouseEnter={() => show(null)}>
            <span className="la-monogram">{initials}</span>
            <span className="la-brandName">{name}</span>
          </Link>

          <div className="la-navLinks" ref={linksRef} onMouseLeave={() => setPill((p) => ({ ...p, on: false }))}>
            <span className="la-pill" aria-hidden style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.on ? 1 : 0 }} />
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="la-navLink"
                aria-expanded={l.menu ? menu === l.menu : undefined}
                onMouseEnter={(e) => { moveTo(e.currentTarget); show(l.menu ?? null); }}
                onFocus={(e) => { moveTo(e.currentTarget); show(l.menu ?? null); }}
                onClick={() => setMenu(null)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="la-navActions" onMouseEnter={() => show(null)}>
            <ThemeToggle className="la-iconBtn" />
            <a href="#iletisim" className="la-navCta">
              <span>Mesaj gönderin</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h7.5M6.5 2.75 9.75 6 6.5 9.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <button className="la-burger" aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open} aria-controls="la-sheet" onClick={() => setOpen((o) => !o)}>
              <span /><span />
            </button>
          </div>
        </div>

        <div className="la-flyout" aria-hidden={!menu} onMouseEnter={() => show(menu)}>
          <div className="la-flyoutClip">
            {(Object.keys(flyouts) as Menu[]).map((k) => {
              const f = flyouts[k];
              const on = menu === k;
              return (
                <div key={k} className="la-flyoutPanel" data-active={on}>
                  <div>
                    <p className="la-flyoutTitle">{f.title}</p>
                    <ul className="la-flyoutList">
                      {f.items.map((it, i) => (
                        <li key={it.href} style={{ ["--i" as string]: i }}>
                          <Link href={it.href} tabIndex={on ? 0 : -1} onClick={() => setMenu(null)}>
                            <span className="la-ft">{it.title}</span>
                            <span className="la-fm">{it.meta}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="la-flyoutSide">
                    <p className="la-flyoutTitle">Hızlı erişim</p>
                    <ul>
                      <li style={{ ["--i" as string]: 2 }}><a href={f.all.href} tabIndex={on ? 0 : -1} onClick={() => setMenu(null)}>{f.all.title}</a></li>
                      <li style={{ ["--i" as string]: 3 }}><a href="#iletisim" tabIndex={on ? 0 : -1} onClick={() => setMenu(null)}>İletişim</a></li>
                      <li style={{ ["--i" as string]: 4 }}><Link href="/api/v1/projects" prefetch={false} tabIndex={on ? 0 : -1}>JSON API</Link></li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </header>
      <div className="la-scrim" data-on={!!menu} aria-hidden onMouseEnter={() => setMenu(null)} />

      <div id="la-sheet" className="la-sheet" data-open={open} aria-hidden={!open}>
        <ul className="la-sheetMain">
          {[...links, { href: "#iletisim", label: "İletişim" }].map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <a href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="la-sheetSub" style={{ ["--i" as string]: 6 }}>
          <p className="la-flyoutTitle">Projeler</p>
          <ul>
            {projects.slice(0, 4).map((p) => (
              <li key={p.href}><Link href={p.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{p.title}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
