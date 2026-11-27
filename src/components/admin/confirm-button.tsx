"use client";
import { useState, useTransition } from "react";

/** Sayfa diyaloğu açmadan iki adımlı onay: ilk tık "Emin misin?", ikinci tık eylem. */
export function ConfirmButton({ action, label = "Sil", className = "a-btn a-btn-danger" }: { action: () => Promise<void>; label?: string; className?: string }) {
  const [armed, setArmed] = useState(false);
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      className={className}
      disabled={pending}
      onBlur={() => setArmed(false)}
      onClick={() => (armed ? start(() => action()) : setArmed(true))}
    >
      {pending ? "…" : armed ? "Emin misin?" : label}
    </button>
  );
}

export function ActionButton({ action, children, className = "a-btn a-btn-ghost" }: { action: () => Promise<void>; children: React.ReactNode; className?: string }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" className={className} disabled={pending} onClick={() => start(() => action())}>
      {children}
    </button>
  );
}
