"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

export default function ServiceCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface p-6"
      whileHover={{ y: -4, borderColor: "rgba(252, 163, 17, 0.4)" }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold text-muted">{title}</h3>
        <p className="text-sm leading-relaxed text-muted/60">{description}</p>
      </div>
    </motion.div>
  );
}
