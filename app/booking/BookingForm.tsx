"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      preferredDate: (form.elements.namedItem("preferredDate") as HTMLInputElement).value,
      preferredTime: (form.elements.namedItem("preferredTime") as HTMLInputElement).value,
      platform: (form.elements.namedItem("platform") as HTMLSelectElement).value,
      level: (form.elements.namedItem("level") as HTMLSelectElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-6 flex flex-col items-center py-8 text-center">
        <span className="text-4xl">♟</span>
        <h3 className="mt-4 font-serif text-xl font-semibold text-[var(--foreground)]">
          Request sent!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--foreground-muted)]">
          Mikhail will get back to you within 24 hours to confirm your session
          and share payment details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name</label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredDate" className={labelClass}>Preferred Date</label>
          <input id="preferredDate" name="preferredDate" type="date" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="preferredTime" className={labelClass}>Preferred Time (Kyiv time)</label>
          <input id="preferredTime" name="preferredTime" type="time" required className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="platform" className={labelClass}>Platform</label>
          <select id="platform" name="platform" required className={inputClass}>
            <option value="">Choose…</option>
            <option value="Zoom">Zoom</option>
            <option value="Microsoft Teams">Microsoft Teams</option>
          </select>
        </div>
        <div>
          <label htmlFor="level" className={labelClass}>Your Chess Level</label>
          <select id="level" name="level" required className={inputClass}>
            <option value="">Choose…</option>
            <option value="Beginner (under 800)">Beginner (under 800)</option>
            <option value="Intermediate (800–1500)">Intermediate (800–1500)</option>
            <option value="Advanced (1500–2000)">Advanced (1500–2000)</option>
            <option value="Expert (2000+)">Expert (2000+)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          What would you like to work on?{" "}
          <span className="text-[var(--foreground-muted)]">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className={inputClass}
          placeholder="Openings, endgames, tactics, general improvement…"
        />
      </div>

      {status === "error" && (
        <p className="rounded-md bg-red-900/30 px-4 py-3 text-sm text-red-400">{error}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Sending request…" : "Request Session →"}
      </Button>
    </form>
  );
}

const labelClass = "mb-1.5 block text-sm font-medium text-[var(--foreground-muted)]";
const inputClass =
  "w-full rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-muted)]/50 focus:border-[var(--gold)] transition-colors";
