type Booking = {
  id: string;
  student_name: string;
  student_email: string;
  session_type: string;
  preferred_date: string;
  preferred_time: string;
  paid: boolean;
  created_at: string;
};

const SESSION_LABELS: Record<string, string> = {
  solo_60: "1-on-1 (60 min)",
  analysis_60: "Game Analysis (60 min)",
  group_90: "Group (90 min)",
  tournament_prep: "Tournament Prep",
};

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <p className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-6 py-8 text-center text-sm text-[var(--foreground-muted)]">
        No bookings yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
            {["Student", "Session", "Preferred Date", "Preferred Time", "Paid", "Booked At"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr
              key={b.id}
              className={`border-b border-[var(--border)] ${
                i % 2 === 0 ? "bg-[var(--surface)]" : "bg-[var(--surface-2)]"
              }`}
            >
              <td className="px-4 py-3">
                <p className="font-medium text-[var(--foreground)]">{b.student_name}</p>
                <p className="text-xs text-[var(--foreground-muted)]">{b.student_email}</p>
              </td>
              <td className="px-4 py-3 text-[var(--foreground-muted)]">
                {SESSION_LABELS[b.session_type] ?? b.session_type}
              </td>
              <td className="px-4 py-3 text-[var(--foreground-muted)]">{b.preferred_date}</td>
              <td className="px-4 py-3 text-[var(--foreground-muted)]">{b.preferred_time}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded px-2 py-0.5 text-xs font-medium ${
                    b.paid
                      ? "bg-green-900/30 text-green-400"
                      : "bg-yellow-900/30 text-yellow-400"
                  }`}
                >
                  {b.paid ? "Paid" : "Pending"}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-[var(--foreground-muted)]">
                {new Date(b.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
