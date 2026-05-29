import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-semibold text-[var(--gold)]">
              Mikhail Kazakov
            </p>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              Grandmaster & Chess Coach
            </p>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--foreground-muted)]">
              Navigation
            </p>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/bio", label: "About" },
                { href: "/booking", label: "Book a Session" },
                { href: "/availability", label: "Availability" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
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
              Find Me
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
          © {new Date().getFullYear()} Mikhail Kazakov. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
