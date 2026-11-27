/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { splitList } from "@/lib/format";
import { sized } from "@/lib/image";
import { LabContactForm } from "../_lib/contact-form";
import { getLabData } from "../_lib/data";
import { LiveEndpoint } from "../_lib/live-endpoint";
import { AFooter } from "./footer";
import { AMotion } from "./motion";
import { ANav } from "./nav";
import { AOptions } from "./options";
import { SyncedEndpoint } from "./synced-endpoint";
import { themeBootScript } from "./theme";
import "./a.css";

const dl = (i: number) => ({ ["--d" as string]: i });

export default async function VariantA() {
  const d = await getLabData();
  const { profile } = d;

  // Biyografi: paragraflara böl, her kelimeye sıra ver (kaydırdıkça aydınlanır).
  const sentences = d.bio.split(/(?<=\.)\s+(?=[A-ZÇĞİÖŞÜ])/);
  const paragraphs = sentences.reduce<string[]>((acc, s, i) => (i % 3 === 0 ? acc.push(s) : (acc[acc.length - 1] += " " + s), acc), []);
  let wi = 0;
  const wordParas = paragraphs.map((p) => p.split(/\s+/).map((w) => ({ w, i: wi++ })));

  const figures = [
    { n: d.projects.length, t: "proje yayında." },
    { n: d.skills.length, t: "araç ve teknolojiyle çalıştım." },
    { n: d.posts.length, t: "teknik yazı yayımladım." },
    ...(d.yearsCoding ? [{ n: d.yearsCoding, t: "yıldır düzenli kod yazıyorum." }] : []),
  ];
  const tagCounts = Object.entries(
    d.posts.flatMap((p) => splitList(p.tags)).reduce<Record<string, number>>((acc, t) => ((acc[t] = (acc[t] ?? 0) + 1), acc), {}),
  ).sort((a, b) => b[1] - a[1]);
  const stacks = Array.from(new Set(d.projects.flatMap((p) => p.stackList)));
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  const contactLinks = (
    <>
      {profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : null}
      {profile.github ? <a href={profile.github} target="_blank" rel="noopener">GitHub</a> : null}
      {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a> : null}
    </>
  );

  return (
    <div className="lab-root la-page" data-accent="navy" data-layout="notlar" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600&display=swap" precedence="default" />

      <ANav
        name={d.fullName}
        initials={initials}
        projects={d.projects.slice(0, 6).map((p) => ({ href: p.href, title: p.title, meta: `${p.kind} · ${p.year}` }))}
        posts={d.posts.slice(0, 5).map((p) => ({ href: p.href, title: p.title, meta: p.date }))}
      />

      <div className="la-body">
        <main className="la-main" id="icerik">
          <section className="la-sec la-hero" data-endpoint="profile">
            <div className="la-col">
              <h1 className="la-h1">
                <span className="la-line"><span>{profile.firstName} {profile.lastName},</span></span>
                <span className="la-line"><span style={dl(1)}>backend geliştirici.</span></span>
              </h1>
              <p className="la-lead la-heroFade" style={dl(2)}>{profile.heroSentence}</p>
              <div className="la-actions la-heroFade" style={dl(3)}>
                <a href="#isler" className="la-btn">
                  <span>Projeleri görün</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 2v7.5M2.75 6.5 6 9.75 9.25 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href="/cv.pdf" download className="la-textLink">CV indir (PDF)</a>
              </div>
            </div>
            <aside className="la-side la-plinthWrap la-heroFade" style={dl(4)} id="api" aria-label="Canlı API">
              <div className="la-plinth" data-tilt>
                <p className="la-plinthNote">Bu sitenin kendi API&apos;si. Bir kaynak seçin, yanıt veritabanından gelsin.</p>
                <LiveEndpoint initial="profile" maxLines={22} cls={{ root: "la-api", tabs: "la-apiTabs", tab: "la-apiTab", meta: "la-apiMeta", pre: "la-apiPre" }} />
              </div>
            </aside>
          </section>

          <section className="la-sec" data-endpoint="profile" aria-labelledby="a-hakkimda">
            <div className="la-col">
              <h2 id="a-hakkimda" className="la-h2" data-r>Merhaba.</h2>
              <div className="la-words" data-words={wi}>
                {wordParas.map((words, pi) => (
                  <p key={pi} className="la-body-text">
                    {words.map(({ w, i }) => <span key={i} className="la-w" style={{ ["--i" as string]: i }}>{w} </span>)}
                  </p>
                ))}
              </div>
              <p className="la-sign" data-r>{profile.firstName}, {profile.location}</p>
            </div>
            <aside className="la-side la-note" data-r style={dl(2)} aria-label="Künye">
              <dl className="la-facts">
                <div><dt>Rol</dt><dd>{profile.role}</dd></div>
                <div><dt>Konum</dt><dd>{profile.location}</dd></div>
                <div><dt>Durum</dt><dd>{profile.available ? <><span className="la-pulse" aria-hidden /> Görüşmelere açık</> : "Şu an meşgul"}</dd></div>
                <div><dt>Odak</dt><dd>API tasarımı, veri modelleme, dağıtık sistemler</dd></div>
                <div><dt>Bağlantılar</dt><dd className="la-factLinks">{contactLinks}<a href="/cv.pdf" download>CV (PDF)</a></dd></div>
              </dl>
            </aside>
          </section>

          <section className="la-sec la-ledger" id="isler" data-endpoint="projects" aria-labelledby="a-isler">
            <div className="la-col">
              <h2 id="a-isler" className="la-h2" data-r>Seçili işler</h2>
            </div>
            <aside className="la-side la-note la-ledgerNote" data-r style={dl(1)} aria-label="Projelerde kullanılanlar">
              <p>Bu projelerde kullandıklarım: {stacks.join(", ")}.</p>
            </aside>
            <ul className="la-ledgerList">
              {d.projects.map((p) => (
                <li key={p.id} data-r>
                  <Link href={p.href} className="la-row">
                    <span className="la-rowYear">{p.year}</span>
                    <span className="la-rowMain">
                      <span className="la-rowTitle">{p.title}<i aria-hidden>→</i></span>
                      <span>{p.summary}</span>
                      <span className="la-rowStack">{p.stackList.join(" · ")}</span>
                    </span>
                    {p.coverUrl ? (
                      <span className="la-rowPic"><img src={sized(p.coverUrl, 960, 640)} alt="" width={960} height={640} loading="lazy" /></span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="la-sec la-figuresSec" data-endpoint="skills" aria-label="Rakamlarla">
            <div className="la-col">
              {figures.map((f, i) => (
                <p key={f.t} className="la-figure" data-r style={dl(i)}><b data-count={f.n}>{f.n}</b> {f.t}</p>
              ))}
            </div>
          </section>

          <section className="la-sec" id="araclar" data-endpoint="skills" aria-labelledby="a-araclar">
            <div className="la-col">
              <h2 id="a-araclar" className="la-h2" data-r>Araç kutusu</h2>
              {d.skillGroups.map(([cat, items], gi) => (
                <div key={cat} className="la-group" data-r style={dl(gi)}>
                  <h3 className="la-h3">{cat}</h3>
                  <ul className="la-twoEnd">
                    {items.map((sk) => (
                      <li key={sk.id}>
                        <span>{sk.name}{sk.level ? <em> · {sk.level}</em> : null}</span>
                        <span className="la-since">{sk.since ? `${sk.since}’den beri` : ""}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <aside className="la-side la-note la-bigFigs" aria-label="Rakamlarla">
              {figures.map((f, i) => (
                <p key={f.t} data-r style={dl(i)}><b data-count={f.n}>{f.n}</b><span>{f.t}</span></p>
              ))}
            </aside>
          </section>

          {d.posts.length ? (
            <section className="la-sec" id="yazilar" data-endpoint="posts" aria-labelledby="a-yazilar">
              <div className="la-col">
                <h2 id="a-yazilar" className="la-h2" data-r>Yazılar</h2>
                <p className="la-body-text" data-r>{profile.writingLead}</p>
                {d.posts.slice(0, 6).map((p, i) => (
                  <Link key={p.id} href={p.href} className="la-post" data-r style={dl(i % 3)}>
                    <span className="la-postTitle">{p.title}</span>
                    <span>{p.excerpt}</span>
                    <span className="la-postMeta">{p.date} · {p.minutes} dakikalık okuma</span>
                  </Link>
                ))}
              </div>
              {tagCounts.length ? (
                <aside className="la-side la-note" data-r style={dl(1)} aria-label="Konular">
                  <p className="la-noteTitle">Yazdığım konular</p>
                  <ul className="la-tags">
                    {tagCounts.map(([t, n]) => <li key={t}>{t} <span>{n}</span></li>)}
                  </ul>
                  <Link href="/blog" className="la-textLink">Tüm yazılar</Link>
                </aside>
              ) : null}
            </section>
          ) : null}

          <section className="la-sec" id="iletisim" data-endpoint="profile" aria-labelledby="a-iletisim">
            <div className="la-col">
              <h2 id="a-iletisim" className="la-h2" data-r>{profile.footerInvite || "Ekibinize katılmaya hazırım."}</h2>
              <p className="la-body-text" data-r>Junior backend ve staj pozisyonları için yazabilirsiniz. En geç iki iş günü içinde dönüş yaparım.</p>
              <div data-r style={dl(1)}>
                <LabContactForm cls={{ form: "la-form", field: "la-field", label: "la-label", input: "la-input", row: "la-formRow", note: "la-formNote", button: "la-btn" }} />
              </div>
              <p className="la-contactLinks" data-r>{contactLinks}</p>
            </div>
            <aside className="la-side la-note la-direct" data-r style={dl(2)} aria-label="Doğrudan ulaşın">
              <p className="la-noteTitle">Doğrudan</p>
              {profile.email ? <a href={`mailto:${profile.email}`} className="la-directMail">{profile.email}</a> : null}
              <p>{profile.location}. En geç iki iş günü içinde dönerim.</p>
            </aside>
          </section>
        </main>

        <aside className="la-rail" aria-label="Bu bölümün API yanıtı">
          <SyncedEndpoint />
        </aside>
      </div>

      <AFooter d={d} />
      <AOptions />
      <AMotion />
    </div>
  );
}
