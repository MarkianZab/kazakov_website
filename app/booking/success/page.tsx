import { LinkButton } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed — Mikhail Kazakov",
};

export default function BookingSuccessPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-5xl">♟</span>
      <h1 className="mt-6 font-serif text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
        Booking Confirmed!
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[var(--foreground-muted)]">
        Thank you for booking a session with Mikhail. You&apos;ll receive a
        confirmation email shortly. Mikhail will be in touch to confirm the
        exact time.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <LinkButton href="/" variant="outline">
          Back to Home
        </LinkButton>
        <LinkButton href="/contact">Contact Mikhail</LinkButton>
      </div>
    </div>
  );
}
