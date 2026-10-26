import Link from "next/link";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/lib/strapi";

export default function ProjectCard({
  project,
  index,
  lang,
  dict,
}: {
  project: Project;
  index: number;
  lang: Locale;
  dict: Dictionary["work"];
}) {
  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      className="group grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-line px-3 py-4 outline-accent hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:-outline-offset-2 md:grid-cols-[3rem_1fr_auto_auto_auto] md:items-baseline md:gap-x-6"
    >
      <span className="font-mono text-sm text-fg-muted group-hover:text-on-accent">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="font-display text-xl md:text-2xl">{project.title}</span>
      <span className="col-start-2 font-mono text-sm text-fg-muted group-hover:text-on-accent md:col-start-auto">
        {project.year}
      </span>
      <span className="col-start-2 font-mono text-sm text-fg-muted group-hover:text-on-accent md:col-start-auto">
        {project.stack.slice(0, 3).join(" · ")}
      </span>
      <span className="col-start-2 font-mono text-sm text-fg-muted group-hover:text-on-accent md:col-start-auto">
        [ {dict.status[project.status].toLowerCase()} ]
      </span>
    </Link>
  );
}
