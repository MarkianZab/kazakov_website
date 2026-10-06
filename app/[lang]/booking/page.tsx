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
  // Timeout keeps the page fast if the database is unreachable (e.g. paused)
  const { data: slots, error } = await supabase
    .from("bookable_slots")
    .select("id, slot_date, slot_hour")
    .eq("booked", false)
    .gte("slot_date", today)
    .order("slot_date")
    .order("slot_hour")
    .abortSignal(AbortSignal.timeout(3000));
  if (error) console.error("bookable_slots query failed:", error.message);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <SectionHeader label={d.label} title={d.title} subtitle={d.subtitle} />

      {/* Free first lesson — prominent banner */}
      <div className="mt-8 rounded-lg border-2 border-[var(--gold)] bg-[var(--gold)]/10 px-6 py-8 text-center">
        <p className="text-4xl">🎁</p>
        <p className="mt-3 font-serif text-2xl font-bold text-[var(--gold)] sm:text-3xl">
          {d.firstFreeHeadline}
        </p>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          {d.firstFreeSub}
        </p>
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
        <p className="mt-3 border-t border-[var(--border)] pt-3 text-sm text-[var(--foreground-muted)]">
          ♟ {d.prepNote}
        </p>
      </div>

      {/* Slots */}
      <div className="mt-10">
        <h2 className="mb-6 font-serif text-xl font-semibold text-[var(--foreground)]">
          {d.slotsTitle}
        </h2>
        {error ? (
          <p className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-6 text-sm text-[var(--foreground-muted)]">
            {d.slotsError}
          </p>
        ) : (
          <SlotPicker
            slots={slots ?? []}
            dict={d}
            lang={lang}
            contactHref={`/${lang}/contact`}
          />
        )}
      </div>

      {/* Services & pricing */}
      <div className="mt-14">
        <h2 className="mb-6 font-serif text-xl font-semibold text-[var(--foreground)]">
          {d.servicesTitle}
        </h2>
        <ul className="divide-y divide-[var(--border)] rounded-md border border-[var(--border)] bg-[var(--surface)]">
          {d.services.map(({ name, detail, price }) => (
            <li
              key={name}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div>
                <p className="font-medium text-[var(--foreground)]">{name}</p>
                {detail && (
                  <p className="text-sm text-[var(--foreground-muted)]">
                    {detail}
                  </p>
                )}
              </div>
              <span className="shrink-0 font-serif text-lg font-semibold text-[var(--gold)]">
                {price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment */}
      <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
          {d.paymentTitle}
        </p>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          {d.paymentText}
        </p>
      </div>
    </div>
  );
}
