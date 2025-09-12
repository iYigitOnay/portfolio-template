import { getReferences } from "@/lib/server/content";
import Image from "next/image";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const refs = getReferences();
  const email = "ihsanyigitonay@gmail.com"; // istersen about.json'a alırız

  return (
    <div className="py-14 md:py-16">
      <span
        className="heading-eyebrow"
        style={{ color: "color-mix(in srgb, var(--color-primary) 85%, white)" }}
      >
        Contact
      </span>
      <h2
        className="text-3xl md:text-4xl h2-title mt-2"
        style={{ color: "color-mix(in srgb, var(--color-primary) 80%, black)" }}
      >
        References & Contact{" "}
      </h2>

      {refs?.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {refs.map((r, i) => (
            <div key={i} className="p-5 rounded-2xl blue-outline">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white shrink-0">
                  {r.avatar ? (
                    <Image
                      src={r.avatar}
                      alt={r.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  {r.org ? (
                    <div className="text-xs opacity-60">{r.org}</div>
                  ) : null}
                </div>
              </div>
              <p className="mt-3 text-sm opacity-85">{r.text}</p>
            </div>
          ))}
        </div>
      ) : null}

      {/* Mail formu (Client Component) */}
      <div className="mt-12">
        <ContactForm />
      </div>

      {/* Basit e-posta linki (opsiyonel) */}
      <div className="mt-6">
        <p className="opacity-80">
          To Provide Direct Transportation:{" "}
          <a
            className="underline text-[var(--color-primary)]"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </p>
      </div>
    </div>
  );
}
