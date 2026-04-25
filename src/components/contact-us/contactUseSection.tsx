"use client";

import { motion } from "framer-motion";
import ContactInfo from "./contactInfo";
import ContactForm from "./contactcForm";
import { useLanguage } from "../../../stores/useLengauage";
import { useState } from "react";
import Fade from "../common/Fade";
import Link from "next/link";
import CTASection from "../Home/CTASection";

export default function ContactUsSection() {
  const { dictionary } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const handleOpenFullscreen = () => {
    setIsMapLoading(true);
    setIsFullscreen(true);
  };

  const mapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3965.5424895288625!2d106.8372275!3d-6.3236609!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edc0b62723b3%3A0x121d12bbf962ad81!2sAsrama%20Mahasiswa%20Provinsi%20Gorontalo%20Lenteng%20Agung-Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1745564414902!5m2!1sid!2sid";


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
                      src={mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale dark:invert-[0.05] hover:grayscale-0 transition-all duration-700"
                    ></iframe>

                    {/* Fullscreen Overlay Button */}
                    <button
                      onClick={handleOpenFullscreen}
                      className="absolute bottom-4 right-4 z-30 p-2.5 bg-white dark:bg-black/80 text-foreground rounded-xl shadow-lg border border-border backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
                      title="Lihat Fullscreen"
                    >

                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                    </button>
                  </div>
                </div>
              </Fade>

              {/* Fullscreen Map Modal */}
              {isFullscreen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 pt-24 md:pt-40">

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    onClick={() => setIsFullscreen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-full bg-background rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col"
                  >
                    <div className="p-4 md:p-6 border-b border-border flex items-center justify-between bg-card/50">
                      <div>
                        <h3 className="font-black text-lg md:text-xl uppercase tracking-tighter">LADorm Location</h3>
                        <p className="text-xs text-muted-foreground font-medium">Asrama Mahasiswa Provinsi Gorontalo Lenteng Agung</p>
                      </div>
                      <button
                        onClick={() => setIsFullscreen(false)}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted/50 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-90"
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                    <div className="flex-grow relative bg-muted">
                      {isMapLoading && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-muted/50 backdrop-blur-sm">
                          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground animate-pulse">Menyiapkan Peta...</p>
                        </div>
                      )}
                      <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        onLoad={() => setIsMapLoading(false)}
                        referrerPolicy="no-referrer-when-downgrade"
                        className="dark:invert-[0.05]"
                      ></iframe>
                    </div>
                    <div className="p-4 bg-card/30 flex justify-center">
                      <Link
                        href="https://maps.app.goo.gl/C7RHGFq932H6UqxY9"
                        target="_blank"
                        className="px-8 py-3 rounded-2xl bg-[var(--primary)] text-white dark:text-black font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--primary)]/20"
                      >
                        Buka di Google Maps App
                      </Link>
                    </div>
                  </motion.div>
                </div>
              )}
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
      <CTASection overrideText="Registrasions" overrideHref="/registrasions" />
    </>
  );
}
