// src/lib/server/theme.ts
import { getBrand } from "./brand";
import { readJson } from "./fs-utils";

export type Theme = {
  name: string;
  colors: {
    primary: string;
    bg: string;
    fg: string;
    muted?: string;
    card?: string;
    border?: string;
  };
  typography: { fontFamily: string; roundness: number };
  logo: { light?: string; dark?: string };
};

export function getTheme(): Theme {
  const brand = getBrand();
  return readJson<Theme>("brands", brand, "theme.json");
}

// CSS değişkeni string’i üretir: "--color-primary:#6B4DE6;--color-bg:#fff;..."
export function themeToCssVars(theme: Theme) {
  const vars = {
    "--color-primary": theme.colors.primary,
    "--color-bg": theme.colors.bg,
    "--color-fg": theme.colors.fg,
    "--color-muted": theme.colors.muted ?? "#6b7280",
    "--color-card": theme.colors.card ?? "#f8fafc",
    "--color-border": theme.colors.border ?? "#e5e7eb",
    "--radius": `${theme.typography.roundness}px`,
    "--font-family": theme.typography.fontFamily,
  } as const;

  return Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}
