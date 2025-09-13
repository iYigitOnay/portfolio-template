import { getAbout } from "@/lib/server/content";

export function AboutSection() {
  const about = getAbout();

  return (
    <div className="py-14 md:py-16">
      <span
        className="heading-eyebrow"
        style={{ color: "color-mix(in srgb, var(--color-primary) 85%, white)" }}
      >
        Introduction
      </span>
      <h2
        className="text-3xl md:text-4xl h2-title mt-2"
        style={{ color: "color-mix(in srgb, var(--color-primary) 80%, black)" }}
      >
        Overview
      </h2>

      {/* Tam genişlik metin */}
      <p className="mt-4 opacity-80 text-lg leading-relaxed">
        {about.summary1}
      </p>
      <p className="mt-4 opacity-80 text-lg leading-relaxed">
        {about.summary2}
      </p>
      <p className="mt-4 opacity-80 text-lg leading-relaxed">
        {about.summary3}
      </p>
      <p className="mt-4 opacity-80 text-lg leading-relaxed">
        {about.summary4}
      </p>

      {/* 3’lü yetenek kartları (mavi, ince border kalsın) */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-5 rounded-2xl blue-outline blue-outline-soft transition">
          <div className="badge-blue mb-3">{"</>"} Web Developer</div>
          <h3 className="font-semibold">Web Developer</h3>
          <p className="opacity-80 mt-1 text-sm">
            Modern interfaces with React, Next.js, Tailwind.{" "}
          </p>
        </div>
        <div className="p-5 rounded-2xl blue-outline blue-outline-soft transition">
          <div className="badge-blue mb-3">DB • API</div>
          <h3 className="font-semibold">Backend Developer</h3>
          <p className="opacity-80 mt-1 text-sm">
            REST, JWT, database design and cloud deployment.{" "}
          </p>
        </div>
        <div className="p-5 rounded-2xl blue-outline blue-outline-soft transition">
          <div className="badge-blue mb-3">✍️</div>
          <h3 className="font-semibold">Content Creator</h3>
          <p className="opacity-80 mt-1 text-sm">
            Technical articles, demo videos, documentation.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
