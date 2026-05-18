import { getProject, getProjectSlugs, STATUS_LABELS } from "@/lib/strapi";
import type { ProjectStatus } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";

const statusColors: Record<ProjectStatus, string> = {
  done: "bg-emerald-500/20 text-emerald-400",
  in_progress: "bg-accent/20 text-accent",
  archived: "bg-white/10 text-muted/60",
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <main className="py-16">
      <Link
        href="/#projects"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted/60 transition-colors hover:text-accent"
      >
        <FiArrowLeft size={16} />
        Retour aux projets
      </Link>

      <div className="max-w-2xl">
        <span
          className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColors[project.status]}`}
        >
          {STATUS_LABELS[project.status]}
        </span>

        <h1 className="mb-4 font-serif text-5xl font-bold text-muted">
          {project.title}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-muted/70">
          {project.longDescription}
        </p>

        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold tracking-widest text-accent uppercase">
            Stack technique
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-surface px-4 py-1.5 text-sm text-muted/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <FiGithub size={16} />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              <FiExternalLink size={16} />
              Demo live
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
