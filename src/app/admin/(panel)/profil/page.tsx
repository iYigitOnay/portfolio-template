import { eq } from "drizzle-orm";
import { PageHeader } from "@/components/admin/page-header";
import { ProfileForm } from "@/components/admin/profile-form";
import { db, schema } from "@/db";

export default async function ProfileAdmin() {
  const profile = await db.query.profile.findFirst({ where: eq(schema.profile.id, 1) });
  if (!profile) return <p>Profil yok. <code>npm run db:seed</code> çalıştır.</p>;
  return (<><PageHeader title="Profil" /><ProfileForm profile={profile} /></>);
}
