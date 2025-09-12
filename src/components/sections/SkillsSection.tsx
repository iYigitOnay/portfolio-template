import { getSkillGroups2 } from "@/lib/server/content";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-sm px-3 py-1.5 rounded-full mr-2 mb-2 inline-block"
      style={{
        border:
          "1px solid color-mix(in srgb, var(--color-primary) 18%, var(--color-border))",
        background: "color-mix(in srgb, var(--color-primary) 8%, white)",
      }}
    >
      {children}
    </span>
  );
}

export function SkillsSection() {
  const g = getSkillGroups2();

  const Card = ({ title, items }: { title: string; items: string[] }) => (
    <div className="p-5 rounded-2xl blue-outline blue-outline-soft transition">
      <h3
        className="font-semibold mb-3"
        style={{ color: "color-mix(in srgb, var(--color-primary) 80%, black)" }}
      >
        {title}
      </h3>
      {/* Çoksa gizli scroll; azsa normal görünür */}
      <div className="max-h-48 overflow-y-auto scrollbar-hidden pr-1">
        {items.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-14 md:py-16">
      <span
        className="heading-eyebrow"
        style={{ color: "color-mix(in srgb, var(--color-primary) 85%, white)" }}
      >
        Skills
      </span>
      <h2
        className="text-3xl md:text-4xl h2-title mt-2"
        style={{ color: "color-mix(in srgb, var(--color-primary) 80%, black)" }}
      >
        Tech Stack
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Software" items={g.software} />
        <Card title="Design" items={g.design} />
        <Card title="Personality" items={g.personality} />
      </div>
    </div>
  );
}
