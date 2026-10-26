import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import MotionProvider from "@/components/ui/motion-provider";
import { THEME_SCRIPT } from "@/components/ui/theme-toggle";
import { isLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/content";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-space-grotesk",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { meta } = getDictionary(lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { fr: "/fr", en: "/en" } },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`scroll-smooth ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="grid-bg mx-auto max-w-7xl bg-bg px-4 font-mono text-fg md:px-8">
        <MotionProvider>
          <Navbar dict={getDictionary(lang)} lang={lang} />
          {children}
          <FooterSection dict={getDictionary(lang)} />
        </MotionProvider>
      </body>
    </html>
  );
}
