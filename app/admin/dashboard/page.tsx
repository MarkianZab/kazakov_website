import { createSupabaseServerClient } from "@/lib/supabase-server";
import { AvailabilityEditor } from "./AvailabilityEditor";
import { SettingsForm } from "./SettingsForm";
import { BookingsTable } from "./BookingsTable";
import { LogoutButton } from "./LogoutButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard — Kazakov Chess" };

export type Slot = {
  id: string;
  day_of_week: number;
  hour: number;
  available: boolean;
};

export type Booking = {
  id: string;
  student_name: string;
  student_email: string;
  session_type: string;
  preferred_date: string;
  preferred_time: string;
  paid: boolean;
  created_at: string;
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const [{ data: slots }, { data: settings }, { data: bookings }] =
    await Promise.all([
      supabase
        .from("availability_slots")
        .select("*")
        .order("day_of_week")
        .order("hour"),
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
        {/* Availability */}
        <section>
          <h2 className="mb-5 font-serif text-xl font-semibold text-[var(--foreground)]">
            Availability
          </h2>
          <AvailabilityEditor slots={(slots as Slot[]) ?? []} />
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

        {/* Bookings */}
        <section>
          <h2 className="mb-5 font-serif text-xl font-semibold text-[var(--foreground)]">
            Recent Bookings
          </h2>
          <BookingsTable bookings={(bookings as Booking[]) ?? []} />
        </section>
      </div>
    </div>
  );
}
