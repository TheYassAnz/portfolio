"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Terminal from "./ui/terminal";
import {
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiFigma,
  SiTerraform,
  SiJenkins,
  SiKubernetes,
} from "react-icons/si";

const skills = [
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, label: "Next.js", color: "#e5e5e5" },
  { icon: SiExpo, label: "Expo", color: "#e5e5e5" },
  { icon: SiFigma, label: "Figma", color: "#F24E1E" },
  { icon: SiTerraform, label: "Terraform", color: "#844FBA" },
  { icon: SiJenkins, label: "Jenkins", color: "#D33833" },
  { icon: SiKubernetes, label: "Kubernetes", color: "#326CE5" },
];

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const terminalVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease, delay: 0.2 } },
};

export default function HeroSection() {
  return (
    <section className="relative grid items-center gap-12 overflow-hidden py-16 md:grid-cols-2 md:py-24">
      {/* Text */}
      <motion.div
        className="relative flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Availability + role */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Disponible
          </span>
          <span className="text-sm font-semibold tracking-widest text-muted/40 uppercase">
            Développeur Full-Stack
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants}>
          <h1 className="font-serif text-5xl leading-tight font-bold text-muted md:text-6xl">
            Yassine
            <br />
            <span className="bg-linear-to-r from-accent via-yellow-300 to-orange-300 bg-clip-text text-transparent">
              ANZAR BASHA
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p className="max-w-md text-muted/70" variants={itemVariants}>
          Je conçois et développe des applications web et mobiles modernes, du
          design à l&apos;infrastructure — pour les entreprises et les
          entrepreneurs ambitieux.
        </motion.p>

        {/* Skills marquee */}
        <motion.div
          variants={itemVariants}
          className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <div className="flex w-max animate-marquee gap-3">
            {[...skills, ...skills].map(({ icon: Icon, label, color }, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-surface px-3 py-1.5 text-sm text-muted/80"
              >
                <Icon style={{ color }} size={16} />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="flex items-center gap-4" variants={itemVariants}>
          <Link
            href="#contact"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
          >
            Prendre RDV
          </Link>
          <Link
            href="#projects"
            className="text-sm text-muted/70 underline underline-offset-4 transition-colors hover:text-accent"
          >
            Voir mes projets
          </Link>
        </motion.div>
      </motion.div>

      {/* Terminal */}
      <motion.div
        className="hidden justify-end md:flex"
        variants={terminalVariants}
        initial="hidden"
        animate="visible"
      >
        <Terminal />
      </motion.div>
    </section>
  );
}
