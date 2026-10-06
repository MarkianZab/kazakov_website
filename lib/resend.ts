import { Resend } from "resend";

export function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

// Until a domain is verified in Resend, this must stay onboarding@resend.dev,
// and COACH_EMAIL must be the email address that owns the Resend account.
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Kazakov Chess <onboarding@resend.dev>";
export const COACH_EMAIL = process.env.COACH_EMAIL;
