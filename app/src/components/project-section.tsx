import { getProjects } from "@/lib/strapi";
import type { Locale } from "@/lib/i18n";
import AnimatedProjectGrid from "./ui/animated-project-grid";

export default async function ProjectSection({
  lang,
}: {
  lang: Locale;
}) {
  const projects = await getProjects(lang);
  // Hide the section rather than show an empty heading when Strapi is down.
  if (!projects.length) return null;

  return (
    <section id="projects" className="scroll-mt-24 py-16">
      <AnimatedProjectGrid projects={projects} />
    </section>
  );
}
