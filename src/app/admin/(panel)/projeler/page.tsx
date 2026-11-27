import { asc, desc } from "drizzle-orm";
import Link from "next/link";
import { deleteProject } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { PageHeader } from "@/components/admin/page-header";
import { db, schema } from "@/db";

export default async function ProjectsAdmin() {
  const projects = await db.select().from(schema.projects).orderBy(asc(schema.projects.sortOrder), desc(schema.projects.year));
  return (
    <>
      <PageHeader title="Projeler" action={{ href: "/admin/projeler/yeni", label: "+ Yeni proje" }} />
      <div className="a-card overflow-x-auto">
        <table className="a-table">
          <thead><tr><th /><th>Proje</th><th>Yıl</th><th>Durum</th><th /></tr></thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="w-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.coverUrl ? <img src={p.coverUrl} alt="" className="h-12 w-16 rounded object-cover" /> : <div className="h-12 w-16 rounded bg-neutral-200" />}
                </td>
                <td><Link className="font-medium hover:underline" href={`/admin/projeler/${p.id}`}>{p.title}</Link><div className="text-sm text-neutral-500">{p.kind}</div></td>
                <td>{p.period || p.year}</td>
                <td><span className={`a-badge ${p.published ? "a-badge-on" : ""}`}>{p.published ? "Görünür" : "Gizli"}</span></td>
                <td><div className="flex justify-end gap-2"><Link className="a-btn a-btn-ghost" href={`/admin/projeler/${p.id}`}>Düzenle</Link><ConfirmButton action={deleteProject.bind(null, p.id)} /></div></td>
              </tr>
            ))}
            {projects.length === 0 ? <tr><td colSpan={5} className="text-neutral-500">Henüz proje yok.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
