"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

type Direction = "up" | "down" | "left" | "right";

interface FadeInSectionProps {
  children: React.ReactNode;
  direction?: Direction;
  className?: string;
}

export default function Fade({
  children,
  direction = "up",
  className = "",
}: FadeInSectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  const getInitial = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -40 };
      case "right":
        return { opacity: 0, x: 40 };
      case "down":
        return { opacity: 0, y: -40 };
      case "up":
      default:
        return { opacity: 0, y: 40 };
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0, y: 0 });
    } else {
      controls.start(getInitial());
    }
  }, [inView]);

  return (
    <motion.section
      ref={ref}
      initial={getInitial()}
      animate={controls}
      transition={{
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
