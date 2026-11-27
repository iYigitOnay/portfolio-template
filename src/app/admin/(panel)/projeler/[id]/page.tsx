import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { db, schema } from "@/db";

export default async function EditProject({ params }: PageProps<"/admin/projeler/[id]">) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const project = await db.query.projects.findFirst({ where: eq(schema.projects.id, id) });
  if (!project) notFound();
  return (<><PageHeader title="Projeyi düzenle" /><ProjectForm project={project} defaultYear={project.year} /></>);
}
