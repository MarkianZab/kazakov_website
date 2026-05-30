export const locales = ["fr", "en", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";
export const hasLocale = (l: string): l is Locale =>
  (locales as readonly string[]).includes(l);
