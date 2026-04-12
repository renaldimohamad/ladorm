"use client";
import { motion, Variants } from "framer-motion";
import { getContactItems } from "./contactItems";
import "./index.css";
import Link from "next/link";
import { useLanguage } from "../../../stores/useLengauage";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function ContactInfo() {
  const { dictionary } = useLanguage();
  const contactItems = getContactItems(dictionary);

  // Separate core contacts from social media
  const coreItems = contactItems.slice(0, 3);
  const socialItems = contactItems.slice(3);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Core Contact Cards */}
      <div className="grid grid-cols-1 gap-3">
        {coreItems.map((item: any, i: number) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            custom={i}
            initial="hidden"
            animate="visible"
          >
            <Link href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="flex items-center gap-4 p-4 bg-[var(--card)] border border-border/60 rounded-[1.2rem] shadow-sm hover:shadow-lg hover:border-[var(--primary)]/50 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300 shrink-0">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--primary)] mb-0.5 opacity-60">
                    {item.label}
                  </p>
                  <p className="font-bold text-foreground text-xs sm:text-sm tracking-tight truncate">
                    {item.value}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 2. Compact Social Grid */}
      <div className="grid grid-cols-3 gap-3">
        {socialItems.map((item: any, i: number) => (
          <motion.div
            key={i + 3}
            variants={fadeInUp}
            custom={i + 3}
            initial="hidden"
            animate="visible"
          >
            <Link href={item.href} target="_blank" rel="noopener noreferrer" className="group block h-full">
              <div className="flex flex-col items-center justify-center p-3 bg-[var(--card)] border border-border/60 rounded-[1.2rem] shadow-sm hover:shadow-lg hover:border-[var(--primary)]/50 transition-all duration-300 h-full">
                <div className="text-[var(--primary)] text-lg mb-1 group-hover:scale-110 transition-transform rounded-custom">
                  {item.icon}
                </div>
                <p className="text-[7px] font-black tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}



