import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkButton } from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Availability — Mikhail Kazakov",
  description: "View Mikhail Kazakov's weekly availability for chess lessons.",
};

export const revalidate = 60; // revalidate every 60s so changes show quickly

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function fmt12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h}:00 ${suffix}`;
}

export default async function AvailabilityPage() {
  const supabase = getSupabaseClient();
  const { data: slots } = await supabase
    .from("availability_slots")
    .select("day_of_week, hour, available")
    .order("day_of_week")
    .order("hour");

  const byDay = DAYS.map((_, i) =>
    (slots ?? []).filter((s) => s.day_of_week === i)
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          label="Schedule"
          title="Weekly Availability"
          subtitle="All times shown in Eastern Time (ET). Slots update in real time."
        />
        <LinkButton href="/booking" size="md" className="shrink-0">
          Book a Slot
        </LinkButton>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {DAYS.map((day, i) => (
          <div
            key={day}
            className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="bg-[var(--surface-2)] px-3 py-2 text-center text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              {day}
            </div>
            <div className="flex flex-col gap-1.5 p-2">
              {byDay[i].length === 0 && (
                <p className="py-2 text-center text-xs text-[var(--foreground-muted)]">
                  —
                </p>
              )}
              {byDay[i].map(({ hour, available }) => (
                <div
                  key={hour}
                  className={`rounded px-2 py-1.5 text-center text-xs font-medium ${
                    available
                      ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                      : "bg-[var(--surface-2)] text-[var(--foreground-muted)] line-through opacity-50"
                  }`}
                >
                  {fmt12(hour)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs text-[var(--foreground-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]/60" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--surface-2)]" />
          Booked / Unavailable
        </span>
      </div>

      <div className="mt-12 rounded-md border border-[var(--border)] bg-[var(--surface)] p-6">
        <h3 className="font-serif text-lg font-semibold text-[var(--foreground)]">
          Don&apos;t see a time that works?
        </h3>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          Reach out directly and Mikhail will do his best to accommodate your
          schedule.
        </p>
        <div className="mt-4">
          <LinkButton href="/contact" variant="outline" size="sm">
            Contact Mikhail
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
