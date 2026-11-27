"use client";
import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/actions-contact";

const initial: ContactState = { status: "idle", message: "Mesajınız doğrudan bana ulaşır." };
type Cls = Partial<Record<"form" | "field" | "label" | "input" | "row" | "note" | "button", string>>;

/** Asıl iletişim formuyla aynı Server Action'ı kullanır; görünüm varyanttan gelir. */
export function LabContactForm({ cls = {} }: { cls?: Cls }) {
  const [state, action, pending] = useActionState(sendMessage, initial);
  if (state.status === "ok") return <p className={cls.note} role="status">{state.message}</p>;
  return (
    <form action={action} className={cls.form}>
      <label className={cls.field}>
        <span className={cls.label}>E-posta adresiniz</span>
        <input className={cls.input} type="email" name="email" autoComplete="email" required />
      </label>
      <label className={cls.field}>
        <span className={cls.label}>Mesajınız</span>
        <textarea className={cls.input} name="body" rows={4} required minLength={10} />
      </label>
      <div hidden aria-hidden><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className={cls.row}>
        <p className={cls.note} role="status">{state.message}</p>
        <button className={cls.button} type="submit" disabled={pending}>{pending ? "Gönderiliyor…" : "Mesajı gönder"}</button>
      </div>
    </form>
  );
}
