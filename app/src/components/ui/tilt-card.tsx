"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const shineX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(ySpring, [-0.5, 0.5], ["0%", "100%"]);
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.07) 0%, transparent 60%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div style={{ perspective: "1000px" }} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full"
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: shine }}
        />
      </motion.div>
    </div>
  );
}
