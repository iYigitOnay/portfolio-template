// Edge/Node fark etmeksizin çalışır: proxy.ts ve server kodu paylaşır.
import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE = "session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 gün

function key() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET en az 32 karakter olmalı (.env.local).");
  }
  return new TextEncoder().encode(secret);
}

export type SessionPayload = { sub: string };

export async function signSession(sub: string) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(key());
}

export async function verifySession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    return payload.sub ? ({ sub: payload.sub } satisfies SessionPayload) : null;
  } catch {
    return null;
  }
}
