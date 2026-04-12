"use client";

import { useRouter } from "next/navigation";
import { LayoutBlank } from "@/layouts";
import HeaderContent from "@/components/header-content";
import { Resident } from "@/utils/residents";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";
import { FaMapMarkerAlt, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";
import CTASection from "@/components/Home/CTASection";
import Footer from "@/components/common/Footer";

interface Props {
  resident: Resident;
}

export default function ResidentDetailClient({ resident }: Props) {
  const router = useRouter();
  const isActive = resident.status === "active";
  const about = resident.about;

  const finalAbout = {
    summary: about?.summary || `${resident.name} merupakan bagian dari komunitas LADorm yang berfokus pada ${resident.major}.`,
    experience: about?.experience || "",
    expertise: about?.expertise || [],
    achievements: about?.achievements || [],
  };

  const SOCIAL_MAP = {
    instagram: { icon: FaInstagram, label: "Instagram" },
    linkedin: { icon: FaLinkedin, label: "LinkedIn" },
    facebook: { icon: FaFacebook, label: "Facebook" },
    tiktok: { icon: FaTiktok, label: "TikTok" },
  };

  return (
    <LayoutBlank bgColor="bg-background">
      <main className="min-h-screen bg-background flex flex-col w-full relative">

        {/* ================= HERO SECTION (SMART COVER) ================= */}
        <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-background">
          {/* Backdrop Layer (Blurred) */}
          <div className="absolute inset-0 z-0">
            {resident.coverPhoto ? (
              <>
                <div className="absolute inset-0">
                  <img
                    src={resident.coverPhoto}
                    alt=""
                    className="w-full h-full object-cover blur-3xl opacity-30 scale-110"
                  />
                  <div className="absolute inset-0 bg-background/20" />
                </div>
                {/* Main Content (Uncropped) */}
                <div className="absolute inset-0 flex items-center justify-center pt-8 pb-16 px-4">
                  <img
                    src={resident.coverPhoto}
                    alt="Cover"
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-2xl border border-white/10"
                  />
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
            )}
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          </div>

          <div className="max-w-6xl mx-auto px-6 h-full relative z-10 py-10">
            <HeaderContent
              label="Kembali ke Katalog"
              onBack={() => router.push("/residents")}
              className="mt-2"
            />
          </div>
        </section>

        {/* ================= MAIN CONTENT AREA ================= */}
        <section className="relative z-20 -mt-24 md:-mt-32 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-10 items-start">

              {/* LEFT COLUMN: Profile & Bio */}
              <div className="lg:col-span-8 space-y-8">

                {/* 1. Identity Card (Floating Overlap) */}
                <div className="bg-card border border-border/80 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5">
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <div className="relative shrink-0">
                      <div className="absolute -inset-2 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-xl opacity-40" />
                      <img
                        src={resident.photo}
                        alt={resident.name}
                        className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-2xl"
                      />
                      <div className={`absolute bottom-3 right-3 w-6 h-6 rounded-full border-4 border-background shadow-lg ${isActive ? 'bg-secondary' : 'bg-muted-foreground'}`} />
                    </div>

                    <div className="flex-1 pt-2">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-5">
                        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                          {isActive ? "Member Aktif" : "Alumni"}
                        </span>
                        <span className="text-muted-foreground/60 text-[10px] font-black uppercase tracking-widest border border-border/50 px-3 py-1.5 rounded-full">
                          Joined {resident.joinedYear || "-"}
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground mb-4 leading-tight">
                        {resident.name}
                      </h1>
                      <p className="text-xl font-bold text-muted-foreground/80 leading-relaxed uppercase tracking-tight">
                        {resident.major}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Biography Section */}
                <div className="bg-card border border-border/60 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-10">
                  <div className="inline-flex items-center gap-4 bg-muted/30 px-5 py-2 rounded-full">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50">Professional Background</h2>
                  </div>

                  <blockquote className="text-2xl md:text-3xl font-bold leading-relaxed text-foreground/90 border-l-8 border-primary/20 pl-8 italic">
                    {finalAbout.summary}
                  </blockquote>

                  <div className="text-muted-foreground leading-relaxed text-lg space-y-6">
                    <p className="whitespace-pre-line">{finalAbout.experience}</p>
                  </div>

                  {finalAbout.achievements.length > 0 && (
                    <div className="pt-10 border-t border-border/50">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/70 mb-8">Notable Milestones</h3>
                      <div className="grid sm:grid-cols-2 gap-5">
                        {finalAbout.achievements.map((item, index) => (
                          <div key={index} className="flex items-start gap-4 p-6 rounded-3xl bg-muted/20 border border-border/10">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                              <FaUserGraduate size={16} />
                            </div>
                            <span className="text-sm font-bold text-muted-foreground leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Sidebar Info (Sticky) */}
              <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">

                {/* 1. Essential Info Card */}
                <div className="bg-card border border-border/80 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-primary/5">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-10">Essential Info</h3>

                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-primary/70 border border-border/50">
                        <FaMapMarkerAlt size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-muted-foreground/30 tracking-widest mb-1">Origins</p>
                        <p className="text-base font-bold text-foreground/90">{resident.from}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-primary/70 border border-border/50">
                        <FaUserGraduate size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-muted-foreground/30 tracking-widest mb-1">Academic</p>
                        <p className="text-base font-bold text-foreground/90 leading-tight">{resident.university}</p>
                      </div>
                    </div>
                  </div>

                  {resident.socials && (
                    <div className="mt-12 pt-10 border-t border-border/50 flex flex-wrap gap-4">
                      {Object.entries(resident.socials).map(([key, url]) => {
                        if (!url) return null;
                        const social = SOCIAL_MAP[key as keyof typeof SOCIAL_MAP];
                        if (!social) return null;
                        return (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted hover:bg-primary hover:text-white transition-all duration-500 shadow-sm border border-border/50"
                            title={social.label}
                          >
                            <social.icon size={20} />
                          </a>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (resident.socials?.instagram) {
                        window.open(resident.socials.instagram, '_blank');
                      }
                    }}
                    className="w-full mt-10 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all"
                  >
                    Request Intro
                  </button>
                </div>

                {/* 2. Expertise Sidebar */}
                {finalAbout.expertise.length > 0 && (
                  <div className="bg-card border border-border/80 rounded-[2.5rem] p-8 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-8">Social Expertise</h3>
                    <div className="flex flex-wrap gap-3">
                      {finalAbout.expertise.map((item, index) => (
                        <span
                          key={index}
                          className="px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-tight bg-muted border border-border/60 text-muted-foreground shadow-sm hover:border-primary/40 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </aside>

            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </main>
    </LayoutBlank>
  );
}
