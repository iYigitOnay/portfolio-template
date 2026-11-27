"use client";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { login, type FormState } from "../actions";

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function LoginForm({ firstName, initials }: { firstName: string; initials: string }) {
  const next = useSearchParams().get("next") ?? "/admin";
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});
  const [step, setStep] = useState<"user" | "pass">("user");
  const [username, setUsername] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const passRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);

  // Hatalı denemede kartı salla ve şifreyi temizle.
  useEffect(() => {
    if (!state.error) return;
    setShakeKey((k) => k + 1); // eslint-disable-line react-hooks/set-state-in-effect
    if (passRef.current) { passRef.current.value = ""; passRef.current.focus(); }
  }, [state]);

  useEffect(() => {
    (step === "pass" ? passRef : userRef).current?.focus();
  }, [step]);

  return (
    <div className="login-card" data-step={step}>
      <div className="login-avatar" aria-hidden>{initials}</div>

      <div className="login-heads">
        <div className="login-head" data-show={step === "user"}>
          <h1>Panele giriş</h1>
          <p>Devam etmek için kullanıcı adını gir.</p>
        </div>
        <div className="login-head" data-show={step === "pass"}>
          <h1>Bu sen misin, {firstName}?</h1>
          <p>Kimliğini doğrulamak için şifreni gir.</p>
        </div>
      </div>

      <form
        action={action}
        className="login-form"
        onSubmit={(e) => {
          if (step === "user") {
            e.preventDefault();
            if (username.trim()) setStep("pass");
          }
        }}
      >
        <input type="hidden" name="next" value={next} />
        <input type="hidden" name="username" value={username} />

        {step === "user" ? (
          <div className="login-field">
            <input
              ref={userRef}
              aria-label="Kullanıcı adı"
              placeholder="Kullanıcı adı"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="login-go" aria-label="Devam" disabled={!username.trim()}><Arrow /></button>
          </div>
        ) : (
          <>
            <button type="button" className="login-chip" onClick={() => setStep("user")}>
              <span>{username}</span>
              <span className="login-chip-edit">Değiştir</span>
            </button>
            <div key={shakeKey} className={`login-field${shakeKey ? " shake" : ""}`}>
              <input
                ref={passRef}
                type="password"
                name="password"
                aria-label="Şifre"
                placeholder="Şifre"
                autoComplete="current-password"
                required
              />
              <button type="submit" className="login-go" aria-label="Giriş yap" disabled={pending}>
                {pending ? <span className="login-spin" /> : <Arrow />}
              </button>
            </div>
          </>
        )}
        <p className="login-error" role="alert">{step === "pass" ? state.error : ""}</p>
      </form>
    </div>
  );
}
