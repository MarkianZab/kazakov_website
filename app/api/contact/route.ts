import { NextRequest, NextResponse } from "next/server";
import { getResend, FROM_EMAIL, COACH_EMAIL } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const resend = getResend();
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: COACH_EMAIL,
    replyTo: email,
    subject: `[Contact] ${subject} — from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
