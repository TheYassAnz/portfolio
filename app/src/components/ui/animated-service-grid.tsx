"use client";

import { motion } from "framer-motion";
import ServiceCard from "./service-card";
import type { ReactNode } from "react";

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

type Service = {
  title: string;
  description: string;
  icon: ReactNode;
};

export default function AnimatedServiceGrid({
  services,
}: {
  services: Service[];
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={headingVariants} className="mb-10">
        <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
          Ce que je fais
        </p>
        <h2 className="font-serif text-4xl font-bold text-muted">Services</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
        variants={gridVariants}
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={cardVariants}>
            <ServiceCard {...service} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
