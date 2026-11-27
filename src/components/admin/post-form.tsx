"use client";
import { useActionState } from "react";
import { savePost, type FormState } from "@/app/admin/actions";
import type { Post } from "@/db/schema";
import { Field, FormMessage, MarkdownEditor, TextArea, Toggle } from "./fields";

export function PostForm({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePost.bind(null, post?.id ?? null), {});
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="a-card grid gap-5 p-6">
        <Field label="Başlık" name="title" defaultValue={post?.title} error={e.title} required />
        <TextArea label="Özet" name="excerpt" defaultValue={post?.excerpt} error={e.excerpt} hint="Listelerde ve paylaşım önizlemesinde görünür." />
        <MarkdownEditor name="content" defaultValue={post?.content} />
      </div>
      <aside className="grid content-start gap-4">
        <div className="a-card grid gap-4 p-5">
          <Toggle label="Yayında" name="published" defaultChecked={post?.published} />
          <Field label="Kısa adres (slug)" name="slug" defaultValue={post?.slug} error={e.slug} hint="Boş bırakırsan başlıktan üretilir." />
          <Field label="Etiketler" name="tags" defaultValue={post?.tags} hint="Virgülle ayır." />
          <button className="a-btn" disabled={pending}>{pending ? "Kaydediliyor…" : "Kaydet"}</button>
          <FormMessage state={state} />
          {post?.published ? <a className="text-sm underline" href={`/blog/${post.slug}`} target="_blank">Yazıyı görüntüle ↗</a> : null}
        </div>
      </aside>
    </form>
  );
}
