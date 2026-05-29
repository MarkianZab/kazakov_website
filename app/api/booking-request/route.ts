import { NextRequest, NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, preferredDate, preferredTime, platform, level, notes } = body;

  if (!name || !email || !preferredDate || !preferredTime || !platform || !level) {
    return NextResponse.json({ error: "All required fields must be filled in." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Read coach notification email from settings
  const supabase = getServiceClient();
  const { data: settingRow } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "notification_email")
    .single();
  const coachEmail = settingRow?.value ?? FROM_EMAIL;

  const resend = getResend();

  // Notify coach
  await resend.emails.send({
    from: FROM_EMAIL,
    to: coachEmail,
    replyTo: email,
    subject: `New Lesson Request from ${name}`,
    text: [
      `New booking request — 1-on-1 Private Lesson (90 min, $50)`,
      ``,
      `Student: ${name}`,
      `Email: ${email}`,
      `Level: ${level}`,
      `Platform: ${platform}`,
      `Preferred Date: ${preferredDate}`,
      `Preferred Time: ${preferredTime} (Kyiv time)`,
      `Notes: ${notes || "None"}`,
      ``,
      `Reply to this email to confirm the session and share payment details.`,
    ].join("\n"),
  });

  // Confirm to student
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Lesson Request Received — Mikhail Kazakov",
    text: [
      `Hi ${name},`,
      ``,
      `Your lesson request has been received!`,
      ``,
      `Session: 1-on-1 Private Lesson (90 min)`,
      `Platform: ${platform}`,
      `Preferred: ${preferredDate} at ${preferredTime} Kyiv time`,
      ``,
      `Mikhail will get back to you within 24 hours to confirm your session and share payment details.`,
      ``,
      `Remember: your first lesson is completely free.`,
      ``,
      `See you on the board!`,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
