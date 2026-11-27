import "server-only";

// Basit sabit pencereli sınırlayıcı. Instance başına bellekte tutulur;
// çoklu instance için Redis/Upstash gibi paylaşılan bir depoya taşınmalı.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterMs: 0 };
  }
  bucket.count += 1;
  return bucket.count > limit
    ? { ok: false, retryAfterMs: bucket.resetAt - now }
    : { ok: true, retryAfterMs: 0 };
}
