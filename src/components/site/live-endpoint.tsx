"use client";
import { useCallback, useEffect, useState } from "react";

export const ENDPOINTS = ["profile", "projects", "skills", "posts"] as const;
export type Endpoint = (typeof ENDPOINTS)[number];
export type ApiResult = { status: number; ms: number; body: string };

/** Sitenin kendi API'sine istek atar; sonucu biçimlenmiş JSON olarak döner. */
export function useEndpoint(initial: Endpoint) {
  const [active, setActive] = useState<Endpoint>(initial);
  const [result, setResult] = useState<ApiResult | null>(null);
  const run = useCallback(async (ep: Endpoint) => {
    setActive(ep);
    const t0 = performance.now();
    try {
      const res = await fetch(`/api/v1/${ep}`);
      const json = await res.json();
      setResult({ status: res.status, ms: Math.round(performance.now() - t0), body: JSON.stringify(json.data ?? json, null, 2) });
    } catch {
      setResult({ status: 0, ms: 0, body: '{ "error": "İstek başarısız oldu" }' });
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    run(initial);
  }, [run, initial]);
  return { active, result, run };
}

type Cls = Partial<Record<"root" | "tabs" | "tab" | "meta" | "pre", string>>;

/** Görünümü tamamen dışarıdan gelen sınıflarla belirlenen canlı endpoint seçici. */
export function LiveEndpoint({ cls = {}, initial = "projects", maxLines }: { cls?: Cls; initial?: Endpoint; maxLines?: number }) {
  const { active, result, run } = useEndpoint(initial);
  const body = result?.body ?? "İstek gönderiliyor…";
  const shown = maxLines ? body.split("\n").slice(0, maxLines).join("\n") + (body.split("\n").length > maxLines ? "\n  …" : "") : body;
  return (
    <div className={cls.root}>
      <div className={cls.tabs} role="group" aria-label="Endpoint seçin">
        {ENDPOINTS.map((ep) => (
          <button key={ep} type="button" className={cls.tab} aria-pressed={active === ep} onClick={() => run(ep)}>
            /{ep}
          </button>
        ))}
      </div>
      <p className={cls.meta} aria-live="polite">
        GET /api/v1/{active} · {result ? `${result.status} · ${result.ms} ms` : "bekleniyor"}
      </p>
      <pre className={cls.pre} tabIndex={0} aria-label="API yanıtı" data-lenis-prevent>
        <code>{shown}</code>
      </pre>
    </div>
  );
}
