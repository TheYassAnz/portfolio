import { getProjects } from "@/lib/strapi";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import AnimatedProjectGrid from "./ui/animated-project-grid";

export default async function ProjectSection({
  lang,
  dict,
}: Readonly<{
  lang: Locale;
  dict: Dictionary;
}>) {
  const projects = await getProjects(lang);
  // Hide the section rather than show an empty heading when Strapi is down.
  if (!projects.length) return null;

  return (
    <section id="projects" className="scroll-mt-14 py-16">
      <AnimatedProjectGrid projects={projects} lang={lang} dict={dict.work} />
    </section>
  );
}
