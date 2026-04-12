"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  scale?: number;
  blur?: number;
  rotate?: number;
}

export default function Fade({
  children,
  direction = "up",
  delay = 0,
  duration = 800,
  className,
  distance = 20,
  scale = 1,
  blur = 0,
  rotate = 0,
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
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (show) return "translate(0, 0) scale(1) rotate(0deg)";
    
    let x = 0;
    let y = 0;
    
    if (direction === "up") y = distance;
    if (direction === "down") y = -distance;
    if (direction === "left") x = distance;
    if (direction === "right") x = -distance;
    
    return `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
  };

  return (
    <div
      ref={ref}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Modern bouncy easing
        opacity: show ? 1 : 0,
        transform: getTransform(),
        filter: blur > 0 ? (show ? "blur(0px)" : `blur(${blur}px)`) : undefined,
      }}
      className={clsx(
        "transition-all will-change-[transform,opacity,filter]",
        className,
      )}
    >
      {children}
    </div>
  );
}
