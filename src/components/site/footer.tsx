import Link from "next/link";
import { cvLinks } from "@/content/profile";
import type { SiteData } from "@/lib/site-data";
import { IstanbulClock } from "./clock";
import { ThemeToggle } from "./theme";

export function Footer({ d }: { d: SiteData }) {
  const { profile } = d;
  const cols: { title: string; links: { href: string; label: string; ext?: boolean }[] }[] = [
    { title: "İşler", links: [...d.projects.slice(0, 4).map((p) => ({ href: p.href, label: p.title })), { href: "/#isler", label: "Tümü" }] },
    ...(d.posts.length
      ? [{ title: "Yazılar", links: [...d.posts.slice(0, 4).map((p) => ({ href: p.href, label: p.title })), { href: "/blog", label: "Tümü" }] }]
      : []),
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
        ...cvLinks.map((c) => ({ href: c.href, label: c.short })),
      ],
    },
  ];
  const letters = Array.from(d.fullName);

  return (
    <footer className="s-foot" data-reveal-group>
      <div className="s-footInner">
        <div className="s-footTop">
          <p className="s-footInvite">
            {profile.available ? <span className="s-pulse" aria-hidden /> : null}
            {profile.available ? "Junior backend ve staj pozisyonları için görüşmelere açığım." : `${profile.role} · ${profile.location}`}
          </p>
          <Link href="/#iletisim" className="s-footCta">
            <span>Bir mesaj bırakın</span>
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h7.5M6.5 2.75 9.75 6 6.5 9.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>

        <nav className="s-footCols" aria-label="Alt bilgi">
          {cols.map((c, i) => (
            <div key={c.title} className="s-footCol" role="group" aria-label={c.title} style={{ ["--i" as string]: i }}>
              <p className="s-footColTitle">{c.title}</p>
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

        <div className="s-footMeta">
          <span className="s-footPlace">{profile.location} · <IstanbulClock /></span>
          <span className="s-footStack">Next.js, Drizzle ve libSQL ile yapıldı</span>
          <span className="s-footTools">
            <ThemeToggle className="s-iconBtn" />
            <a href="#" className="s-toTop" data-to-top aria-label="Başa dön">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13V3m0 0L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </span>
        </div>
      </div>

      <p className="s-footName" aria-label={d.fullName}>
        {letters.map((ch, i) => (
          <span key={i} aria-hidden style={{ ["--i" as string]: i }}>{ch === " " ? " " : ch}</span>
        ))}
      </p>
      <p className="s-footCopy">© {d.year} {d.fullName}. Tüm hakları saklıdır.</p>
    </footer>
  );
}
