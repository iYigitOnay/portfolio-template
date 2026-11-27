"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const I = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  posts: "M5 4h10l4 4v12H5zM14 4v5h5M8 13h8M8 17h5",
  projects: "M3 7h18v12H3zM8 7V5h8v2",
  skills: "M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6L12 16.3 6.6 19.3l1.3-6L3.3 9.2l6.1-.6z",
  messages: "M4 5h16v11H8l-4 4z",
  profile: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
};

const items = [
  { href: "/admin", label: "Genel bakış", icon: I.home },
  { href: "/admin/yazilar", label: "Yazılar", icon: I.posts },
  { href: "/admin/projeler", label: "Projeler", icon: I.projects },
  { href: "/admin/yetenekler", label: "Yetenekler", icon: I.skills },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: I.messages },
  { href: "/admin/profil", label: "Profil", icon: I.profile },
] as const;

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  return (
    <nav className="a-nav" aria-label="Panel menüsü">
      {items.map((it) => {
        const active = it.href === "/admin" ? pathname === "/admin" : pathname.startsWith(it.href);
        return (
          <Link key={it.href} href={it.href} aria-current={active ? "page" : undefined}>
            <span className="a-nav-icon" aria-hidden>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"><path d={it.icon} /></svg>
            </span>
            <span className="flex-1">{it.label}</span>
            {it.href === "/admin/mesajlar" && unread > 0 ? <span className="a-count">{unread}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
