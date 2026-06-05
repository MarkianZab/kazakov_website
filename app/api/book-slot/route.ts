import { NextRequest, NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import { getServiceClient } from "@/lib/supabase";

function fmt12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h}:00 ${suffix}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slotId, name, email } = body;

  if (!slotId || !name || !email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const supabase = getServiceClient();

  // Atomically mark the slot as booked only if it's still available
  const { data: slot, error } = await supabase
    .from("bookable_slots")
    .update({
      booked: true,
      student_name: name,
      student_email: email,
      booked_at: new Date().toISOString(),
    })
    .eq("id", slotId)
    .eq("booked", false)
    .select()
    .single();

  if (error || !slot) {
    return NextResponse.json(
      { error: "This slot is no longer available." },
      { status: 409 }
    );
  }

  // Format for emails
  const slotDate = new Date(slot.slot_date + "T12:00:00");
  const dateStr = slotDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = `${fmt12(slot.slot_hour)} Kyiv time`;

  // Get coach notification email
  const { data: settingRow } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "notification_email")
    .single();
  const coachEmail = settingRow?.value ?? FROM_EMAIL;

  const resend = getResend();

  await Promise.all([
    // Notify coach
    resend.emails.send({
      from: FROM_EMAIL,
      to: coachEmail,
      replyTo: email,
      subject: `New Booking from ${name}`,
      text: [
        `New session booked!`,
        ``,
        `Student: ${name}`,
        `Email: ${email}`,
        `Date: ${dateStr}`,
        `Time: ${timeStr}`,
        ``,
        `Reply to this email to send them the Zoom/Teams link.`,
      ].join("\n"),
    }),
    // Confirm to student
    resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Session Booked — Mikhail Kazakov",
      text: [
        `Hi ${name},`,
        ``,
        `Your session is confirmed!`,
        ``,
        `Date: ${dateStr}`,
        `Time: ${timeStr}`,
        `Duration: 90 minutes`,
        ``,
        `Mikhail will send you the Zoom/Teams link shortly.`,
        ``,
        `Remember: your first lesson is completely free.`,
        ``,
        `See you on the board!`,
      ].join("\n"),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
