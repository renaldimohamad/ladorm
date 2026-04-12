"use client";

import { motion } from "framer-motion";
import ContactInfo from "./contactInfo";
import ContactForm from "./contactcForm";
import { useLanguage } from "../../../stores/useLengauage";
import Fade from "../common/Fade";
import Link from "next/link";
import CTASection from "../Home/CTASection";

export default function ContactUsSection() {
  const { dictionary } = useLanguage();

  return (
    <>
      <section className="relative py-24 px-6 bg-background overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[700px] bg-[var(--primary)]/10 dark:bg-[var(--primary)]/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[600px] bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] blur-[100px] opacity-20 dark:opacity-10 rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <header className="mb-16 text-center max-w-3xl mx-auto">
            <Fade direction="up">
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-[0.3em] bg-[var(--primary)] text-white dark:text-black rounded-full shadow-lg">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-tight">
                {dictionary?.contactUs?.title || "Let's Connect with LADorm"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions, suggestions, or thinking about joining our family?
                Reach out to us and let's start a conversation. We're here to help you grow.
              </p>
            </Fade>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Info Side (Map + Contact details) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Fade direction="up" delay={400}>
                {/* Map Card */}
                <div className="group relative w-full bg-[var(--card)] border border-border/80 rounded-[1.5rem] overflow-hidden shadow-xl transition-all duration-500 hover:border-[var(--primary)]/50 hover:shadow-2xl">
                  {/* Header acts as the Link to external maps */}
                  <Link
                    href="https://maps.app.goo.gl/C7RHGFq932H6UqxY9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border-b border-border/50 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="overflow-hidden">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] mb-0.5">Location</h4>
                      <p className="text-[8px] text-muted-foreground uppercase tracking-widest font-black truncate">Lenteng Agung Basecamp</p>
                    </div>
                    <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform shrink-0">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Open in Maps</span>
                      <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white dark:text-black">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      </div>
                    </div>
                  </Link>

                  {/* Map Area - Adjusted height */}
                  <div className="relative w-full h-[280px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.733671233066!2d106.8285573!3d-6.2986444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f21379f8e56b%3A0x6b1473686858e994!2sAsrama%20Gorontalo%20Lenteng%20Agung!5e0!3m2!1sen!2sid!4v1712910000000!5m2!1sen!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale dark:invert-[0.05] hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                  </div>
                </div>
              </Fade>

              <Fade direction="right" delay={200}>
                <ContactInfo />
              </Fade>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7 h-full">
              <Fade direction="left" delay={300}>
                <div className="relative group h-full">
                  {/* Abstract decorative shape behind form */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--gradient-to)] rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000" />
                  <ContactForm />
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
