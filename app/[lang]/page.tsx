import { notFound } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

type Props = { params: Promise<{ lang: string }> };

const stats = [
  { value: "20+", key: "yearsCoaching" as const },
  { value: "500+", key: "studentsTrained" as const },
  { value: "GM", key: "fideTitle" as const },
  { value: "2600+", key: "peakRating" as const },
];

const highlightIcons = ["♟", "♖", "♜"] as const;
const highlightHrefs = ["bio", "booking", "availability"] as const;

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const d = dict.home;
  const base = `/${lang}`;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 text-center chess-pattern">
        <div className="absolute inset-0 bg-[var(--background)]/85" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
            {d.badge}
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            Mikhail Kazakov
          </h1>
          <p className="mt-4 font-serif text-xl text-[var(--foreground-muted)] sm:text-2xl">
            {d.subtitle}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-[var(--foreground-muted)]">
            {d.intro}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-1.5 text-sm text-[var(--gold)]">
            <span>🎁</span> {d.firstFree}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <LinkButton href={`${base}/booking`} size="lg">
              {d.cta}
            </LinkButton>
            <LinkButton href={`${base}/bio`} variant="outline" size="lg">
              {d.learnMore}
            </LinkButton>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[var(--foreground-muted)]">
          ↓
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-4xl grid-cols-2 divide-x divide-y divide-[var(--border)] sm:grid-cols-4 sm:divide-y-0">
          {stats.map(({ value, key }) => (
            <div key={key} className="px-8 py-6 text-center">
              <p className="font-serif text-3xl font-bold text-[var(--gold)]">
                {value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
                {d.stats[key]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeader
          label={d.offerLabel}
          title={d.offerTitle}
          subtitle={d.offerSubtitle}
          centered
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {d.highlights.map(({ title, description }, i) => (
            <Link
              key={i}
              href={`${base}/${highlightHrefs[i]}`}
              className="group rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--gold)]/40 hover:bg-[var(--surface-2)]"
            >
              <span className="text-3xl">{highlightIcons[i]}</span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--gold)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
                {description}
              </p>
              <p className="mt-4 text-xs font-medium text-[var(--gold)] opacity-0 transition-opacity group-hover:opacity-100">
                {d.learnMoreLink}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] px-4 py-16 text-center">
        <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
          {d.ctaBannerTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[var(--foreground-muted)]">
          {d.ctaBannerSubtitle}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <LinkButton href={`${base}/booking`} size="lg">
            {d.cta}
          </LinkButton>
          <LinkButton href={`${base}/contact`} variant="outline" size="lg">
            {d.getInTouch}
          </LinkButton>
        </div>
      </section>
    </>
  );
}
