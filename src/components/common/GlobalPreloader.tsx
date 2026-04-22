"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalPreloader() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Non-linear progress simulation (simulating real-time feel)
    // Starts fast, slows down at 80% to "wait" for final hydration
    const simulateProgress = () => {
      interval = setInterval(() => {
        setPercent((prev) => {
          if (prev >= 98) {
            clearInterval(interval);
            return 98;
          }

          // Logistic-like slowing down
          const increment = prev < 60 ? Math.random() * 15 + 5 : Math.random() * 2 + 0.1;
          const next = prev + increment;
          return next > 98 ? 98 : next;
        });
      }, 150);
    };

    const finishLoading = () => {
      clearInterval(interval);
      setPercent(100);
      // Branded delay: 1.5 seconds to appreciate the logo and slogan
      setTimeout(() => setLoading(false), 1500);
    };

    // Listen for actual window completion
    if (document.readyState === "complete") {
      setPercent(100);
      setTimeout(() => setLoading(false), 1800);
    } else {
      simulateProgress();
      window.addEventListener("load", finishLoading);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
            transition: {
              duration: 2.5,
              ease: [0.22, 1, 0.36, 1] // Quintic ease-out for ultra smoothness
            }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Grainy Noise Overlay */}
          <div className="absolute inset-0 z-50 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />

          {/* Deep Ambient Glow */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(1,96,114,0.15)_0%,transparent_70%)]"
            />
          </div>

          {/* Large Watermark Text (Re-added) */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <h2 className="text-[20vw] font-black text-white/[0.02] tracking-tighter uppercase leading-none">
              LADORM
            </h2>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative overflow-hidden">
                <Image
                  src="/images/Visual Idententy - Remake Logo Ladorm 2.webp"
                  alt="LADorm Loading"
                  width={320}
                  height={100}
                  className="object-contain relative z-10"
                  priority
                />

                {/* Real-time Shimmer Light */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                  className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg]"
                />
              </div>

              {/* Aura Glow pulse */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 blur-[100px] -z-10"
              />
            </motion.div>

            {/* REAL-TIME PROGRESS LINE */}
            <div className="mt-20 flex flex-col items-center w-80">
              {/* The Line */}
              <div className="w-full h-[1px] bg-white/[0.03] relative overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${percent}%` }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className="absolute h-full left-0 bg-primary shadow-[0_0_15px_rgba(1,96,114,0.8)]"
                />

                {/* Floating "Head" of the line */}
                <motion.div
                  animate={{ left: `${percent}%` }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className="absolute top-[-2px] h-1.5 w-1.5 bg-primary rounded-full blur-[2px] shadow-[0_0_10px_#016072]"
                />
              </div>

              {/* Percent Counter */}
              <div className="mt-8 flex items-center justify-between w-full">
                <span className="text-[7px] font-bold text-white/20 tracking-[0.4em] uppercase">Loading System</span>
                <motion.span
                  className="text-[14px] font-black text-primary tabular-nums tracking-normal flex items-center"
                >
                  {Math.round(percent)}
                  <span className="text-[8px] ml-0.5 opacity-50">%</span>
                </motion.span>
              </div>
            </div>

            {/* Slogan with fade in delay */}
            <div className="mt-32 overflow-hidden flex gap-2">
              {"REDEFINING RESIDENCE".split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{
                    delay: 1.5 + i * 0.05,
                    duration: 1
                  }}
                  className="text-[8px] font-bold tracking-[0.3em] text-white/60 uppercase"
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
