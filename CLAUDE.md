@AGENTS.md

# Kazakov Chess Website — CLAUDE.md

## Project Overview

A professional website for chess coach **Mikhail Kazakov** (grandmaster). The site serves as his public presence: bio, lesson booking, and contact info, in French and English.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Booking | Cal.com (hosted, embedded inline) |
| Payments | Off-site (PayPal, bank card), arranged after the free first lesson |
| Email | Resend (contact form) |
| Analytics | PostHog |
| Deployment | Vercel |
| Domain | Porkbun |
| Professional email | Google Workspace |

## Design System

**Theme**: Dark chess aesthetic — premium, serious chess environment.

| Token | Value |
|---|---|
| Background | `#0a0a0a` (near black) |
| Surface | `#141414` / `#1c1c1c` |
| Primary text | `#f5f5f5` |
| Accent / gold | `#c9a84c` |
| Accent hover | `#e0c068` |
| Border | `#2a2a2a` |
| Chess white | `#f0d9b5` |
| Chess dark | `#b58863` |

**Typography**: `Geist` for body text (already included by Next.js scaffold); `Playfair Display` for display headings.

**Motifs**: Subtle chess board grid patterns, chess piece SVG icons as decorative elements, clean grid layouts.

## Pages

Every page lives under `/[lang]` (`fr`, `en`); `proxy.ts` redirects bare paths using the `NEXT_LOCALE` cookie or the browser language.

### `/` — Home / Hero
- Full-viewport hero: Mikhail's name, title ("Grandmaster & Chess Coach"), CTA buttons ("Book a Session", "Learn More")
- Brief intro (2–3 sentences)
- Stats bar: years coaching, students trained, tournament wins
- Preview cards linking to Bio, Booking, Contact

### `/bio` — About / Biography
- Full biography: background, chess career, titles, achievements
- Photo section
- Teaching philosophy
- Credentials and notable tournament results

### `/booking` — Book a Session
- Service picker with five lesson types; durations, prices and Cal.com slugs come from `lib/services.ts`, names and descriptions from the dictionaries.
- Bookable types (private lesson, training game, group lesson) open an inline Cal.com calendar for that event type.
- Simul and tournament support show a "Contact Mikhail" button instead of a calendar.
- Cal.com owns availability, booking rules, and confirmation and cancellation emails.

### `/contact` — Contact
- Contact form: name, email, subject, message
- Form POSTs to API route, sends email via Resend
- Display professional email (Google Workspace)
- Social/chess platform links: Chess.com, Lichess, FIDE profile

## Project Structure

```
kazakov_website/
├── app/
│   ├── layout.tsx                  # Root html/body and fonts
│   ├── globals.css
│   ├── [lang]/
│   │   ├── layout.tsx              # Navbar, Footer, dictionary loading
│   │   ├── dictionaries.ts
│   │   ├── page.tsx                # Home / Hero
│   │   ├── bio/page.tsx
│   │   ├── booking/                # page, ServicePicker, CalBooker
│   │   └── contact/                # page, ContactForm
│   └── api/contact/route.ts        # Sends email via Resend
├── components/                     # Navbar, Footer, LanguageSwitcher, ui/
├── dictionaries/                   # fr.ts defines the Dictionary type; en.ts follows it
├── lib/
│   ├── services.ts                 # Lesson types, durations, prices, Cal.com slugs
│   ├── locales.ts
│   ├── links.ts                    # Contact email, Chess.com and FIDE URLs
│   ├── resend.ts
│   └── posthog.ts                  # Server-side PostHog client
├── instrumentation-client.ts       # PostHog browser init
├── proxy.ts                        # Locale redirect (Next 16 name for middleware)
└── docs/BOOKING_PLAN.md            # Cal.com migration plan and account setup
```

## Integrations

### Cal.com
- Mikhail's hosted Cal.com account owns availability (date overrides), event types, booking rules, and confirmation and cancellation emails.
- In `lib/services.ts`, `CAL_USERNAME` must be his Cal.com username, each `calSlug` an event type slug, and each `durationMin` that event's length.
- `app/[lang]/booking/CalBooker.tsx` embeds one event type with `@calcom/embed-react` and sends `lesson_booked` to PostHog when Cal.com reports a booking.
- Account setup steps: "Cal.com setup with Mikhail" in `docs/BOOKING_PLAN.md`.

### Resend
- Sends contact form messages to `COACH_EMAIL`, with `replyTo` set to the sender.
- Use React Email templates.
- Env vars: `RESEND_API_KEY`, `COACH_EMAIL`, `RESEND_FROM_EMAIL` (optional, defaults to `onboarding@resend.dev`).
- Until a domain is verified in Resend, `COACH_EMAIL` must be the Resend account owner's address.

### PostHog
- Initialized in `instrumentation-client.ts`; browser traffic goes through the `/ingest` rewrite in `next.config.ts`.
- Track page views and key events: `service_selected`, `lesson_booked`, `contact_submitted`.
- Env vars: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`.

## Component Conventions

- Server Components by default; `"use client"` only for forms and interactive UI.
- Tailwind utility classes only — no CSS modules.
- No external UI library unless explicitly requested.

## Forms & Validation

- Client-side validation on all forms (required fields, email format).
- API routes re-validate server-side before sending emails.
- Show success/error state in-page after submission.

## Content Placeholders

Use `[PLACEHOLDER: description]` for any content not yet provided.

## Key Rules

- Mobile-first responsive — test at 375px, 768px, 1280px.
- No comments explaining what code does; only comment non-obvious WHY.
- No unnecessary abstractions beyond what the current task requires.
- Semantic HTML, proper heading hierarchy, alt text on images, keyboard-navigable forms.
