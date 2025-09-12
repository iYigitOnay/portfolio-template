import { title } from "process";

const mockProjects = [
  {
    slug: "MAKUtalk",
    title: "MAKUtalk",
    description:
      "MAKUtalk, Sakarya Üniversitesi Mühendislik Fakültesi öğrencileri için geliştirilmiş bir iletişim platformudur. Bu platform, öğrencilerin ders notlarını, projelerini ve diğer akademik materyalleri paylaşmalarına olanak tanır. Ayrıca, öğrenciler arasında işbirliğini teşvik eder ve akademik başarıyı artırmayı hedefler.",
    summary:
      "MAKUtalk, Üniversite öğrencileri için geliştirilmiş bir iletişim platformudur.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Projeler</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {mockProjects.map((p) => (
          <a
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="rounded-2xl border p-5 hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="opacity-80 mt-2">{p.summary}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
