# Mikhail Kazakov — chess coaching website

Public site for Grandmaster Mikhail Kazakov: biography, lesson booking and contact, in French (default) and English.

## Stack

- Next.js (App Router) + TypeScript, Tailwind CSS
- Cal.com (embedded booking) on `/[lang]/booking`
- Resend for contact form email
- PostHog for analytics
- Vercel for hosting

## Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key. |
| `COACH_EMAIL` | Inbox for contact form messages. Until a domain is verified in Resend, this must be the Resend account owner's email. |
| `RESEND_FROM_EMAIL` | Optional sender, e.g. `Kazakov Chess <site@yourdomain>`. Defaults to `onboarding@resend.dev`. |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key. |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host for server-side events. |

Set them in `.env.local` for local development and in the Vercel project settings for deployments. When a domain is verified in Resend, only `RESEND_FROM_EMAIL` and `COACH_EMAIL` change.

## Booking

Lesson types, durations, prices and Cal.com event slugs live in `lib/services.ts`; their names and descriptions live in `dictionaries/fr.ts` and `dictionaries/en.ts`. Mikhail manages his free hours, booking rules and confirmation emails in his own Cal.com account. Account setup is in `docs/BOOKING_PLAN.md`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/fr` or `/en` based on the browser language.
