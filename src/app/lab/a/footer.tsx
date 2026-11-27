import Link from "next/link";
import type { LabData } from "../_lib/data";
import { IstanbulClock } from "./clock";
import { ThemeToggle } from "./theme";

export function AFooter({ d }: { d: LabData }) {
  const { profile } = d;
  const cols: { title: string; links: { href: string; label: string; ext?: boolean }[] }[] = [
    { title: "İşler", links: [...d.projects.slice(0, 4).map((p) => ({ href: p.href, label: p.title })), { href: "#isler", label: "Tümü" }] },
    { title: "Yazılar", links: [...d.posts.slice(0, 4).map((p) => ({ href: p.href, label: p.title })), { href: "/blog", label: "Tümü" }] },
    {
      title: "Geliştiriciler",
      links: ["profile", "projects", "skills", "posts"].map((r) => ({ href: `/api/v1/${r}`, label: `GET /${r}` })),
    },
    {
      title: "İletişim",
      links: [
        ...(profile.email ? [{ href: `mailto:${profile.email}`, label: "E-posta", ext: true }] : []),
        ...(profile.linkedin ? [{ href: profile.linkedin, label: "LinkedIn", ext: true }] : []),
        ...(profile.github ? [{ href: profile.github, label: "GitHub", ext: true }] : []),
        { href: "/cv.pdf", label: "CV (PDF)" },
      ],
    },
  ];
  const letters = Array.from(d.fullName);

  return (
    <footer className="la-foot" data-reveal-group>
      <div className="la-footInner">
        <div className="la-footTop">
          <p className="la-footInvite">
            {profile.available ? <span className="la-pulse" aria-hidden /> : null}
            {profile.available ? "Junior backend ve staj pozisyonları için görüşmelere açığım." : `${profile.role} · ${profile.location}`}
          </p>
          <a href="#iletisim" className="la-footCta">
            <span>Bir mesaj bırakın</span>
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h7.5M6.5 2.75 9.75 6 6.5 9.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        <nav className="la-footCols" aria-label="Alt bilgi">
          {cols.map((c, i) => (
            <div key={c.title} className="la-footCol" style={{ ["--i" as string]: i }}>
              <p className="la-footColTitle">{c.title}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    {l.href.startsWith("/") && !l.href.startsWith("/api") && !l.href.endsWith(".pdf") ? (
                      <Link href={l.href}><span>{l.label}</span></Link>
                    ) : (
                      <a href={l.href} target={l.ext && !l.href.startsWith("mailto") ? "_blank" : undefined} rel="noopener">
                        <span>{l.label}</span>{l.ext ? <i aria-hidden>↗</i> : null}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="la-footMeta">
          <span className="la-footPlace">{profile.location} · <IstanbulClock /></span>
          <span className="la-footStack">Next.js, Drizzle ve libSQL ile yapıldı</span>
          <span className="la-footTools">
            <ThemeToggle className="la-iconBtn" />
            <a href="#" className="la-toTop" data-to-top aria-label="Başa dön">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13V3m0 0L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </span>
        </div>
      </div>

      <p className="la-footName" aria-label={d.fullName}>
        {letters.map((ch, i) => (
          <span key={i} aria-hidden style={{ ["--i" as string]: i }}>{ch === " " ? " " : ch}</span>
        ))}
      </p>
      <p className="la-footCopy">© {d.year} {d.fullName}. Tüm hakları saklıdır.</p>
    </footer>
  );
}
