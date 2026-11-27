export function splitList(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function formatDate(date: Date | null | undefined) {
  if (!date) return "";
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export function readingMinutes(markdown: string) {
  return Math.max(1, Math.round(markdown.split(/\s+/).length / 200));
}

export function slugify(input: string) {
  const map: Record<string, string> = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u" };
  return input
    .trim()
    .replace(/[çğıİöşü]/gi, (c) => map[c] ?? map[c.toLowerCase()] ?? c)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
