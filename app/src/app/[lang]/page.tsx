import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import CalendlySection from "@/components/calendly-section";
import HeroSection from "@/components/hero-section";
import ProjectSection from "@/components/project-section";
import ServiceSection from "@/components/service-section";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <main className="flex flex-col gap-4 px-2 md:px-0">
      <HeroSection />
      <ServiceSection />
      <ProjectSection />
      <CalendlySection />
    </main>
  );
}
