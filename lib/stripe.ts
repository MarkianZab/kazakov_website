import Stripe from "stripe";

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });
}

export const SESSION_TYPES = [
  {
    id: "solo_60",
    label: "1-on-1 Lesson (60 min)",
    description: "Private session tailored to your level and goals.",
    price: 8000,
    priceLabel: "$80",
  },
  {
    id: "analysis_60",
    label: "Game Analysis (60 min)",
    description: "Deep review of your recent games with actionable feedback.",
    price: 7000,
    priceLabel: "$70",
  },
  {
    id: "group_90",
    label: "Group Lesson (90 min)",
    description: "Small group session covering opening theory or tactics.",
    price: 4000,
    priceLabel: "$40 / person",
  },
  {
    id: "tournament_prep",
    label: "Tournament Prep (90 min)",
    description: "Targeted preparation before your upcoming tournament.",
    price: 10000,
    priceLabel: "$100",
  },
] as const;

export type SessionTypeId = (typeof SESSION_TYPES)[number]["id"];
