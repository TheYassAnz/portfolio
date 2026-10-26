import { getProjects } from "@/lib/strapi";
import AnimatedProjectGrid from "./ui/animated-project-grid";

export default async function ProjectSection() {
  const projects = await getProjects();
  // Hide the section rather than show an empty heading when Strapi is down.
  if (!projects.length) return null;

  return (
    <section id="projects" className="scroll-mt-24 py-16">
      <AnimatedProjectGrid projects={projects} />
    </section>
  );
}
