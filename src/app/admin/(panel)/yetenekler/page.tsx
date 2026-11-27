import { asc } from "drizzle-orm";
import { PageHeader } from "@/components/admin/page-header";
import { SkillRow } from "@/components/admin/skill-row";
import { db, schema } from "@/db";

export default async function SkillsAdmin() {
  const skills = await db.select().from(schema.skills).orderBy(asc(schema.skills.sortOrder), asc(schema.skills.name));
  const categories = [...new Set(skills.map((s) => s.category))];
  return (
    <>
      <PageHeader title="Yetenekler" />
      <p className="mb-4 text-neutral-600">Sitede kategoriye göre gruplanır. Kategori adını aynı yazman yeterli.</p>
      <div className="a-card mb-6">
        <h2 className="border-b border-neutral-100 px-4 py-3 font-semibold">Yeni yetenek</h2>
        <SkillRow categories={categories} />
      </div>
      <div className="a-card">
        <div className="hidden gap-2 border-b border-neutral-100 px-3 py-2 text-[13px] text-neutral-500 md:grid md:grid-cols-[1.4fr_1.2fr_1.4fr_90px_70px_auto]">
          <span>Ad</span><span>Kategori</span><span>Seviye / not</span><span>Yıl</span><span>Sıra</span><span />
        </div>
        {skills.map((s) => <SkillRow key={`${s.id}-${s.updatedAt.getTime()}`} skill={s} categories={categories} />)}
      </div>
    </>
  );
}
