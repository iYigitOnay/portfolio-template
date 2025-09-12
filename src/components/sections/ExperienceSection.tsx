import { getExperience } from "@/lib/server/content";
import Image from "next/image";

export function ExperienceSection() {
  const items = getExperience();

  return (
    <div className="py-14 md:py-16">
      <span
        className="heading-eyebrow"
        style={{ color: "color-mix(in srgb, var(--color-primary) 85%, white)" }}
      >
        Experience
      </span>
      <h2
        className="text-3xl md:text-4xl h2-title mt-2"
        style={{ color: "color-mix(in srgb, var(--color-primary) 80%, black)" }}
      >
        Experience And Education
      </h2>

      <div className="mt-6 space-y-4">
        {items.map((x, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl blue-outline blue-outline-soft transition"
          >
            <div className="flex items-start gap-4">
              {/* yuvarlak logo alanı */}
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white shrink-0">
                {x.logo ? (
                  <Image
                    src={x.logo}
                    alt={x.org}
                    fill
                    sizes="48px"
                    className="object-contain p-1.5"
                  />
                ) : null}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold">
                    {x.role} — {x.org}
                  </h3>
                  <span className="text-sm opacity-60 shrink-0">
                    {x.period}
                  </span>
                </div>
                <p className="mt-2 opacity-80">{x.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
