"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Social = { label: string; href: string };
type Props = { brandName: string; socials: Social[] };

const NAV = [
  { id: "about", label: "About Me" },
  { id: "skills", label: "My Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact Me" },
];

export function Header({ brandName, socials }: Props) {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean
    ) as Element[];
    const obs = new IntersectionObserver(
      (es) => {
        const v = es
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v?.target?.id) setActive(v.target.id);
      },
      { rootMargin: "-55% 0px -35% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const github = useMemo(
    () => socials.find((s) => /github/i.test(s.label)),
    [socials]
  );
  const linkedin = useMemo(
    () => socials.find((s) => /linkedin/i.test(s.label)),
    [socials]
  );

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {NAV.map((n) => (
        <a
          key={n.id}
          href={`/#${n.id}`}
          onClick={() => onClick?.()}
          className={
            "px-3 py-2 rounded-xl transition " +
            (active === n.id
              ? "text-white font-semibold"
              : "text-white/80 hover:text-white")
          }
        >
          {n.label}
        </a>
      ))}
    </>
  );

  const IconBtn = ({ href, title, children }: any) => (
    <a
      href={href}
      target="_blank"
      title={title}
      className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/15"
      style={{ color: "#fff" }}
    >
      {children}
    </a>
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur">
      <div className="bg-[var(--color-primary)]">
        <div className="mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between">
          <Link
            href="/#home"
            className="font-extrabold tracking-tight text-white"
          >
            {brandName}
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-2">
            {github && (
              <IconBtn href={github.href} title="GitHub">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.82 1.3 3.51.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.46-2.37 1.22-3.21-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.22a11.5 11.5 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22.65 1.66.24 2.88.12 3.18.76.84 1.22 1.91 1.22 3.21 0 4.58-2.8 5.6-5.47 5.9.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                </svg>
              </IconBtn>
            )}
            {linkedin && (
              <IconBtn href={linkedin.href} title="LinkedIn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.18h.06c.53-1 1.83-2.18 3.76-2.18 4.02 0 4.76 2.65 4.76 6.1V24h-4v-7.1c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.85-2.72 3.76V24h-4V8z" />
                </svg>
              </IconBtn>
            )}
            <button
              className="md:hidden ml-1 h-9 w-9 grid place-items-center rounded-xl hover:bg-white/15"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menüyü aç/kapat"
            >
              <div className="i" />
              <style jsx>{`
                .i {
                  width: 18px;
                  height: 2px;
                  background: #fff;
                  position: relative;
                }
                .i::before,
                .i::after {
                  content: "";
                  position: absolute;
                  left: 0;
                  width: 18px;
                  height: 2px;
                  background: #fff;
                }
                .i::before {
                  top: -6px;
                }
                .i::after {
                  top: 6px;
                }
              `}</style>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü (royal blue zemin) */}
      {open && (
        <div className="md:hidden bg-[var(--color-primary)]">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
            <a className="text-white/90">
              <NavLinks onClick={() => setOpen(false)} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
