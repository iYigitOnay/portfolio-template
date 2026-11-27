/* eslint-disable @next/next/no-img-element */
import { STIX_Two_Text } from "next/font/google";
import Link from "next/link";
import { sized } from "@/lib/image";
import { LabContactForm } from "../_lib/contact-form";
import { Reveal } from "../_lib/reveal";
import { getLabData } from "../_lib/data";
import { ApiStage } from "./api-stage";
import "./b.css";

const stix = STIX_Two_Text({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], weight: ["400", "600"], display: "swap" });

export default async function VariantB() {
  const d = await getLabData();
  const { profile } = d;
  const [lead, ...restBio] = d.bio.split(/(?<=\.)\s+/);

  return (
    <div className={`lab-root lb-page ${stix.className}`}>
      <div className="lb-flow">
        <header className="lb-bar">
          <Link href="/lab/b" className="lb-mark">{d.fullName}</Link>
          <nav className="lb-links" aria-label="Bölümler">
            <a href="#isler">İşler</a>
            <a href="#araclar">Araçlar</a>
            <a href="#yazilar">Yazılar</a>
          </nav>
        </header>

        <section className="lb-hero" data-endpoint="profile">
          <h1 className="lb-h1" data-r>Sunucu tarafını yazarım.</h1>
          <p className="lb-lead" data-r style={{ ["--d" as string]: 1 }}>{d.fullName}. {profile.heroSentence}</p>
          <div className="lb-actions" data-r style={{ ["--d" as string]: 2 }}>
            <a href="#iletisim" className="lb-btn">Benimle görüşün</a>
            <a href="/cv.pdf" download className="lb-link">CV indir</a>
          </div>
          <p className="lb-hint" data-r style={{ ["--d" as string]: 3 }}>
            Sağdaki pano bu sitenin canlı API&apos;si. Siz aşağı indikçe, okuduğunuz bölümün verisini gösterir.
          </p>
        </section>

        <section className="lb-section" data-endpoint="profile" aria-labelledby="b-hakkimda">
          <h2 id="b-hakkimda" className="lb-h2" data-r>Hakkımda</h2>
          <p className="lb-statement" data-r>{lead}</p>
          <p className="lb-body" data-r>{restBio.join(" ")}</p>
        </section>

        <section className="lb-section" id="isler" data-endpoint="projects" aria-labelledby="b-isler">
          <h2 id="b-isler" className="lb-h2" data-r>Seçili işler</h2>
          <ul className="lb-works">
            {d.projects.map((p, i) => (
              <li key={p.id} data-r style={{ ["--d" as string]: i % 3 }}>
                <Link href={p.href} className="lb-work">
                  {p.coverUrl ? <img src={sized(p.coverUrl, 900, 600)} alt="" width={900} height={600} loading="lazy" className="lb-workPic" /> : null}
                  <span className="lb-workTitle">{p.title}</span>
                  <span className="lb-workMeta">{p.kind} · {p.year}</span>
                  <span className="lb-body">{p.summary}</span>
                  <span className="lb-workStack">{p.stackList.join(", ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={`lb-section lb-figures`} data-endpoint="projects" aria-label="Rakamlarla">
          {[
            { n: d.projects.length, t: "yayında proje" },
            { n: d.skills.length, t: "araç ve teknoloji" },
            { n: d.posts.length, t: "teknik yazı" },
            ...(d.yearsCoding ? [{ n: `${d.yearsCoding}+`, t: "yıldır kod yazıyorum" }] : []),
          ].map((f, i) => (
            <div key={f.t} className="lb-fig" data-r style={{ ["--d" as string]: i }}>
              <span className="lb-figN">{f.n}</span>
              <span>{f.t}</span>
            </div>
          ))}
        </section>

        <section className="lb-section" id="araclar" data-endpoint="skills" aria-labelledby="b-araclar">
          <h2 id="b-araclar" className="lb-h2" data-r>Araç kutusu</h2>
          {d.skillGroups.map(([cat, items]) => (
            <div key={cat} className="lb-group" data-r>
              <h3 className="lb-h3">{cat}</h3>
              <p className="lb-skillLine">
                {items.map((sk, i) => (
                  <span key={sk.id}>
                    {sk.name}{sk.since ? <small> ({sk.since})</small> : null}{i < items.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </section>

        {d.posts.length ? (
          <section className="lb-section" id="yazilar" data-endpoint="posts" aria-labelledby="b-yazilar">
            <h2 id="b-yazilar" className="lb-h2" data-r>Yazılar</h2>
            <p className="lb-body" data-r>{profile.writingLead}</p>
            <ol className="lb-posts">
              {d.posts.slice(0, 6).map((p) => (
                <li key={p.id} data-r>
                  <Link href={p.href} className="lb-post">
                    <span className="lb-postTitle">{p.title}</span>
                    <span className="lb-workMeta">{p.date} · {p.minutes} dk · {p.tag}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className={`lb-section lb-contact`} id="iletisim" data-endpoint="profile" aria-labelledby="b-iletisim">
          <h2 id="b-iletisim" className="lb-h2" data-r>{profile.footerInvite || "Ekibinize katılmaya hazırım."}</h2>
          {profile.email ? <a href={`mailto:${profile.email}`} className="lb-email" data-r>{profile.email}</a> : null}
          <div data-r>
            <LabContactForm cls={{ form: "lb-form", field: "lb-field", label: "lb-label", input: "lb-input", row: "lb-formRow", note: "lb-note", button: "lb-btn" }} />
          </div>
        </section>

        <footer className="lb-footer">
          <span>© {d.year} {d.fullName}</span>
          <span>
            {profile.github ? <a href={profile.github} target="_blank" rel="noopener" className="lb-link">GitHub</a> : null}
            {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noopener" className="lb-link">LinkedIn</a> : null}
          </span>
        </footer>
      </div>

      <ApiStage />
      <Reveal />
    </div>
  );
}
