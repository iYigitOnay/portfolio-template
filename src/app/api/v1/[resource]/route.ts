import { NextResponse } from "next/server";
import { getProfile, getPublishedPosts, getPublishedProjects, getSkills } from "@/lib/queries";
import { splitList } from "@/lib/format";
import { education, experience, focus, languages } from "@/content/profile";

const resources = {
  async profile() {
    const p = await getProfile();
    return {
      name: `${p.firstName} ${p.lastName}`,
      role: p.role,
      location: p.location,
      focus,
      available: p.available,
      links: { email: p.email, github: p.github, linkedin: p.linkedin },
      experience: experience.map(({ company, role, period, place }) => ({ company, role, period, place })),
      education,
      languages,
    };
  },
  async projects() {
    return (await getPublishedProjects()).map((p) => ({
      slug: p.slug,
      title: p.title,
      kind: p.kind,
      year: p.year,
      period: p.period,
      summary: p.summary,
      stack: splitList(p.stack),
      links: { repo: p.repoUrl || null, live: p.liveUrl || null },
    }));
  },
  async posts() {
    return (await getPublishedPosts()).map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      tags: splitList(p.tags),
      publishedAt: p.publishedAt?.toISOString() ?? null,
    }));
  },
  async skills() {
    return (await getSkills()).map(({ name, category }) => ({ name, category }));
  },
} as const;

type Resource = keyof typeof resources;
const RESOURCES = Object.keys(resources) as Resource[];

export function generateStaticParams() {
  return RESOURCES.map((resource) => ({ resource }));
}

export async function GET(_req: Request, ctx: RouteContext<"/api/v1/[resource]">) {
  const { resource } = await ctx.params;
  if (!(resource in resources)) {
    return NextResponse.json(
      { error: { code: "not_found", message: `Bilinmeyen kaynak: ${resource}`, available: RESOURCES } },
      { status: 404 },
    );
  }
  const data = await resources[resource as Resource]();
  return NextResponse.json(
    { data, meta: { resource, count: Array.isArray(data) ? data.length : 1, version: "v1" } },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
      },
    },
  );
}
