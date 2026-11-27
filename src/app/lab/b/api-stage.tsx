"use client";
import { useEffect, useRef } from "react";
import { ENDPOINTS, useEndpoint, type Endpoint } from "../_lib/live-endpoint";
import "./b.css";

/** Sabit sahne: hangi bölüm görünürse o bölümün API yanıtını gösterir. Sekmelerle elle de seçilebilir. */
export function ApiStage() {
  const { active, result, run } = useEndpoint("profile");
  const current = useRef<Endpoint>("profile");

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-endpoint]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const ep = e.target.getAttribute("data-endpoint") as Endpoint;
          if (ep && ep !== current.current) { current.current = ep; run(ep); }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [run]);

  return (
    <aside className="lb-stage" aria-label="Bu bölümün API yanıtı">
      <div className="lb-stageTabs" role="group" aria-label="Endpoint seçin">
        {ENDPOINTS.map((ep) => (
          <button key={ep} type="button" className="lb-stageTab" aria-pressed={active === ep} onClick={() => { current.current = ep; run(ep); }}>
            /{ep}
          </button>
        ))}
      </div>
      <p className="lb-stageMeta" aria-live="polite">
        <span>GET /api/v1/{active}</span>
        <span>{result ? `${result.status} · ${result.ms} ms` : "…"}</span>
      </p>
      <pre key={active + (result?.body.length ?? 0)} className="lb-stagePre" tabIndex={0} data-lenis-prevent>
        <code>{result?.body ?? "İstek gönderiliyor…"}</code>
      </pre>
      <p className="lb-stageNote">Sol tarafta okuduğunuz her şey, burada gördüğünüz yanıttan geliyor.</p>
    </aside>
  );
}
