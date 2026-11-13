import type { Locale } from "@/lib/locales";

export const CAL_USERNAME = "mikhail-kazakov1";

export type ServiceId = "private" | "training" | "group" | "simul" | "tournament";

export type Service = {
  id: ServiceId;
  durationMin: number | null; // null = varies, shown as "by arrangement"
  priceEur: number | null; // null = agreed case by case
  calSlug: string | null; // Cal.com event slug; null = not bookable online
};

// durationMin MUST match the length set on the Cal.com event type.
export const SERVICES: Service[] = [
  { id: "private", durationMin: 60, priceEur: 50, calSlug: "private-lesson" },
  { id: "training", durationMin: 60, priceEur: 50, calSlug: "training-game" },
  { id: "group", durationMin: 90, priceEur: 100, calSlug: "group-lesson" },
  { id: "simul", durationMin: null, priceEur: 100, calSlug: null },
  { id: "tournament", durationMin: null, priceEur: null, calSlug: null },
];

export const calLinkFor = (s: Service) =>
  s.calSlug ? `${CAL_USERNAME}/${s.calSlug}` : null;

// Hand-formatted rather than Intl.NumberFormat: server and browser ICU data
// can disagree on the French space character and break hydration.
export const formatPrice = (eur: number, lang: Locale) =>
  lang === "fr" ? `${eur} €` : `€${eur}`;
