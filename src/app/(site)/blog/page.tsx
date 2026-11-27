import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, readingMinutes, splitList } from "@/lib/format";
import { PageReady } from "@/components/site/motion";
import { getProfile, getPublishedPosts } from "@/lib/queries";

export const metadata: Metadata = { title: "Yazılar" };

export default async function BlogPage() {
  const [posts, profile] = await Promise.all([getPublishedPosts(), getProfile()]);
  return (
    <section className="s-sec s-inner" aria-labelledby="yazilar-baslik">
      <div className="s-col s-innerHead">
        <h1 id="yazilar-baslik" className="s-h1">
          <span className="s-line"><span>Yazılar.</span></span>
        </h1>
        <p className="s-lead s-heroFade" style={{ ["--d" as string]: 1 }}>
          {posts.length === 0 ? "Yakında. İlk yazılar hazırlanıyor." : profile.writingLead || null}
        </p>
      </div>
      <ol className="s-postIndex">
        {posts.map((post) => (
          <li key={post.id} data-r>
            <Link href={`/blog/${post.slug}`} className="s-postRow">
              <span className="s-rowYear">{formatDate(post.publishedAt)}</span>
              <span>
                <span className="s-postTitle">{post.title}</span>
                <span>{post.excerpt}</span>
                <span className="s-postMeta" style={{ display: "block", marginTop: 8 }}>{readingMinutes(post.content)} dakikalık okuma</span>
              </span>
              <span className="s-postRowSide">
                {splitList(post.tags).map((t) => <span key={t} className="s-chip">{t}</span>)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <PageReady />
    </section>
  );
}
