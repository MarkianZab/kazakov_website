import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookingForm } from "./BookingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Session — Mikhail Kazakov",
  description: "Book a private 1-on-1 chess lesson with Grandmaster Mikhail Kazakov.",
};

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <SectionHeader
        label="Booking"
        title="Book a Session"
        subtitle="Fill in your details and Mikhail will confirm your session within 24 hours."
      />

      {/* Free first lesson banner */}
      <div className="mt-6 flex items-center gap-2 rounded-md border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-3 text-sm text-[var(--gold)]">
        <span>🎁</span>
        <span>Your first lesson is completely free — no payment needed to get started.</span>
      </div>

      {/* Session info */}
      <div className="mt-8 rounded-md border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif text-lg font-semibold text-[var(--foreground)]">
              1-on-1 Private Lesson
            </p>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              90 minutes · Zoom or Microsoft Teams
            </p>
          </div>
          <span className="font-serif text-2xl font-bold text-[var(--gold)]">$50</span>
        </div>
        <p className="mt-3 text-sm text-[var(--foreground-muted)]">
          Personalised session tailored to your level and goals. Mikhail will
          send payment details after confirming your slot.
        </p>
      </div>

      {/* Booking form */}
      <div className="mt-8 rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-[var(--foreground)]">
          Request a Session
        </h2>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Mikhail will reply within 24 hours to confirm the time and share payment info.
        </p>
        <BookingForm />
      </div>
    </div>
  );
}
