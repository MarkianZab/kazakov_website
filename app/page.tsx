import { LinkButton } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";

const stats = [
  { value: "20+", label: "Years Coaching" },
  { value: "500+", label: "Students Trained" },
  { value: "GM", label: "FIDE Title" },
  { value: "2600+", label: "Peak Rating" },
];

const highlights = [
  {
    href: "/bio",
    title: "About Mikhail",
    description:
      "Grandmaster, international competitor, and dedicated coach with decades of experience at the highest levels.",
    icon: "♟",
  },
  {
    href: "/booking",
    title: "Book a Session",
    description:
      "Private lessons, game analysis, group sessions, and tournament prep — tailored to your level.",
    icon: "♖",
  },
  {
    href: "/availability",
    title: "Availability",
    description:
      "Browse open time slots and find a schedule that works for you.",
    icon: "♜",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 text-center chess-pattern">
        <div className="absolute inset-0 bg-[var(--background)]/85" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[var(--gold)]">
            FIDE Grandmaster
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            Mikhail Kazakov
          </h1>
          <p className="mt-4 font-serif text-xl text-[var(--foreground-muted)] sm:text-2xl">
            Grandmaster &amp; Chess Coach
          </p>
          <p className="mx-auto mt-6 max-w-xl text-[var(--foreground-muted)]">
            [PLACEHOLDER: 2–3 sentence intro about Mikhail and what students
            can expect from working with him.]
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-1.5 text-sm text-[var(--gold)]">
            <span>🎁</span> First lesson is free
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <LinkButton href="/booking" size="lg">
              Book a Session
            </LinkButton>
            <LinkButton href="/bio" variant="outline" size="lg">
              Learn More
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
          {stats.map(({ value, label }) => (
            <div key={label} className="px-8 py-6 text-center">
              <p className="font-serif text-3xl font-bold text-[var(--gold)]">
                {value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeader
          label="What I Offer"
          title="Chess at Every Level"
          subtitle="From beginners building fundamentals to advanced players preparing for tournaments — every session is built around your goals."
          centered
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {highlights.map(({ href, title, description, icon }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-md border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--gold)]/40 hover:bg-[var(--surface-2)]"
            >
              <span className="text-3xl">{icon}</span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--gold)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">
                {description}
              </p>
              <p className="mt-4 text-xs font-medium text-[var(--gold)] opacity-0 transition-opacity group-hover:opacity-100">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] px-4 py-16 text-center">
        <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
          Ready to improve your game?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[var(--foreground-muted)]">
          Book your first session today and get a personalised plan from a
          Grandmaster.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <LinkButton href="/booking" size="lg">
            Book a Session
          </LinkButton>
          <LinkButton href="/contact" variant="outline" size="lg">
            Get in Touch
          </LinkButton>
        </div>
      </section>
    </>
  );
}
