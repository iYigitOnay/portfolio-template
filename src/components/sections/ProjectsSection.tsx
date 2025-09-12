import { getProjects } from "@/lib/server/content";
import Image from "next/image";

export function ProjectsSection() {
  const projects = getProjects();

  return (
    <div className="py-14 md:py-16">
      <span
        className="heading-eyebrow"
        style={{ color: "color-mix(in srgb, var(--color-primary) 85%, white)" }}
      >
        Projects
      </span>
      <h2
        className="text-3xl md:text-4xl h2-title mt-2"
        style={{ color: "color-mix(in srgb, var(--color-primary) 80%, black)" }}
      >
        Selected Work
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="rounded-2xl overflow-hidden blue-outline hover:translate-y-[-2px] transition flex flex-col min-h-[360px]"
          >
            {/* Üst görsel alanı */}
            <div className="relative h-40 w-full bg-white">
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : null}
            </div>

            {/* İçerik */}
            <div className="p-4 flex flex-col flex-1">
              <div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="opacity-80 mt-1 text-sm">{p.summary}</p>

                {/* Teknolojiler */}
                {p.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full border"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Linkler – sabit altta */}
              {(p.links?.demo || p.links?.repo) && (
                <div className="mt-auto flex items-center gap-3 pt-4">
                  {p.links.demo && (
                    <a
                      className="underline text-[var(--color-primary)]"
                      href={p.links.demo}
                      target="_blank"
                    >
                      Live
                    </a>
                  )}
                  {p.links.repo && (
                    <a
                      className="underline font-semibold text-black"
                      href={p.links.repo}
                      target="_blank"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
