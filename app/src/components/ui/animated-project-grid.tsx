"use client";

import { motion } from "framer-motion";
import ProjectCard from "./project-card";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedProjectGrid({
  projects,
  lang,
  dict,
}: {
  projects: Project[];
  lang: Locale;
  dict: Dictionary["work"];
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: 0.05 }}
    >
      <motion.h2 variants={item} className="mb-6 px-3 font-display text-4xl">
        <span className="mr-3 font-mono text-base text-fg-muted">{"// 01"}</span>
        {dict.title}
      </motion.h2>
      <div className="border-t border-line">
        {projects.map((project, i) => (
          <motion.div key={project.slug} variants={item}>
            <ProjectCard project={project} index={i} lang={lang} dict={dict} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
