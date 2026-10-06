import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/dictionaries/fr";
import {
  CHESSCOM_PROFILE_URL,
  CONTACT_EMAIL,
  FIDE_PROFILE_URL,
} from "@/lib/links";

type FooterDict = Dictionary["footer"];
type NavDict = Dictionary["nav"];

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
    { href: `${base}/contact`, label: nav.contact },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <Image
              src="/images/logo.png"
              alt=""
              width={775}
              height={532}
              sizes="82px"
              className="h-14 w-auto"
            />
            <p className="mt-3 font-serif text-lg font-semibold text-[var(--gold)]">
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
                  href={CHESSCOM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--gold)]"
                >
                  Chess.com
                </a>
              </li>
              <li>
                <a
                  href={FIDE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--gold)]"
                >
                  FIDE
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--gold)]"
                >
                  {CONTACT_EMAIL}
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
