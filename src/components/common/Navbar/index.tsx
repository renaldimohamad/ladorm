"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import CurrentTime from "./CurrentTime";
import { motion, AnimatePresence } from "framer-motion";
import { itemVariants, menuVariants } from "@/utils/variants";
import Image from "next/image";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import "./index.css";
import { useLanguage } from "../../../../stores/useLengauage";
import { Listbox } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scroll, isScrolling } = useScrollProgress();
  const { isScrolled } = useNavbarScroll(10);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const { lang, setLang, dictionary } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const languages = [
    {
      label: "us",
      value: "en",
      name: "English",
      flag: "/images/ENG - ING Flag 1.webp",
    },
    {
      label: "id",
      value: "id",
      name: "Indonesia",
      flag: "/images/ENG - ING Flag 3.webp",
    },
    {
      label: "gtlo",
      value: "gtlo",
      name: "Gorontalo",
    },
  ];

  const navLinks = [
    { href: "/", label: dictionary.navbar.home },
    { href: "/about", label: dictionary.navbar.about },
    { href: "/blog", label: dictionary.navbar.blog },
    { href: "/insight", label: dictionary.navbar.insight },
  ];

  const isActiveLink = (href: string) =>
    pathname === href || (href === "/about" && pathname.startsWith("/about/"));

  // ─── Navbar class: transparan di top, frosted glass saat scroll ───────────
  // Pattern: Apple.com, Vercel.com, Linear.app
  const headerClass = [
    "sticky top-0 z-[999]",
    "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-in-out shadow-sm",
    isScrolled
      ? [
          "bg-navbar-bg", // ← var(--navbar-bg), adaptif per theme
          "backdrop-blur-[20px]", // frosted glass
          "[backdrop-filter:saturate(180%)_blur(20px)]", // saturate untuk efek Apple
          "[-webkit-backdrop-filter:saturate(180%)_blur(20px)]",
          "border-b border-navbar-border", // ← var(--navbar-border)
          "shadow-[0_1px_16px_rgba(0,0,0,0.06)]",
        ].join(" ")
      : "bg-transparent backdrop-blur-sm border-b border-transparent",
    "text-foreground", // ✅ selalu adaptif, tidak pernah hardcoded
  ]
    .filter(Boolean)
    .join(" ");

  // ─── Shared class untuk pill/button dalam navbar ─────────────────────────
  const pillClass = [
    "rounded-custom flex items-center justify-center",
    "bg-navbar-surface hover:bg-navbar-surface-hover", // ✅ semantic token
    "border border-navbar-border", // ✅ semantic token
    "text-foreground", // ✅ adaptif
    "backdrop-blur-md",
    "shadow-sm transition-all",
    "focus:outline-none focus:ring-2 focus:ring-primary/30",
  ].join(" ");

  const logoSrc =
    theme === "light"
      ? "/images/Logotype - Ladorm Hijau.webp"
      : "/images/Logotype - Ladorm Putih.webp";

  return (
    <header className={headerClass}>
      {/* ─── Top Bar ───────────────────────────────────────────────────────── */}
      <div className="h-8 w-full flex items-center px-4">
        <span className="text-sm text-muted-foreground">
          {" "}
          {/* ✅ semantic */}
          <CurrentTime />
        </span>
      </div>

      {/* ─── Main Nav Row ──────────────────────────────────────────────────── */}
      <div className="relative h-[68px] w-full px-4 flex justify-between items-center">
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-2">
          <Image
            src={logoSrc}
            alt="LADORM - LOGO"
            width={150}
            height={60}
            className="object-containr"
          />

          {/* <div className=" w-2/3 text-sm">
            <p className="font-bold">
              {dictionary.footer?.brandText || "Asrama Mahasiswa Gorontalo"}
            </p>
          </div> */}
        </div>
        <nav className="hidden sm:flex gap-6 ml-10 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`link-underline text-sm transition-colors duration-200 ${
                isActiveLink(href)
                  ? "font-semibold text-primary" // ✅ active: primary
                  : "font-normal text-foreground hover:text-primary" // ✅ semantic
              }`}>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* ─── Mobile Menu Toggle ──────────────────────────────────────────── */}
        <button
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileMenuOpen}
          className="sm:hidden text-foreground text-2xl relative w-8 h-8 cursor-pointer">
          {/* Hamburger Icon */}
          <span
            className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${
              mobileMenuOpen
                ? "opacity-0 scale-95 rotate-45"
                : "opacity-100 scale-100 rotate-0"
            }`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </span>

          {/* Close Icon */}
          <span
            className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${
              mobileMenuOpen
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-95 -rotate-45"
            }`}>
            <HiX className="w-8 h-8" />
          </span>
        </button>

        {/* ─── Desktop Controls ────────────────────────────────────────────── */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Language Selector */}
          <Listbox value={lang} onChange={setLang}>
            {({ open }) => {
              const selectedLang = languages.find((l) => l.value === lang);

              return (
                <div className="relative inline-flex">
                  <Listbox.Button
                    className={`${pillClass} h-[40px] min-w-[90px] font-semibold text-sm px-3 gap-2`}>
                    <div className="flex items-center gap-2">
                      {selectedLang?.flag && (
                        <Image
                          src={selectedLang.flag}
                          alt={`${selectedLang.label} flag`}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-cover rounded-full border border-border/50 shadow-sm"
                        />
                      )}
                      <span className="uppercase text-xs tracking-wider">
                        {selectedLang?.value}
                      </span>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Listbox.Button>

                  <Listbox.Options className="rounded-custom absolute mt-2 origin-top-right right-0 w-[140px] bg-background border border-border rounded-md shadow-lg z-50 text-foreground overflow-hidden">
                    {languages.map((item) => (
                      <Listbox.Option
                        key={item.value}
                        value={item.value}
                        className={({ active, selected }) =>
                          `cursor-pointer px-4 py-2.5 flex items-center gap-3 transition-colors ${
                            active || selected
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-muted"
                          }`
                        }>
                        {item.flag && (
                          <Image
                            src={item.flag}
                            alt={`${item.label} flag`}
                            width={20}
                            height={20}
                            className="w-5 h-5 object-cover rounded-full border border-border/50 shadow-sm"
                          />
                        )}
                        <span className="text-sm">
                          {item.name}
                        </span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              );
            }}
          </Listbox>

          {/* Contact Button */}
          <Link
            href="/contact-us"
            className={`${pillClass} px-4 h-[40px] transform hover:scale-105 active:scale-95`}>
            <span className="text-sm font-semibold flex items-center gap-1">
              {dictionary.navbar.contact}
            </span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"
            }
            className={`${pillClass} w-[40px] h-[40px] transform hover:scale-105 active:scale-95 cursor-pointer`}>
            {theme === "dark" ? (
              // Sun icon (switch to light)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              // Moon icon (switch to dark)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ─── Mobile Menu ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="sm:hidden px-4 pb-4 space-y-3 text-foreground relative" // ✅ text-foreground
          >
            {/* Mobile Nav Links */}
            {navLinks.map(({ href, label }) => (
              <motion.div key={href} variants={itemVariants}>
                <Link
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 transition-colors ${
                    isActiveLink(href)
                      ? "font-bold text-primary"
                      : "text-foreground hover:text-primary"
                  }`}>
                  {label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Controls Row */}
            <motion.div
              variants={itemVariants}
              className="flex gap-2 w-full mt-2">
              {/* Mobile Language Selector */}
              <div className="relative flex-1">
                <Listbox value={lang} onChange={setLang}>
                  {({ open }) => {
                    const selectedLang = languages.find(
                      (l) => l.value === lang,
                    );
                    return (
                      <>
                        <Listbox.Button
                          className={`${pillClass} w-full h-[40px] font-semibold text-sm px-3 gap-2`}>
                          <div className="flex items-center gap-2">
                            {selectedLang?.flag && (
                              <Image
                                src={selectedLang.flag}
                                alt={`${selectedLang.label} flag`}
                                width={20}
                                height={20}
                                className="w-5 h-5 object-cover rounded-full border border-border/50 shadow-sm"
                              />
                            )}
                            <span className="uppercase text-xs tracking-wider">
                              {selectedLang?.name}
                            </span>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                              open ? "rotate-180" : "rotate-0"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </Listbox.Button>

                        <Listbox.Options className="rounded-custom absolute bottom-full mb-2 origin-bottom w-full bg-background border border-border rounded-md shadow-lg z-50 text-foreground overflow-hidden">
                          {languages.map((item) => (
                            <Listbox.Option
                              key={item.value}
                              value={item.value}
                              className={({ active, selected }) =>
                                `cursor-pointer px-4 py-2.5 flex items-center gap-3 transition-colors ${
                                  active || selected
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-foreground hover:bg-muted"
                                }`
                              }>
                              {item.flag && (
                                <Image
                                  src={item.flag}
                                  alt={`${item.label} flag`}
                                  width={20}
                                  height={20}
                                  className="w-5 h-5 object-cover rounded-full border border-border/50 shadow-sm"
                                />
                              )}
                              <span className="text-sm">
                                {item.name}
                              </span>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </>
                    );
                  }}
                </Listbox>
              </div>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Ganti ke mode terang"
                    : "Ganti ke mode gelap"
                }
                className={`${pillClass} w-[40px] h-[40px] cursor-pointer`}>
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                )}
              </button>
            </motion.div>

            {/* Mobile Contact Button */}
            <motion.div variants={itemVariants}>
              <Link
                href="/contact-us"
                className={`${pillClass} w-full px-4 py-2 transform hover:scale-[1.02] active:scale-95 mt-2`}>
                <span className="text-sm font-semibold flex items-center gap-1">
                  {dictionary.navbar.contact}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Scroll Progress Indicator ─────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-transparent z-[9999]">
        <motion.div
          className="h-full rounded-r-full"
          style={{
            backgroundColor: "var(--navbar-indicator)", // ✅ pakai token, bukan hardcoded #00FFC2
            boxShadow: "0 0 6px var(--navbar-indicator)",
          }}
          animate={{
            width: `${scroll}%`,
            opacity: isScrolling ? 1 : 0,
          }}
          transition={{
            width: { type: "spring", stiffness: 80, damping: 20 },
            opacity: { duration: 0.4 },
          }}
        />
      </div>
    </header>
  );
};

export default Navbar;
