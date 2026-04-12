"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import CurrentTime from "./CurrentTime";
import { motion, AnimatePresence } from "framer-motion";
import { itemVariants, menuVariants } from "@/utils/variants";
import Image from "next/image";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import "./index.css";
import { useLanguage } from "../../../../stores/useLengauage";
import { Listbox } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scroll, isScrolling } = useScrollProgress();
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const { lang, setLang, dictionary } = useLanguage();
  const { theme, toggleTheme } = useTheme();


  const languages = [
    {
      label: "us",
      value: "en",
      flag: "/images/ENG - ING Flag 1.webp",
    },
    {
      label: "id",
      value: "id",
      flag: "/images/ENG - ING Flag 3.webp",
      // flag: "/images/ENG - ING Flag 1.webp",
    },
    // { label: "Gorontalo", value: "gtlo" },
  ];

  return (
    <header className="sticky top-0 z-[999] bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white backdrop-blur-sm">
      <div className="h-8 w-full flex items-center px-4">
        <span className="text-lg text-white">
          <CurrentTime />
        </span>
      </div>

      <div className="relative h-[68px] w-full px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/images/Visual Idententy - Remake Logo Ladorm 2.webp"
            alt="LADORM - LOGO"
            width={200}
            height={20}
            className="
    object-contain
    w-[120px] sm:w-[160px] md:w-[200px]
    h-auto
  "
          />

          <div className="leading-tight text-sm">
            {/* <h5 className="font-bold uppercase">Asrama Mahasiswa Gorontalo</h5> */}
          </div>
          <nav className="hidden sm:flex gap-6 ml-10 items-center">
            <Link
              href="/"
              className={`link-underline ${pathname === "/" ? "font-bold" : "font-normal"
                }`}
            >
              <span>{dictionary.navbar.home}</span>
            </Link>

            <Link
              href="/blog"
              className={`link-underline ${pathname === "/blog" ? "font-bold" : "font-normal"
                }`}
            >
              <span>{dictionary.navbar.blog}</span>
            </Link>

            <Link
              href="/insight"
              className={`link-underline ${pathname === "/insight" ? "font-bold" : "font-normal"
                }`}
            >
              <span>{dictionary.navbar.insight}</span>
            </Link>
          </nav>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="sm:hidden text-white text-2xl relative w-8 h-8"
        >
          <span
            className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${mobileMenuOpen
              ? "opacity-0 scale-95 rotate-45"
              : "opacity-100 scale-100 rotate-0"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </span>

          <span
            className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${mobileMenuOpen
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-95 -rotate-45"
              }`}
          >
            <HiX className="w-8 h-8" />
          </span>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <Listbox value={lang} onChange={setLang}>
            {({ open }) => {
              const selectedLang = languages.find((l) => l.value === lang);

              return (
                <div className="relative inline-flex">
                  <Listbox.Button className="rounded-custom h-[40px] min-w-[90px] bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-semibold text-sm px-3 rounded-md shadow-sm focus:outline-none transition-all flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {selectedLang?.flag && (
                        <Image
                          src={selectedLang.flag}
                          alt={`${selectedLang.label} flag`}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-cover rounded-full border border-white/30 shadow-sm"
                        />
                      )}
                      <span className="uppercase text-xs tracking-wider">{selectedLang?.value}</span>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 text-white transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Listbox.Button>

                  <Listbox.Options className="rounded-custom absolute mt-2 origin-top-right right-0 w-[140px] bg-background border border-border rounded-md shadow-lg z-50 text-foreground overflow-hidden">
                    {languages.map((item) => (
                      <Listbox.Option
                        key={item.value}
                        value={item.value}
                        className={({ active, selected }) =>
                          `cursor-pointer px-4 py-2.5 flex items-center gap-3 transition-colors ${active || selected
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted"
                          }`
                        }
                      >
                        {item.flag && (
                          <Image
                            src={item.flag}
                            alt={`${item.label} flag`}
                            width={20}
                            height={20}
                            className="w-5 h-5 object-cover rounded-full border border-border/50 shadow-sm"
                          />
                        )}
                        <span className="text-sm">{item.value === "en" ? "English" : "Indonesia"}</span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              );
            }}
          </Listbox>

          <div className="hidden sm:block">
            <Link
              href="/contact-us"
              className="rounded-custom flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md px-4 h-[40px] rounded-sm shadow-sm transition-all transform hover:scale-105 active:scale-95"
            >
              <span className="text-sm font-semibold flex items-center gap-1">
                {dictionary.navbar.contact}
              </span>
            </Link>
          </div>

          <button
            onClick={toggleTheme}
            className="hidden sm:flex rounded-custom items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md w-[40px] h-[40px] rounded-sm shadow-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="sm:hidden px-4 pb-4 space-y-3 text-white relative"
          >
            {/* Beranda */}
            <motion.div variants={itemVariants}>
              <Link href="/" className="block hover:link-underline">
                {dictionary.navbar.home}
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-white hover:underline ${pathname === "/blog" ? "font-bold" : ""
                  }`}
              >
                {dictionary.navbar.blog}
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/insight"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-white hover:underline ${pathname === "/insight" ? "font-bold" : ""
                  }`}
              >
                {dictionary.navbar.insight}
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-2 w-full mt-2">
              <div className="relative flex-1">
                <Listbox value={lang} onChange={setLang}>
                  {({ open }) => {
                    const selectedLang = languages.find((l) => l.value === lang);
                    return (
                      <>
                        <Listbox.Button className="rounded-custom w-full h-[40px] bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-semibold text-sm px-3 rounded-md shadow-sm focus:outline-none transition-all flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {selectedLang?.flag && (
                              <Image
                                src={selectedLang.flag}
                                alt={`${selectedLang.label} flag`}
                                width={20}
                                height={20}
                                className="w-5 h-5 object-cover rounded-full border border-white/30 shadow-sm"
                              />
                            )}
                            <span className="uppercase text-xs tracking-wider">{selectedLang?.value === "en" ? "English" : "Indonesia"}</span>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-4 h-4 text-white transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
                              }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </Listbox.Button>

                        <Listbox.Options className="rounded-custom absolute bottom-full mb-2 origin-bottom w-full bg-background border border-border rounded-md shadow-lg z-50 text-foreground overflow-hidden">
                          {languages.map((item) => (
                            <Listbox.Option
                              key={item.value}
                              value={item.value}
                              className={({ active, selected }) =>
                                `cursor-pointer px-4 py-2.5 flex items-center gap-3 transition-colors ${active || selected
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-foreground hover:bg-muted"
                                }`
                              }
                            >
                              {item.flag && (
                                <Image
                                  src={item.flag}
                                  alt={`${item.label} flag`}
                                  width={20}
                                  height={20}
                                  className="w-5 h-5 object-cover rounded-full border border-border/50 shadow-sm"
                                />
                              )}
                              <span className="text-sm">{item.value === "en" ? "English" : "Indonesia"}</span>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </>
                    );
                  }}
                </Listbox>
              </div>

              <button
                onClick={toggleTheme}
                className="rounded-custom flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 w-[40px] h-[40px] rounded-sm shadow-sm transition-all backdrop-blur-md cursor-pointer"
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                )}
              </button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/contact-us"
                className="rounded-custom flex w-full items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-sm shadow-sm transition-all transform hover:scale-[1.02] active:scale-95 backdrop-blur-md mt-2"
              >
                <span className="text-sm font-semibold flex items-center gap-1 text-white">
                  {dictionary.navbar.contact}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent z-[9999]">
        <motion.div
          className="h-full bg-[#00FFC2] rounded-r-full shadow-[0_0_4px_#00FFC2]"
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
