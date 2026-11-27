/* eslint-disable @next/next/no-img-element */
import { Newsreader } from "next/font/google";
import Link from "next/link";
import { sized } from "@/lib/image";
import { LabContactForm } from "../_lib/contact-form";
import { Reveal } from "../_lib/reveal";
import { getLabData } from "../_lib/data";
import { LiveEndpoint } from "../_lib/live-endpoint";
import "./c.css";

const news = Newsreader({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"], style: ["normal", "italic"], display: "swap" });

export default async function VariantC() {
  const d = await getLabData();
  const { profile } = d;

  return (
    <div className={`lab-root lc-page ${news.className}`}>
      <header className="lc-bar">
        <Link href="/lab/c" className="lc-mark">{d.fullName}</Link>
        <nav className="lc-links" aria-label="Bölümler">
          <a href="#isler">İşler</a>
          <a href="#araclar">Araçlar</a>
          <a href="#yazilar">Yazılar</a>
        </nav>
        <a href="#iletisim" className="lc-barCta">İletişim</a>
      </header>

      <section className="lc-hero">
        <figure className="lc-heroPic">
          <img src="/lab/istanbul-skyline-at-night.jpg" alt="Gece İstanbul: Boğaz kıyısındaki ışıklar ve arkada yükselen gökdelenler" width={1920} height={1275} />
        </figure>
        <div className="lc-heroText">
          <h1 className="lc-name">
            <span className="lc-nameIn">{profile.firstName}</span>{" "}
            <span className="lc-nameIn" style={{ ["--d" as string]: 1 }}>{profile.lastName}</span>
          </h1>
          <p className="lc-heroLine" data-r style={{ ["--d" as string]: 2 }}>{profile.role} · {profile.location}</p>
        </div>
      </section>

      <section className="lc-about" aria-label="Hakkımda">
        <p className="lc-aboutText" data-r>{d.bio.split(/(?<=\.)\s+/)[1]}</p>
        <div className="lc-aboutSide" data-r style={{ ["--d" as string]: 1 }}>
          <p>{profile.heroSentence}</p>
          <a href="#isler" className="lc-btn">İşleri görün</a>
        </div>
      </section>

      <section className="lc-work" id="isler" aria-labelledby="c-isler">
        <h2 id="c-isler" className="lc-h2" data-r>Seçili işler</h2>
        {d.projects.map((p, i) => (
          <Link key={p.id} href={p.href} className={`lc-exhibit ${i % 2 ? "lc-right" : ""}`} data-r>
            {p.coverUrl ? (
              <span className="lc-exPic">
                <img src={sized(p.coverUrl, 1400, 1000)} alt="" width={1400} height={1000} loading="lazy" />
              </span>
            ) : null}
            <span className="lc-exText">
              <span className="lc-exMeta">{p.kind} · {p.year}</span>
              <span className="lc-exTitle">{p.title}</span>
              <span className="lc-exSum">{p.summary}</span>
              <span className="lc-exStack">{p.stackList.join(" · ")}</span>
            </span>
          </Link>
        ))}
      </section>

      <section className="lc-figures" aria-label="Rakamlarla">
        <p className="lc-figSentence" data-r>
          Bugüne kadar <b>{d.projects.length}</b> projeyi yayına aldım, <b>{d.skills.length}</b> araçla çalıştım
          ve öğrendiklerimi <b>{d.posts.length}</b> yazıda anlattım{d.yearsCoding ? <>; <b>{d.yearsCoding}</b> yıldır her gün kod yazıyorum</> : null}.
        </p>
      </section>

      <section className="lc-tools" id="araclar" aria-labelledby="c-araclar">
        <div className="lc-toolsHead">
          <h2 id="c-araclar" className="lc-h2" data-r>Araç kutusu</h2>
          <div className="lc-apiBox" data-r style={{ ["--d" as string]: 1 }}>
            <p className="lc-apiNote">Bu listenin kendisi de bir API yanıtı. Deneyin:</p>
            <LiveEndpoint initial="skills" maxLines={18} cls={{ tabs: "lc-apiTabs", tab: "lc-apiTab", meta: "lc-apiMeta", pre: "lc-apiPre" }} />
          </div>
        </div>
        <div className="lc-toolGroups">
          {d.skillGroups.map(([cat, items], i) => (
            <div key={cat} data-r style={{ ["--d" as string]: i }}>
              <h3 className="lc-h3">{cat}</h3>
              <ul className="lc-toolList">
                {items.map((sk) => (
                  <li key={sk.id}>
                    <span>{sk.name}</span>
                    <span className="lc-dim">{sk.since ?? ""}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {d.posts.length ? (
        <section className="lc-posts" id="yazilar" aria-labelledby="c-yazilar">
          <h2 id="c-yazilar" className="lc-h2" data-r>Yazılar</h2>
          <p className="lc-postsLead" data-r>{profile.writingLead}</p>
          <ul className="lc-postList">
            {d.posts.slice(0, 6).map((p, i) => (
              <li key={p.id} data-r style={{ ["--d" as string]: i % 3 }}>
                <Link href={p.href} className="lc-post">
                  <span className="lc-postTitle">{p.title}</span>
                  <span className="lc-dim">{p.date} · {p.minutes} dk</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="lc-contact" id="iletisim" aria-labelledby="c-iletisim">
        <div className="lc-contactCard" data-r>
          <h2 id="c-iletisim" className="lc-h2">{profile.footerInvite || "Ekibinize katılmaya hazırım."}</h2>
          <p>Junior backend ve staj pozisyonları için yazın; en geç iki iş günü içinde dönerim.</p>
          <LabContactForm cls={{ form: "lc-form", field: "lc-field", label: "lc-label", input: "lc-input", row: "lc-formRow", note: "lc-dim", button: "lc-btn" }} />
          <p className="lc-contactLinks">
            {profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : null}
            {profile.github ? <a href={profile.github} target="_blank" rel="noopener">GitHub</a> : null}
            {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a> : null}
          </p>
        </div>
      </section>

      <footer className="lc-footer">
        <p>© {d.year} {d.fullName}</p>
        <p className="lc-credit">
          Fotoğraf: <a href="https://commons.wikimedia.org/w/index.php?curid=26129572" target="_blank" rel="noopener">“Istanbul skyline at night”</a>, Hakan Sarıtaş, CC BY 2.0, Wikimedia Commons.
        </p>
      </footer>
      <Reveal />
    </div>
  );
}
