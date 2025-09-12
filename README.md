cat > README.md << 'EOF'

# Portfolio Website – İhsan Yiğit Önay

🚀 Kendi portfolyo sitem. Next.js 14 (App Router) ve TailwindCSS ile geliştirdim.  
Projelerim, deneyimlerim, yeteneklerim ve iletişim formu üzerinden bana ulaşabileceğiniz bir alan sunar.

## ✨ Özellikler

- **Modern UI** – TailwindCSS + responsive tasarım
- **Bölüm Kaydırma** – Tek sayfalık (scroll) yapı: Hakkımda, Yetenekler, Deneyim, Projeler, İletişim
- **Proje Kartları** – Kapak görseli, açıklama, kullanılan teknolojiler, GitHub & canlı linkler
- **İletişim Formu** – Nodemailer ile doğrudan mail gönderme
- **Referanslar** – Çalıştığım kişilerden referans bölümü
- **Tema** – Royal Blue / Navy Blue odaklı, soft border efektleri

## 🛠️ Teknolojiler

- [Next.js 14](https://nextjs.org/) – App Router
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Nodemailer](https://nodemailer.com/) – Mail gönderimi
- Vercel (deploy)

## 📂 Proje Yapısı

src/
├─ app/ # Next.js app router sayfaları
├─ components/ # Bölüm bileşenleri (Hero, About, Projects, Contact ...)
├─ lib/server/ # JSON içeriği okuyucu
├─ brands/default/ # İçerik dosyaları (about.json, projects.json ...)
└─ public/ # Görseller (logo, kapak resimleri, avatarlar)

## 🚀 Çalıştırma

Projeyi lokalde çalıştırmak için:

```bash
git clone https://github.com/iYigitOnay/portfolio-template.git
cd portfolio-template
npm install
npm run dev

Varsayılan olarak http://localhost:3000 adresinde açılır.

🌐 Canlı Demo

👉 portfolio-template.vercel.app

📬 İletişim

E-posta: info@example.com

LinkedIn: linkedin.com/in/iyigitonay

GitHub: github.com/iYigitOnay

EOF
```

---

### ✅ Sonrasında

1. Dosyanın oluştuğunu kontrol et:
   ```bash
   type README.md   # (Windows PowerShell)
   # veya
   cat README.md    # (Git Bash / Linux / macOS)
   ```
