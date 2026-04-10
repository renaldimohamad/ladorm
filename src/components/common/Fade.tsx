"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Direction = "up" | "down" | "left" | "right";

interface FadeProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
}

const directionMap: Record<Direction, string> = {
  up: "translate-y-4",
  down: "-translate-y-4",
  left: "-translate-x-4",
  right: "translate-x-4",
};

export default function Fade({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className,
}: FadeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        } else {
          setShow(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)"
      }}
      className={clsx(
        "transition-all will-change-transform",
        show
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${directionMap[direction]}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
