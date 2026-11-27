import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // İçerik dosyaları derlemede okunur; sunucu fonksiyonlarına da dahil olsun.
  outputFileTracingIncludes: { "/**": ["./content/**/*"] },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
