"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Direction = "up" | "down" | "left" | "right";

interface FadeProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

const directionMap: Record<Direction, string> = {
  up: "translate-y-6",
  down: "-translate-y-6",
  left: "-translate-x-6",
  right: "translate-x-6",
};

export default function Fade({
  children,
  direction = "up",
  delay = 0,
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
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={clsx(
        "transition-all duration-500 ease-out will-change-transform",
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
