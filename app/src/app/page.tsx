import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import ProjectSection from "@/components/project-section";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProjectSection />
    </div>
  );
}
