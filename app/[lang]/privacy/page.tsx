import { Fragment } from "react";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { CONTACT_EMAIL } from "@/lib/links";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { privacy } = await getDictionary(lang as Locale);
  return { title: privacy.metaTitle, description: privacy.metaDescription };
}

function withEmailLinks(text: string) {
  return text.split(CONTACT_EMAIL).map((part, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-[var(--gold)] hover:text-[var(--gold-hover)]"
        >
          {CONTACT_EMAIL}
        </a>
      )}
      {part}
    </Fragment>
  ));
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const d = dict.privacy;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeader label={d.label} title={d.title} subtitle={d.updated} />

      <div className="mt-12 max-w-3xl space-y-10 leading-relaxed text-[var(--foreground-muted)]">
        {d.sections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h3 className="font-serif text-xl font-semibold text-[var(--foreground)]">
              {section.title}
            </h3>
            {section.paragraphs?.map((p, i) => (
              <p key={i}>{withEmailLinks(p)}</p>
            ))}
            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 text-[var(--gold)]">
                      ♟
                    </span>
                    <span>{withEmailLinks(item)}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.closing?.map((p, i) => (
              <p key={i}>{withEmailLinks(p)}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
