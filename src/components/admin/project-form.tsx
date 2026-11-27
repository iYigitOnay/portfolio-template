"use client";
import { useActionState } from "react";
import { saveProject, type FormState } from "@/app/admin/actions";
import type { Project } from "@/db/schema";
import { Field, FormMessage, ImageField, MarkdownEditor, TextArea, Toggle } from "./fields";

export function ProjectForm({ project, defaultYear }: { project?: Project; defaultYear: number }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProject.bind(null, project?.id ?? null), {});
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="a-card grid gap-5 p-6">
        <Field label="Proje adı" name="title" defaultValue={project?.title} error={e.title} required />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Türü" name="kind" defaultValue={project?.kind} placeholder="REST API · Bitirme projesi" />
          <Field label="Yıl" name="year" type="number" defaultValue={project?.year ?? defaultYear} error={e.year} />
        </div>
        <Field label="Dönem" name="period" defaultValue={project?.period} placeholder="2024 – 2026" hint="Boş bırakırsan yıl gösterilir." />
        <TextArea label="Kısa açıklama" name="summary" defaultValue={project?.summary} error={e.summary} />
        <Field label="Teknolojiler" name="stack" defaultValue={project?.stack} hint="Virgülle ayır: NestJS, PostgreSQL, Docker" />
        <MarkdownEditor name="content" label="Detay sayfası" defaultValue={project?.content} />
      </div>
      <aside className="grid content-start gap-4">
        <div className="a-card grid gap-4 p-5">
          <Toggle label="Sitede göster" name="published" defaultChecked={project?.published ?? true} />
          <ImageField label="Kapak görseli" name="coverUrl" defaultValue={project?.coverUrl} error={e.coverUrl} />
          <Field label="Kaynak kod URL" name="repoUrl" defaultValue={project?.repoUrl} error={e.repoUrl} />
          <Field label="Canlı URL" name="liveUrl" defaultValue={project?.liveUrl} error={e.liveUrl} />
          <Field label="Kısa adres (slug)" name="slug" defaultValue={project?.slug} />
          <Field label="Sıra" name="sortOrder" type="number" defaultValue={project?.sortOrder ?? 0} hint="Küçük olan önce gelir." />
          <button className="a-btn" disabled={pending}>{pending ? "Kaydediliyor…" : "Kaydet"}</button>
          <FormMessage state={state} />
        </div>
      </aside>
    </form>
  );
}
