import "server-only";
import type { Dictionary } from "@/dictionaries/fr";
export type { Locale } from "@/lib/locales";
export { locales, defaultLocale, hasLocale } from "@/lib/locales";

const loaders = {
  fr: () => import("@/dictionaries/fr").then((m) => m.default),
  en: () => import("@/dictionaries/en").then((m) => m.default),
  uk: () => import("@/dictionaries/uk").then((m) => m.default),
};

export const getDictionary = (locale: keyof typeof loaders): Promise<Dictionary> =>
  loaders[locale]();
