import "server-only";
import { formatDate, readingMinutes, splitList } from "@/lib/format";
import { getCurrentYear, getProfile, getPublishedPosts, getPublishedProjects, getSkills } from "@/lib/queries";

/** Lab varyantlarının hepsi aynı gerçek veriyi kullanır; yalnızca tasarım değişir. */
export async function getLabData() {
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
  const firstYear = skills.reduce((min, s) => (s.since && s.since < min ? s.since : min), Infinity);
  const yearsCoding = Number.isFinite(firstYear) ? Math.max(1, year - firstYear) : null;

  return {
    profile,
    fullName: `${profile.firstName} ${profile.lastName}`,
    /** "==vurgu==" işaretleri temizlenmiş biyografi */
    bio: profile.bio.replace(/==(.+?)==/g, "$1"),
    year,
    yearsCoding,
    projects: projects.map((p) => ({ ...p, stackList: splitList(p.stack), href: `/projeler/${p.slug}` })),
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

export type LabData = Awaited<ReturnType<typeof getLabData>>;
