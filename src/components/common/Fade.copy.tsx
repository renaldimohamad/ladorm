"use client";

import { motion } from "framer-motion";
import React from "react";

type Direction = "up" | "down" | "left" | "right";

interface FadeProps {
  children: React.ReactNode;
  direction?: Direction;
  duration?: number;
  className?: string;
}

const variants = {
  up: { opacity: 0, y: 32 },
  down: { opacity: 0, y: -32 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
};

export default function Fade({
  children,
  direction = "up",
  duration = 0.4,
  className = "",
}: FadeProps) {
  return (
    <motion.section
      initial={variants[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        ease: [0.33, 1, 0.68, 1],
      }}
      viewport={{ once: true, amount: 0.25 }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.section>
  );
}
