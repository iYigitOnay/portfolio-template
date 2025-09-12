// src/lib/server/brand.ts
export function getBrand() {
  return process.env.BRAND?.trim() || "default";
}
