"use client";

import { useState, useTransition } from "react";
import { toggleSlot, addSlot, deleteSlot } from "../actions";
import type { Slot } from "./page";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7am–8pm

function fmt12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h}:00 ${suffix}`;
}

export function AvailabilityEditor({ slots: initialSlots }: { slots: Slot[] }) {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [newDay, setNewDay] = useState(0);
  const [newHour, setNewHour] = useState(10);

  function handleToggle(slot: Slot) {
    setSlots((prev) =>
      prev.map((s) => (s.id === slot.id ? { ...s, available: !s.available } : s))
    );
    startTransition(() => toggleSlot(slot.id, !slot.available));
  }

  function handleDelete(id: string) {
    setSlots((prev) => prev.filter((s) => s.id !== id));
    startTransition(() => deleteSlot(id));
  }

  function handleAdd() {
    const exists = slots.some((s) => s.day_of_week === newDay && s.hour === newHour);
    if (exists) return;
    const tempId = `temp-${Date.now()}`;
    setSlots((prev) => [...prev, { id: tempId, day_of_week: newDay, hour: newHour, available: true }]);
    setShowAdd(false);
    startTransition(() => addSlot(newDay, newHour));
  }

  const byDay = DAYS.map((_, i) =>
    slots.filter((s) => s.day_of_week === i).sort((a, b) => a.hour - b.hour)
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {DAYS.map((day, i) => (
          <div
            key={day}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
          >
            <div className="bg-[var(--surface-2)] px-3 py-2 text-center text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              {day}
            </div>
            <div className="flex flex-col gap-1.5 p-2">
              {byDay[i].length === 0 && (
                <p className="py-2 text-center text-xs text-[var(--foreground-muted)]">—</p>
              )}
              {byDay[i].map((slot) => (
                <div key={slot.id} className="group relative flex items-center gap-1">
                  <button
                    onClick={() => handleToggle(slot)}
                    disabled={isPending}
                    className={`flex-1 rounded px-2 py-1.5 text-center text-xs font-medium transition-colors ${
                      slot.available
                        ? "bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)]/20"
                        : "bg-[var(--surface-2)] text-[var(--foreground-muted)] line-through opacity-60 hover:opacity-80"
                    }`}
                  >
                    {fmt12(slot.hour)}
                  </button>
                  <button
                    onClick={() => handleDelete(slot.id)}
                    disabled={isPending}
                    className="shrink-0 rounded p-0.5 text-[var(--foreground-muted)] opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                    aria-label="Delete slot"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 text-xs text-[var(--foreground-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]/60" />
          Available (click to block)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)]" />
          Blocked (click to open)
        </span>
        <span className="text-[var(--foreground-muted)]">Hover a slot to delete it</span>
      </div>

      {/* Add slot */}
      <div className="mt-4">
        {!showAdd ? (
          <button
            onClick={() => setShowAdd(true)}
            className="rounded-sm border border-dashed border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground-muted)] transition-colors hover:border-[var(--gold)]/40 hover:text-[var(--foreground)]"
          >
            + Add Slot
          </button>
        ) : (
          <div className="flex flex-wrap items-end gap-3 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
            <div>
              <label className="mb-1 block text-xs text-[var(--foreground-muted)]">Day</label>
              <select
                value={newDay}
                onChange={(e) => setNewDay(Number(e.target.value))}
                className={selectClass}
              >
                {DAYS.map((d, i) => (
                  <option key={d} value={i}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-[var(--foreground-muted)]">Time</label>
              <select
                value={newHour}
                onChange={(e) => setNewHour(Number(e.target.value))}
                className={selectClass}
              >
                {HOURS.map((h) => (
                  <option key={h} value={h}>{fmt12(h)}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAdd}
              disabled={isPending}
              className="rounded-sm bg-[var(--gold)] px-4 py-2 text-sm font-medium text-black hover:bg-[var(--gold-hover)] disabled:opacity-50"
            >
              Add
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-sm border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const selectClass =
  "rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)]";
