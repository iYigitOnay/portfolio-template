"use client";
import { useActionState } from "react";
import { saveProfile, type FormState } from "@/app/admin/actions";
import type { Profile } from "@/db/schema";
import { Field, FormMessage, TextArea, Toggle } from "./fields";

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProfile, {});
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid max-w-3xl gap-6">
      <section className="a-card grid gap-5 p-6">
        <h2 className="font-semibold">Giriş ekranı</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Ad (1. satır)" name="firstName" defaultValue={profile.firstName} error={e.firstName} />
          <Field label="Soyad (2. satır)" name="lastName" defaultValue={profile.lastName} error={e.lastName} />
        </div>
        <Field label="Unvan" name="role" defaultValue={profile.role} />
        <TextArea label="Giriş cümlesi" name="heroSentence" defaultValue={profile.heroSentence} error={e.heroSentence} hint="Sağ altta duran tek cümle. 220 karakter sınırı." />
      </section>
      <section className="a-card grid gap-5 p-6">
        <h2 className="font-semibold">Hakkımda</h2>
        <TextArea label="Biyografi" name="bio" rows={9} defaultValue={profile.bio} error={e.bio} hint="==böyle== yazdığın kelimeler vurgulanır. Son vurgu iletişim bağlantısı olur. İlk cümle (adın) koyu görünür." />
        <TextArea label="Yazılar bölümü giriş paragrafı" name="writingLead" defaultValue={profile.writingLead} />
        <Field label="Alt bilgi daveti" name="footerInvite" defaultValue={profile.footerInvite} hint="İki satıra sığacak 3–5 kelime." />
        <Toggle label="Yeni işlere açığım" name="available" defaultChecked={profile.available} />
      </section>
      <section className="a-card grid gap-5 p-6">
        <h2 className="font-semibold">İletişim</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="E-posta" name="email" type="email" defaultValue={profile.email} error={e.email} />
          <Field label="Konum" name="location" defaultValue={profile.location} />
          <Field label="GitHub" name="github" defaultValue={profile.github} error={e.github} />
          <Field label="LinkedIn" name="linkedin" defaultValue={profile.linkedin} error={e.linkedin} />
        </div>
      </section>
      <div className="flex items-center gap-4">
        <button className="a-btn" disabled={pending}>{pending ? "Kaydediliyor…" : "Profili kaydet"}</button>
        <FormMessage state={state} />
      </div>
    </form>
  );
}
