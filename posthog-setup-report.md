<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Kazakov Chess website. PostHog is initialized via `instrumentation-client.ts` (the correct Next.js 15.3+ / 16 pattern) using the EU region (`eu.i.posthog.com`). A reverse proxy in `next.config.ts` routes all analytics traffic through `/ingest`, improving ad-blocker bypass. Exception capture and session recording are enabled out of the box. Users are identified on admin login via `posthog.identify`.

Four new events were added to supplement the existing seven, covering the full student lifecycle from first contact through paid booking — including previously missing error paths and the Stripe checkout step.

| Event | Description | File |
|---|---|---|
| `booking_requested` | Student submitted the lesson request form (existing) | `app/[lang]/booking/BookingForm.tsx` |
| `booking_request_failed` | Lesson request form submission failed (existing) | `app/[lang]/booking/BookingForm.tsx` |
| `contact_submitted` | Visitor submitted the contact form (existing) | `app/[lang]/contact/ContactForm.tsx` |
| `contact_submission_failed` | Contact form submission failed with error | `app/[lang]/contact/ContactForm.tsx` |
| `admin_signed_in` | Admin logged in via Supabase (with identify) (existing) | `app/admin/login/LoginForm.tsx` |
| `admin_login_failed` | Admin login failed (wrong credentials or Supabase error) | `app/admin/login/LoginForm.tsx` |
| `admin_signed_out` | Admin signed out via Server Action | `app/admin/actions.ts` |
| `checkout_initiated` | Server: Stripe Checkout session created — bridges form to payment | `app/api/checkout/route.ts` |
| `booking_request_received` | Server: booking processed, coach notification email sent (existing) | `app/api/booking-request/route.ts` |
| `contact_message_received` | Server: contact message processed, email sent (existing) | `app/api/contact/route.ts` |
| `booking_payment_completed` | Server: Stripe webhook fired — booking paid and saved (existing) | `app/api/webhooks/stripe/route.ts` |

## Next steps

We've built a dashboard with five insights to track the most important business metrics:

- [Analytics basics dashboard](/dashboard/713494)
- [Booking Request Funnel](/insights/F4fuKCAY) — conversion from form submission to confirmed booking request
- [Booking Requests Over Time](/insights/k023NBjR) — weekly line chart of lesson requests
- [Contact vs Booking Activity](/insights/LktFF1YK) — contact and booking trends side by side
- [Booking Requests by Platform](/insights/CvlWnGWb) — bar chart of Zoom vs Teams preference
- [Payments Completed](/insights/rKnTnDLq) — total paid bookings (bold number)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
