import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { PostForm } from "@/components/admin/post-form";
import { db, schema } from "@/db";

export default async function EditPost({ params }: PageProps<"/admin/yazilar/[id]">) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const post = await db.query.posts.findFirst({ where: eq(schema.posts.id, id) });
  if (!post) notFound();
  return (<><PageHeader title="Yazıyı düzenle" /><PostForm post={post} /></>);
}
