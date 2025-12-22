import React from "react";
import {
  Database,
  Brain,
  Cloud,
  Terminal,
  Server,
  Code2,
  Cpu,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { Project, SkillCategory, BlogPost } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "tubitak-kadis",
    title: "KADİS",
    summary: "Konum Tabanlı Acil Kan Yardımı ve Donör eşleştirme Sistemi.",
    problem:
      "Acil Kan İhtiyaçlarında, açılan kan ihtiyacı bildirimlerinin hızlı ve doğru bir şekilde ilgili donörlere ulaşamaması.",
    solution:
      "KADİS ile konum tabanlı hizmet veren, gerçek zamanlı bildirim ve eşleştirme yapan bir mobil uygulama ve backend sistemi tasarladım.",
    techDetails: [
      "TÜBİTAK 2209-A Araştırma Projeleri Destekleme Programı tarafından fonlandı.",
      "Gerçek zamanlı konum takibi ve bildirim sistemi.",
      "GPS tabanlı hassas konum servisleri entegrasyonu.",
    ],
    backend: [
      "TypeScript/NodeJs",
      "Firebase Realtime DB",
      "OpenStreetMap API",
      "Android SDK",
    ],
    ai: ["Sensor Data Analysis", "Threshold Algorithms", "Event Detection"],
    architectureImageUrl: "../img/kadis.jpeg",
    githubUrl: "https://github.com/redusx/kadis",
  },
  {
    id: "tubitak-smart-room",
    title: "Akıllı Çocuk Odası",
    summary:
      "Bebek ve çocuk güvenliğini maksimize eden, sensör tabanlı IoT izleme ekosistemi.",
    problem:
      "Ebeveynlerin, çocuk odasındaki çevresel faktörleri (sıcaklık, gaz, nem) uzaktan ve sürekli takip etme konusundaki yetersizlikleri ve güvenlik açıkları.",
    solution:
      "Gömülü sistemler ve bulut mimarisini birleştirerek; anormallik durumunda ebeveyni uyaran, çevresel verileri analiz edip raporlayan bir 'Güvenli Alan' mimarisi kurguladım.",
    techDetails: [
      "Sensör verilerinin MQTT protokolü ile minimum gecikmeyle (low-latency) iletimi.",
      "Donanım ve yazılımın entegre çalıştığı uçtan uca (end-to-end) IoT çözümü.",
      "Akademik raporlama standartlarına uygun dokümantasyon.",
    ],
    backend: ["Kotlin/Python", "MQTT Broker", "Node.js", "Raspberry Pi"],
    ai: ["Anomaly Detection", "Time-series Analysis", "Automation Logic"],
    architectureImageUrl: "../img/tubitak.jpg",
    githubUrl: "https://github.com/iYigitOnay/SmartChildRoom",
  },
  {
    id: "maku-talk",
    title: "MAKUtalk",
    summary:
      "Üniversite öğrencileri için ölçeklenebilir, Yapay Zeka ile duygu ve etkinlik analizi yapan kampüs içi sosyal ağ platformu.",
    problem:
      "Kampüs içi iletişimin dağınık olması ve öğrencilerin bilgi paylaşımı yapabileceği, sadece üniversiteye özel güvenli bir dijital alanın eksikliği.",
    solution:
      "Yüksek trafikli veri akışını yönetebilen, gerçek zamanlı mesajlaşma ve içerik akışı sağlayan, mikroservis prensiplerine yakın ölçeklenebilir bir backend mimarisi tasarladım.",
    techDetails: [
      "WebSocket ile gerçek zamanlı (Real-time) veri iletimi.",
      "İlişkisel veritabanı tasarımı ve veri bütünlüğü (Data Integrity).",
      "Kimlik doğrulama ve oturum yönetimi güvenliği.",
    ],
    backend: ["Node.js ", "PostgreSQL", "Socket.io", "RESTful API"],
    ai: [
      "Content Filtering",
      "Recommendation Logic (Basic)",
      "User Behavior Analysis",
    ],
    architectureImageUrl: "../img/makutalk.png",
    githubUrl: "https://github.com/iYigitOnay/MAKUtalk",
  },
  {
    id: "mely-stories",
    title: "Mely: Grandmom Stories",
    summary:
      "Dil Öğrenmeye çalışan Çocuk ve Gençler için kişiselleştirilmiş masallar üreten Generative AI (Üretken Yapay Zeka) uygulaması.",
    problem:
      "Dil öğrenen çocukların ilgisini çekecek, onların seviyesine uygun ve yaratıcı hikayeler sunan interaktif bir platformun eksikliği.",
    solution:
      "LLM (Büyük Dil Modelleri) teknolojisini, özel 'Prompt Engineering' teknikleriyle eğiterek; kullanıcı girdilerine göre saniyeler içinde benzersiz ve öğretici masallar kurgulayan bir AI motoru geliştirdim.",
    techDetails: [
      "OpenAI API (veya benzeri LLM) entegrasyonu ve ince ayarı (Fine-tuning mantığı).",
      "Kullanıcı girdisini (Input) yaratıcı bir hikaye örgüsüne dönüştüren NLP katmanı.",
      "Modern ve kullanıcı dostu arayüz ile backend servislerinin orkestrasyonu.",
    ],
    backend: ["NodeJs", "FastAPI", "Cloud Functions", "Third-party AI APIs"],
    ai: [
      "Generative AI",
      "Natural Language Processing (NLP)",
      "Prompt Engineering",
      "Large Language Models",
    ],
    architectureImageUrl: "../img/melygrandmomstories.png",
    githubUrl: "https://github.com/iYigitOnay/MELYgrandmomstories",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Mühendislik & Backend",
    skills: [
      "Sistem Mimarisi",
      "Go (Golang)",
      "Python (FastAPI)",
      "Node.js",
      "PostgreSQL & NoSQL",
      "Docker",
      "gRPC",
      "Sql & NoSQL Tasarımı",
    ],
    icon: "Server",
  },
  {
    title: "Yapay Zeka & Veri",
    skills: [
      "Generative AI",
      "LM Integration",
      "NLP",
      "Computer Vision",
      "Vektör Veritabanları",
      "IoT AI",
      "Model Deployment",
    ],
    icon: "Brain",
  },
  {
    title: "Akademik & Ar-Ge",
    skills: [
      "TÜBİTAK Proje Yönetimi",
      "Bilimsel Araştırma",
      "IoT Sistem Tasarımı",
      "Microservices",
      "Problem Çözme",
      "Prototip Geliştirme",
      "Veri Analizi",
    ],
    icon: "Cloud",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "IoT ve AI Entegrasyonunda Ar-Ge Süreçleri",
    excerpt:
      "TÜBİTAK 2209-A projeleri üzerinden akademik standartlarda ürün geliştirme deneyimi.",
    date: "Ekim 2024",
    readTime: "10 min",
    category: "Ar-Ge"
  },
  {
    id: "2",
    title: "Üretken Yapay Zekayı Ürüne Dönüştürmek",
    excerpt:
      "Melygrandmomstories projesinde karşılaşılan teknik zorluklar ve çözüm yolları.",
    date: "Eylül 2024",
    readTime: "7 min",
    category: "AI Engineering",
  },
];
