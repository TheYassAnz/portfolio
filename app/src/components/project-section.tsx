import { getProjects } from "@/lib/strapi";
import AnimatedProjectGrid from "./ui/animated-project-grid";

export default async function ProjectSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="scroll-mt-24 py-16">
      <AnimatedProjectGrid projects={projects} />
    </section>
  );
}
