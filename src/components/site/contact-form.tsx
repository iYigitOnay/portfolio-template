"use client";
import { useState, type FormEvent } from "react";

type Cls = Partial<Record<"form" | "field" | "label" | "input" | "row" | "note" | "button", string>>;

/**
 * Sunucu yok: "Gönder"e basınca ziyaretçinin e-posta uygulaması,
 * konu ve mesaj doldurulmuş hâlde açılır.
 */
export function ContactForm({ to, cls = {} }: { to: string; cls?: Cls }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const body = String(f.get("body") ?? "").trim();
    const subject = name ? `Portfolyo üzerinden mesaj: ${name}` : "Portfolyo üzerinden mesaj";
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className={cls.form}>
      <label className={cls.field}>
        <span className={cls.label}>Adınız</span>
        <input className={cls.input} type="text" name="name" autoComplete="name" />
      </label>
      <label className={cls.field}>
        <span className={cls.label}>Mesajınız</span>
        <textarea className={cls.input} name="body" rows={4} required minLength={10} />
      </label>
      <div className={cls.row}>
        <p className={cls.note} role="status">
          {sent ? `E-posta uygulamanız açılmadıysa doğrudan ${to} adresine yazabilirsiniz.` : "Gönder'e basınca e-posta uygulamanız açılır."}
        </p>
        <button className={cls.button} type="submit">Mesajı gönder</button>
      </div>
    </form>
  );
}
