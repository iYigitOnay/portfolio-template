import "server-only";
import { formatDate, readingMinutes, splitList } from "@/lib/format";
import { getCurrentYear, getProfile, getPublishedPosts, getPublishedProjects, getSkills } from "@/lib/queries";

/** Sitenin herkese açık sayfalarının ihtiyaç duyduğu tüm veri, tek seferde. */
export async function getSiteData() {
  const [profile, projects, skills, posts, year] = await Promise.all([
    getProfile(),
    getPublishedProjects(),
    getSkills(),
    getPublishedPosts(),
    getCurrentYear(),
  ]);

  const skillGroups = Object.entries(
    skills.reduce<Record<string, typeof skills>>((acc, s) => ((acc[s.category] ??= []).push(s), acc), {}),
  );

  return {
    profile,
    fullName: `${profile.firstName} ${profile.lastName}`,
    bio: profile.bio,
    year,
    projects: projects.map((p) => ({
      ...p,
      stackList: splitList(p.stack),
      href: `/projeler/${p.slug}`,
      when: p.period,
    })),
    skills,
    skillGroups,
    posts: posts.map((p) => ({
      ...p,
      href: `/blog/${p.slug}`,
      date: formatDate(p.publishedAt),
      minutes: readingMinutes(p.content),
      tag: splitList(p.tags)[0] ?? "Not",
    })),
  };
}

export type SiteData = Awaited<ReturnType<typeof getSiteData>>;
