import "server-only";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  signSession,
  verifySession,
} from "./session";

function adminPasswordHash() {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64;
  if (!b64) throw new Error("ADMIN_PASSWORD_HASH_B64 tanımlı değil. `npm run hash-password` çalıştır.");
  return Buffer.from(b64, "base64").toString("utf8");
}

// Kullanıcı adı yanlış olsa bile bcrypt karşılaştırması yapılır: zamanlama farkıyla
// kullanıcı adı tahmini yapılamasın.
const DUMMY_HASH = "$2b$12$/vet.rgJA38LFH4Or59SVuLFV0TZ07.0zvH1/XvbcrSydUjdeqha6";

export async function checkCredentials(username: string, password: string) {
  const userOk = username === (process.env.ADMIN_USERNAME ?? "admin");
  const passOk = await bcrypt.compare(password, userOk ? adminPasswordHash() : DUMMY_HASH);
  return userOk && passOk;
}

export async function createSession(username: string) {
  const token = await signSession(username);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSession() {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Her Server Action ve admin sayfasında çağrılır. Proxy yalnızca iyimser kontrol yapar. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
