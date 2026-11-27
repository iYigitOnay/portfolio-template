import { count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Greeting } from "@/components/admin/greeting";
import { getProfile } from "@/lib/queries";
import { db, schema } from "@/db";
import { formatDate } from "@/lib/format";

export default async function Dashboard() {
  const [[posts], [drafts], [projects], [skills], [unread], latest, profile] = await Promise.all([
    db.select({ n: count() }).from(schema.posts).where(eq(schema.posts.published, true)),
    db.select({ n: count() }).from(schema.posts).where(eq(schema.posts.published, false)),
    db.select({ n: count() }).from(schema.projects),
    db.select({ n: count() }).from(schema.skills),
    db.select({ n: count() }).from(schema.messages).where(eq(schema.messages.read, false)),
    db.select().from(schema.messages).orderBy(desc(schema.messages.createdAt)).limit(5),
    getProfile(),
  ]);
  const stats = [
    { label: "Yayındaki yazı", value: posts.n, href: "/admin/yazilar" },
    { label: "Taslak", value: drafts.n, href: "/admin/yazilar" },
    { label: "Proje", value: projects.n, href: "/admin/projeler" },
    { label: "Yetenek", value: skills.n, href: "/admin/yetenekler" },
    { label: "Okunmamış mesaj", value: unread.n, href: "/admin/mesajlar" },
  ];
  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Greeting name={profile.firstName.split(" ")[0]} />
          <p className="mt-2 text-[17px] text-[var(--ink-2)]">
            {unread.n > 0 ? `${unread.n} okunmamış mesajın var.` : "Her şey yolunda, yeni mesaj yok."}
          </p>
        </div>
        <div className="flex gap-2">
          <Link className="a-btn a-btn-ghost" href="/admin/projeler/yeni">Yeni proje</Link>
          <Link className="a-btn" href="/admin/yazilar/yeni">Yeni yazı</Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="a-stat">
            <div className="a-stat-num">{s.value}</div>
            <div className="a-stat-label">{s.label}</div>
          </Link>
        ))}
      </div>
      <section className="a-card mt-6">
        <h2 className="border-b border-neutral-100 px-5 py-4 font-semibold">Son mesajlar</h2>
        {latest.length === 0 ? <p className="p-5 text-neutral-500">Henüz mesaj yok.</p> : (
          <ul>
            {latest.map((m) => (
              <li key={m.id} className="flex gap-4 border-b border-neutral-100 px-5 py-3 last:border-0">
                <span className={m.read ? "text-neutral-500" : "font-semibold"}>{m.email}</span>
                <span className="flex-1 truncate text-neutral-600">{m.body}</span>
                <span className="text-sm text-neutral-500">{formatDate(m.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
