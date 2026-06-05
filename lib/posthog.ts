import { PostHog } from "posthog-node";

// Server-side PostHog client for API routes
export function getServerPostHog() {
  return new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
}
