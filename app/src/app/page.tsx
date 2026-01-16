import CalendlySection from "@/components/calendly-section";
import HeroSection from "@/components/hero-section";
import ServiceSection from "@/components/service-section";

export default function Home() {
  return (
    <>
      <main className="mt-10 grid space-y-10 px-6 text-black">
        <HeroSection />
        <ServiceSection />
        <CalendlySection />
      </main>
    </>
  );
}
