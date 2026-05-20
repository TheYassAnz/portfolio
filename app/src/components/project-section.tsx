import ProjectCard from "./ui/project-card";
import { getProjects } from "@/lib/strapi";

export default async function ProjectSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="scroll-mt-24 py-16">
      <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
        Réalisations
      </p>
      <h2 className="mb-10 font-serif text-4xl font-bold text-muted">Projets</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
