/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Markdown } from "@/components/markdown";
import { PageReady } from "@/components/site/motion";
import { splitList } from "@/lib/format";
import { sized } from "@/lib/image";
import { getProjectBySlug, getPublishedProjects } from "@/lib/queries";

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.length ? projects.map((p) => ({ slug: p.slug })) : [{ slug: "__placeholder" }];
}

export async function generateMetadata({ params }: PageProps<"/projeler/[slug]">): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

const back = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3m0 0 4.5-4.5M3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/** Sluga bağlı içerik Suspense içinde: geçişte sayfa iskeleti anında görünür, içerik akarak gelir. */
export default function ProjectPage({ params }: PageProps<"/projeler/[slug]">) {
  return (
    <Suspense fallback={<div className="s-sec s-inner" aria-busy="true"><div className="s-col" style={{ minHeight: "60svh" }} /></div>}>
      <Project params={params} />
    </Suspense>
  );
}

async function Project({ params }: { params: PageProps<"/projeler/[slug]">["params"] }) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  const stack = splitList(project.stack);
  return (
    <article>
      <header className="s-sec s-inner">
        <div className="s-col">
          <Link href="/#isler" className="s-crumb s-heroFade">{back} Tüm işler</Link>
          <h1 className="s-pageTitle s-heroFade" style={{ ["--d" as string]: 1 }}>{project.title}</h1>
          <p className="s-lead s-heroFade" style={{ ["--d" as string]: 2 }}>{project.summary}</p>
          <div className="s-meta s-heroFade" style={{ ["--d" as string]: 3 }}>
            <span>{project.kind}</span><span>·</span><span>{project.period}</span>
          </div>
        </div>
      </header>

      {project.coverUrl ? (
        <div className="s-sec s-article">
          <figure className="s-cover s-heroFade" style={{ ["--d" as string]: 4 }}>
            <img src={sized(project.coverUrl, 2000, 1125)} alt="" width={2000} height={1125} />
          </figure>
        </div>
      ) : null}

      <div className="s-sec s-articleBody">
        <div className="s-col" data-r>
          <Markdown>{project.content}</Markdown>
          <p className="s-back"><Link href="/#isler" className="s-crumb">{back} Tüm işlere dön</Link></p>
        </div>
        <aside className="s-side s-aside" data-r style={{ ["--d" as string]: 1 }} aria-label="Proje künyesi">
          <dl className="s-facts">
            <div><dt>Tür</dt><dd>{project.kind}</dd></div>
            <div><dt>Dönem</dt><dd>{project.period}</dd></div>
            {stack.length ? <div><dt>Teknoloji</dt><dd>{stack.join(", ")}</dd></div> : null}
          </dl>
          {project.liveUrl || project.repoUrl ? (
            <div className="s-actions">
              {project.liveUrl ? <a className="s-btn" href={project.liveUrl} target="_blank" rel="noopener"><span>Canlı sürümü aç</span></a> : null}
              {project.repoUrl ? <a className="s-textLink" href={project.repoUrl} target="_blank" rel="noopener">Kaynak kodu</a> : null}
            </div>
          ) : null}
        </aside>
      </div>
      <PageReady />
    </article>
  );
}
