import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import ContactSection from "@/components/contact-section";
import HeroSection from "@/components/hero-section";
import ProjectSection from "@/components/project-section";
import AboutSection from "@/components/about-section";
import StackSection from "@/components/stack-section";
import StatsSection from "@/components/stats-section";
import { getDictionary } from "@/content";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <main className="flex flex-col gap-4 px-2 md:px-0">
      <HeroSection key={lang} dict={dict} />
      <StatsSection stats={dict.stats} />
      <ProjectSection lang={lang} dict={dict} />
      <AboutSection dict={dict.about} />
      <StackSection dict={dict.stack} />
      <ContactSection dict={dict.contact} />
    </main>
  );
}
