import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { getSupabaseClient } from "@/lib/supabase";
import { SlotPicker } from "./SlotPicker";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

export const revalidate = 30;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "fr"
        ? "Réserver une session — Mikhail Kazakov"
        : lang === "uk"
          ? "Записатися на урок — Mikhail Kazakov"
          : "Book a Session — Mikhail Kazakov",
  };
}

export default async function BookingPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const d = dict.booking;

  const supabase = getSupabaseClient();
  const today = new Date().toISOString().split("T")[0];
  const { data: slots } = await supabase
    .from("bookable_slots")
    .select("id, slot_date, slot_hour")
    .eq("booked", false)
    .gte("slot_date", today)
    .order("slot_date")
    .order("slot_hour");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <SectionHeader label={d.label} title={d.title} subtitle={d.subtitle} />

      {/* Free first lesson banner */}
      <div className="mt-6 flex items-center gap-2 rounded-md border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-3 text-sm text-[var(--gold)]">
        <span>🎁</span>
        <span>{d.firstFree}</span>
      </div>

      {/* Session info */}
      <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif text-lg font-semibold text-[var(--foreground)]">
              {d.sessionName}
            </p>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              {d.sessionDetails}
            </p>
          </div>
          <span className="font-serif text-2xl font-bold text-[var(--gold)]">
            {d.sessionPrice}
          </span>
        </div>
        <p className="mt-3 text-sm text-[var(--foreground-muted)]">{d.sessionDesc}</p>
      </div>

      {/* Slots */}
      <div className="mt-10">
        <h2 className="mb-6 font-serif text-xl font-semibold text-[var(--foreground)]">
          {d.slotsTitle}
        </h2>
        <SlotPicker
          slots={slots ?? []}
          dict={d}
          lang={lang}
          contactHref={`/${lang}/contact`}
        />
      </div>
    </div>
  );
}
