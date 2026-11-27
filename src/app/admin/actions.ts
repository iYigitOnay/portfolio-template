"use server";
import { eq, ne, and } from "drizzle-orm";
import { updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { checkCredentials, createSession, destroySession, requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/format";
import { TAGS } from "@/lib/queries";
import { rateLimit } from "@/lib/rate-limit";

export type FormState = { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };

function fail(error: z.ZodError): FormState {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
  return { error: "Formda düzeltilmesi gereken alanlar var.", fieldErrors };
}

const str = (max = 200) => z.string().trim().max(max);
const url = z.union([z.literal(""), z.url("Geçerli bir URL gir.").max(500), z.string().regex(/^\/[\w\-./]+$/, "Geçerli bir URL gir.")]);
const checkbox = z.preprocess((v) => v === "on" || v === "true", z.boolean());
const safeNext = (v: unknown) => (typeof v === "string" && /^\/admin(\/[\w\-/]*)?$/.test(v) ? v : "/admin");

// ───────────── Auth ─────────────
export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const limit = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
  if (!limit.ok) {
    return { error: `Çok fazla deneme. ${Math.ceil(limit.retryAfterMs / 60000)} dakika sonra tekrar dene.` };
  }
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!(await checkCredentials(username, password))) {
    return { error: "Kullanıcı adı veya şifre hatalı." };
  }
  await createSession(username);
  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

// ───────────── Posts ─────────────
const PostSchema = z.object({
  title: str(160).min(3, "Başlık en az 3 karakter olmalı."),
  slug: str(80),
  excerpt: str(400),
  content: z.string().max(100_000),
  tags: str(200),
  published: checkbox,
});

async function uniqueSlug(table: typeof schema.posts | typeof schema.projects, base: string, id?: number) {
  let slug = base || "icerik";
  for (let n = 2; ; n++) {
    const clash = await db
      .select({ id: table.id })
      .from(table)
      .where(id ? and(eq(table.slug, slug), ne(table.id, id)) : eq(table.slug, slug))
      .get();
    if (!clash) return slug;
    slug = `${base}-${n}`;
  }
}

export async function savePost(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = PostSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error);
  const data = parsed.data;
  const slug = await uniqueSlug(schema.posts, slugify(data.slug || data.title), id ?? undefined);

  if (id) {
    const current = await db.query.posts.findFirst({ where: eq(schema.posts.id, id) });
    if (!current) return { error: "Yazı bulunamadı." };
    await db
      .update(schema.posts)
      .set({ ...data, slug, publishedAt: data.published ? (current.publishedAt ?? new Date()) : current.publishedAt })
      .where(eq(schema.posts.id, id));
  } else {
    await db.insert(schema.posts).values({ ...data, slug, publishedAt: data.published ? new Date() : null });
  }
  updateTag(TAGS.posts);
  redirect("/admin/yazilar");
}

export async function deletePost(id: number) {
  await requireAdmin();
  await db.delete(schema.posts).where(eq(schema.posts.id, id));
  updateTag(TAGS.posts);
}

export async function togglePost(id: number, published: boolean) {
  await requireAdmin();
  const current = await db.query.posts.findFirst({ where: eq(schema.posts.id, id) });
  if (!current) return;
  await db
    .update(schema.posts)
    .set({ published, publishedAt: published ? (current.publishedAt ?? new Date()) : current.publishedAt })
    .where(eq(schema.posts.id, id));
  updateTag(TAGS.posts);
}

// ───────────── Projects ─────────────
const ProjectSchema = z.object({
  title: str(120).min(2, "Başlık gerekli."),
  slug: str(80),
  kind: str(120),
  year: z.coerce.number().int().min(2000).max(2100),
  period: str(40),
  summary: str(400),
  content: z.string().max(100_000),
  stack: str(300),
  repoUrl: url,
  liveUrl: url,
  coverUrl: url,
  sortOrder: z.coerce.number().int().default(0),
  published: checkbox,
});

export async function saveProject(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = ProjectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error);
  const data = parsed.data;
  const slug = await uniqueSlug(schema.projects, slugify(data.slug || data.title), id ?? undefined);
  if (id) await db.update(schema.projects).set({ ...data, slug }).where(eq(schema.projects.id, id));
  else await db.insert(schema.projects).values({ ...data, slug });
  updateTag(TAGS.projects);
  redirect("/admin/projeler");
}

export async function deleteProject(id: number) {
  await requireAdmin();
  await db.delete(schema.projects).where(eq(schema.projects.id, id));
  updateTag(TAGS.projects);
}

// ───────────── Skills ─────────────
const SkillSchema = z.object({
  name: str(80).min(1, "Ad gerekli."),
  category: str(80).min(1, "Kategori gerekli."),
  level: str(120),
  since: z.preprocess((v) => (v === "" || v == null ? null : Number(v)), z.number().int().min(1990).max(2100).nullable()),
  sortOrder: z.coerce.number().int().default(0),
});

export async function saveSkill(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = SkillSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error);
  if (id) await db.update(schema.skills).set(parsed.data).where(eq(schema.skills.id, id));
  else await db.insert(schema.skills).values(parsed.data);
  updateTag(TAGS.skills);
  return { ok: true };
}

export async function deleteSkill(id: number) {
  await requireAdmin();
  await db.delete(schema.skills).where(eq(schema.skills.id, id));
  updateTag(TAGS.skills);
}

// ───────────── Profile ─────────────
const ProfileSchema = z.object({
  firstName: str(60).min(1, "Gerekli."),
  lastName: str(60).min(1, "Gerekli."),
  role: str(120),
  heroSentence: str(220).min(10, "En az 10 karakter."),
  bio: str(2000),
  location: str(120),
  email: z.union([z.literal(""), z.email("Geçerli bir e-posta gir.")]),
  github: url,
  linkedin: url,
  writingLead: str(400),
  footerInvite: str(60),
  available: checkbox,
});

export async function saveProfile(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = ProfileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail(parsed.error);
  await db.update(schema.profile).set(parsed.data).where(eq(schema.profile.id, 1));
  updateTag(TAGS.profile);
  return { ok: true };
}

// ───────────── Messages ─────────────
export async function markMessage(id: number, read: boolean) {
  await requireAdmin();
  await db.update(schema.messages).set({ read }).where(eq(schema.messages.id, id));
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  await db.delete(schema.messages).where(eq(schema.messages.id, id));
}
