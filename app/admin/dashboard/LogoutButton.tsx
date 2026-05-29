"use client";

import { logout } from "../actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-sm border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground-muted)] transition-colors hover:border-[var(--gold)]/40 hover:text-[var(--foreground)]"
      >
        Sign Out
      </button>
    </form>
  );
}
