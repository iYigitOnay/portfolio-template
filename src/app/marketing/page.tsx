export default function homePage() {
  return (
    <main>
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Merhaba, ben Yiğit</h1>
        <p className="text-lg opacity-80">
          Bu şablon; tema ve içerik değiştirilerek farklı müşterilere hızla
          uyarlanır.
        </p>
        <nav className="flex gap-4 pt-4">
          <a className="underline" href="/projects">
            Projeler
          </a>
          <a className="underline" href="/about">
            Hakkımda
          </a>
          <a className="underline" href="/contact">
            İletişim
          </a>
        </nav>
      </section>
    </main>
  );
}
