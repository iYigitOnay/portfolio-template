/* eslint-disable @next/next/no-img-element */
import { Onest, Unbounded } from "next/font/google";
import Link from "next/link";
import { sized } from "@/lib/image";
import { LabContactForm } from "../_lib/contact-form";
import { Reveal } from "../_lib/reveal";
import { getLabData } from "../_lib/data";
import { LiveEndpoint } from "../_lib/live-endpoint";
import "./d.css";

const display = Unbounded({ subsets: ["latin", "latin-ext"], weight: ["800"], variable: "--d-display", display: "swap" });
const text = Onest({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--d-text", display: "swap" });

export default async function VariantD() {
  const d = await getLabData();
  const { profile } = d;
  const figures = [
    { n: d.projects.length, t: "proje yayında" },
    { n: d.skills.length, t: "araç ve teknoloji" },
    d.yearsCoding ? { n: `${d.yearsCoding}+`, t: "yıldır kod yazıyorum" } : { n: d.posts.length, t: "teknik yazı" },
  ];

  return (
    <div className={`lab-root ld-page ${display.variable} ${text.variable}`}>
      <section className={`ld-panel ld-hero`}>
        <header className="ld-bar">
          <Link href="/lab/d" className="ld-mark">{d.fullName}</Link>
          <nav className="ld-links" aria-label="Bölümler">
            <a href="#isler">İşler</a>
            <a href="#araclar">Araçlar</a>
            <a href="#yazilar">Yazılar</a>
          </nav>
          <a href="#iletisim" className="ld-barCta">Yaz bana</a>
        </header>
        <h1 className="ld-shout">
          <span className="ld-mask"><span>API&apos;leri</span></span>
          <span className="ld-mask"><span style={{ ["--d" as string]: 1 }}>ben yazarım.</span></span>
        </h1>
        <div className="ld-heroBottom">
          <p className="ld-heroSub" data-r style={{ ["--d" as string]: 2 }}>
            {profile.firstName} {profile.lastName}. {profile.heroSentence}
          </p>
          <figure className="ld-heroPic">
            <img src="/lab/galata-tower-67m.jpg" alt="Galata Kulesi, aşağıdan bakış" width={1920} height={1275} />
          </figure>
          <a href="#isler" className="ld-btn" data-r style={{ ["--d" as string]: 3 }}>Projelere bak</a>
        </div>
      </section>

      <section className={`ld-panel ld-white ld-about`} aria-labelledby="d-ben">
        <h2 id="d-ben" className="ld-pinned">Ben kimim?</h2>
        <div className="ld-aboutText">
          {d.bio.split(/(?<=\.)\s+(?=[A-ZÇĞİÖŞÜ])/).map((sent, i) => (
            <p key={i} data-r>{sent}</p>
          ))}
        </div>
      </section>

      <section className={`ld-panel ld-pink`} id="isler" aria-labelledby="d-isler">
        <h2 id="d-isler" className="ld-h2" data-r>Seçili işler</h2>
        <ul className="ld-works">
          {d.projects.map((p, i) => (
            <li key={p.id} data-r style={{ ["--d" as string]: i % 3 }}>
              <Link href={p.href} className="ld-work">
                <span className="ld-name">
                  {p.title}
                  {p.coverUrl ? (
                    <span className="ld-frame" aria-hidden>
                      <img src={sized(p.coverUrl, 480, 320)} alt="" width={480} height={320} loading="lazy" />
                    </span>
                  ) : null}
                </span>
                <span className="ld-workText">
                  <span>{p.summary}</span>
                  <small>{p.kind} · {p.year} · {p.stackList.join(", ")}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`ld-panel ld-cyan`} id="araclar" aria-labelledby="d-araclar">
        <h2 id="d-araclar" className="ld-h2" data-r>Araç kutusu</h2>
        <table className="ld-lineup">
          <thead className="ld-srOnly">
            <tr><th>Araç</th><th>Alan</th><th>Düzey</th><th>Başlangıç</th></tr>
          </thead>
          <tbody>
            {d.skills.map((sk) => (
              <tr key={sk.id}>
                <td>{sk.name}</td>
                <td>{sk.category}</td>
                <td>{sk.level || "—"}</td>
                <td>{sk.since ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ld-apiPanel" data-r>
          <p>Bu tablo da, sitedeki her şey gibi, kendi API&apos;mden geliyor. Bir kaynak seçin:</p>
          <LiveEndpoint initial="skills" maxLines={16} cls={{ tabs: "ld-apiTabs", tab: "ld-apiTab", meta: "ld-apiMeta", pre: "ld-apiPre" }} />
        </div>
      </section>

      <section className={`ld-panel ld-orange ld-stats`} aria-labelledby="d-rakam">
        <h2 id="d-rakam" className="ld-statsHead" data-r>Rakamlarla</h2>
        {figures.map((f, i) => (
          <div key={f.t} className={`ld-tile ${`ld-t${i}`}`} data-r style={{ ["--d" as string]: i }}>
            <span className="ld-tileN">{f.n}</span>
            <span>{f.t}</span>
          </div>
        ))}
      </section>

      {d.posts.length ? (
        <section className={`ld-panel ld-white`} id="yazilar" aria-labelledby="d-yazilar">
          <h2 id="d-yazilar" className="ld-h2" data-r>Yazılar</h2>
          <p className="ld-lead" data-r>{profile.writingLead}</p>
          <ol className="ld-postList">
            {d.posts.slice(0, 6).map((p) => (
              <li key={p.id} data-r>
                <Link href={p.href}>
                  <span className="ld-postTitle">{p.title}</span>
                  <span className="ld-postMeta">{p.tag} · {p.date} · {p.minutes} dk</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className={`ld-panel ld-contact`} id="iletisim" aria-labelledby="d-iletisim">
        <h2 id="d-iletisim" className="ld-h2" data-r>{profile.footerInvite || "Ekibinize katılmaya hazırım."}</h2>
        {profile.email ? <a href={`mailto:${profile.email}`} className="ld-email" data-r>{profile.email}</a> : null}
        <div className="ld-contactGrid">
          <LabContactForm cls={{ form: "ld-form", field: "ld-field", label: "ld-label", input: "ld-input", row: "ld-formRow", note: "ld-note", button: "ld-btn" }} />
          <div className="ld-contactSide">
            <p>Junior backend ve staj pozisyonlarına açığım. En geç iki iş günü içinde dönerim.</p>
            <p className="ld-contactLinks">
              {profile.github ? <a href={profile.github} target="_blank" rel="noopener">GitHub</a> : null}
              {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a> : null}
              <a href="/cv.pdf" download>CV (PDF)</a>
            </p>
          </div>
        </div>
        <footer className="ld-footer">
          <span>© {d.year} {d.fullName} · {profile.location}</span>
          <span>
            Fotoğraf: <a href="https://commons.wikimedia.org/w/index.php?curid=25207044" target="_blank" rel="noopener">“Galata Tower (67m.)”</a>, Jorge Láscar, CC BY-SA 2.0, Wikimedia Commons.
          </span>
        </footer>
      </section>
      <Reveal />
    </div>
  );
}
