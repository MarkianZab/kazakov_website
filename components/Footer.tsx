import Link from "next/link";
import type { Locale } from "@/lib/locales";

type FooterDict = {
  tagline: string;
  navigation: string;
  findMe: string;
  rights: string;
};

type NavDict = {
  home: string;
  about: string;
  availability: string;
  contact: string;
  book: string;
};

export function Footer({
  dict,
  nav,
  locale,
}: {
  dict: FooterDict;
  nav: NavDict;
  locale: Locale;
}) {
  const base = `/${locale}`;

  const navLinks = [
    { href: base, label: nav.home },
    { href: `${base}/bio`, label: nav.about },
    { href: `${base}/booking`, label: nav.book },
    { href: `${base}/availability`, label: nav.availability },
    { href: `${base}/contact`, label: nav.contact },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-semibold text-[var(--gold)]">
              Mikhail Kazakov
            </p>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              {dict.tagline}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              {dict.navigation}
            </p>
            <ul className="mt-3 space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--gold)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              {dict.findMe}
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://chess.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--gold)]"
                >
                  Chess.com
                </a>
              </li>
              <li>
                <a
                  href="https://lichess.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--gold)]"
                >
                  Lichess
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--foreground-muted)]">
          © {new Date().getFullYear()} Mikhail Kazakov. {dict.rights}
        </div>
      </div>
    </footer>
  );
}
