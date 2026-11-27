import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import { profile, skillGroups } from "@/content/profile";

/**
 * Tüm içerik repodaki dosyalardan, derleme sırasında okunur. Veritabanı yok:
 * içerik değişince site yeniden yayınlanır.
 */

const CONTENT = path.join(process.cwd(), "content");
/** Geliştirirken dosya değişiklikleri birkaç saniyede görünsün; canlıda derleme anı esas. */
function life() {
  if (process.env.NODE_ENV === "development") cacheLife("seconds");
  else cacheLife("max");
}

export type Project = {
  id: string;
  slug: string;
  title: string;
  kind: string;
  year: number;
  period: string;
  summary: string;
  content: string;
  stack: string;
  repoUrl: string;
  liveUrl: string;
  coverUrl: string;
  sortOrder: number;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  publishedAt: Date | null;
};

export type Skill = { id: string; name: string; category: string };

/** "---" arasındaki basit `anahtar: değer` satırlarını okur. */
function parseFrontmatter(raw: string, file: string) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`${file}: dosya "---" ile başlayan bir üst bilgi bloğuyla başlamalı.`);
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i < 1 || line.trimStart().startsWith("#")) continue;
    const value = line.slice(i + 1).trim();
    data[line.slice(0, i).trim()] = value.replace(/^(["'])(.*)\1$/, "$2");
  }
  return { data, body: m[2].trim() };
}

async function readDir(dir: string) {
  const full = path.join(CONTENT, dir);
  const files = (await readdir(full)).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  return Promise.all(
    files.map(async (f) => ({
      slug: f.replace(/\.md$/, ""),
      ...parseFrontmatter(await readFile(path.join(full, f), "utf8"), `content/${dir}/${f}`),
    })),
  );
}

export async function getProfile() {
  "use cache";
  life();
  return profile;
}

export async function getPublishedProjects(): Promise<Project[]> {
  "use cache";
  life();
  const rows = await readDir("projects");
  return rows
    .filter(({ data }) => data.draft !== "true")
    .map(({ slug, data, body }) => {
      const year = Number(data.year) || new Date().getFullYear();
      return {
        id: slug,
        slug,
        title: data.title ?? slug,
        kind: data.kind ?? "",
        year,
        period: data.period || String(year),
        summary: data.summary ?? "",
        content: body,
        stack: data.stack ?? "",
        repoUrl: data.repo ?? "",
        liveUrl: data.live ?? "",
        coverUrl: data.cover ?? "",
        sortOrder: Number(data.order) || 0,
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder || b.year - a.year);
}

export async function getProjectBySlug(slug: string) {
  "use cache";
  life();
  return (await getPublishedProjects()).find((p) => p.slug === slug);
}

export async function getPublishedPosts(): Promise<Post[]> {
  "use cache";
  life();
  const rows = await readDir("posts");
  return rows
    .filter(({ data }) => data.draft !== "true")
    .map(({ slug, data, body }) => {
      const date = data.date ? new Date(`${data.date}T12:00:00Z`) : null;
      return {
        id: slug,
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? "",
        content: body,
        tags: data.tags ?? "",
        publishedAt: date && !Number.isNaN(date.getTime()) ? date : null,
      };
    })
    .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0));
}

export async function getPostBySlug(slug: string) {
  "use cache";
  life();
  return (await getPublishedPosts()).find((p) => p.slug === slug);
}

export async function getSkills(): Promise<Skill[]> {
  "use cache";
  life();
  return skillGroups.flatMap(([category, names]) => names.map((name) => ({ id: `${category}/${name}`, name, category })));
}

export async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
