"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VARIANTS } from "./variants";

export function LabBar() {
  const pathname = usePathname();
  return (
    <nav className="lab-bar" aria-label="Lab seçenekleri">
      <b>Lab</b>
      <Link href="/lab" aria-current={pathname === "/lab" ? "page" : undefined}>Tümü</Link>
      {VARIANTS.map((v) => (
        <Link key={v.id} href={`/lab/${v.id}`} aria-current={pathname === `/lab/${v.id}` ? "page" : undefined}>
          {v.id.toUpperCase()} · {v.name}
        </Link>
      ))}
      <Link href="/" className="lab-bar-end">Mevcut site</Link>
    </nav>
  );
}
