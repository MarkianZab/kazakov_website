"use client";

import { useEffect, useState } from "react";

type Slot = { hour: number; available: boolean };

type Props = {
  slotsByDay: Slot[][];
  days: string[];
  availableLabel: string;
  unavailableLabel: string;
  localTimeNote: string;
  kyivTimeNote: string;
};

function kyivHourToLocal(hour: number): string {
  const now = new Date();
  // Get current Kyiv hour to compute offset
  const kyivHourNow = parseInt(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Kyiv",
      hour: "numeric",
      hour12: false,
    }).format(now),
    10
  );
  const kyivOffset = kyivHourNow - now.getUTCHours();

  // Build a Date at (hour - offset) UTC so it renders as `hour` in Kyiv
  const utcHour = ((hour - kyivOffset) % 24 + 24) % 24;
  const d = new Date(now);
  d.setUTCHours(utcHour, 0, 0, 0);

  return new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

function fmt12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h}:00 ${suffix}`;
}

export function TimeGrid({
  slotsByDay,
  days,
  availableLabel,
  unavailableLabel,
  localTimeNote,
  kyivTimeNote,
}: Props) {
  const [localTimes, setLocalTimes] = useState<Map<number, string> | null>(null);

  useEffect(() => {
    const allHours = new Set(slotsByDay.flatMap((d) => d.map((s) => s.hour)));
    const map = new Map<number, string>();
    allHours.forEach((h) => map.set(h, kyivHourToLocal(h)));
    setLocalTimes(map);
  }, [slotsByDay]);

  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      {/* Timezone note */}
      <p className="mb-6 text-xs text-[var(--foreground-muted)]">
        {localTimeNote}
        {userTZ && (
          <span className="ml-1 text-[var(--gold)]">({userTZ})</span>
        )}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {days.map((day, i) => (
          <div
            key={day}
            className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="bg-[var(--surface-2)] px-3 py-2 text-center text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              {day}
            </div>
            <div className="flex flex-col gap-1.5 p-2">
              {slotsByDay[i].length === 0 && (
                <p className="py-2 text-center text-xs text-[var(--foreground-muted)]">
                  —
                </p>
              )}
              {slotsByDay[i].map(({ hour, available }) => (
                <div
                  key={hour}
                  title={`${kyivTimeNote} ${fmt12(hour)}`}
                  className={`rounded px-2 py-1.5 text-center text-xs font-medium ${
                    available
                      ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                      : "bg-[var(--surface-2)] text-[var(--foreground-muted)] line-through opacity-50"
                  }`}
                >
                  {localTimes ? localTimes.get(hour) : fmt12(hour)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 text-xs text-[var(--foreground-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]/60" />
          {availableLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--surface-2)]" />
          {unavailableLabel}
        </span>
      </div>
    </>
  );
}
