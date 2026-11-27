import { desc } from "drizzle-orm";
import Link from "next/link";
import { deletePost, togglePost } from "@/app/admin/actions";
import { ActionButton, ConfirmButton } from "@/components/admin/confirm-button";
import { PageHeader } from "@/components/admin/page-header";
import { db, schema } from "@/db";
import { formatDate } from "@/lib/format";

export default async function PostsAdmin() {
  const posts = await db.select().from(schema.posts).orderBy(desc(schema.posts.updatedAt));
  return (
    <>
      <PageHeader title="Yazılar" action={{ href: "/admin/yazilar/yeni", label: "+ Yeni yazı" }} />
      <div className="a-card overflow-x-auto">
        <table className="a-table">
          <thead><tr><th>Başlık</th><th>Durum</th><th>Tarih</th><th /></tr></thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td><Link className="font-medium hover:underline" href={`/admin/yazilar/${p.id}`}>{p.title}</Link><div className="text-sm text-neutral-500">/blog/{p.slug}</div></td>
                <td><span className={`a-badge ${p.published ? "a-badge-on" : ""}`}>{p.published ? "Yayında" : "Taslak"}</span></td>
                <td className="text-sm text-neutral-600">{formatDate(p.publishedAt ?? p.updatedAt)}</td>
                <td>
                  <div className="flex justify-end gap-2">
                    <ActionButton action={togglePost.bind(null, p.id, !p.published)}>{p.published ? "Yayından al" : "Yayınla"}</ActionButton>
                    <Link className="a-btn a-btn-ghost" href={`/admin/yazilar/${p.id}`}>Düzenle</Link>
                    <ConfirmButton action={deletePost.bind(null, p.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 ? <tr><td colSpan={4} className="text-neutral-500">Henüz yazı yok.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
