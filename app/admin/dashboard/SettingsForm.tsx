"use client";

import { useState } from "react";
import { updateNotificationEmail } from "../actions";
import { Button } from "@/components/ui/Button";

export function SettingsForm({ currentEmail }: { currentEmail: string }) {
  const [email, setEmail] = useState(currentEmail);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    try {
      await updateNotificationEmail(email);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md items-end gap-3">
      <div className="flex-1">
        <label htmlFor="notif-email" className="mb-1.5 block text-sm font-medium text-[var(--foreground-muted)]">
          Email address
        </label>
        <input
          id="notif-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)] transition-colors"
        />
      </div>
      <Button type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : "Save"}
      </Button>
    </form>
  );
}
