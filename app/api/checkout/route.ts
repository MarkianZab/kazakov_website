import { NextRequest, NextResponse } from "next/server";
import { getStripe, SESSION_TYPES } from "@/lib/stripe";
import { getServerPostHog } from "@/lib/posthog";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionType, name, email, preferredDate, preferredTime, notes } = body;

  if (!sessionType || !name || !email || !preferredDate || !preferredTime) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const session = SESSION_TYPES.find((s) => s.id === sessionType);
  if (!session) {
    return NextResponse.json({ error: "Invalid session type." }, { status: 400 });
  }

  const origin = req.headers.get("origin") || "http://localhost:3000";
  const stripe = getStripe();

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: session.price,
          product_data: {
            name: session.label,
            description: session.description,
          },
        },
      },
    ],
    metadata: {
      studentName: name,
      studentEmail: email,
      sessionType,
      preferredDate,
      preferredTime,
      notes: notes || "",
    },
    success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/booking`,
  });

  const posthog = getServerPostHog();
  posthog.capture({
    distinctId: email,
    event: "checkout_initiated",
    properties: {
      session_type: sessionType,
      amount_cents: session.price,
      preferred_date: preferredDate,
      stripe_checkout_id: checkout.id,
    },
  });
  await posthog.shutdown();

  return NextResponse.json({ url: checkout.url });
}
