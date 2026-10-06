"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { LinkButton } from "@/components/ui/Button";
import { SERVICES, calLinkFor, formatPrice, type ServiceId } from "@/lib/services";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/dictionaries/fr";
import { CalBooker } from "./CalBooker";

export function ServicePicker({
  dict,
  lang,
  contactHref,
}: {
  dict: Dictionary["booking"];
  lang: Locale;
  contactHref: string;
}) {
  const [selectedId, setSelectedId] = useState<ServiceId | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = SERVICES.find((s) => s.id === selectedId) ?? null;
  const calLink = selected ? calLinkFor(selected) : null;

  useEffect(() => {
    if (!selectedId) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [selectedId]);

  function select(id: ServiceId) {
    setSelectedId(id);
    posthog.capture("service_selected", { service: id });
  }

  const duration = (min: number | null) => (min ? `${min} min` : dict.durationByArrangement);
  const price = (eur: number | null) => (eur === null ? dict.priceCustom : formatPrice(eur, lang));

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => {
          const isSelected = s.id === selectedId;
          const text = dict.services[s.id];
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => select(s.id)}
              className={`flex flex-col rounded-md border p-5 text-left transition-all ${
                isSelected
                  ? "border-[var(--gold)] bg-[var(--gold)]/15"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)]/50"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span
                  className={`font-serif text-lg font-semibold ${
                    isSelected ? "text-[var(--gold)]" : "text-[var(--foreground)]"
                  }`}
                >
                  {text.name}
                </span>
                <span className="shrink-0 font-serif text-lg font-semibold text-[var(--gold)]">
                  {price(s.priceEur)}
                </span>
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest text-[var(--foreground-muted)]">
                {duration(s.durationMin)}
              </span>
              <span className="mt-3 text-sm text-[var(--foreground-muted)]">{text.desc}</span>
            </button>
          );
        })}
      </div>

      {!selected && (
        <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
          {dict.choosePrompt}
        </p>
      )}

      {selected && (
        <div ref={panelRef} className="mt-10 scroll-mt-24">
          <h3 className="font-serif text-xl font-semibold text-[var(--foreground)]">
            {dict.services[selected.id].name} · {duration(selected.durationMin)} ·{" "}
            {price(selected.priceEur)}
          </h3>

          {calLink ? (
            <>
              <div className="mt-6 min-h-[650px]">
                <CalBooker key={selected.id} calLink={calLink} serviceId={selected.id} />
              </div>
              <div className="mt-4 space-y-2 text-sm text-[var(--foreground-muted)]">
                <p>{dict.timezoneNote}</p>
                <p>{dict.cancelNote}</p>
                <p>♟ {dict.prepNote}</p>
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <p className="text-[var(--foreground-muted)]">{dict.contactOnlyNote}</p>
              <div className="mt-4">
                <LinkButton href={contactHref} variant="outline" size="sm">
                  {dict.contactMikhail}
                </LinkButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
