import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "./ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Mikhail Kazakov",
  description: "Get in touch with Grandmaster Mikhail Kazakov.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeader
        label="Contact"
        title="Get in Touch"
        subtitle="Have a question or want to discuss lessons? Send a message and Mikhail will get back to you within 48 hours."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        {/* Contact info */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              Email
            </p>
            <a
              href="mailto:[PLACEHOLDER: mikhail@yourdomain.com]"
              className="mt-1 block text-[var(--gold)] hover:text-[var(--gold-hover)]"
            >
              [PLACEHOLDER: mikhail@yourdomain.com]
            </a>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              Response Time
            </p>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              Within 48 hours
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              Chess Profiles
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              <a
                href="https://chess.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--gold)]"
              >
                Chess.com →
              </a>
              <a
                href="https://lichess.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--gold)]"
              >
                Lichess →
              </a>
              <a
                href="https://ratings.fide.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--gold)]"
              >
                FIDE Profile →
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
