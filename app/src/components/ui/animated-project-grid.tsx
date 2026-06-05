"use client";

import { motion } from "framer-motion";
import ProjectCard from "./project-card";
import type { Project } from "@/lib/strapi";

const ease = [0.16, 1, 0.3, 1] as const;

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export default function AnimatedProjectGrid({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={headingVariants} className="mb-10">
        <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
          Réalisations
        </p>
        <h2 className="font-serif text-4xl font-bold text-muted">Projets</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        variants={gridVariants}
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={cardVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
