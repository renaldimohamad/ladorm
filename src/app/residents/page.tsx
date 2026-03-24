"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { residents } from "@/utils/residents";
import { LayoutBlank } from "@/layouts";
import { FaLongArrowAltRight, FaSearch } from "react-icons/fa";
import { HiXCircle } from "react-icons/hi";
import Fade from "@/components/common/Fade";
import LadormChat from "@/components/chatComponents";
// import { Search, XCircle } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ResidentsPage() {
  const INITIAL_MOBILE_COUNT = 5;
  const LOAD_MORE_STEP = 3;

  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "alumni">(
    "all",
  );

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_MOBILE_COUNT);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const totalResidents = residents.length;
  const totalUniversities = new Set(residents.map((r) => r.university)).size;

  const totalActive = residents.filter((r) => r.status === "active").length;

  const totalAlumni = residents.filter((r) => r.status === "alumni").length;

  const filteredResidents = useMemo(() => {
    return residents
      .filter((r) => {
        const matchStatus = statusFilter === "all" || r.status === statusFilter;

        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());

        return matchStatus && matchSearch;
      })
      .sort((a, b) => {
        if (a.status !== b.status) {
          return a.status === "active" ? -1 : 1;
        }

        return a.name.localeCompare(b.name);
      });
  }, [statusFilter, search]);

  const visibleResidents = isMobile
    ? filteredResidents.slice(0, visibleCount)
    : filteredResidents;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      // setVisibleCount(
      //   isMobile ? INITIAL_MOBILE_COUNT : filteredResidents.length,
      // );
    }, 600);

    return () => clearTimeout(timer);
  }, [statusFilter, search, isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < filteredResidents.length &&
          !isFetchingMore
        ) {
          setIsFetchingMore(true);

          // Delay supaya loader terlihat
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + LOAD_MORE_STEP, filteredResidents.length),
            );

            setIsFetchingMore(false);
          }, 800); // bisa 600–1000ms
        }
      },
      {
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [isMobile, filteredResidents.length, visibleCount, isFetchingMore]);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop < 100 && visibleCount !== INITIAL_MOBILE_COUNT) {
        setVisibleCount(INITIAL_MOBILE_COUNT);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, visibleCount]);

  // useEffect(() => {
  //   if (!isMobile) return;
  //   if (!loadMoreRef.current) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         setVisibleCount((prev) =>
  //           Math.min(prev + LOAD_MORE_STEP, filteredResidents.length),
  //         );
  //       }
  //     },
  //     {
  //       rootMargin: "200px",
  //       threshold: 0,
  //     },
  //   );

  //   observer.observe(loadMoreRef.current);

  //   return () => observer.disconnect();
  // }, [isMobile, filteredResidents.length]);

  function SkeletonCard() {
    return (
      <div className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-gray-200 to-gray-100">
        <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center animate-pulse">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 mb-4 sm:mb-6" />

          <div className="h-4 w-46 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-36 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-30 bg-gray-200 rounded mb-3" />

          <div className="h-3 w-70 bg-gray-200 rounded mb-6" />

          <div className="h-8 w-38 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <LayoutBlank>
      <section className="relative min-h-screen bg-gray-50 py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Background Blur Accent */}
        <div className="hidden sm:block absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gray-200 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="hidden sm:block absolute bottom-0 right-0 w-[400px] h-[400px] bg-gray-300 rounded-full blur-3xl opacity-20 -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* ================= HERO ================= */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900">
              Daftar Penghuni LADORM
            </h1>

            <p className="text-gray-500 mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              Individu dengan latar belakang akademik dan keahlian beragam,
              membentuk lingkungan kolaboratif yang inovatif dan inspiratif.
            </p>

            {/* Stats */}
            <div className="mt-1 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <StatItem
                number={totalResidents}
                label="Total Penghuni"
                variant="total"
              />
              <StatItem number={totalActive} label="Active" variant="active" />
              <StatItem number={totalAlumni} label="Alumni" variant="alumni" />
              <StatItem
                number={totalUniversities}
                label="Universitas"
                variant="university"
              />
            </div>
          </div>

          {/* <LadormChat /> */}

          {/* ================= FILTER BAR ================= */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-12 sm:mb-16">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {["all", "active", "alumni"].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setStatusFilter(type as "all" | "active" | "alumni")
                  }
                  className={`
    px-5 sm:px-6 py-2 sm:py-2.5 
    rounded-full 
    text-xs sm:text-sm font-medium 
    transition-all duration-300
    ${
      statusFilter === type
        ? `
          text-white
          bg-gradient-to-r 
          from-[rgba(1,96,114,0.85)] 
          to-[rgba(44,112,91,0.85)]
          shadow-[0_6px_20px_rgba(1,96,114,0.25)]
        `
        : `
          text-gray-600
          bg-white
          border border-gray-200
          hover:border-[rgba(1,96,114,0.5)]
          hover:text-[rgba(1,96,114,0.9)]
          hover:shadow-sm
        `
    }
  `}>
                  {type === "all"
                    ? "Semua"
                    : type === "active"
                      ? "Active"
                      : "Alumni"}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <FaSearch
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 
    text-gray-400 transition-colors duration-300
    peer-focus:text-[rgba(1,96,114,0.8)]"
              />

              <input
                type="text"
                placeholder="Cari nama penghuni"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
      peer
      w-full pl-12 pr-10 py-3
      rounded-full
      text-sm sm:text-base
      bg-white
      border border-gray-200
      text-gray-700
      placeholder:text-gray-400
      transition-all duration-300
      focus:outline-none
      focus:border-[rgba(1,96,114,0.7)]
      focus:ring-4
      focus:ring-[rgba(1,96,114,0.15)]
      shadow-sm
    "
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="
        absolute right-4 top-1/2 -translate-y-1/2
        text-gray-400
        hover:text-[rgba(1,96,114,0.9)]
        transition-colors duration-300
      ">
                  <HiXCircle size={18} />
                </button>
              )}
            </div>
          </div>

          <hr className="text-gray-200 mb-16" />

          {/* ================= GRID ================= */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredResidents.length === 0 ? (
            <div className="text-center py-16 sm:py-20 text-gray-500 text-sm sm:text-base">
              Tidak ditemukan penghuni.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                {visibleResidents.map((r) => (
                  <div
                    key={r.slug}
                    className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-gray-200 to-gray-100 transition-all duration-500 hover:from-gray-300 hover:to-gray-200">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-2xl">
                      {/* Avatar */}
                      <div className="relative mb-4 sm:mb-6">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 blur-xl opacity-40"></div>

                        <img
                          src={r.photo}
                          alt={r.name}
                          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white"
                        />
                      </div>

                      {/* Name */}
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                        {r.name}
                      </h2>

                      {/* Major */}
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {r.major}
                      </p>

                      {/* University */}
                      <p className="text-xs sm:text-sm text-gray-400">
                        {r.university}
                      </p>

                      {/* Origin */}
                      <p className="text-xs text-gray-400 mt-2 sm:mt-3">
                        Asal: {r.from}
                      </p>

                      {/* Bio */}
                      {r.bio && (
                        <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 line-clamp-3">
                          {r.bio}
                        </p>
                      )}

                      {/* CTA */}
                      <Link
                        href={`/residents/${r.slug}`}
                        className="
    mt-6 sm:mt-8 
    inline-flex items-center gap-2 
    px-6 sm:px-8 py-2.5 sm:py-3 
    rounded-full 
    text-xs sm:text-sm font-medium 
    text-white
    bg-gradient-to-r 
    from-[rgba(1,96,114,0.8)] 
    to-[rgba(44,112,91,0.8)]
    shadow-md
    transition-all duration-300
    hover:shadow-lg
    hover:scale-[1.02]
    hover:from-[rgba(1,96,114,0.9)] 
    hover:to-[rgba(44,112,91,0.9)]
    active:scale-95
  ">
                        Lihat Profil
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          <FaLongArrowAltRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STATUS ELEMENTS */}
          <div className="scroller-status mt-10 flex flex-col items-center gap-4">
            {/* LOADING */}
            {isMobile && visibleCount < filteredResidents.length && (
              <div
                ref={loadMoreRef}
                className="infinite-scroll-request loader-ellips flex items-center gap-2 transition-opacity duration-300">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            )}

            {/* END OF CONTENT */}
            {isMobile && visibleCount >= filteredResidents.length && (
              <p className="infinite-scroll-last text-sm text-gray-400">
                End of content
              </p>
            )}

            {/* ERROR (optional kalau nanti pakai API) */}
            {false && (
              <p className="infinite-scroll-error text-sm text-red-400">
                No more pages to load
              </p>
            )}
          </div>

          {/* ================= BOTTOM CTA ================= */}
          {filteredResidents.length !== 0 && (
            <div className="mt-20 sm:mt-28 text-center px-4">
              <hr className="text-gray-200 mb-16" />
              <Fade direction="up">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Ingin Bergabung?
                </h3>
              </Fade>
              <p className="text-gray-500 mt-3 text-sm sm:text-base">
                Jadilah bagian dari komunitas yang dinamis dan inspiratif.
              </p>

              <Fade direction="up">
                <button className="mt-6 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full  bg-gradient-to-r from-[rgba(1,96,114,0.7)] to-[rgba(44,112,91,0.7)] text-white text-sm font-medium transition hover:bg-black">
                  Daftar Sekarang
                </button>
              </Fade>

              {/* <CallToAction
              text={"Daftar Sekarang"}
              href="/contact-us"
              className="mt-6  bg-gradient-to-r from-[rgba(1,96,114,0.7)] to-[rgba(44,112,91,0.7)]"
              rounded="full"
            /> */}
            </div>
          )}
        </div>
      </section>
    </LayoutBlank>
  );
}

/* ================= STAT COMPONENT ================= */

function StatItem({
  number,
  label,
  variant = "total",
}: {
  number: number;
  label: string;
  variant?: "total" | "active" | "alumni" | "university";
}) {
  const colorStyles = {
    total: {
      text: "text-[#016072]",
      bg: "bg-[#016072]/10",
      border: "border-[#016072]/20",
    },
    active: {
      text: "text-[#047857]",
      bg: "bg-[#047857]/10",
      border: "border-[#047857]/20",
    },
    alumni: {
      text: "text-[#134E4A]",
      bg: "bg-[#134E4A]/10",
      border: "border-[#134E4A]/20",
    },
    university: {
      text: "text-[#0E7490]",
      bg: "bg-[#0E7490]/10",
      border: "border-[#0E7490]/20",
    },
  };

  return (
    <div className="flex flex-col items-center">
      {/* Circle Number */}
      <div
        className={`
          w-14 h-14 
          sm:w-16 sm:h-16 
          md:w-20 md:h-20
          rounded-full 
          flex items-center justify-center
          transition-all duration-300
          ${colorStyles[variant].bg}
          ${colorStyles[variant].border}
          border
        `}>
        <span
          className={`
            text-xl sm:text-2xl md:text-3xl
            font-semibold tracking-tight
            ${colorStyles[variant].text}
          `}>
          {number}
        </span>
      </div>

      {/* Label */}
      <span
        className="
          mt-2
          text-xs sm:text-sm
          text-gray-500
          tracking-wide
        ">
        {label}
      </span>
    </div>
  );
}
