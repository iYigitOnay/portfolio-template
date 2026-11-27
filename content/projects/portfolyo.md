---
title: Bu site
kind: Next.js · Statik site
year: 2026
period: 2026
order: 4
summary: İçeriği Markdown dosyalarından üretilen, herkese açık JSON API'si olan statik portfolyo.
stack: Next.js, TypeScript
repo:
live:
cover:
---

## Mimari

Next.js App Router ile her sayfa derleme sırasında üretilir; veritabanı yok. Projeler ve yazılar repodaki Markdown dosyalarından okunur, içerik değiştikçe site yeniden yayınlanır. `/api/v1/*` uçları da aynı dosyalardan derleme sırasında üretilen JSON yanıtlarıdır.
