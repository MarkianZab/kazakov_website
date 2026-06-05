// PostHog is initialized in instrumentation-client.ts (Next.js 15.3+ pattern).
// This component exists only to avoid breaking the import in layout.tsx.
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
