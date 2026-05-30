import { Resend } from "resend";

export function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export const FROM_EMAIL = "onboarding@resend.dev";
export const COACH_EMAIL = process.env.COACH_EMAIL ?? FROM_EMAIL;
