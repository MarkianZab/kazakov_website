import { NextRequest, NextResponse } from "next/server";
import { getResend, FROM_EMAIL, COACH_EMAIL } from "@/lib/resend";

const MAX_LENGTH = { name: 100, email: 200, subject: 200, message: 5000 };
type Field = keyof typeof MAX_LENGTH;

const badRequest = (error: string) => NextResponse.json({ error }, { status: 400 });

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid request.");
  }
  if (typeof body !== "object" || body === null) return badRequest("Invalid request.");
  const input = body as Record<string, unknown>;

  // Only bots fill the hidden honeypot field. Reply as if the message was sent
  // so they have no signal to adapt to.
  if (input.website) return NextResponse.json({ ok: true });

  const fields = {} as Record<Field, string>;
  for (const field of Object.keys(MAX_LENGTH) as Field[]) {
    const value = input[field];
    if (typeof value !== "string") return badRequest("Invalid request.");
    const trimmed = value.trim();
    if (!trimmed) return badRequest("All fields are required.");
    if (trimmed.length > MAX_LENGTH[field]) return badRequest(`The ${field} field is too long.`);
    fields[field] = trimmed;
  }
  const { name, email, subject, message } = fields;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return badRequest("Invalid email address.");
  }

  if (!COACH_EMAIL) {
    console.error("COACH_EMAIL is not set, so the contact message was not sent.");
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  // A line break in the Subject header would let a sender inject extra headers.
  const oneLine = (s: string) => s.replace(/[\r\n]/g, "");

  const resend = getResend();
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: COACH_EMAIL,
    replyTo: email,
    subject: `[Contact] ${oneLine(subject)} — from ${oneLine(name)}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
