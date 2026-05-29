import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkButton } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Mikhail Kazakov — Grandmaster & Chess Coach",
  description:
    "Learn about Mikhail Kazakov's chess career, achievements, and coaching philosophy.",
};

const achievements = [
  "[PLACEHOLDER: Tournament win or title, e.g. 'Champion, European Club Cup 20XX']",
  "[PLACEHOLDER: Another achievement]",
  "[PLACEHOLDER: Another achievement]",
  "[PLACEHOLDER: Another achievement]",
];

export default function BioPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Header */}
      <SectionHeader
        label="About"
        title="Mikhail Kazakov"
        subtitle="FIDE Grandmaster · Chess Coach"
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_2fr]">
        {/* Photo */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4] w-full rounded-md border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--foreground-muted)] text-sm">
            [PLACEHOLDER: Coach photo]
          </div>
          <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
              FIDE Rating
            </p>
            <p className="font-serif text-2xl font-bold text-[var(--gold)]">
              [PLACEHOLDER: e.g. 2610]
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
              Title
            </p>
            <p className="font-medium text-[var(--foreground)]">
              Grandmaster (GM)
            </p>
          </div>
        </div>

        {/* Bio text */}
        <div className="space-y-6 text-[var(--foreground-muted)] leading-relaxed">
          <p>
            [PLACEHOLDER: Opening paragraph — background, where Mikhail grew
            up, when he started playing chess, early influences.]
          </p>
          <p>
            [PLACEHOLDER: Chess career paragraph — titles earned, notable
            tournaments, peak rating, international experience.]
          </p>
          <p>
            [PLACEHOLDER: Coaching transition paragraph — when and why Mikhail
            started coaching, who he coaches, approach.]
          </p>

          <div>
            <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-3">
              Notable Achievements
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
              Coaching Philosophy
            </h3>
            <p>
              [PLACEHOLDER: 2–3 sentences on coaching style — e.g.
              "Mikhail believes every player has a unique style worth
              developing…"]
            </p>
          </div>

          <div className="pt-4">
            <LinkButton href="/booking" size="lg">
              Book a Session
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
