"use client";

import Fade from "@/components/common/Fade";
import { CallToAction } from "@/ui/common/CallToAction";
import { useLanguage } from "../../../stores/useLengauage";

export default function CTASection() {
  const { dictionary } = useLanguage();

  return (
    <section className="w-full px-6 py-24 bg-background text-foreground relative z-10 overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--secondary)]/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden transition-all duration-500
        bg-gradient-to-br from-[#016072] to-[#2c705b] shadow-2xl border border-white/10
        dark:from-[#13222a] dark:to-[#081115] dark:border dark:border-white/5 dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">

        {/* Inner Glossy Effect */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Decorative Glowing Orbs for Dark Mode */}
        <div className="hidden dark:block absolute -top-40 -left-40 w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="hidden dark:block absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center space-y-8">
          <Fade direction="up">
            <span className="inline-block px-4 py-1.5 mb-2 text-[10px] font-black uppercase tracking-[0.4em] bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              Exclusive Community
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight drop-shadow-2xl">
              {dictionary.ctaSection?.title || "Ready to Join Our Family?"}
            </h2>
          </Fade>

          <Fade direction="up" delay={100}>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              {dictionary.ctaSection?.desc || "Experience a new standard of student living where community meets comfort."}
            </p>
          </Fade>

          <Fade direction="up" delay={200}>
            <div className="mt-6">
              <CallToAction
                href="/contact-us"
                text={dictionary.ctaSection?.button || "Get Started Now"}
                className="bg-white text-[#016072] dark:bg-[var(--primary)] dark:text-black font-black px-10 py-5 rounded-2xl shadow-2xl hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300"
              />
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
