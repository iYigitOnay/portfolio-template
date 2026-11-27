"use server";
import { headers } from "next/headers";
import { z } from "zod";
import { db, schema } from "@/db";
import { rateLimit } from "@/lib/rate-limit";

const ContactSchema = z.object({
  email: z.email("Lütfen geçerli bir e-posta adresi girin.").max(200),
  body: z.string().trim().min(10, "Mesajınız en az 10 karakter olmalı.").max(4000),
});

export type ContactState = { status: "idle" | "ok" | "error"; message: string };

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: botlar gizli alanı doldurur, sessizce "başarılı" deriz.
  if (formData.get("website")) return { status: "ok", message: "Mesajınız ulaştı, teşekkürler." };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000).ok) {
    return { status: "error", message: "Çok fazla mesaj gönderildi. Lütfen daha sonra tekrar deneyin." };
  }

  const parsed = ContactSchema.safeParse({ email: formData.get("email"), body: formData.get("body") });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0].message };

  await db.insert(schema.messages).values(parsed.data);
  return { status: "ok", message: "Mesajınız ulaştı. En geç iki iş günü içinde dönüş yaparım." };
}
