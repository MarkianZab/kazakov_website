import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { BookingForm } from "./BookingForm";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

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

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <SectionHeader label={d.label} title={d.title} subtitle={d.subtitle} />

      <div className="mt-6 flex items-center gap-2 rounded-md border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-3 text-sm text-[var(--gold)]">
        <span>🎁</span>
        <span>{d.firstFree}</span>
      </div>

      <div className="mt-8 rounded-md border border-[var(--border)] bg-[var(--surface)] p-5">
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
        <p className="mt-3 text-sm text-[var(--foreground-muted)]">
          {d.sessionDesc}
        </p>
      </div>

      <div className="mt-8 rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-[var(--foreground)]">
          {d.requestTitle}
        </h2>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          {d.requestSubtitle}
        </p>
        <BookingForm dict={d} />
      </div>
    </div>
  );
}
