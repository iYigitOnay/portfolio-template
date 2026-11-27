import { desc } from "drizzle-orm";
import { deleteMessage, markMessage } from "@/app/admin/actions";
import { ActionButton, ConfirmButton } from "@/components/admin/confirm-button";
import { PageHeader } from "@/components/admin/page-header";
import { db, schema } from "@/db";

const fmt = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" });

export default async function MessagesAdmin() {
  const messages = await db.select().from(schema.messages).orderBy(desc(schema.messages.createdAt));
  return (
    <>
      <PageHeader title="Mesajlar" />
      {messages.length === 0 ? <div className="a-card p-6 text-neutral-500">İletişim formundan gelen mesajlar burada görünecek.</div> : null}
      <div className="grid gap-3">
        {messages.map((m) => (
          <article key={m.id} className={`a-card p-5 ${m.read ? "" : "border-l-4 border-l-[var(--ink)]"}`}>
            <header className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <a className="font-semibold hover:underline" href={`mailto:${m.email}?subject=Re:%20Portfolyo%20mesaj%C4%B1n`}>{m.email}</a>
              <time className="text-sm text-neutral-500">{fmt.format(m.createdAt)}</time>
            </header>
            <p className="whitespace-pre-wrap text-neutral-800">{m.body}</p>
            <div className="mt-4 flex gap-2">
              <a className="a-btn" href={`mailto:${m.email}?subject=Re:%20Portfolyo%20mesaj%C4%B1n`}>Yanıtla</a>
              <ActionButton action={markMessage.bind(null, m.id, !m.read)}>{m.read ? "Okunmadı yap" : "Okundu"}</ActionButton>
              <ConfirmButton action={deleteMessage.bind(null, m.id)} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
