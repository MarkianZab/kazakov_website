# Kazakov website: Cal.com booking migration (instructions for Cursor)

## How to use this file

1. Save this file in the repo as `docs/BOOKING_PLAN.md`.
2. In Cursor, run one task at a time: "Read docs/BOOKING_PLAN.md and do Task 1 only." Review the diff, run the app, commit, then move to the next task.
3. Don't ask Cursor to do everything in one go. Task 6 deletes a lot of code, and you want Tasks 1 to 5 working before that happens.

**Important for Cursor:** this plan was written against GitHub `main` (commit `c201c0b`, June 26). The local code is newer: the live site shows five offerings priced in EUR and a "couldn't load the schedule" error that `main` doesn't have. Before every task, **read the current version of each file mentioned**, and adapt the steps to what is actually there. Where this plan and the local code disagree on content (prices, wording), keep what the local code has.

---

## Decisions already made (context for Cursor)

* Booking moves to **Cal.com (hosted, free plan)**, embedded **inline** on `/[lang]/booking`. Students never leave the site to book. Cal.com's confirmation emails link to cal.com for reschedule and cancel, and that is accepted.
* The account belongs to Mikhail. He **adds the hours he is free himself** (date overrides in Cal.com). There is no recurring weekly schedule. Sundays never.
* The student **picks a service first**. The page shows that service's duration and price, then the calendar for that service only.
* Bookable services (one Cal.com event type each): **1 on 1 lesson**, **Training game with analysis**, **Group lesson**. **Simultaneous exhibition** and **Tournament support** appear as options too, but selecting them shows a "Contact Mikhail" button instead of a calendar.
* Rules live in Cal.com, not in code: 24h minimum notice, 30 day booking window, 30 min buffer after each booking, instant confirmation, free cancellation.
* Meeting location is one **permanent Microsoft Teams link** (his Teams is a personal account, and Cal.com's Teams app only supports work or school accounts).
* No payment in the booking flow. First lesson is free; payment is arranged afterwards.
* **Supabase, the `/admin` dashboard and all Stripe code are deleted.**
* Contact form emails go through Resend. Until the domain is bought, they go to the email address that owns the Resend account (a Resend test mode limitation). After the domain is verified, only env vars change.

---

## Task 1: Make the contact form deliver (do this first, ship it alone)

**Files:** `lib/resend.ts`, `app/api/contact/route.ts`

1. In `lib/resend.ts`, replace the hardcoded constants with env vars:

   ```ts
   import { Resend } from "resend";

   export function getResend() {
     return new Resend(process.env.RESEND_API_KEY);
   }

   // Until a domain is verified in Resend, this must stay onboarding@resend.dev,
   // and COACH_EMAIL must be the email address that owns the Resend account.
   export const FROM_EMAIL =
     process.env.RESEND_FROM_EMAIL ?? "Kazakov Chess <onboarding@resend.dev>";
   export const COACH_EMAIL = process.env.COACH_EMAIL;
   ```

2. In `app/api/contact/route.ts`, before sending: if `COACH_EMAIL` is missing, `console.error` it and return `{ error: "Email is not configured." }` with status 500. Never fall back to sending to the sender address (the current fallback is why mail silently went nowhere).
3. Keep `replyTo: email` so Mikhail can reply straight to the student.
4. Keep the existing error handling and PostHog capture.

**Done when:** with `COACH_EMAIL` set to the Resend account owner's email in `.env.local`, submitting the form on `/fr/contact` and `/en/contact` puts a message in that inbox, and hitting reply goes to the student's address.

---

## Task 2: Service config (single source of truth)

**New file:** `lib/services.ts`

```ts
export const CAL_USERNAME = "REPLACE_WITH_MIKHAILS_CAL_USERNAME";

export type ServiceId = "private" | "training" | "group" | "simul" | "tournament";

export type Service = {
  id: ServiceId;
  durationMin: number | null;   // null = varies, shown as "by arrangement"
  price: string | null;         // display string, e.g. "€50"; null = custom
  calSlug: string | null;       // Cal.com event slug; null = not bookable online
};

// durationMin MUST match the length set on the Cal.com event type.
export const SERVICES: Service[] = [
  { id: "private",    durationMin: 60,   price: "€50",  calSlug: "private-lesson" },
  { id: "training",   durationMin: 60,   price: "€50",  calSlug: "training-game" },
  { id: "group",      durationMin: 90,   price: "€100", calSlug: "group-lesson" },
  { id: "simul",      durationMin: null, price: "€100", calSlug: null },
  { id: "tournament", durationMin: null, price: null,   calSlug: null },
];

export const calLinkFor = (s: Service) =>
  s.calSlug ? `${CAL_USERNAME}/${s.calSlug}` : null;
```

* Durations (60, 60, 90) are placeholders until Mikhail confirms. Prices: copy whatever the local code currently shows.
* Names and descriptions stay in the dictionaries (Task 4), keyed by `ServiceId`, so French and English both work.

---

## Task 3: New booking page with service picker and Cal.com embed

**Install:** `npm install @calcom/embed-react` (1.5.3 at time of writing).

**New file:** `app/[lang]/booking/CalBooker.tsx`

```tsx
"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import posthog from "posthog-js";

export function CalBooker({ calLink, serviceId }: { calLink: string; serviceId: string }) {
  const namespace = `book-${serviceId}`;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace });
      if (cancelled) return;
      cal("ui", {
        theme: "dark",
        layout: "month_view",
        hideEventTypeDetails: true, // our page already shows name, duration, price
        styles: { branding: { brandColor: "#c9a84c" } },
      });
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: (e) => {
          posthog.capture("lesson_booked", {
            service: serviceId,
            start_time: e.detail.data.startTime,
          });
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [namespace, serviceId]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      config={{ layout: "month_view", theme: "dark" }}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
    />
  );
}
```

**New file:** `app/[lang]/booking/ServicePicker.tsx` (client component)

* Props: `dict` (the booking dictionary), `lang`, `contactHref`.
* Renders `SERVICES` as a grid of selectable cards (1 column on mobile, 2 or 3 on desktop). Each card shows: name, duration (`60 min`, or `dict.durationByArrangement` when null), price (or `dict.priceCustom` when null), one line description.
* Use the existing design tokens and classes from `SlotPicker.tsx` (gold border and `bg-[var(--gold)]/15` when selected, `var(--border)` and `var(--surface)` otherwise). Cards are `<button>`s with `aria-pressed`.
* Nothing is selected on load; below the grid show `dict.choosePrompt`.
* When a bookable service is selected: show a heading like "1 on 1 lesson · 60 min · €50", then `<CalBooker key={service.id} calLink=... serviceId=... />` inside a container with a fixed minimum height (about 650px) so the page doesn't jump while the iframe loads. `key` forces a fresh embed per service. Smooth scroll the container into view.
* When `simul` or `tournament` is selected: show `dict.contactOnlyNote` and a `LinkButton` to `contactHref` with `dict.contactMikhail`.
* Show `dict.timezoneNote` under the calendar (Cal.com shows times in the student's own time zone, with a zone picker).
* `posthog.capture("service_selected", { service: id })` on click.

**Edit:** `app/[lang]/booking/page.tsx`

* Remove the Supabase import and query, and `export const revalidate = 30`.
* Keep `SectionHeader` and the free first lesson banner.
* Replace the single session card and `SlotPicker` with `<ServicePicker dict={d} lang={lang} contactHref={`/${lang}/contact`} />`.
* In `generateMetadata`, delete the `"uk"` branch.

**Delete:** `app/[lang]/booking/SlotPicker.tsx`.

**Done when:** `/fr/booking` and `/en/booking` show five cards; clicking 1 on 1 shows its calendar with Mikhail's open hours; switching to Group lesson swaps the calendar; Simul shows the contact button; a test booking completes inside the page and fires `lesson_booked` in PostHog.

---

## Task 4: Dictionary updates (`dictionaries/fr.ts` and `dictionaries/en.ts`)

Change both files identically in structure. `Dictionary` is typed from `fr.ts`, so add new keys there first.

1. In `booking`, **add**:
   * `services`: an object keyed by `ServiceId`, each with `name` and `desc`.
     EN names: "1 on 1 lesson", "Training game with analysis", "Group lesson", "Simultaneous exhibition", "Tournament support".
     FR names: "Leçon particulière", "Partie d'entraînement avec analyse", "Leçon de groupe", "Simultanée", "Accompagnement en tournoi".
   * `choosePrompt`: EN "Choose a lesson type to see available times." FR "Choisissez un type de séance pour voir les créneaux disponibles."
   * `contactOnlyNote`: EN "This is arranged directly with Mikhail." FR "Cette prestation s'organise directement avec Mikhail."
   * `durationByArrangement`: EN "Duration by arrangement" FR "Durée à convenir"
   * `priceCustom`: EN "On request" FR "Sur demande"
   * `timezoneNote`: EN "Times are shown in your time zone. Lessons take place on Microsoft Teams; the link is in your confirmation email." FR "Les horaires sont affichés dans votre fuseau horaire. Les cours ont lieu sur Microsoft Teams ; le lien figure dans votre email de confirmation."
   * `cancelNote`: EN "Free cancellation at any time using the link in your confirmation email." FR "Annulation gratuite à tout moment via le lien de votre email de confirmation." Render it under `timezoneNote`.
2. In `booking`, **remove** keys only `SlotPicker` used: `sessionName`, `sessionDetails`, `sessionPrice`, `sessionDesc`, `slotsTitle`, `noSlots`, `localTimeNote`, `kyivNote`, `selectPrompt`, `form`, `success`, `slotTaken`. Keep `contactMikhail`, `label`, `title`, `firstFree*`. Update `subtitle` to: EN "Choose a lesson, pick a time, done." FR "Choisissez une séance, un créneau, c'est réservé."
3. **Search both dictionaries and every page** for "Zoom" and replace it with Microsoft Teams wording. Search for "90 minutes" and "60 to 90" / "60–90" and replace with the per service durations from `lib/services.ts`.
4. Leave the `availability` dictionary section for Task 5.

**Done when:** `npx tsc --noEmit` passes and no page mentions Zoom.

---

## Task 5: Fix broken links and leftovers

1. `/[lang]/availability` doesn't exist (404), but it is linked from `app/[lang]/page.tsx` (`highlightHrefs`) and `components/Footer.tsx`. Point both at `booking`. In the Footer, drop the duplicate entry if Booking is already listed. Remove `nav.availability` and the top level `availability` dictionary section if nothing uses them after this.
2. `app/layout.tsx`: replace `["fr", "en", "uk"]` with `locales` from `lib/locales.ts`.
3. `app/[lang]/bio/page.tsx` and `app/[lang]/contact/page.tsx`: delete the `"uk"` metadata branches.
4. `app/[lang]/dictionaries.ts` and `middleware.ts` each define their own locale list; import from `lib/locales.ts` instead.

---

## Task 6: Delete Supabase, admin and Stripe (separate commit)

**Delete these files and folders:**

* `app/admin/` (whole folder)
* `app/api/book-slot/`
* `app/api/booking-request/`
* `app/api/checkout/`
* `app/api/webhooks/` (Stripe webhook)
* `lib/supabase.ts`, `lib/supabase-server.ts`, `lib/supabase-browser.ts`
* `lib/stripe.ts`

**Edit `middleware.ts`:** remove the `@supabase/ssr` import and the entire `/admin` block. Keep the locale redirect and cookie logic exactly as is.

**Uninstall:** `npm uninstall @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js next-intl`

**Then:** search the whole repo for `supabase`, `stripe`, `SESSION_TYPES`, `bookable_slots`, `admin`, and remove any remaining references (including in `posthog-setup-report.md` if it describes deleted events).

**Update docs:** in `README.md` and `CLAUDE.md`, remove Supabase and Stripe from the stack, add "Cal.com (embedded booking)", and list the env vars that are still used (below).

**Done when:** `npm run build` succeeds with no warnings about missing modules, and `/admin` returns 404.

---

## Task 7: Final checks before merging

Run `npm run lint` and `npm run build`, then `npm run start` and check by hand:

* [ ] `/` redirects to `/fr` (or `/en` for an English browser).
* [ ] Home, bio, booking, contact all load in FR and EN; the language switcher works on each.
* [ ] No link anywhere goes to `/availability` or `/admin`.
* [ ] Booking: every bookable service shows its own calendar; simul and tournament show the contact button.
* [ ] Booking on a phone width (375px): cards stack, calendar is usable, no horizontal scroll.
* [ ] One real test booking per service lands in Mikhail's Google Calendar with the Teams link, then cancel it from the email.
* [ ] Contact form message arrives.
* [ ] PostHog shows `service_selected`, `lesson_booked`, `contact_submitted`.

---

## Environment variables

**Keep in Vercel:** `RESEND_API_KEY`, `COACH_EMAIL`, `RESEND_FROM_EMAIL` (optional until domain), `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`.

**Remove from Vercel after Task 6 is deployed:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`. Then roll the Stripe keys in the Stripe dashboard and pause the Supabase project (delete it a couple of weeks later).

**After buying the domain:** add it in Resend, add the DNS records Resend gives you, wait for "Verified", then set `RESEND_FROM_EMAIL="Kazakov Chess <site@yourdomain>"` and `COACH_EMAIL` to Mikhail's real address. No code change needed.

---

## Not for Cursor: Cal.com setup with Mikhail (do before Task 3 testing)

1. Mikhail signs up at cal.com with his own email. Pick the username and paste it into `CAL_USERNAME` in `lib/services.ts`.
2. Settings > General: time zone **Europe/Kyiv**. Settings > Appearance: dark theme, brand color `#c9a84c`.
3. Connect **Google Calendar**: check his calendar for conflicts, and add new bookings to it.
4. Availability: make the default schedule **empty** (all days off). He adds each block of free hours as a **date override**. Show him how to do this from his phone.
5. In Teams, create one meeting link and save it. Test that it still opens a week later.
6. Create three event types with slugs **exactly** matching `lib/services.ts` (`private-lesson`, `training-game`, `group-lesson`). For each one:
   * Duration matches `durationMin`.
   * Location: "Link meeting" with the Teams link. Remove Cal Video.
   * Limits: minimum notice 24 hours; future bookings limited to 30 days; buffer after event 30 minutes.
   * Requires confirmation: **off**.
   * Booking questions (in addition to name and email):
     * Preferred contact (required, select): Telegram / WhatsApp / Email
     * Telegram or WhatsApp handle or number (optional, short text)
     * Rating and platform, e.g. "1800 Lichess" (optional, short text)
     * First lesson with Mikhail? (required, Yes / No)
   * Description in French and English, including "Free cancellation at any time."
7. Check whether the free plan lets you hide Cal.com branding (Settings > Appearance). If not, leave it.
8. Make one test booking per event type, check it shows in Google Calendar with the Teams link, then cancel.
