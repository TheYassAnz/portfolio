import CalendlySection from "@/components/calendly-section";
import FooterSection from "@/components/footer-section";
import HeroSection from "@/components/hero-section";
import ServiceSection from "@/components/service-section";

export default function Home() {
  return (
    <>
      <main className="mx-auto mt-10 grid space-y-10 text-black">
        <HeroSection />
        <ServiceSection />
        <CalendlySection />
        <FooterSection />
      </main>
    </>
  );
}
