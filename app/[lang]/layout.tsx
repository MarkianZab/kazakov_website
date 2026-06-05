import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <PostHogProvider>
      <Navbar dict={dict.nav} locale={lang as Locale} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict.footer} nav={dict.nav} locale={lang as Locale} />
    </PostHogProvider>
  );
}
