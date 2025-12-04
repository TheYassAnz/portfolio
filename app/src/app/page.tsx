import CalendlySection from "@/components/calendly-section";
import FooterSection from "@/components/footer-section";
import HeroSection from "@/components/hero-section";
import ServiceSection from "@/components/service-section";

export default function Home() {
  return (
    <>
      <main className="mx-auto mt-10 grid max-w-7xl space-y-10 px-4 text-black md:px-8">
        <HeroSection />
        <ServiceSection />
        <CalendlySection />
        <FooterSection />
      </main>
    </>
  );
}
