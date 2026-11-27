/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ContactForm } from "@/components/site/contact-form";
import { PageReady } from "@/components/site/motion";
import { LiveEndpoint } from "@/components/site/live-endpoint";
import { cvLinks, education, experience, focus, graduation, languages, statusLine } from "@/content/profile";
import { splitList } from "@/lib/format";
import { sized } from "@/lib/image";
import { getSiteData } from "@/lib/site-data";

const dl = (i: number) => ({ ["--d" as string]: i });

export default async function Home() {
  const d = await getSiteData();
  const { profile } = d;

  // Biyografi: paragraflara böl, her kelimeye sıra ver (kaydırdıkça aydınlanır).
  const sentences = d.bio.split(/(?<=\.)\s+(?=[A-ZÇĞİÖŞÜ])/);
  const paragraphs = sentences.reduce<string[]>((acc, s, i) => (i % 3 === 0 ? acc.push(s) : (acc[acc.length - 1] += " " + s), acc), []);
  let wi = 0;
  const wordParas = paragraphs.map((p) => p.split(/\s+/).map((w) => ({ w, i: wi++ })));

  const tags = Array.from(new Set(d.posts.flatMap((p) => splitList(p.tags))));
  // Projelerin teknolojileri; "Next.js 16" gibi sürümlü adlar, sürümsüz hâli de varsa tekrar edilmez.
  const allStacks = new Set(d.projects.flatMap((p) => p.stackList));
  const stacks = Array.from(allStacks).filter((t) => !/\s\d+$/.test(t) || !allStacks.has(t.replace(/\s\d+$/, "")));
  const [cvTr, cvEn] = cvLinks;
  const contactLinks = (
    <>
      {profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : null}
      {profile.github ? <a href={profile.github} target="_blank" rel="noopener">GitHub</a> : null}
      {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a> : null}
    </>
  );

  return (
    <>
      <section className="s-sec s-hero" data-endpoint="profile">
        <div className="s-col">
          <h1 className="s-h1">
            <span className="s-line"><span>{profile.firstName} {profile.lastName},</span></span>
            <span className="s-line"><span style={dl(1)}>backend geliştirici.</span></span>
          </h1>
          <p className="s-lead s-heroFade" style={dl(2)}>{profile.heroSentence}</p>
          <div className="s-actions s-heroFade" style={dl(3)}>
            <a href="#isler" className="s-btn">
              <span>Projeleri görün</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 2v7.5M2.75 6.5 6 9.75 9.25 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <span className="s-cvLinks">
              <a href={cvTr.href} download className="s-textLink">{cvTr.label}</a>
              <a href={cvEn.href} download hrefLang="en" className="s-textLink">English</a>
            </span>
          </div>
        </div>
        <aside className="s-side s-plinthWrap s-heroFade" style={dl(4)} id="api" aria-label="Canlı API">
          <div className="s-plinth" data-tilt>
            <p className="s-plinthNote">Bu sitenin kendi API&apos;si. Bir kaynak seçin, yanıt veritabanından gelsin.</p>
            <LiveEndpoint initial="profile" maxLines={22} cls={{ root: "s-api", tabs: "s-apiTabs", tab: "s-apiTab", meta: "s-apiMeta", pre: "s-apiPre" }} />
          </div>
        </aside>
      </section>

      <section className="s-sec" data-endpoint="profile" aria-labelledby="a-hakkimda">
        <div className="s-col">
          <h2 id="a-hakkimda" className="s-h2" data-r>Merhaba.</h2>
          <div className="s-words" style={{ ["--wn" as string]: wi + 2 }}>
            {wordParas.map((words, pi) => (
              <p key={pi} className="s-body-text">
                {words.map(({ w, i }) => <span key={i} className="s-w" style={{ ["--i" as string]: i }}>{w} </span>)}
              </p>
            ))}
          </div>
          <p className="s-sign" data-r>{profile.firstName}, {profile.location}</p>
        </div>
        <aside className="s-side s-note" data-r style={dl(2)} aria-label="Künye">
          <dl className="s-facts">
            <div><dt>Rol</dt><dd>{profile.role}</dd></div>
            <div><dt>Konum</dt><dd>{profile.location}</dd></div>
            <div><dt>Durum</dt><dd>{profile.available ? <><span className="s-pulse" aria-hidden /> {statusLine}</> : "Şu an meşgul"}<br />{graduation}</dd></div>
            <div><dt>Odak</dt><dd>{focus}</dd></div>
            <div><dt>Bağlantılar</dt><dd className="s-factLinks">{contactLinks}{cvLinks.map((c) => <a key={c.href} href={c.href} download hrefLang={c.lang}>{c.short}</a>)}</dd></div>
          </dl>
        </aside>
      </section>

      <section className="s-sec" id="deneyim" data-endpoint="profile" aria-labelledby="a-deneyim">
        <div className="s-col">
          <h2 id="a-deneyim" className="s-h2" data-r>Deneyim</h2>
          {experience.map((x, i) => (
            <article key={x.company} className="s-exp" data-r style={dl(i)}>
              <header className="s-expHead">
                <h3 className="s-h3">{x.company}<span> · {x.role}</span></h3>
                <p className="s-expMeta">{x.period} · {x.place}</p>
              </header>
              <ul className="s-expList">
                {x.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <aside className="s-side s-note" data-r style={dl(1)} aria-label="Eğitim">
          <p className="s-noteTitle">Eğitim</p>
          <dl className="s-facts">
            <div><dt>Okul</dt><dd>{education.school}</dd></div>
            <div><dt>Bölüm</dt><dd>{education.degree}</dd></div>
            <div><dt>Dönem</dt><dd>{education.period}</dd></div>
          </dl>
        </aside>
      </section>

      <section className="s-sec s-ledger" id="isler" data-endpoint="projects" aria-labelledby="a-isler">
        <div className="s-col">
          <h2 id="a-isler" className="s-h2" data-r>Seçili işler</h2>
        </div>
        <aside className="s-side s-note s-ledgerNote" data-r style={dl(1)} aria-label="Projelerde kullanılanlar">
          <p>Bu projelerde kullandıklarım: {stacks.join(", ")}.</p>
        </aside>
        <ul className="s-ledgerList">
          {d.projects.map((p) => (
            <li key={p.id} data-r>
              <Link href={p.href} className="s-row">
                <span className="s-rowYear">{p.when}</span>
                <span className="s-rowMain">
                  <span className="s-rowTitle">{p.title}<i aria-hidden>→</i></span>
                  <span>{p.summary}</span>
                  <span className="s-rowStack">{p.stackList.join(" · ")}</span>
                </span>
                {p.coverUrl ? (
                  <span className="s-rowPic"><img src={sized(p.coverUrl, 960, 640)} alt="" width={960} height={640} loading="lazy" /></span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="s-sec" id="araclar" data-endpoint="skills" aria-labelledby="a-araclar">
        <div className="s-col">
          <h2 id="a-araclar" className="s-h2" data-r>Araç kutusu</h2>
          {d.skillGroups.map(([cat, items], gi) => (
            <div key={cat} className="s-group" data-r style={dl(gi)}>
              <h3 className="s-h3">{cat}</h3>
              <ul className="s-tags">
                {items.map((sk) => <li key={sk.id}>{sk.name}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <aside className="s-side s-note" data-r style={dl(1)} aria-label="Konuştuğum diller">
          <p className="s-noteTitle">Diller</p>
          <dl className="s-facts">
            {languages.map((l) => <div key={l.name}><dt>{l.name}</dt><dd>{l.level}</dd></div>)}
          </dl>
        </aside>
      </section>

      {d.posts.length ? (
        <section className="s-sec" id="yazilar" data-endpoint="posts" aria-labelledby="a-yazilar">
          <div className="s-col">
            <h2 id="a-yazilar" className="s-h2" data-r>Yazılar</h2>
            {profile.writingLead ? <p className="s-body-text" data-r>{profile.writingLead}</p> : null}
            {d.posts.slice(0, 6).map((p, i) => (
              <Link key={p.id} href={p.href} className="s-post" data-r style={dl(i % 3)}>
                <span className="s-postTitle">{p.title}</span>
                <span>{p.excerpt}</span>
                <span className="s-postMeta">{p.date} · {p.minutes} dakikalık okuma</span>
              </Link>
            ))}
          </div>
          {tags.length ? (
            <aside className="s-side s-note" data-r style={dl(1)} aria-label="Konular">
              <p className="s-noteTitle">Yazdığım konular</p>
              <ul className="s-tags">
                {tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <Link href="/blog" className="s-textLink">Tüm yazılar</Link>
            </aside>
          ) : null}
        </section>
      ) : null}

      <section className="s-sec" id="iletisim" data-endpoint="profile" aria-labelledby="a-iletisim">
        <div className="s-col">
          <h2 id="a-iletisim" className="s-h2" data-r>{profile.footerInvite || "Ekibinize katılmaya hazırım."}</h2>
          <p className="s-body-text" data-r>Junior backend ve staj pozisyonları için yazabilirsiniz. En geç iki iş günü içinde dönüş yaparım.</p>
          <div data-r style={dl(1)}>
            <ContactForm to={profile.email} cls={{ form: "s-form", field: "s-field", label: "s-label", input: "s-input", row: "s-formRow", note: "s-formNote", button: "s-btn" }} />
          </div>
          <p className="s-contactLinks" data-r>{contactLinks}</p>
        </div>
        <aside className="s-side s-note s-direct" data-r style={dl(2)} aria-label="Doğrudan ulaşın">
          <p className="s-noteTitle">Doğrudan</p>
          {profile.email ? <a href={`mailto:${profile.email}`} className="s-directMail">{profile.email}</a> : null}
          <p>{profile.location}. En geç iki iş günü içinde dönerim.</p>
        </aside>
      </section>
      <PageReady />
    </>
  );
}
