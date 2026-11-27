import { Footer } from "@/components/site/footer";
import { Motion } from "@/components/site/motion";
import { Nav } from "@/components/site/nav";
import { themeBootScript } from "@/components/site/theme";
import { getSiteData } from "@/lib/site-data";
import "./site.css";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const d = await getSiteData();
  const { profile } = d;
  return (
    <div className="s-page" data-accent="navy" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600&display=swap" precedence="default" />
      <a className="skip" href="#icerik">İçeriğe geç</a>
      <Nav
        name={d.fullName}
        initials={`${profile.firstName[0]}${profile.lastName[0]}`}
        projects={d.projects.slice(0, 6).map((p) => ({ href: p.href, title: p.title, meta: `${p.kind} · ${p.when}` }))}
        posts={d.posts.slice(0, 5).map((p) => ({ href: p.href, title: p.title, meta: p.date }))}
      />
      <main id="icerik">{children}</main>
      <Footer d={d} />
      <Motion />
    </div>
  );
}
