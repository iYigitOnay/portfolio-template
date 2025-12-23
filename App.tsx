import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import Hero from "./components/TerminalHero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import AIPlayground from "./components/AIPlayground";

import {
  Mail,
  ArrowUpRight,
  Globe2,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-blue-600 selection:text-white">
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      <main>
        <Hero />

        {/* About Section - Optimized for clarity */}
        <section className="max-w-6xl mx-auto px-6 mb-32 -mt-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-blue-50 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-blue-100/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-transparent" />

            <div className="max-w-4xl space-y-12 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-600 font-bold tracking-widest text-[10px] uppercase">
                  <ShieldCheck className="w-4 h-4" /> Mühendislik Yaklaşımı
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1]">
                  Kodu çözümle değil,{" "}
                  <span className="blue-gradient-text">mimariyle</span>{" "}
                  kurgulamak.
                </h3>
              </div>

              <div className="grid md:grid-cols-5 gap-12 items-start">
                <div className="md:col-span-3 space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                  <p>
                    Mehmet Akif Ersoy Üniversitesi Yazılım Mühendisliği 3. sınıf
                    öğrencisi olarak, backend sistemlerinin omurgasını ve yapay
                    zekanın yaratıcı gücünü birleştiren projelere odaklanıyorum.
                  </p>
                  <p>
                    <strong>TÜBİTAK 2209-A</strong> projelerimden (KADİS ve
                    Akıllı Çocuk Odası) edindiğim akademik disiplini,{" "}
                    <strong>MAKUtalk</strong> gibi topluluk odaklı
                    ölçeklenebilir sistemlerle sahaya yansıtıyorum.
                  </p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="p-8 rounded-[2rem] bg-blue-50/30 border border-blue-100/50 backdrop-blur-sm">
                    <p className="text-sm font-medium text-slate-700 italic leading-relaxed">
                      "Mühendislik, karmaşıklığı basitleştirmek değil;
                      karmaşıklığı doğru yöneten bir mimari kurmaktır."
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-px w-8 bg-blue-200" />
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                        Vision_01
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "#SistemMimarı",
                  "#BackendMühendisi",
                  "#TübitakAraştırmacısı",
                  "#YapayZekaMühendisi",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold font-mono uppercase tracking-wider transition-all hover:border-blue-200 hover:text-blue-500 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <TechStack />
        <Projects />
        <AIPlayground />
  
      </main>

      <footer className="pt-32 pb-16 px-6 bg-slate-50/50 border-t border-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">
                  Birlikte Geliştirmeye ?
                </h2>
                <p className="text-slate-500 text-xl font-light italic">
                  "Hayatta en hakiki mürşit ilimdir, fendir."
                </p>
              </div>
              <a
                href="mailto:ihsanyigitonay@gmail.com"
                className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-2xl hover:shadow-blue-200"
              >
                İletişime Geç <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-6">
                <span className="block text-[10px] font-bold text-slate-400 tracking-[0.4em] uppercase">
                  Eğitim
                </span>
                <div className="space-y-1">
                  <p className="text-sm text-slate-800 font-extrabold">
                    MAKÜ Yazılım Mühendisliği
                  </p>
                  <p className="text-xs text-slate-500">3. Sınıf Öğrencisi</p>
                </div>
              </div>
              <div className="space-y-6">
                <span className="block text-[10px] font-bold text-slate-400 tracking-[0.4em] uppercase">
                  Konum
                </span>
                <p className="text-sm text-slate-800 font-extrabold">
                  İstanbul, Türkiye
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-blue-100/50 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] text-slate-400 font-mono tracking-[0.2em] uppercase">
                &copy; 2024 İHSAN YİĞİT ÖNAY
              </p>
            </div>
            <div className="flex gap-10 text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <Globe2 className="w-3 h-3 text-blue-500" /> NODE_MELY_CORE
              </span>
              <span className="text-blue-600 font-bold tracking-widest">
                MELY.11.28
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
