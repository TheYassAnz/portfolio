"use client";

import { useEffect } from "react";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import type { Project, ProjectStatus } from "@/lib/strapi";
import { STATUS_LABELS } from "@/lib/strapi";

const statusColors: Record<ProjectStatus, string> = {
  done: "bg-emerald-500/20 text-emerald-400",
  in_progress: "bg-accent/20 text-accent",
  archived: "bg-white/10 text-muted/60",
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-surface p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted/50 transition-colors hover:text-muted"
          aria-label="Fermer"
        >
          <FiX size={20} />
        </button>

        {/* Status */}
        <span
          className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColors[project.status]}`}
        >
          {STATUS_LABELS[project.status]}
        </span>

        <h2 className="mb-2 font-serif text-2xl font-bold text-muted">
          {project.title}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-muted/70">
          {project.longDescription || project.description}
        </p>

        {/* Stack */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold tracking-widest text-accent uppercase">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-muted/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent"
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
              className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              <FiExternalLink size={16} />
              Demo live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
