"use client";
import { useEffect, useState } from "react";

export const ACCENTS = [
  { id: "navy", name: "Lacivert", sw: "#1b2f6b" },
  { id: "royal", name: "Royal mavi", sw: "#2445d6" },
] as const;

export const LAYOUTS = [
  { id: "notlar", name: "Kenar notları" },
  { id: "ray", name: "Sabit API rayı" },
] as const;

const KEY = "lab-a-options-v2";

/** Lab'a özgü seçim paneli: vurgu rengi ve sağ taraf düzeni. Tema navbar'daki düğmeyle değişir. */
export function AOptions() {
  const [accent, setAccent] = useState("navy");
  const [layout, setLayout] = useState("notlar");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) ?? "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (s?.accent) setAccent(s.accent);
      if (s?.layout) setLayout(s.layout);
    } catch {}
    if (innerWidth < 900) setOpen(false);
    const q = new URLSearchParams(location.search);
    if (q.get("accent")) setAccent(q.get("accent")!);
    if (q.get("l")) setLayout(q.get("l")!);
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".la-page");
    if (root) { root.dataset.accent = accent; root.dataset.layout = layout; }
    try { localStorage.setItem(KEY, JSON.stringify({ accent, layout })); } catch {}
  }, [accent, layout]);

  return (
    <div className="la-opts" data-open={open}>
      <button type="button" className="la-opts-toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? "Paneli gizle" : "Seçenekler"}
      </button>
      {open ? (
        <>
          <p className="la-opts-title">Vurgu rengi (grafit üzerinde)</p>
          <div className="la-opts-row" role="radiogroup" aria-label="Vurgu rengi">
            {ACCENTS.map((x) => (
              <button key={x.id} type="button" role="radio" aria-checked={accent === x.id} className="la-opts-chip" onClick={() => setAccent(x.id)}>
                <i style={{ background: x.sw }} /> {x.name}
              </button>
            ))}
          </div>
          <p className="la-opts-title">Sağ taraf</p>
          <div className="la-opts-row" role="radiogroup" aria-label="Sağ taraf düzeni">
            {LAYOUTS.map((x) => (
              <button key={x.id} type="button" role="radio" aria-checked={layout === x.id} className="la-opts-chip" onClick={() => setLayout(x.id)}>
                {x.name}
              </button>
            ))}
          </div>
          <p className="la-opts-name">Açık/koyu tema: navbar&apos;daki güneş/ay düğmesi.</p>
        </>
      ) : null}
    </div>
  );
}
