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
  FaShareAlt,
  FaUserCheck,
  FaGraduationCap,
} from "react-icons/fa";
import { FaMapMarkerAlt, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
  resident: Resident;
}

export default function ResidentDetailClient({ resident }: Props) {
  const router = useRouter();
  const isActive = resident.status === "active";
  const about = resident.about;

  const generatedFallback = {
    summary: `${resident.name} merupakan ${
      isActive ? "anggota aktif" : "alumni"
    } komunitas dengan latar belakang pendidikan di bidang ${
      resident.major
    } dari ${resident.university}.`,

    experience: `Berasal dari ${resident.from}, ia memiliki minat serta pengalaman dalam pengembangan sistem modern serta pengelolaan solusi berbasis teknologi yang scalable.`,

    expertise: [],
    achievements: [],
  };

  const finalAbout = {
    summary: about?.summary ?? generatedFallback.summary,
    experience: about?.experience ?? generatedFallback.experience,
    expertise: about?.expertise ?? [],
    achievements: about?.achievements ?? [],
  };

  const SOCIAL_MAP = {
    instagram: {
      icon: FaInstagram,
      color: "#E1306C",
      glow: "shadow-[0_0_25px_rgba(225,48,108,0.25)]",
      label: "Instagram",
    },
    linkedin: {
      icon: FaLinkedin,
      color: "#0A66C2",
      glow: "shadow-[0_0_25px_rgba(10,102,194,0.25)]",
      label: "LinkedIn",
    },
    facebook: {
      icon: FaFacebook,
      color: "#1877F2",
      glow: "shadow-[0_0_25px_rgba(24,119,242,0.25)]",
      label: "Facebook",
    },
    tiktok: {
      icon: FaTiktok,
      color: "#000000",
      glow: "shadow-[0_0_25px_rgba(0,0,0,0.2)]",
      label: "TikTok",
    },
  };

  function LuxurySocialIcon({
    href,
    Icon,
    color,
    label,
  }: {
    href: string;
    Icon: any;
    color: string;
    label: string;
  }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="
        group relative
        w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11
        flex items-center justify-center
        rounded-full
        transition-all duration-300
        hover:-translate-y-1 hover:scale-105
      "
        style={{ backgroundColor: `${color}15` }}>
        <Icon
          className="transition-transform duration-300 group-hover:scale-110"
          size={16}
          style={{ color }}
        />

        {/* Tooltip Desktop Only */}
        <div
          className="
        hidden sm:block
        absolute -bottom-8 opacity-0 group-hover:opacity-100
        transition-all duration-300
        text-[10px] bg-gray-900 text-white
        px-2 py-1 rounded-md shadow-md whitespace-nowrap
      ">
          {label}
        </div>
      </a>
    );
  }

  function LuxuryShareButton({ name }: { name: string }) {
    const handleShare = async () => {
      if (navigator.share) {
        await navigator.share({
          title: name,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    };

    return (
      <button
        onClick={handleShare}
        className="
        group
        w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11
        flex items-center justify-center
        rounded-full
        bg-gradient-to-br
        from-[rgba(1,96,114,0.9)]
        to-[rgba(44,112,91,0.9)]
        text-white
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:scale-105
      ">
        <FaShareAlt
          size={14}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
      </button>
    );
  }

  function InfoCard({
    label,
    value,
    icon,
    gradient,
  }: {
    label: string;
    value: string;
    icon: React.ReactNode;
    gradient: string;
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className={`
        relative isolate
        rounded-2xl p-6
        border border-white/40
        backdrop-blur-sm
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-md
        ${gradient}
      `}>
        <div className="absolute -right-1 -bottom-2 text-white/10 text-8xl">
          {icon}
        </div>

        <p className="text-xs uppercase tracking-wide text-white/70 mb-2">
          {label}
        </p>

        <p className="text-lg sm:text-xl font-semibold text-white">{value}</p>
      </motion.div>
    );
  }

  return (
    <LayoutBlank bgColor="gray-50">
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <HeaderContent
            label="Daftar Penghuni"
            onBack={() => router.push("/residents")}
            className="mb-10"
          />

          <div className="relative rounded-2xl shadow-sm w-full p-6 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
              style={{
                backgroundImage: "url('/images/BG LADORM_WHITE.webp')",
              }}
            />
            <div className="relative z-10">
              <div className="relative mb-16">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                {/* ================= HERO PROFILE ================= */}
                <div className="relative mb-16">
                  {/* Soft Background Accent */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[90%] max-w-[700px] h-[300px] bg-indigo-50 rounded-full blur-3xl opacity-60" />
                  </div>

                  <div className="bg-background rounded-3xl overflow-hidden border-b border-border">
                    <div className="grid lg:grid-cols-2">
                      {/* LEFT SIDE — AVATAR */}
                      <div
                        className="relative min-h-[320px] sm:min-h-[380px] 
                flex flex-col items-center justify-end 
                px-6 py-10 sm:px-10 sm:py-14 
                border-b lg:border-b-0 lg:border-r 
                border-border overflow-hidden">
                        {/* Cover Background */}
                        {resident.coverPhoto && (
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${encodeURI(resident.coverPhoto)})`,
                              opacity: 0.25,
                            }}
                          />
                        )}

                        {/* Optional subtle fade biar elegan */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/30 to-transparent" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center">
                          {/* Avatar */}
                          <div className="relative group">
                            <div className="absolute inset-0 rounded-full bg-background/40 blur-2xl opacity-40 transition group-hover:opacity-60" />
                            <img
                              src={resident.photo}
                              alt={resident.name}
                              className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44
                   rounded-full object-cover
                   ring-4 ring-white shadow-2xl
                   transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Status Badge */}
                          <div
                            className={`mt-6 inline-flex items-center gap-2 px-4 py-1.5 
                  rounded-full text-xs font-medium tracking-wide 
                  backdrop-blur-md bg-background/70
        ${isActive ? "text-[#047857]" : "text-[#134E4A]"}`}>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isActive ? "bg-[#047857]" : "bg-[#134E4A]"
                              }`}
                            />
                            {isActive ? "Active Member" : "Alumni"}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE — IDENTITY */}
                      <div className="px-6 py-10 sm:px-10 sm:py-14 flex flex-col justify-center text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-tight">
                          {resident.name}
                        </h1>

                        <p className="mt-3 text-base sm:text-lg text-muted-foreground">
                          {resident.major}
                        </p>

                        <p className="text-sm text-gray-400">
                          {resident.university}
                        </p>

                        {/* Divider */}
                        <div className="mt-6 h-px w-16 bg-muted mx-auto lg:mx-0" />

                        {resident.bio && (
                          <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {resident.bio}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-3 justify-center lg:justify-start italic">
                          {resident.joinedYear && (
                            <span className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                              Bergabung sejak {resident.joinedYear}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= KPI SECTION ================= */}
              <div className="mt-10 grid sm:grid-cols-3 gap-6">
                <InfoCard
                  label="Asal"
                  value={resident.from}
                  icon={<FaMapMarkerAlt />}
                  gradient="bg-gradient-to-br from-emerald-400/70 to-teal-500/70"
                />

                <InfoCard
                  label="Bidang Studi"
                  value={resident.major}
                  icon={<FaUserGraduate />}
                  gradient="bg-gradient-to-br from-teal-500/70 to-cyan-600/70"
                />

                <InfoCard
                  label="Status"
                  value={isActive ? "Active Member" : "Alumni"}
                  icon={isActive ? <FaUserCheck /> : <FaGraduationCap />}
                  gradient={
                    isActive
                      ? "bg-gradient-to-br from-[#047857] to-[#065F46]"
                      : "bg-gradient-to-br from-[#134E4A] to-[#064E3B]"
                  }
                />
              </div>

              <div className="mt-16 bg-background rounded-2xl border border-border p-8 sm:p-12">
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
                    Tentang
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Informasi singkat mengenai {resident.name}
                  </p>
                </div>

                <div className="max-w-3xl text-muted-foreground leading-8 text-sm sm:text-base space-y-6">
                  <p
                    className="
    relative
    pl-6
    text-foreground
    font-medium
    text-base sm:text-lg
    leading-relaxed
    border-l-4
    border-transparent
    bg-gradient-to-b
    from-[#016072]
    to-[#2C705B]
    bg-[length:4px_100%]
    bg-no-repeat
  ">
                    {finalAbout.summary}
                  </p>

                  <p>{finalAbout.experience}</p>
                </div>

                {finalAbout.expertise.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                      Keahlian
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {finalAbout.expertise.map((item, index) => (
                        <span
                          key={index}
                          className="px-4 py-1.5 rounded-full text-xs sm:text-sm 
             bg-gradient-to-r from-[#016072]/10 to-[#2C705B]/10
             text-[#065F46]
             border border-[#016072]/20">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {finalAbout.achievements.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                      Pencapaian
                    </h3>

                    <ul className="space-y-3">
                      {finalAbout.achievements.map((item, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-sm sm:text-base">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* ================= SOCIAL FOOTER ================= */}
              {resident.socials && (
                <div className="mt-16 pt-10 border-t border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <p className="text-xs sm:text-sm text-gray-400">
                      Terhubung dengan {resident.name}
                    </p>

                    <div className="flex justify-center sm:justify-end">
                      <div
                        className="
          flex items-center gap-3 sm:gap-4
          px-4 sm:px-6
          py-2.5 sm:py-3
          rounded-full
          bg-background/80 backdrop-blur-xl
          border border-border
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
          transition-all duration-300
        ">
                        {Object.entries(resident.socials).map(([key, url]) => {
                          if (!url) return null;

                          const social =
                            SOCIAL_MAP[key as keyof typeof SOCIAL_MAP];
                          if (!social) return null;

                          return (
                            <LuxurySocialIcon
                              key={key}
                              href={url}
                              Icon={social.icon}
                              color={social.color}
                              label={social.label}
                            />
                          );
                        })}

                        <div className="h-5 w-px bg-muted mx-1 sm:mx-2" />

                        <LuxuryShareButton name={resident.name} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutBlank>
  );
}
