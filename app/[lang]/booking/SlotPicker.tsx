"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/Button";
import type { Dictionary } from "@/dictionaries/fr";

type Slot = { id: string; slot_date: string; slot_hour: number };
type Status = "idle" | "confirming" | "success" | "error";

const localeMap: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  uk: "uk-UA",
};

function formatDate(dateStr: string, lang: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Intl.DateTimeFormat(localeMap[lang] ?? "fr-FR", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(y, m - 1, d));
}

function kyivHourToLocal(date: string, hour: number): string {
  const now = new Date();
  const kyivHourNow = parseInt(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Kyiv",
      hour: "numeric",
      hour12: false,
    }).format(now),
    10
  );
  const kyivOffset = kyivHourNow - now.getUTCHours();
  const utcHour = ((hour - kyivOffset) % 24 + 24) % 24;
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, utcHour, 0, 0));
  return new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(dt);
}

function fmt12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h}:00 ${suffix}`;
}

function groupByDate(slots: Slot[]): [string, Slot[]][] {
  const map = new Map<string, Slot[]>();
  for (const slot of slots) {
    if (!map.has(slot.slot_date)) map.set(slot.slot_date, []);
    map.get(slot.slot_date)!.push(slot);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
}

export function SlotPicker({
  slots,
  dict,
  lang,
  contactHref,
}: {
  slots: Slot[];
  dict: Dictionary["booking"];
  lang: string;
  contactHref: string;
}) {
  const [localTimes, setLocalTimes] = useState<Map<string, string> | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const map = new Map<string, string>();
    for (const slot of slots) {
      map.set(slot.id, kyivHourToLocal(slot.slot_date, slot.slot_hour));
    }
    setLocalTimes(map);
  }, [slots]);

  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const groups = groupByDate(slots.filter((s) => !bookedIds.has(s.id)));
  const selectedSlot = slots.find((s) => s.id === selectedId) ?? null;

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setStatus("confirming");
    setErrorMsg("");

    try {
      const res = await fetch("/api/book-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: selectedSlot.id, name, email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");

      posthog.capture("slot_booked", {
        slot_date: selectedSlot.slot_date,
        slot_hour: selectedSlot.slot_hour,
      });
      setBookedIds((prev) => new Set([...prev, selectedSlot.id]));
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      if (msg.includes("no longer available") || msg.includes("taken")) {
        setErrorMsg(dict.slotTaken);
        setBookedIds((prev) => new Set([...prev, selectedSlot.id]));
      } else {
        setErrorMsg(msg);
      }
      posthog.captureException(err);
      setStatus("error");
    }
  }

  function selectSlot(id: string) {
    setSelectedId(id);
    setStatus("idle");
    setErrorMsg("");
    setName("");
    setEmail("");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <span className="text-5xl">♟</span>
        <h3 className="mt-4 font-serif text-2xl font-semibold text-[var(--foreground)]">
          {dict.success.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm text-[var(--foreground-muted)]">
          {dict.success.message}
        </p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <p className="text-[var(--foreground-muted)]">{dict.noSlots}</p>
        <div className="mt-4">
          <LinkButton href={contactHref} variant="outline" size="sm">
            {dict.contactMikhail}
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timezone note */}
      <p className="text-xs text-[var(--foreground-muted)]">
        {dict.localTimeNote}
        {userTZ && <span className="ml-1 text-[var(--gold)]">({userTZ})</span>}
      </p>

      {/* Slot groups */}
      {groups.map(([date, daySlots]) => (
        <div key={date}>
          <p className="mb-3 text-sm font-medium capitalize text-[var(--foreground)]">
            {formatDate(date, lang)}
          </p>
          <div className="flex flex-wrap gap-2">
            {daySlots.map((slot) => {
              const isSelected = slot.id === selectedId;
              const localTime = localTimes?.get(slot.id);
              return (
                <button
                  key={slot.id}
                  onClick={() => selectSlot(slot.id)}
                  title={`${dict.kyivNote} ${fmt12(slot.slot_hour)}`}
                  className={`rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                    isSelected
                      ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--gold)]/50 hover:text-[var(--gold)]"
                  }`}
                >
                  {localTime ?? fmt12(slot.slot_hour)}
                </button>
              );
            })}
          </div>

          {/* Inline form for selected slot in this date group */}
          {selectedSlot?.slot_date === date && (
            <form
              onSubmit={handleConfirm}
              className="mt-4 rounded-md border border-[var(--gold)]/30 bg-[var(--surface)] p-5"
            >
              <p className="mb-4 text-sm font-medium text-[var(--foreground)]">
                {formatDate(date, lang)} —{" "}
                <span className="text-[var(--gold)]">
                  {localTimes?.get(selectedSlot.id) ?? fmt12(selectedSlot.slot_hour)}
                </span>
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={lbl}>{dict.form.name}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={dict.form.namePH}
                    className={inp}
                  />
                </div>
                <div>
                  <label className={lbl}>{dict.form.email}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inp}
                  />
                </div>
              </div>

              {status === "error" && (
                <p className="mt-3 rounded bg-red-900/30 px-3 py-2 text-sm text-red-400">
                  {errorMsg}
                </p>
              )}

              <div className="mt-4 flex gap-3">
                <Button
                  type="submit"
                  disabled={status === "confirming"}
                  size="md"
                >
                  {status === "confirming" ? dict.form.confirming : dict.form.confirm}
                </Button>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                >
                  {dict.form.cancel}
                </button>
              </div>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}

const lbl = "mb-1.5 block text-sm font-medium text-[var(--foreground-muted)]";
const inp =
  "w-full rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-muted)]/50 focus:border-[var(--gold)] transition-colors";
