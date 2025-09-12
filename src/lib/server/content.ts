// src/lib/server/content.ts
import { getBrand } from "./brand";
import { readJson } from "./fs-utils";

export type ReferenceItem = {
  name: string;
  avatar?: string;
  org?: string;
  text: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags?: string[];
  links?: { demo?: string; repo?: string };
  cover?: string;
};

export type About = {
  name: string;
  title: string;
  summary: string;
  social?: { label: string; href: string }[];
};

export type Seo = { title: string; description: string; ogImage?: string };

export type SkillGroup = { title: string; items: string[] };
export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  desc: string;
};

function base(...segments: string[]) {
  const brand = getBrand();
  return ["brands", brand, ...segments] as const;
}

export function getProjects(): Project[] {
  return readJson<Project[]>(...base("content", "projects.json"));
}

export function getAbout(): About {
  return readJson<About>(...base("content", "about.json"));
}

export function getSeo(): Seo {
  return readJson<Seo>(...base("content", "seo.json"));
}

export function getSkills(): SkillGroup[] {
  return readJson<SkillGroup[]>(...base("content", "skills.json"));
}

export function getExperience(): ExperienceItem[] {
  return readJson<ExperienceItem[]>(...base("content", "experience.json"));
}

export function getReferences(): ReferenceItem[] {
  const brand = getBrand();
  return readJson<ReferenceItem[]>(
    "brands",
    brand,
    "content",
    "references.json"
  );
}

export type SkillGroups2 = {
  software: string[];
  design: string[];
  personality: string[];
};

export function getSkillGroups2(): SkillGroups2 {
  const brand = getBrand();
  return readJson<SkillGroups2>(
    "brands",
    brand,
    "content",
    "skills_groups.json"
  );
}
