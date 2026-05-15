import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import FooterSection from "@/components/footer-section";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
      className={`scroll-smooth ${inter.variable} ${playfair.variable}`}
    >
      <body className="mx-auto max-w-7xl bg-black px-4 text-muted md:px-8">
        <Navbar />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
