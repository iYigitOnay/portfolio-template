import React, { useState, useRef, useEffect } from "react";
import { GeminiService } from "../services/gemini";
import { Send, User, Bot, Sparkles, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AIPlayground: React.FC = () => {
  const [messages, setMessages] = useState<
    { role: "user" | "model"; text: string }[]
  >([
    {
      role: "model",
      text: "Merhaba! Ben İhsan Yiğit'in projelerini ve vizyonunu yakından tanıyan dijital asistanıyım. TÜBİTAK projeleri veya backend yetkinlikleri hakkında neler öğrenmek istersin?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const gemini = useRef(new GeminiService());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);
    const response = await gemini.current.chat(userMsg, messages);
    setMessages((prev) => [...prev, { role: "model", text: response }]);
    setIsLoading(false);
  };

  return (
    <section id="playground" className="py-32 px-6 bg-blue-50/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-blue-600 text-[10px] font-extrabold tracking-widest uppercase border border-blue-100 shadow-sm">
            <BrainCircuit className="w-3 h-3" /> Dijital İkiz Alfa
          </div>
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">
            AI Asistanıyla Sohbet Edin
          </h2>
          <p className="text-slate-500 text-lg font-light">
            Asistanımla sohbet ederek yetkinliklerimi sorgulayın.
          </p>
        </div>

        <div className="bg-white border border-blue-100 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[650px]">
          <div className="p-6 border-b border-blue-50 flex items-center justify-between bg-white/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  İYO Asistan
                </h3>
                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">
                  Aktif - Yapay Zeka Modeli
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-blue-100" />
              ))}
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-8 space-y-8 scroll-smooth bg-slate-50/20"
          >
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] flex gap-4 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.role === "user"
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-blue-100 text-blue-600 shadow-sm"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-slate-600 rounded-tl-none border border-blue-50"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-blue-50 p-5 rounded-[1.5rem] rounded-tl-none shadow-sm flex gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-blue-50">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Eğitim, projeler veya vizyon hakkında soru sor..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 pr-16 text-sm focus:outline-none focus:border-blue-300 focus:bg-white transition-all shadow-inner"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-blue-600 hover:bg-slate-900 text-white flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-blue-100"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlayground;
