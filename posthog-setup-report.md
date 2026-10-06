<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Kazakov Chess website. PostHog is initialized via `instrumentation-client.ts` (the correct Next.js 15.3+ / 16 pattern) using the EU region (`eu.i.posthog.com`). A reverse proxy in `next.config.ts` routes all analytics traffic through `/ingest`, improving ad-blocker bypass. Exception capture and session recording are enabled out of the box.

Updated 2026-10-05 for the move to Cal.com booking. The admin login, Stripe checkout, booking request and slot booking events were removed along with their code.

| Event | Description | File |
|---|---|---|
| `service_selected` | Visitor picked a lesson type on the booking page | `app/[lang]/booking/ServicePicker.tsx` |
| `lesson_booked` | Cal.com embed reported a completed booking | `app/[lang]/booking/CalBooker.tsx` |
| `contact_submitted` | Visitor submitted the contact form | `app/[lang]/contact/ContactForm.tsx` |
| `contact_submission_failed` | Contact form submission failed with error | `app/[lang]/contact/ContactForm.tsx` |
| `contact_message_received` | Server: contact message processed, email sent | `app/api/contact/route.ts` |

## Next steps

The [Analytics basics dashboard](/dashboard/713494) still holds insights built on the removed events: Booking Request Funnel, Booking Requests Over Time, Contact vs Booking Activity, Booking Requests by Platform and Payments Completed. Replace them with insights on the new events, such as a funnel from `service_selected` to `lesson_booked`.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
