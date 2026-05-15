import CalendlySection from "@/components/calendly-section";
import HeroSection from "@/components/hero-section";
import ProjectSection from "@/components/project-section";
import ServiceSection from "@/components/service-section";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 px-2 md:px-0">
      <HeroSection />
      <ServiceSection />
      <ProjectSection />
      <CalendlySection />
    </main>
  );
}
