"use client";

import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import Fade from "@/components/common/Fade";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineClock, HiOutlineTag } from "react-icons/hi";
import { useLanguage } from "../../../stores/useLengauage";
import Image from "next/image";

export default function Insight() {
  const { dictionary } = useLanguage();

  const mockFeatured = dictionary.mockInsightsData?.featured || {
    id: "featured", title: "", desc: "", category: "", readTime: "", date: "", img: ""
  };
  const mockInsights = dictionary.mockInsightsData?.list || [];

  return (
    <LayoutBlank>
      <main className="flex-1 w-full flex flex-col bg-background text-foreground">

        {/* 1. HERO SECTION */}
        <section className="relative w-full pt-32 pb-16 px-6 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] h-full bg-gradient-to-b from-[var(--gradient-from)]/20 to-transparent blur-[100px] -z-10 opacity-70 pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Fade direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                {dictionary.insightPage?.heroTitle || "Insights &"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] pb-2">{dictionary.insightPage?.heroHighlight || "Information"}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {dictionary.insightPage?.heroDesc}
              </p>
            </Fade>
          </div>
        </section>

        {/* 4. SMART EMPTY STATE ALERT */}
        <section className="px-6 mb-12 relative z-20">
          <div className="max-w-5xl mx-auto">
            <Fade direction="up" delay={150}>
              <div className="bg-[var(--card)]/50 backdrop-blur-md border border-border/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-sm">
                <div className="mb-4 sm:mb-0 text-center sm:text-left flex-1">
                  <h3 className="font-bold text-lg text-foreground">{dictionary.insightPage?.emptyStateTitle}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{dictionary.insightPage?.emptyStateDesc}</p>
                </div>

                {/* Pulse Indicator */}
                <div className="flex space-x-2 py-2 px-4 rounded-full bg-muted/40 border border-border/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400 group-hover:bg-[var(--primary)] transition-colors animate-pulse" style={{ animationDelay: "0ms" }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400 group-hover:bg-[var(--primary)] transition-colors animate-pulse" style={{ animationDelay: "200ms" }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400 group-hover:bg-[var(--primary)] transition-colors animate-pulse" style={{ animationDelay: "400ms" }} />
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* 2. FEATURED INSIGHT */}
        <section className="px-6 pb-20 relative z-20">
          <div className="max-w-5xl mx-auto">
            <Fade direction="up">
              <Link href={`/insight/${mockFeatured.id}`} className="group block">
                <div className="relative grid md:grid-cols-2 gap-0 items-stretch bg-[var(--card)] border border-border/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">

                  {/* Image Holder */}
                  <div className="relative h-64 md:h-full w-full overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 md:from-black/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/40 transition-colors duration-500" />

                    <Image
                      src={mockFeatured.img || ""}
                      alt={mockFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                    />

                    <div className="absolute top-6 left-6 z-20">
                      <span className="inline-block px-4 py-1.5 bg-background/80 backdrop-blur-md border border-border/50 rounded-full text-[var(--foreground)] text-xs font-bold uppercase tracking-wider shadow-sm group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                        {dictionary.insightPage?.featuredBadge || "Top Pick"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center bg-[var(--card)]">
                    <div className="flex items-center space-x-3 text-xs font-semibold text-[var(--primary)] mb-5 uppercase tracking-wide">
                      <HiOutlineTag className="w-4 h-4" />
                      <span>{mockFeatured.category}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 group-hover:text-[var(--primary)] transition-colors leading-tight tracking-tight">
                      {mockFeatured.title}
                    </h3>

                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 line-clamp-3">
                      {mockFeatured.desc}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-6">
                      <div className="flex items-center space-x-3 text-xs md:text-sm text-muted-foreground font-medium">
                        <span className="flex items-center"><HiOutlineClock className="mr-1.5 w-4 h-4" /> {mockFeatured.readTime}</span>
                        <span className="opacity-50">•</span>
                        <span>{mockFeatured.date}</span>
                      </div>

                      <div className="inline-flex items-center font-bold text-sm text-[var(--primary)] group-hover:translate-x-1 transition-transform">
                        {dictionary.insightPage?.readFull || "Read Full Insight"}
                        <HiOutlineArrowRight className="ml-2 w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Fade>
          </div>
        </section>

        {/* 3. INSIGHT LIST / GRID */}
        <section className="px-6 pb-24 relative z-20">
          <div className="max-w-5xl mx-auto">
            <Fade direction="up">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">{dictionary.insightPage?.latestArticles || "Recent Insights"}</h2>
                <div className="w-16 h-1 bg-[var(--primary)] rounded-full hidden sm:block" />
              </div>
            </Fade>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {mockInsights.map((insight, index) => (
                <Fade direction="up" delay={index * 150} key={insight.id}>
                  <Link href={`/insight/${insight.id}`} className="group h-full block">
                    <div className="h-full flex flex-col p-10 rounded-[2rem] bg-[var(--card)] border border-border/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

                      <div className="flex items-center justify-between mb-8">
                        <span className="inline-block px-4 py-1.5 bg-[var(--primary)]/5 text-[var(--primary)] border border-[var(--primary)]/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {insight.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-black mb-4 group-hover:text-[var(--primary)] transition-colors leading-[1.3] tracking-tight">
                        {insight.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-10 flex-grow line-clamp-4 overflow-hidden">
                        {insight.desc}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-6">
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center">
                          <HiOutlineClock className="mr-2 w-4 h-4 text-[var(--primary)]" /> {insight.readTime}
                        </span>
                        <div className="text-sm font-black text-[var(--primary)] opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all flex items-center">
                          <HiOutlineArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA SECTION */}
        <section className="w-full bg-[var(--card)] border-t border-border/30 py-24 px-6 relative overflow-hidden">
          {/* Ambient background glow for CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-full blur-[120px] opacity-10 pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Fade direction="up">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
                {dictionary.insightPage?.questionTitle}
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                {dictionary.insightPage?.questionDesc}
              </p>

              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center px-10 py-4 text-sm font-black uppercase tracking-widest text-white bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {dictionary.insightPage?.contactButton || "Contact Us"}
              </Link>
            </Fade>
          </div>
        </section>

        <Footer />
      </main>
    </LayoutBlank>
  );
}

