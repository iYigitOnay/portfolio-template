import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

/** Görsel yükleme. Vercel Blob token'ı varsa Blob'a, yoksa public/uploads'a yazar. */
export async function POST(request: Request) {
  if (!(await getSession())) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Dosya yok" }, { status: 400 });
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Yalnızca JPG, PNG, WebP, AVIF veya GIF." }, { status: 415 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "En fazla 4 MB." }, { status: 413 });

  const name = `${randomUUID()}.${ext}`; // Kullanıcının dosya adı hiç kullanılmaz (path traversal yok).

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${name}`, file, { access: "public", contentType: file.type });
    return NextResponse.json({ url: blob.url });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${name}` });
}
