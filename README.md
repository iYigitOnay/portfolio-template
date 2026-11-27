# İhsan Yiğit Önay · Portfolyo

Veritabanı olmayan, içeriği repodaki dosyalardan derlenen portfolyo. Next.js 16 (App Router, Cache Components).
Her sayfa derleme sırasında üretilir; içerik değişince `main`'e push etmek yeterli, site kendiliğinden yeniden yayınlanır.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
```

Kontroller: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e` (dev sunucusu açıkken).

## İçerik nerede

| Ne | Dosya |
| --- | --- |
| Profil, hakkımda, iletişim linkleri, yetenekler, deneyim, eğitim, diller, CV linkleri | `src/content/profile.ts` |
| Projeler (her biri bir dosya, adı adres olur) | `content/projects/*.md` |
| Yazılar (her biri bir dosya, adı adres olur) | `content/posts/*.md` |
| CV dosyaları | `public/cv/` |

### Yeni yazı

1. `content/posts/_ornek.md` dosyasını kopyala, adını `yazinin-adresi.md` yap.
2. Üstteki bilgileri doldur, `draft: true` satırını sil.
3. Commit edip `main`'e push et. Yazılar bölümü ve menüdeki link ilk yazıyla birlikte kendiliğinden görünür.

Adı `_` ile başlayan dosyalar ve `draft: true` olanlar yayınlanmaz.

### Proje dosyasının üst bilgisi

```yaml
---
title: Proje adı
kind: Bitirme projesi
year: 2026            # sıralamada ve dönem boşsa gösterilir
period: 2024 – 2026   # görünen dönem
order: 1              # küçük olan önce
summary: Listede görünen tek cümle.
stack: NestJS, PostgreSQL, Docker
repo: https://github.com/...   # boş bırakılırsa link gösterilmez
live:
cover:                          # /projeler/kapak.jpg gibi public/ altındaki bir yol ya da tam URL
---
```

## Mimari

- `src/lib/queries.ts`: içerik dosyalarını okur; sonuçlar `'use cache'` ile derlemede sabitlenir.
- `src/app/api/v1/[resource]`: herkese açık JSON API (profile, projects, posts, skills), derlemede üretilir.
- İletişim formu sunucuya bir şey göndermez; ziyaretçinin e-posta uygulamasını mesaj doldurulmuş hâlde açar.

## CI/CD

`.github/workflows/ci-cd.yml`:

- **Her push ve PR:** `npm ci`, lint, tip kontrolü, build.
- **`main`'e push:** kontroller geçerse Vercel'e canlı deploy.
- **PR:** kontroller geçerse önizleme deploy'u; adres PR'a yorum olarak yazılır.

Vercel'in kendi Git deploy'ları `vercel.json` ile kapalı; deploy yalnızca bu iş akışından, kontroller geçince yapılır.

Repo secret'ları (Settings → Secrets and variables → Actions):

| Secret | Nereden |
| --- | --- |
| `VERCEL_TOKEN` | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | `vercel link` sonrası `.vercel/project.json` içindeki `orgId` |
| `VERCEL_PROJECT_ID` | aynı dosyadaki `projectId` |

Vercel projesinde ortam değişkeni olarak `SITE_URL=https://alanadin.com` tanımla.
