"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectModal from "./project-modal";
import type { Project, ProjectStatus } from "@/lib/strapi";
import { STATUS_LABELS } from "@/lib/strapi";

const statusColors: Record<ProjectStatus, string> = {
  done: "bg-emerald-500/20 text-emerald-400",
  in_progress: "bg-accent/20 text-accent",
  archived: "bg-white/10 text-muted/60",
};

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="group flex h-64 w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 text-left"
        whileHover={{ y: -4, borderColor: "rgba(252, 163, 17, 0.4)" }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-start justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[project.status]}`}
          >
            {STATUS_LABELS[project.status]}
          </span>
          <FiArrowUpRight
            size={20}
            className="text-muted/30 transition-colors group-hover:text-accent"
          />
        </div>

        <div>
          <h3 className="mb-2 font-serif text-xl font-semibold text-muted">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted/60">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-muted/50"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-xs text-muted/30">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <ProjectModal project={project} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
