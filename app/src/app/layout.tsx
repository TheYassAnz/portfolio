import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";
import MotionProvider from "@/components/ui/motion-provider";
import { THEME_SCRIPT } from "@/components/ui/theme-toggle";

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

export const metadata: Metadata = {
  title: "Yassine ANZAR BASHA — Développeur Full-Stack",
  description:
    "Portfolio de Yassine ANZAR BASHA, développeur Full-Stack basé à Paris. Web, Mobile, UI/UX, Architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`scroll-smooth ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="grid-bg mx-auto max-w-7xl bg-bg px-4 font-mono text-fg md:px-8">
        <MotionProvider>
          <Navbar />
          {children}
          <FooterSection />
        </MotionProvider>
      </body>
    </html>
  );
}
