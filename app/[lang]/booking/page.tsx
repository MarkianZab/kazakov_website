import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { ServicePicker } from "./ServicePicker";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
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

      <div className="mt-10">
        <h2 className="mb-6 font-serif text-xl font-semibold text-[var(--foreground)]">
          {d.servicesTitle}
        </h2>
        <ServicePicker dict={d} lang={lang} contactHref={`/${lang}/contact`} />
      </div>

      {/* Payment */}
      <div className="mt-14 rounded-md border border-[var(--border)] bg-[var(--surface)] p-5">
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
