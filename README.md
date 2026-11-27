# İhsan Yiğit Önay · Portfolyo

Admin panelli, dinamik portfolyo. Next.js 16 (App Router, Cache Components), Drizzle ORM + libSQL, kendi oturum sistemi.

## Çalıştırma

```bash
npm install
npm run db:push      # tabloları oluşturur
npm run db:seed      # örnek içerik (sıfırlamak için: npm run db:seed -- --force)
npm run dev          # http://localhost:3000  ·  panel: /admin
```

`.env.local` için `.env.example`'a bak. Şifre değiştirmek için:

```bash
npm run hash-password -- 'yeni-sifren'   # çıktıyı ADMIN_PASSWORD_HASH_B64 olarak yapıştır
```

## Mimari

- `src/db/schema.ts`: profile, posts, projects, skills, messages
- `src/lib/queries.ts`: herkese açık okumalar `'use cache'` + `cacheTag` ile önbellekli
- `src/app/admin/actions.ts`: tüm yazma işlemleri; her biri `requireAdmin()` + zod doğrulaması, ardından `updateTag()`
- `src/proxy.ts`: /admin için iyimser oturum kontrolü (asıl kontrol action'larda)
- `src/app/api/v1/[resource]`: herkese açık JSON API (profile, projects, posts, skills)
- Oturum: bcrypt + HS256 JWT, httpOnly cookie; giriş ve iletişim formunda hız sınırı

## Canlıya alma (Vercel)

SQLite dosyası serverless'ta kalıcı değildir; canlıda Turso (libSQL) kullan:
`DATABASE_URL=libsql://...`, `DATABASE_AUTH_TOKEN=...`. Görsel yüklemeleri için Vercel Blob bağla (`BLOB_READ_WRITE_TOKEN` varsa otomatik kullanılır).
