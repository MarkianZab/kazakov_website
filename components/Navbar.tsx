"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/bio", label: "About" },
  { href: "/availability", label: "Availability" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-wide text-[var(--gold)]"
          >
            M. Kazakov
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors hover:text-[var(--gold)] ${
                  pathname === href
                    ? "text-[var(--gold)]"
                    : "text-[var(--foreground-muted)]"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="rounded-sm bg-[var(--gold)] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[var(--gold-hover)]"
            >
              Book a Session
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-[var(--foreground)] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--foreground)] transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--foreground)] transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <nav className="flex flex-col gap-4 border-t border-[var(--border)] py-4 md:hidden">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors hover:text-[var(--gold)] ${
                  pathname === href
                    ? "text-[var(--gold)]"
                    : "text-[var(--foreground-muted)]"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="inline-block w-fit rounded-sm bg-[var(--gold)] px-4 py-2 text-sm font-medium text-black hover:bg-[var(--gold-hover)]"
            >
              Book a Session
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
