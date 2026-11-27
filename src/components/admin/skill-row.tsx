"use client";
import { useActionState, useEffect, useRef } from "react";
import { deleteSkill, saveSkill, type FormState } from "@/app/admin/actions";
import type { Skill } from "@/db/schema";
import { ConfirmButton } from "./confirm-button";

/** Satır içi düzenlenebilir yetenek. skill yoksa "yeni ekle" satırıdır. */
export function SkillRow({ skill, categories }: { skill?: Skill; categories: string[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSkill.bind(null, skill?.id ?? null), {});
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state.ok && !skill) formRef.current?.reset(); }, [state, skill]);
  const e = state.fieldErrors ?? {};
  const id = skill?.id ?? "new";
  return (
    <form ref={formRef} action={action} className="grid items-start gap-2 border-b border-neutral-100 p-3 last:border-0 md:grid-cols-[1.4fr_1.2fr_1.4fr_90px_70px_auto]">
      <div><input className="a-input" name="name" aria-label="Ad" placeholder="PostgreSQL" defaultValue={skill?.name} />{e.name ? <p className="a-error">{e.name}</p> : null}</div>
      <div>
        <input className="a-input" name="category" aria-label="Kategori" placeholder="Veri" list={`cats-${id}`} defaultValue={skill?.category} />
        <datalist id={`cats-${id}`}>{categories.map((c) => <option key={c} value={c} />)}</datalist>
        {e.category ? <p className="a-error">{e.category}</p> : null}
      </div>
      <input className="a-input" name="level" aria-label="Seviye" placeholder="Şema tasarımı, indeksleme" defaultValue={skill?.level} />
      <div><input className="a-input" name="since" aria-label="Başlangıç yılı" placeholder="Yıl" inputMode="numeric" defaultValue={skill?.since ?? ""} />{e.since ? <p className="a-error">{e.since}</p> : null}</div>
      <input className="a-input" name="sortOrder" aria-label="Sıra" type="number" defaultValue={skill?.sortOrder ?? 0} />
      <div className="flex gap-2">
        <button className={skill ? "a-btn a-btn-ghost" : "a-btn"} disabled={pending}>{pending ? "…" : skill ? (state.ok ? "Kaydedildi" : "Kaydet") : "+ Ekle"}</button>
        {skill ? <ConfirmButton action={deleteSkill.bind(null, skill.id)} /> : null}
      </div>
    </form>
  );
}
