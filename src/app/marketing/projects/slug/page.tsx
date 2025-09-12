// src/app/(marketing)/projects/[slug]/page.tsx
type Props = { params: { slug: string } };

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Proje: {slug}</h1>
      <p className="mt-4 opacity-80">
        Buraya proje içeriği gelecek. (V1: mock; V2: JSON/MDX’ten okunacak)
      </p>
    </main>
  );
}
