import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { getDictionary, hasLocale, locales, type Locale } from "./dictionaries";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (lang === "fr") {
    return {
      title: "Mikhail Kazakov — Grand Maître & Coach d'échecs",
      description:
        "Cours d'échecs en ligne avec le Grand Maître Mikhail Kazakov. Plus de 20 ans d'expérience, élèves champions de France jeunes et champion du monde junior. Première leçon gratuite.",
      keywords: [
        "cours d'échecs en ligne",
        "coach d'échecs",
        "grand maître",
        "leçons d'échecs",
      ],
    };
  }
  return {
    title: "Mikhail Kazakov — Grandmaster & Chess Coach",
    description:
      "Online chess lessons with Grandmaster Mikhail Kazakov. Over 20 years of coaching experience, students include French youth champions and a World Junior Champion. First lesson free.",
    keywords: [
      "online chess lessons",
      "chess coach",
      "grandmaster",
      "chess training",
    ],
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <PostHogProvider>
      <HtmlLang lang={lang} />
      <Navbar dict={dict.nav} locale={lang as Locale} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict.footer} nav={dict.nav} locale={lang as Locale} />
    </PostHogProvider>
  );
}
