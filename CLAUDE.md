@AGENTS.md

# Kazakov Chess Website — CLAUDE.md

## Project Overview

A professional website for chess coach **Mikhail Kazakov** (grandmaster). The site serves as his public presence: bio, lesson booking, availability calendar, and contact info.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Auth + Database | Supabase |
| Payments | Stripe |
| Email | Resend |
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
- Session types: 1-on-1 lesson, group lesson, game analysis, tournament prep
- Pricing per session type (stored in Supabase or hardcoded)
- Booking form: name, email, session type, preferred dates/times, notes
- Payment via Stripe Checkout on form submission
- Confirmation email sent via Resend after successful payment

### `/availability` — Availability
- Weekly schedule grid showing open time slots (data from Supabase)
- Timezone note (display coach's local timezone)
- CTA linking to /booking

### `/contact` — Contact
- Contact form: name, email, subject, message
- Form POSTs to API route, sends email via Resend
- Display professional email (Google Workspace)
- Social/chess platform links: Chess.com, Lichess, FIDE profile

## Project Structure

```
kazakov_website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home / Hero
│   ├── bio/page.tsx
│   ├── booking/page.tsx
│   ├── availability/page.tsx
│   ├── contact/page.tsx
│   └── api/
│       ├── contact/route.ts        # Sends email via Resend
│       └── webhooks/stripe/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ui/                         # Button, Card, SectionHeader, etc.
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   ├── resend.ts
│   └── posthog.ts
├── public/images/
├── styles/globals.css
├── tailwind.config.ts
└── next.config.ts
```

## Integrations

### Supabase
- Use `@supabase/supabase-js` with the App Router server client pattern (`@supabase/ssr`).
- Store: availability slots, booking records.
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

### Stripe
- Session booking triggers a Stripe Checkout session (server-side API route).
- Handle `checkout.session.completed` webhook to mark booking confirmed in Supabase.
- Env vars: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`.

### Resend
- Send booking confirmation emails and contact form notifications.
- Use React Email templates.
- Env var: `RESEND_API_KEY`.

### PostHog
- Initialize in `app/layout.tsx` as a client-side provider.
- Track page views and key events (booking started, booking completed, contact submitted).
- Env vars: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`.

## Component Conventions

- Server Components by default; `"use client"` only for forms and interactive UI.
- Tailwind utility classes only — no CSS modules.
- No external UI library unless explicitly requested.

## Forms & Validation

- Client-side validation on all forms (required fields, email format).
- API routes re-validate server-side before sending emails or hitting Stripe.
- Show success/error state in-page after submission.

## Content Placeholders

Use `[PLACEHOLDER: description]` for any content not yet provided.

## Key Rules

- Mobile-first responsive — test at 375px, 768px, 1280px.
- No comments explaining what code does; only comment non-obvious WHY.
- No unnecessary abstractions beyond what the current task requires.
- Semantic HTML, proper heading hierarchy, alt text on images, keyboard-navigable forms.
