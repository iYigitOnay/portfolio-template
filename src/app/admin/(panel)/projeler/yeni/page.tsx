import { connection } from "next/server";
import { PageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";

export default async function NewProject() {
  await connection();
  return (<><PageHeader title="Yeni proje" /><ProjectForm defaultYear={new Date().getFullYear()} /></>);
}
