import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../src/db/schema";

const client = createClient({
  url: process.env.DATABASE_URL ?? "file:local.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const db = drizzle(client, { schema });

const force = process.argv.includes("--force");
const existing = await db.query.profile.findFirst();
if (existing && !force) {
  console.log("Veritabanı zaten dolu. Sıfırlamak için: npm run db:seed -- --force");
  process.exit(0);
}

await db.delete(schema.posts);
await db.delete(schema.projects);
await db.delete(schema.skills);
await db.delete(schema.profile);

await db.insert(schema.profile).values({
  id: 1,
  firstName: "İhsan Yiğit",
  lastName: "Önay",
  role: "Backend geliştirici (TypeScript/NestJS odaklı)",
  heroSentence:
    "Yazılım Mühendisliği 4. sınıf öğrencisiyim. TypeScript ve NestJS ile backend geliştiriyor; yapay zekâ entegrasyonu ve temiz mimariyle ilgileniyorum.",
  bio:
    "Burdur Mehmet Akif Ersoy Üniversitesi'nde 4. sınıf ==Yazılım Mühendisliği== öğrencisiyim (Eyl 2023 – Haz 2027). ==TypeScript ve NestJS== ile backend geliştiriyorum. Temmuz 2026'dan beri ==Univenn=='de uzun dönem stajyer olarak, yapay zekâ destekli ve MCP bağlantılı web ve mobil uygulamalar geliştiriyorum. LLM entegrasyonu (LangChain, RAG, MCP) ve temiz mimariyle ilgileniyorum. Java/Spring Boot bilgim temel seviyede. ==Junior backend ve staj pozisyonları için görüşmelere açığım.==",
  location: "İstanbul, Türkiye",
  email: "ihsanyigitonay@gmail.com",
  github: "https://github.com/iYigitOnay",
  linkedin: "https://www.linkedin.com/in/ihsan-yigit-onay",
  writingLead: "",
  footerInvite: "Ekibinize katılmaya hazırım.",
  available: true,
});

await db.insert(schema.projects).values([
  {
    slug: "atelia",
    title: "Atelia: Yapay Zekâ ile İçerik Üretim Atölyesi",
    kind: "Yapay zekâ platformu",
    year: 2026,
    period: "2026",
    summary:
      "Bağlanan Instagram ve TikTok hesaplarının stiline göre seslendirilmiş Reels videoları üreten bir yapay zekâ platformu.",
    content:
      "## Ne yapıyor\n\nBağlanan Instagram ve TikTok hesaplarının stiline göre seslendirilmiş Reels videoları üreten bir yapay zekâ platformu.\n\n## Nasıl çalışıyor\n\n- ElevenLabs ile seslendirme ve yapay zekâ API'leriyle video üretimi, uçtan uca çalışan bir üretim hattında.\n- Next.js (App Router) ile tanıtım sayfası, kimlik doğrulama, üretim paneli ve marka token'larına dayalı tasarım sistemi.",
    stack: "Next.js 16, TypeScript, ElevenLabs",
    sortOrder: 0,
  },
  {
    slug: "makutalk",
    title: "MAKUtalk",
    kind: "Bitirme projesi",
    year: 2026,
    period: "2024 – 2026",
    summary:
      "MAKÜ öğrencileri için üniversite e-postasıyla (OTP) doğrulama yapılan; gönderi, takip ve ikinci el pazaryeri özellikleri içeren kampüs içi sosyal platform.",
    content:
      "## Ne yapıyor\n\nMAKÜ öğrencileri için üniversite e-postasıyla (OTP) doğrulama yapılan; gönderi, takip ve ikinci el pazaryeri özellikleri içeren kampüs içi sosyal platform.\n\n## Öne çıkanlar\n\n- Gönderilerde Gemini API ile duygu analizi ve kategorizasyon; Socket.io ile gerçek zamanlı mesajlaşma.\n- JWT ve rate limiting; Docker Compose ve Nginx ile VPS üzerinde canlıda.",
    stack: "Vue 3, NestJS, Prisma, PostgreSQL, Socket.io, Docker",
    repoUrl: "https://github.com/iYigitOnay/MAKUtalk",
    sortOrder: 1,
  },
  {
    slug: "kadis",
    title: "KADIS: Kan Bağışçısı İletişim Sistemi",
    kind: "Mobil uygulama ve backend",
    year: 2025,
    period: "2025 – Günümüz",
    summary: "Kan bağışçılarını ihtiyaç sahibi hastalarla buluşturan mobil uygulama ve backend.",
    content:
      "## Ne yapıyor\n\nKan bağışçılarını ihtiyaç sahibi hastalarla buluşturan mobil uygulama ve backend.\n\n## Öne çıkanlar\n\n- NestJS backend'inde Firebase ile kimlik doğrulama modülü; Docker ve GitHub Actions ile CI hattı.\n\nGeliştirme sürüyor.",
    stack: "NestJS, Flutter, Firebase, Docker, GitHub Actions",
    sortOrder: 2,
  },
  {
    slug: "portfolyo-cms",
    title: "Bu site",
    kind: "Full-stack · Next.js",
    year: 2026,
    period: "2026",
    summary: "Kendi admin paneli, oturum yönetimi ve herkese açık JSON API'si olan portfolyo.",
    content:
      "## Mimari\n\nNext.js App Router, Server Actions, Drizzle ORM ve libSQL. Herkese açık içerik önbellekte tutulur, panelden yapılan her değişiklik ilgili etiketi geçersiz kılar.",
    stack: "Next.js, TypeScript, Drizzle, libSQL",
    sortOrder: 3,
  },
]);

const skillGroups: [string, string[]][] = [
  ["Diller", ["TypeScript/JavaScript", "Python", "SQL", "HTML/CSS", "Java (temel)"]],
  ["Backend", ["NestJS", "Node.js", "REST API tasarımı", "JWT", "OAuth2", "Spring Boot (temel)"]],
  ["Frontend", ["Next.js", "React", "Vue 3", "Angular", "Tailwind CSS"]],
  ["Mobil", ["SwiftUI (iOS)", "Flutter"]],
  ["Veritabanı", ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "Prisma"]],
  ["Yapay Zekâ", ["LangChain", "RAG", "MCP", "Gemini API", "Araç tabanlı ajan entegrasyonu"]],
  ["DevOps & Araçlar", ["Docker", "Docker Compose", "Nginx", "GitHub Actions", "GitLab CI/CD", "Kubernetes", "Postman"]],
];
let order = 0;
await db.insert(schema.skills).values(
  skillGroups.flatMap(([category, names]) =>
    names.map((name) => ({ name, category, level: "", since: null, sortOrder: order++ })),
  ),
);

// Henüz yayınlanmış yazı yok; yazılar admin panelinden eklenir.

console.log("Seed tamamlandı.");
