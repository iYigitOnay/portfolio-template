import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Markdown } from "@/components/markdown";
import { PageReady } from "@/components/site/motion";
import { formatDate, readingMinutes, splitList } from "@/lib/format";
import { getPostBySlug, getPublishedPosts } from "@/lib/queries";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "__placeholder" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

const back = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3m0 0 4.5-4.5M3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/** Sluga bağlı içerik Suspense içinde: geçişte sayfa iskeleti anında görünür, içerik akarak gelir. */
export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<div className="s-sec s-inner" aria-busy="true"><div className="s-col" style={{ minHeight: "60svh" }} /></div>}>
      <Post params={params} />
    </Suspense>
  );
}

async function Post({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();
  const tags = splitList(post.tags);
  return (
    <article data-read>
      <div className="s-progress" aria-hidden />
      <header className="s-sec s-inner">
        <div className="s-col">
          <Link href="/blog" className="s-crumb s-heroFade">{back} Tüm yazılar</Link>
          <h1 className="s-pageTitle s-heroFade" style={{ ["--d" as string]: 1 }}>{post.title}</h1>
          {post.excerpt ? <p className="s-lead s-heroFade" style={{ ["--d" as string]: 2 }}>{post.excerpt}</p> : null}
          <div className="s-meta s-heroFade" style={{ ["--d" as string]: 3 }}>
            <time dateTime={post.publishedAt?.toISOString()}>{formatDate(post.publishedAt)}</time>
            <span>·</span>
            <span>{readingMinutes(post.content)} dakikalık okuma</span>
          </div>
        </div>
      </header>
      <div className="s-sec s-articleBody">
        <div className="s-col" data-r>
          <Markdown>{post.content}</Markdown>
          <p className="s-back"><Link href="/blog" className="s-crumb">{back} Tüm yazılara dön</Link></p>
        </div>
        {tags.length ? (
          <aside className="s-side s-aside" data-r style={{ ["--d" as string]: 1 }} aria-label="Etiketler">
            <p className="s-noteTitle">Konular</p>
            <ul className="s-tags">{tags.map((t) => <li key={t}>{t}</li>)}</ul>
          </aside>
        ) : null}
      </div>
      <PageReady />
    </article>
  );
}
