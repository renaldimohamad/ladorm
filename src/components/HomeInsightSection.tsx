"use client";

import React from "react";
import Link from "next/link";
import Fade from "./common/Fade";
import { HiOutlineLightBulb, HiOutlineArrowRight, HiOutlineClock } from "react-icons/hi";
import { useLanguage } from "../../stores/useLengauage";

export default function HomeInsightSection() {
  const { dictionary } = useLanguage();

  const translations = dictionary.homeInsightPreview || {
    title: "Insights & Guides",
    subtitle: "In-depth perspectives, survival tips away from home, and dorm-life related insights.",
    cta: "Explore Insights",
    badge: "Research & Data"
  };

  const insights = dictionary.mockInsightsData?.list?.slice(0, 3) || [];

  if (insights.length === 0) return null;

  return (
    <section className="w-full px-6 py-20 bg-muted/30 dark:bg-[#070707] text-foreground relative z-10 border-t border-border/40">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

        {/* Header Column */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <Fade direction="left" distance={60} scale={1.2}>
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-6 w-max">
              <HiOutlineLightBulb className="w-4 h-4" />
              <span>{translations.badge}</span>
            </div>
          </Fade>
          
          <Fade direction="left" distance={40} delay={150} blur={10}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-sm leading-tight">
              {translations.title}
            </h2>
          </Fade>
          
          <Fade direction="left" distance={30} delay={300}>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-md">
              {translations.subtitle}
            </p>
          </Fade>
          
          <Fade direction="none" scale={0.5} delay={450} blur={5}>
            <Link 
              href="/insight" 
              className="group inline-flex items-center justify-center space-x-3 px-7 py-3.5 rounded-full bg-foreground text-background font-bold hover:scale-105 hover:shadow-lg transition-all duration-300 w-max"
            >
              <span>{translations.cta}</span>
              <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </Fade>
        </div>

        {/* Cards Column */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Subtle gradient blob for modern feel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10 blur-[100px] rounded-full z-0 pointer-events-none" />

          {insights.map((insight, index) => (
            <Fade 
              direction="right" 
              distance={100} 
              delay={index * 200 + 400} 
              key={insight.id} 
              rotate={index % 2 === 0 ? 5 : -5}
              scale={0.9}
              className="relative z-10"
            >
              <Link href={`/insight/${insight.id}`} className="block group h-full">
                <div className="h-full flex flex-col p-8 bg-background dark:bg-[var(--card)] border border-border/50 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">

                  {/* Hover accent top line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[var(--primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase group-hover:text-foreground transition-colors">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-medium bg-muted px-2.5 py-1 rounded-md text-foreground">
                      {insight.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-[var(--primary)] transition-colors leading-snug">
                    {insight.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                    {insight.desc}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-5">
                    <span className="text-xs text-muted-foreground font-medium flex items-center">
                      <HiOutlineClock className="mr-1.5 w-4 h-4" /> {insight.readTime}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                      <HiOutlineArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
