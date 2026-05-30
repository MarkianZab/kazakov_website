import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkButton } from "@/components/ui/Button";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

const achievements = [
  "[PLACEHOLDER: Tournament win or title]",
  "[PLACEHOLDER: Another achievement]",
  "[PLACEHOLDER: Another achievement]",
  "[PLACEHOLDER: Another achievement]",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "fr"
        ? "À propos de Mikhail Kazakov — Grand Maître & Coach"
        : lang === "uk"
          ? "Про Михайла Казакова — Гросмейстер і тренер"
          : "About Mikhail Kazakov — Grandmaster & Chess Coach",
  };
}

export default async function BioPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const d = dict.bio;
  const base = `/${lang}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <SectionHeader
        label={d.label}
        title="Mikhail Kazakov"
        subtitle={d.subtitle}
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_2fr]">
        {/* Photo */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4] w-full rounded-md border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--foreground-muted)] text-sm">
            [PLACEHOLDER: Coach photo]
          </div>
          <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
              {d.rating}
            </p>
            <p className="font-serif text-2xl font-bold text-[var(--gold)]">
              [PLACEHOLDER: e.g. 2610]
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
              {d.titleLabel}
            </p>
            <p className="font-medium text-[var(--foreground)]">
              {d.grandmaster}
            </p>
          </div>
        </div>

        {/* Bio text */}
        <div className="space-y-6 text-[var(--foreground-muted)] leading-relaxed">
          <p>{d.placeholderOpening}</p>
          <p>{d.placeholderCareer}</p>
          <p>{d.placeholderCoaching}</p>

          <div>
            <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-3">
              {d.achievementsTitle}
            </h3>
            <ul className="space-y-2">
              {achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 text-[var(--gold)]">♟</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-3">
              {d.philosophyTitle}
            </h3>
            <p>{d.philosophyText}</p>
          </div>

          <div className="pt-4">
            <LinkButton href={`${base}/booking`} size="lg">
              {d.book}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
