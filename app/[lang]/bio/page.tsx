import { notFound } from "next/navigation";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkButton } from "@/components/ui/Button";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { FIDE_PROFILE_URL } from "@/lib/links";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "fr"
        ? "À propos de Mikhail Kazakov — Grand Maître & Coach"
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
          <Image
            src="/images/mikhail-kazakov.jpg"
            alt={d.photoAlt}
            width={1200}
            height={1800}
            priority
            sizes="(min-width: 1024px) 300px, 100vw"
            className="w-full rounded-md border border-[var(--border)]"
          />
          <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
              {d.rating}
            </p>
            <p className="font-serif text-2xl font-bold text-[var(--gold)]">
              2513
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
              {d.peakRating}
            </p>
            <p className="font-medium text-[var(--foreground)]">2527</p>
            <p className="mt-3 text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
              {d.titleLabel}
            </p>
            <p className="font-medium text-[var(--foreground)]">
              {d.grandmaster}
            </p>
            <a
              href={FIDE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-sm text-[var(--gold)] hover:text-[var(--gold-hover)]"
            >
              {d.fideProfile}
            </a>
          </div>
        </div>

        {/* Bio text */}
        <div className="space-y-6 text-[var(--foreground-muted)] leading-relaxed">
          <p>{d.opening}</p>
          <p>{d.career}</p>
          <p>{d.coaching}</p>

          <div>
            <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-3">
              {d.achievementsTitle}
            </h3>
            <ul className="space-y-2">
              {d.achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 text-[var(--gold)]">♟</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-3">
              {d.studentsTitle}
            </h3>
            <ul className="space-y-3">
              {d.students.map(({ name, detail }) => (
                <li
                  key={name}
                  className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
                >
                  <p className="font-medium text-[var(--foreground)]">{name}</p>
                  <p className="text-sm">{detail}</p>
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
