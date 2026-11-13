"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/dictionaries/fr";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({
  dict,
  privacyHref,
}: {
  dict: Dictionary["contact"];
  privacyHref: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(message);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <span className="text-4xl">♟</span>
        <h3 className="mt-4 font-serif text-xl font-semibold text-[var(--foreground)]">
          {dict.success.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          {dict.success.message}
        </p>
      </div>
    );
  }

  const f = dict.form;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={lbl}>{f.name}</label>
          <input id="name" name="name" type="text" required maxLength={100} className={inp} placeholder={f.namePH} />
        </div>
        <div>
          <label htmlFor="email" className={lbl}>{f.email}</label>
          <input id="email" name="email" type="email" required maxLength={200} className={inp} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={lbl}>{f.subject}</label>
        <input id="subject" name="subject" type="text" required maxLength={200} className={inp} placeholder={f.subjectPH} />
      </div>

      <div>
        <label htmlFor="message" className={lbl}>{f.message}</label>
        <textarea id="message" name="message" rows={5} required maxLength={5000} className={inp} placeholder={f.messagePH} />
      </div>

      {/* Honeypot: hidden from people and assistive tech, so only bots fill it. */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      {status === "error" && (
        <p className="rounded-md bg-red-900/30 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
        {status === "loading" ? f.sending : f.submit}
      </Button>

      <p className="text-center text-xs text-[var(--foreground-muted)]">
        {dict.privacyNote}{" "}
        <Link href={privacyHref} className="text-[var(--gold)] hover:text-[var(--gold-hover)]">
          {dict.privacyLink}
        </Link>
        .
      </p>
    </form>
  );
}

const lbl = "mb-1.5 block text-sm font-medium text-[var(--foreground-muted)]";
const inp =
  "w-full rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-muted)]/50 focus:border-[var(--gold)] transition-colors";
