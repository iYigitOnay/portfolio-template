import type { Metadata } from "next";
import "./globals.css";

import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { getSeo, getAbout } from "@/lib/server/content";
import { getTheme, themeToCssVars } from "@/lib/server/theme";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeo();
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getTheme();
  const cssVars = themeToCssVars(theme);
  const about = getAbout();

  return (
    <html lang="tr">
      <body className="min-h-dvh antialiased bg-[var(--color-bg)] text-[var(--color-fg)]">
        {/* Tema değişkenleri */}
        <style>{`:root{${cssVars}}`}</style>

        {/* Header’a ad ve sosyal linkleri gönderiyoruz */}
        <Header brandName={about.name} socials={about.social || []} />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
