import { notFound } from "next/navigation";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

type Props = { params: Promise<{ lang: string }> };

const highlightIcons = ["♟", "♖", "♜"] as const;
const highlightHrefs = ["bio", "booking", "contact"] as const;

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const d = dict.home;
  const base = `/${lang}`;

  const stats = [
    { value: "20+", key: "yearsCoaching" as const },
    { value: String(dict.bio.students.length), key: "champions" as const },
    { value: "GM", key: "fideTitle" as const },
    { value: "2527", key: "peakRating" as const },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden chess-pattern">
        <div className="absolute inset-0 bg-[var(--background)]/85" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:min-h-[92vh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
          <div className="text-center lg:text-left">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
              {d.badge}
            </p>
            <h1 className="font-serif text-5xl font-bold leading-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              Mikhail Kazakov
            </h1>
            <p className="mt-4 font-serif text-xl text-[var(--foreground-muted)] sm:text-2xl">
              {d.subtitle}
            </p>
            <p className="mx-auto mt-6 max-w-xl text-[var(--foreground-muted)] lg:mx-0">
              {d.intro}
            </p>
            <div className="mt-8 rounded-md border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-6 py-5 text-left">
              <p className="font-serif text-2xl font-bold text-[var(--gold)] sm:text-3xl">
                {d.firstFree}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
                {d.firstFreeSub}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start">
              <LinkButton href={`${base}/booking`} size="lg">
                {d.cta}
              </LinkButton>
              <LinkButton href={`${base}/bio`} variant="outline" size="lg">
                {d.learnMore}
              </LinkButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
            <div
              aria-hidden
              className="absolute -inset-3 translate-x-3 translate-y-3 rounded-md border border-[var(--gold)]/30"
            />
            <Image
              src="/images/mikhail-kazakov.jpg"
              alt={dict.bio.photoAlt}
              width={1200}
              height={1800}
              priority
              sizes="(min-width: 1024px) 384px, 320px"
              className="relative w-full rounded-md border border-[var(--border)]"
            />
          </div>
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
