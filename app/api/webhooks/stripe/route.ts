import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getServiceClient } from "@/lib/supabase";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  const stripe = getStripe();
  const resend = getResend();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { studentName, studentEmail, sessionType, preferredDate, preferredTime, notes } =
      session.metadata!;

    const supabase = getServiceClient();

    // Read notification email from settings so coach can update it via admin dashboard
    const { data: settingRow } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "notification_email")
      .single();
    const coachEmail = settingRow?.value ?? FROM_EMAIL;

    await supabase.from("bookings").insert({
      student_name: studentName,
      student_email: studentEmail,
      session_type: sessionType,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      notes,
      stripe_session_id: session.id,
      paid: true,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: studentEmail,
      subject: "Booking Confirmed — Mikhail Kazakov",
      text: `Hi ${studentName},\n\nYour session has been confirmed!\n\nSession: ${sessionType}\nDate: ${preferredDate} at ${preferredTime} ET\n\nMikhail will be in touch to confirm the exact details.\n\nSee you on the board!`,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: coachEmail,
      subject: `New Booking: ${sessionType} with ${studentName}`,
      text: `New booking received.\n\nStudent: ${studentName} (${studentEmail})\nSession: ${sessionType}\nDate: ${preferredDate} at ${preferredTime} ET\nNotes: ${notes || "None"}\nStripe Session: ${session.id}`,
    });
  }

  return NextResponse.json({ received: true });
}
