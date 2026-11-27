import { count, eq } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { AdminNav } from "@/components/admin/nav";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth";
import { getProfile } from "@/lib/queries";
import { logout } from "../actions";

async function Shell({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const [profile, [{ unread }]] = await Promise.all([
    getProfile(),
    db.select({ unread: count() }).from(schema.messages).where(eq(schema.messages.read, false)),
  ]);
  const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`.toLocaleUpperCase("tr-TR");
  return (
    <div className="a-shell">
      <aside className="a-side">
        <Link href="/admin/profil" className="a-me">
          <span className="a-avatar">{initials}</span>
          <span className="min-w-0">
            <span className="a-me-name">{profile.firstName} {profile.lastName}</span>
            <span className="a-me-sub">@{session.sub} · Yönetici</span>
          </span>
        </Link>
        <AdminNav unread={unread} />
        <div className="a-side-foot">
          <Link href="/" target="_blank" className="a-side-link">Siteyi görüntüle ↗</Link>
          <form action={logout}><button className="a-side-link">Çıkış yap</button></form>
        </div>
      </aside>
      <main className="a-main">{children}</main>
    </div>
  );
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="a-shell" />}>
      <Shell>{children}</Shell>
    </Suspense>
  );
}
