// src/app/(marketing)/contact/page.tsx
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">İletişim</h1>
      <p className="mt-4 opacity-80">
        E-posta:{" "}
        <a className="underline" href="mailto:info@example.com">
          info@example.com
        </a>
      </p>
    </main>
  );
}
