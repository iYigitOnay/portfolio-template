import Link from "next/link";
import { VARIANTS } from "./_lib/variants";
import "./lab-index.css";

export default function LabIndex() {
  return (
    <div className={`lab-root li-page`}>
      <h1 className="li-title">Dört yeni yön.</h1>
      <p className="li-lead">
        Her seçenek, sitenin gerçek verisiyle çalışan tam bir ana sayfa. Hepsine göz atın, beğendiğinizi
        (ya da birinin rengini, ötekinin düzenini) söyleyin; o yönü ayrıntılandırıp siteye taşıyalım.
      </p>
      <ol className="li-list">
        {VARIANTS.map((v) => (
          <li key={v.id}>
            <Link href={`/lab/${v.id}`} className="li-item">
              <span className="li-letter" style={{ background: v.swatch[0], color: v.swatch[1] }}>{v.id.toUpperCase()}</span>
              <span className="li-text">
                <span className="li-name">{v.name}</span>
                <span className="li-line">{v.line}</span>
              </span>
              <span className="li-sw" aria-hidden>
                {v.swatch.map((c) => <i key={c} style={{ background: c }} />)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
