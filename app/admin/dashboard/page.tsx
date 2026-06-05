import { createSupabaseServerClient } from "@/lib/supabase-server";
import { ScheduleEditor } from "./ScheduleEditor";
import { SettingsForm } from "./SettingsForm";
import { BookingsTable } from "./BookingsTable";
import { LogoutButton } from "./LogoutButton";
import type { Metadata } from "next";
import type { BookableSlot } from "./ScheduleEditor";

export const metadata: Metadata = { title: "Admin Dashboard — Kazakov Chess" };

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const today = new Date().toISOString().split("T")[0];

  const [{ data: bookableSlots }, { data: settings }, { data: bookings }] =
    await Promise.all([
      supabase
        .from("bookable_slots")
        .select("id, slot_date, slot_hour, booked, student_name, student_email")
        .gte("slot_date", today)
        .order("slot_date")
        .order("slot_hour"),
      supabase.from("settings").select("key, value"),
      supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

  const notificationEmail =
    settings?.find((s) => s.key === "notification_email")?.value ?? "";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--gold)]">
            Admin
          </p>
          <h1 className="font-serif text-2xl font-semibold text-[var(--foreground)]">
            Dashboard
          </h1>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-10 space-y-12">
        {/* Schedule */}
        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-[var(--foreground)]">
            Schedule
          </h2>
          <p className="mb-5 text-sm text-[var(--foreground-muted)]">
            Add slots to your schedule. Students can book them instantly — you&apos;ll get an email for each booking.
          </p>
          <ScheduleEditor slots={(bookableSlots as BookableSlot[]) ?? []} />
        </section>

        {/* Notification email */}
        <section>
          <h2 className="mb-5 font-serif text-xl font-semibold text-[var(--foreground)]">
            Notification Email
          </h2>
          <p className="mb-4 text-sm text-[var(--foreground-muted)]">
            Booking confirmations and contact messages are sent to this address.
          </p>
          <SettingsForm currentEmail={notificationEmail} />
        </section>

        {/* Legacy bookings */}
        {bookings && bookings.length > 0 && (
          <section>
            <h2 className="mb-5 font-serif text-xl font-semibold text-[var(--foreground)]">
              Contact Form Submissions
            </h2>
            <BookingsTable bookings={bookings} />
          </section>
        )}
      </div>
    </div>
  );
}
