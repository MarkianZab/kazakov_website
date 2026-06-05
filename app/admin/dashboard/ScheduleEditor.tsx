"use client";

import { useState, useTransition } from "react";
import { addBookableSlot, deleteBookableSlot } from "../actions";

export type BookableSlot = {
  id: string;
  slot_date: string;
  slot_hour: number;
  booked: boolean;
  student_name: string | null;
  student_email: string | null;
};

const HOURS = Array.from({ length: 15 }, (_, i) => i + 7); // 7am–9pm

function fmt12(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h}:00 ${suffix}`;
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(y, m - 1, d));
}

export function ScheduleEditor({ slots: initial }: { slots: BookableSlot[] }) {
  const [slots, setSlots] = useState<BookableSlot[]>(initial);
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newHour, setNewHour] = useState(10);

  const today = new Date().toISOString().split("T")[0];

  function handleAdd() {
    if (!newDate || newDate < today) return;
    const tempId = `temp-${Date.now()}`;
    const newSlot: BookableSlot = {
      id: tempId,
      slot_date: newDate,
      slot_hour: newHour,
      booked: false,
      student_name: null,
      student_email: null,
    };
    setSlots((prev) =>
      [...prev, newSlot].sort((a, b) =>
        a.slot_date === b.slot_date
          ? a.slot_hour - b.slot_hour
          : a.slot_date.localeCompare(b.slot_date)
      )
    );
    setShowAdd(false);
    setNewDate("");
    startTransition(() => addBookableSlot(newDate, newHour));
  }

  function handleDelete(id: string) {
    setSlots((prev) => prev.filter((s) => s.id !== id));
    startTransition(() => deleteBookableSlot(id));
  }

  const upcoming = slots.filter((s) => s.slot_date >= today && !s.booked);
  const booked = slots.filter((s) => s.booked).sort((a, b) =>
    b.slot_date.localeCompare(a.slot_date)
  );

  return (
    <div className="space-y-8">
      {/* Upcoming available slots */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
            Available Slots
          </h3>
          {!showAdd && (
            <button
              onClick={() => setShowAdd(true)}
              className="rounded-sm border border-dashed border-[var(--border)] px-3 py-1.5 text-sm text-[var(--foreground-muted)] transition-colors hover:border-[var(--gold)]/40 hover:text-[var(--foreground)]"
            >
              + Add Slot
            </button>
          )}
        </div>

        {showAdd && (
          <div className="mb-4 flex flex-wrap items-end gap-3 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
            <div>
              <label className="mb-1 block text-xs text-[var(--foreground-muted)]">Date</label>
              <input
                type="date"
                min={today}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className={selectClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-[var(--foreground-muted)]">Time (Kyiv)</label>
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
              disabled={!newDate || isPending}
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

        {upcoming.length === 0 ? (
          <p className="text-sm text-[var(--foreground-muted)]">
            No upcoming slots. Add one above to let students book.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {upcoming.map((slot) => (
              <div
                key={slot.id}
                className="group flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
              >
                <span className="text-sm text-[var(--foreground)]">
                  {formatDate(slot.slot_date)}
                </span>
                <span className="text-sm text-[var(--gold)]">
                  {fmt12(slot.slot_hour)}
                </span>
                <button
                  onClick={() => handleDelete(slot.id)}
                  disabled={isPending}
                  className="ml-1 text-xs text-[var(--foreground-muted)] opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                  aria-label="Delete"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booked slots */}
      {booked.length > 0 && (
        <div>
          <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
            Booked
          </h3>
          <div className="overflow-hidden rounded-md border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">Date</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">Time</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">Student</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">Email</th>
                </tr>
              </thead>
              <tbody>
                {booked.map((slot) => (
                  <tr key={slot.id} className="border-b border-[var(--border)] last:border-0 bg-[var(--surface)]">
                    <td className="px-4 py-3 text-[var(--foreground)]">{formatDate(slot.slot_date)}</td>
                    <td className="px-4 py-3 text-[var(--gold)]">{fmt12(slot.slot_hour)}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{slot.student_name ?? "—"}</td>
                    <td className="px-4 py-3">
                      {slot.student_email ? (
                        <a
                          href={`mailto:${slot.student_email}`}
                          className="text-[var(--gold)] hover:text-[var(--gold-hover)]"
                        >
                          {slot.student_email}
                        </a>
                      ) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const selectClass =
  "rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)]";
