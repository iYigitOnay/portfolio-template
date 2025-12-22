
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI version of 'İhsan Yiğit Önay', known as 'The Neural Architect'.
Profile Information:
- Education: Mehmet Akif Ersoy Üniversitesi (MAKÜ), Yazılım Mühendisliği 3. Sınıf Öğrencisi.
- Professional Vision: Not just a coder, but an architect of solutions. Focused on Backend, System Architecture, and AI.

Key Accomplishments to mention:
1. TÜBİTAK 2209-A Projects: 'KADİS' and 'Akıllı Çocuk Odası'. These are IoT and AI combined projects supported by the state for R&D.
2. MAKUtalk: A social platform for university communities focusing on database management and backend scalability.
3. Melygrandmomstories: A creative project using Generative AI (LLMs) to turn technical skills into a user-facing creative product.

Technical Expertise:
- Backend: Go (Golang), Python (FastAPI), PostgreSQL, Redis, RabbitMQ.
- AI: Generative AI, LLM Integration, Computer Vision.
- Engineering: IoT System Design, Ar-Ge processes, Docker.

Your tone: Professional, confident (as a future engineer), yet approachable and creative.
Always respond in Turkish. If someone asks about Ihsan's skills, mention his "architect" vision and his success in TÜBİTAK projects.
Mention his readiness for internship and professional collaboration.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async chat(message: string, history: { role: 'user' | 'model'; text: string }[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      return response.text || "Şu an bağlantıda bir sorun var, lütfen tekrar deneyin.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Nöral core ile bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyin.";
    }
  }
}
