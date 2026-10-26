import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import CalendlySection from "@/components/calendly-section";
import HeroSection from "@/components/hero-section";
import ProjectSection from "@/components/project-section";
import ServiceSection from "@/components/service-section";
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
      <ServiceSection />
      <ProjectSection />
      <CalendlySection />
    </main>
  );
}
