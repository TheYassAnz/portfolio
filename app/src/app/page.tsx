import CalendlySection from "@/components/calendly-section";
import HeroSection from "@/components/hero-section";
import ServiceSection from "@/components/service-section";

export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto md:px-8 px-4 grid space-y-10">
        <HeroSection />
        <ServiceSection />
        <CalendlySection />
      </main>
    </>
  );
}
