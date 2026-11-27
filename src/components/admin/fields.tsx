"use client";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Field({
  label, name, defaultValue, error, hint, type = "text", required, placeholder,
}: {
  label: string; name: string; defaultValue?: string | number | null; error?: string; hint?: string;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="a-label" htmlFor={name}>{label}</label>
      <input className="a-input" id={name} name={name} type={type} defaultValue={defaultValue ?? ""} required={required} placeholder={placeholder} aria-invalid={!!error} />
      {error ? <p className="a-error">{error}</p> : hint ? <p className="a-hint">{hint}</p> : null}
    </div>
  );
}

export function TextArea({
  label, name, defaultValue, error, hint, rows = 3,
}: { label: string; name: string; defaultValue?: string; error?: string; hint?: string; rows?: number }) {
  return (
    <div>
      <label className="a-label" htmlFor={name}>{label}</label>
      <textarea className="a-input" id={name} name={name} rows={rows} defaultValue={defaultValue} aria-invalid={!!error} />
      {error ? <p className="a-error">{error}</p> : hint ? <p className="a-hint">{hint}</p> : null}
    </div>
  );
}

export function Toggle({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 select-none">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="size-4 accent-[var(--ink)]" />
      {label}
    </label>
  );
}

async function upload(file: File) {
  const body = new FormData();
  body.set("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Yükleme başarısız");
  return json.url as string;
}

/** Görsel URL alanı + yükleme düğmesi + önizleme. */
export function ImageField({ label, name, defaultValue, error }: { label: string; name: string; defaultValue?: string; error?: string }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<string | null>(null);
  return (
    <div>
      <label className="a-label" htmlFor={name}>{label}</label>
      <div className="flex gap-2">
        <input className="a-input" id={name} name={name} value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://… veya yükle" />
        <label className="a-btn a-btn-ghost cursor-pointer">
          Yükle
          <input
            type="file" accept="image/*" className="sr-only"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setStatus("Yükleniyor…");
              try { setValue(await upload(f)); setStatus(null); } catch (err) { setStatus((err as Error).message); }
            }}
          />
        </label>
      </div>
      {status ? <p className="a-hint">{status}</p> : null}
      {error ? <p className="a-error">{error}</p> : null}
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-3 aspect-[4/3] w-48 rounded-md object-cover" />
      ) : null}
    </div>
  );
}

/** Yaz / Önizle sekmeli Markdown editörü; görsel sürükle-bırak ile yüklenir. */
export function MarkdownEditor({ name, defaultValue, label = "İçerik" }: { name: string; defaultValue?: string; label?: string }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);

  function insert(text: string) {
    const el = ref.current;
    if (!el) return setValue((v) => v + text);
    const { selectionStart: s, selectionEnd: e } = el;
    setValue((v) => v.slice(0, s) + text + v.slice(e));
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="a-label mb-0">{label}</span>
        <div className="flex gap-1 rounded-lg bg-neutral-200 p-1 text-sm" role="tablist">
          {(["write", "preview"] as const).map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1 ${tab === t ? "bg-white shadow-sm" : "text-neutral-600"}`}>
              {t === "write" ? "Yaz" : "Önizle"}
            </button>
          ))}
        </div>
      </div>
      <input type="hidden" name={name} value={value} />
      {tab === "write" ? (
        <textarea
          ref={ref}
          className="a-input min-h-[460px] font-mono text-[14px]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onDrop={async (e) => {
            const f = e.dataTransfer.files?.[0];
            if (!f?.type.startsWith("image/")) return;
            e.preventDefault();
            try { insert(`\n![](${await upload(f)})\n`); } catch (err) { alert((err as Error).message); }
          }}
          placeholder={"## Başlık\n\nMarkdown yazabilirsin. Görsel eklemek için sürükleyip bırak."}
        />
      ) : (
        <div className="a-input min-h-[460px] overflow-auto bg-[var(--bg)] p-6">
          <div className="prose max-w-[680px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value || "_Boş_"}</ReactMarkdown>
          </div>
        </div>
      )}
      <p className="a-hint">Markdown destekli: başlıklar, listeler, kod blokları, tablolar, bağlantılar.</p>
    </div>
  );
}

export function FormMessage({ state }: { state: { ok?: boolean; error?: string } }) {
  if (state.error) return <p className="a-error text-sm" role="alert">{state.error}</p>;
  if (state.ok) return <p className="text-sm text-green-700" role="status">Kaydedildi</p>;
  return null;
}
