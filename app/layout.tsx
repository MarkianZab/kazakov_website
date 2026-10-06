import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mikhail Kazakov — Grandmaster & Chess Coach",
  description:
    "Work with Grandmaster Mikhail Kazakov. Book private lessons and game analysis sessions.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Static default; reading the locale cookie here would force every page
  // dynamic. The [lang] layout corrects the attribute for non-fr locales.
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
