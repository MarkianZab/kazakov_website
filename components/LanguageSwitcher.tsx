"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/locales";

const labels: Record<Locale, string> = { fr: "FR", en: "EN" };

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: Locale) {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-0.5">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`rounded px-2 py-1 text-xs font-medium uppercase tracking-wider transition-colors ${
            locale === currentLocale
              ? "bg-[var(--gold)]/15 text-[var(--gold)]"
              : "text-[var(--foreground-muted)] hover:text-[var(--gold)]"
          }`}
          aria-label={`Switch to ${locale}`}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
