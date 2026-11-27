import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Apple cihazlarda SF Pro kullanılır; diğerlerinde Inter devreye girer.
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: { default: "İhsan Yiğit Önay · Backend geliştirici", template: "%s · İhsan Yiğit Önay" },
  description: "Yazılım Mühendisliği öğrencisi, TypeScript ve NestJS odaklı backend geliştirici. Projeler, deneyim ve yetenekler.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f11" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "var d=document.documentElement;d.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.style.setProperty('--dp','0')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
