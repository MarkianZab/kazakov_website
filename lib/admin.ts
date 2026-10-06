// Server-only allowlist of admin emails. Being authenticated with Supabase is
// NOT sufficient to reach /admin — the account's email must be listed here.
// Set ADMIN_EMAILS as a comma-separated list in the environment.
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allow = getAdminEmails();
  return allow.length > 0 && allow.includes(email.trim().toLowerCase());
}
