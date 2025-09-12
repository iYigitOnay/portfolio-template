// Node.js runtime KESİN olsun (Edge'de nodemailer çalışmaz)
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      console.error("Validasyon", { name, email, hasMsg: !!message });
      return NextResponse.json(
        { ok: false, error: "Eksik bilgi" },
        { status: 400 }
      );
    }

    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;
    const to = process.env.MAIL_TO || user;

    if (!user || !pass || !to) {
      console.error("ENV eksik:", {
        MAIL_USER: !!user,
        MAIL_PASS: !!pass,
        MAIL_TO: !!to,
      });
      return NextResponse.json(
        { ok: false, error: "Sunucu mail ayarları eksik" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: `"Portfolio Web Sitesinden" <${user}>`,
      to,
      subject: "Yeni İletişim Mesajı",
      text: `Ad Soyad: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h3>Yeni İletişim Mesajı</h3>
        <p><b>Ad Soyad:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });

    console.log("Mail sent:", info.messageId);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("API /contact HATA:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
