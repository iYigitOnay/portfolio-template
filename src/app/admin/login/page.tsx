import Link from "next/link";
import { Suspense } from "react";
import { getProfile } from "@/lib/queries";
import { LoginForm } from "./login-form";

async function Login() {
  const profile = await getProfile();
  const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`.toLocaleUpperCase("tr-TR");
  return <LoginForm firstName={profile.firstName.split(" ")[0]} initials={initials} />;
}

export default function LoginPage() {
  return (
    <main className="login">
      <Suspense fallback={<div className="login-card" />}>
        <Login />
      </Suspense>
      <Link href="/" className="login-back">← Siteye dön</Link>
    </main>
  );
}
