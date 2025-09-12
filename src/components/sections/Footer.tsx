// src/components/sections/Footer.tsx
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 text-center text-sm opacity-70 border-t mt-16">
      © {year} Portfolio Template — Tüm hakları saklıdır.
    </footer>
  );
}
