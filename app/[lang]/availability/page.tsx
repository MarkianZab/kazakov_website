import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkButton } from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { TimeGrid } from "./TimeGrid";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "fr"
        ? "Disponibilités — Mikhail Kazakov"
        : lang === "uk"
          ? "Розклад — Mikhail Kazakov"
          : "Availability — Mikhail Kazakov",
  };
}

export default async function AvailabilityPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const d = dict.availability;
  const base = `/${lang}`;

  const supabase = getSupabaseClient();
  const { data: slots } = await supabase
    .from("availability_slots")
    .select("day_of_week, hour, available")
    .order("day_of_week")
    .order("hour");

  const slotsByDay = d.days.map((_, i) =>
    (slots ?? [])
      .filter((s) => s.day_of_week === i)
      .map(({ hour, available }) => ({ hour, available }))
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader label={d.label} title={d.title} subtitle={d.subtitle} />
        <LinkButton href={`${base}/booking`} size="md" className="shrink-0">
          {d.book}
        </LinkButton>
      </div>

      <div className="mt-10">
        <TimeGrid
          slotsByDay={slotsByDay}
          days={d.days}
          availableLabel={d.available}
          unavailableLabel={d.unavailable}
          localTimeNote={d.localTimeNote}
          kyivTimeNote={d.kyivTimeNote}
        />
      </div>

      <div className="mt-12 rounded-md border border-[var(--border)] bg-[var(--surface)] p-6">
        <h3 className="font-serif text-lg font-semibold text-[var(--foreground)]">
          {d.noSlotTitle}
        </h3>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          {d.noSlotDesc}
        </p>
        <div className="mt-4">
          <LinkButton href={`${base}/contact`} variant="outline" size="sm">
            {d.contactMikhail}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
