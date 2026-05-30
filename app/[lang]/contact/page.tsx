import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { ContactForm } from "./ContactForm";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "fr"
        ? "Contact — Mikhail Kazakov"
        : lang === "uk"
          ? "Контакт — Mikhail Kazakov"
          : "Contact — Mikhail Kazakov",
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const d = dict.contact;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeader label={d.label} title={d.title} subtitle={d.subtitle} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              {d.emailLabel}
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
              {d.responseLabel}
            </p>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              {d.responseTime}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              {d.profilesLabel}
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
                FIDE →
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-6">
          <ContactForm dict={d} />
        </div>
      </div>
    </div>
  );
}
