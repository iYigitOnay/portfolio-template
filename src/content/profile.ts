/**
 * Sitenin profil içeriği. Projeler `content/projects/*.md`, yazılar `content/posts/*.md`
 * dosyalarındadır. Değiştirip push edince site yeniden yayınlanır.
 */

export const profile = {
  firstName: "İhsan Yiğit",
  lastName: "Önay",
  role: "Backend geliştirici (TypeScript/NestJS odaklı)",
  heroSentence:
    "Yazılım Mühendisliği 4. sınıf öğrencisiyim. TypeScript ve NestJS ile backend geliştiriyor; yapay zekâ entegrasyonu ve temiz mimariyle ilgileniyorum.",
  bio: "Burdur Mehmet Akif Ersoy Üniversitesi'nde 4. sınıf Yazılım Mühendisliği öğrencisiyim (Eyl 2023 – Haz 2027). TypeScript ve NestJS ile backend geliştiriyorum. Temmuz 2026'dan beri Univenn'de uzun dönem stajyer olarak, yapay zekâ destekli ve MCP bağlantılı web ve mobil uygulamalar geliştiriyorum. LLM entegrasyonu (LangChain, RAG, MCP) ve temiz mimariyle ilgileniyorum. Java/Spring Boot bilgim temel seviyede. Junior backend ve staj pozisyonları için görüşmelere açığım.",
  location: "İstanbul, Türkiye",
  email: "ihsanyigitonay@gmail.com",
  github: "https://github.com/iYigitOnay",
  linkedin: "https://www.linkedin.com/in/ihsan-yigit-onay",
  /** Yazılar sayfasının giriş cümlesi; boşsa gösterilmez. */
  writingLead: "",
  footerInvite: "Ekibinize katılmaya hazırım.",
  /** false yaparsan "görüşmelere açık" ifadeleri kalkar. */
  available: true,
};

export const skillGroups: [category: string, names: string[]][] = [
  ["Diller", ["TypeScript/JavaScript", "Python", "SQL", "HTML/CSS", "Java (temel)"]],
  ["Backend", ["NestJS", "Node.js", "REST API tasarımı", "JWT", "OAuth2", "Spring Boot (temel)"]],
  ["Frontend", ["Next.js", "React", "Vue 3", "Angular", "Tailwind CSS"]],
  ["Mobil", ["SwiftUI (iOS)", "Flutter"]],
  ["Veritabanı", ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "Prisma"]],
  ["Yapay Zekâ", ["LangChain", "RAG", "MCP", "Gemini API", "Araç tabanlı ajan entegrasyonu"]],
  ["DevOps & Araçlar", ["Docker", "Docker Compose", "Nginx", "GitHub Actions", "GitLab CI/CD", "Kubernetes", "Postman"]],
];

export const focus = "API tasarımı, yapay zekâ entegrasyonu (LLM, MCP), temiz mimari";
export const statusLine = "Junior backend ve staj pozisyonları için görüşmelere açık";
export const graduation = "Mezuniyet: Haziran 2027";

export const cvLinks = [
  { href: "/cv/ihsanyigitonay_tr.pdf", label: "CV indir (PDF)", short: "CV (TR)", lang: "tr" },
  { href: "/cv/ihsanyigitonay_en.pdf", label: "CV in English (PDF)", short: "CV (EN)", lang: "en" },
] as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  place: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Univenn",
    role: "Yazılım Mühendisi Stajyeri (Uzun Dönem)",
    period: "Tem 2026 – Günümüz",
    place: "İzmir (Hibrit)",
    points: [
      "Yaz stajında (Tem – Ağu 2026) OSI modeli katmanlarını inceleyip şirket içi teknik sunum hazırladım; staj sonunda uzun dönem stajyer olarak devam etmem teklif edildi.",
      "Univenn bünyesindeki girişimler için TypeScript ve NestJS ile yapay zekâ destekli, MCP bağlantılı web ve mobil uygulamalar geliştiriyorum.",
      "Bu kapsamda, 3B kelime haritasıyla İngilizce öğreten iOS uygulaması Constel'i SwiftUI ve Supabase ile geliştiriyorum; veritabanı şemasını migration'lar ve RLS kurallarıyla tasarladım.",
      "HrPanda'da MCP ve GitHub PR akışı içeren iç araç HrPanda Design'ı geliştirdim; pazarlama ekibinin TrendBot web arayüzünü yeniledim ve Slack botunu optimize ettim.",
    ],
  },
  {
    company: "Bionluk",
    role: "Serbest (Freelance) Yazılım Geliştirici",
    period: "2023 – Günümüz",
    place: "Uzaktan",
    points: [
      "Bionluk üzerinden müşterilere backend ve web geliştirme işleri teslim ettim; ihtiyaç analizinden teslimata kadar süreci tek başıma yürüttüm.",
    ],
  },
];

export const education = {
  school: "Burdur Mehmet Akif Ersoy Üniversitesi",
  degree: "Yazılım Mühendisliği (Lisans)",
  period: "Eyl 2023 – Haz 2027 (beklenen)",
};

export const languages = [
  { name: "Türkçe", level: "Ana dil" },
  { name: "İngilizce", level: "B1 (Orta)" },
  { name: "Fransızca", level: "A1 (Başlangıç)" },
];
