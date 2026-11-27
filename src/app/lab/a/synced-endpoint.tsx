"use client";
import { useEffect, useRef } from "react";
import { ENDPOINTS, useEndpoint, type Endpoint } from "../_lib/live-endpoint";

/** Sabit ray: görünür bölümün data-endpoint değerine göre API yanıtını değiştirir. */
export function SyncedEndpoint() {
  const { active, result, run } = useEndpoint("profile");
  const current = useRef<Endpoint>("profile");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const ep = e.target.getAttribute("data-endpoint") as Endpoint | null;
          if (e.isIntersecting && ep && ep !== current.current) { current.current = ep; run(ep); }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll("[data-endpoint]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [run]);

  return (
    <div className="la-railIn">
      <p className="la-railNote">Bu sitenin kendi API&apos;si. Siz kaydırdıkça okuduğunuz bölümün verisi burada.</p>
      <div className="la-apiTabs" role="group" aria-label="Endpoint seçin">
        {ENDPOINTS.map((ep) => (
          <button key={ep} type="button" className="la-apiTab" aria-pressed={active === ep} onClick={() => { current.current = ep; run(ep); }}>
            /{ep}
          </button>
        ))}
      </div>
      <p className="la-apiMeta" aria-live="polite">GET /api/v1/{active} · {result ? `${result.status} · ${result.ms} ms` : "…"}</p>
      <pre key={active + (result?.body.length ?? 0)} className="la-apiPre la-railPre" tabIndex={0} data-lenis-prevent>
        <code>{result?.body ?? "İstek gönderiliyor…"}</code>
      </pre>
    </div>
  );
}
