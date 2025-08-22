"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import CurrentTime from "./CurrentTime";
import { motion, AnimatePresence } from "framer-motion";
import { itemVariants, menuVariants } from "@/utils/variants";
import Image from "next/image";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import "./index.css";
import { useLanguage } from "../../../../stores/useLengauage";
import { Listbox } from "@headlessui/react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scroll, isScrolling } = useScrollProgress();
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const { lang, setLang, dictionary } = useLanguage();

  const [tooltip, setTooltip] = useState<
    "blog" | "insight" | "contact us" | null
  >(null);

  const showTooltip = (key: "blog" | "insight" | "contact us") => {
    setTooltip(key);
    setTimeout(() => setTooltip(null), 2000);
  };

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
    <header className="sticky top-0 z-[999] bg-gradient-to-r from-[rgba(1,96,114,0.7)] to-[rgba(44,112,91,0.7)] text-white backdrop-blur-sm">
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
            className="object-contain"
          />
          <div className="leading-tight text-sm">
            {/* <h5 className="font-bold uppercase">Asrama Mahasiswa Gorontalo</h5> */}
          </div>
          <nav className="hidden sm:flex gap-6 ml-10 items-center">
            <Link href="/" className="link-underline">
              {dictionary.navbar.home}
            </Link>

            <div className="relative group">
              <button
                onClick={(e) => e.preventDefault()}
                className="text-white link-underline cursor-not-allowed select-none"
              >
                {dictionary.navbar.blog}
              </button>

              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-10">
                <div className="relative bg-gray-900 text-white text-xs px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  Akan Datang 🚫
                  <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 z-[-1] shadow" />
                </div>
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={(e) => e.preventDefault()}
                className="text-white link-underline cursor-not-allowed select-none"
              >
                {dictionary.navbar.insight}
              </button>

              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-10">
                <div className="relative bg-gray-900 text-white text-xs px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  Akan Datang 🚫
                  <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 z-[-1] shadow" />
                </div>
              </div>
            </div>
          </nav>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="sm:hidden text-white text-2xl relative w-8 h-8"
        >
          <span
            className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${
              mobileMenuOpen
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
            className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${
              mobileMenuOpen
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
                  <Listbox.Button className="w-full bg-white text-[#016072] font-semibold text-sm px-3 py-2 pr-10 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-[#016072] focus:ring-offset-1 transition-all flex items-center gap-2">
                    {/* Flag */}
                    {selectedLang?.flag && (
                      <Image
                        src={selectedLang.flag}
                        alt={`${selectedLang.label} flag`}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-cover rounded-full border border-gray-300 shadow-sm"
                      />
                    )}
                    {/* <span>{selectedLang?.label}</span> */}

                    {/* Arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-[#016072] transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Listbox.Button>

                  <Listbox.Options className="absolute mt-10 w-full bg-white rounded-md shadow z-10 w-10">
                    {languages
                      .filter((item) => item.value !== lang)
                      .map((item) => (
                        <Listbox.Option
                          key={item.value}
                          value={item.value}
                          className={({ active }) =>
                            `cursor-pointer px-3 py-2 flex items-center gap-2 ${
                              active
                                ? "bg-[#e6f3f5] text-[#016072]"
                                : "text-gray-700"
                            }`
                          }
                        >
                          {item.flag && (
                            <Image
                              src={item.flag}
                              alt={`${item.label} flag`}
                              width={20}
                              height={20}
                              className="w-5 h-5 object-cover rounded-full border border-gray-300 shadow-sm"
                            />
                          )}
                          <span>{item.label}</span>
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
              className="flex items-center justify-center bg-white text-black px-4 py-2 rounded-sm shadow transition-all transform hover:bg-gray-200 hover:shadow-md"
            >
              <span className="text-sm text-[#016072] flex items-center gap-1">
                {dictionary.navbar.contact}
              </span>
            </Link>
          </div>
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

            <motion.div variants={itemVariants} className="relative">
              <button
                onClick={() => showTooltip("blog")}
                className="block w-full text-left hover:underline text-white"
              >
                Blog
              </button>
              {tooltip === "blog" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-3 py-1 rounded shadow z-10"
                >
                  Akan datang 🚫
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <button
                onClick={() => showTooltip("insight")}
                className="block w-full text-left hover:underline text-white"
              >
                {dictionary.navbar.insight}
              </button>
              {tooltip === "insight" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-1 bg-black text-white text-xs px-3 py-1 rounded shadow z-10"
                >
                  Akan datang 🚫
                </motion.div>
              )}
            </motion.div>

            <div className="inline-flex relative">
              <select
                className="appearance-none bg-white text-[#016072] font-semibold text-sm px-3 py-2 pr-8 rounded-md shadow focus:outline-none"
                value={lang}
                onChange={(e) =>
                  setLang(e.target.value as "en" | "id" | "gtlo")
                }
              >
                <option value="en">English</option>
                <option value="id">Indonesia</option>
                {/* <option value="gtlo">Bahasa Gorontalo</option> */}
              </select>

              <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <motion.div variants={itemVariants}>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center bg-white text-black px-4 py-1 rounded-sm shadow transition-all transform hover:shadow-lg hover:-translate-y-1"
              >
                <span className="text-sm text-[#016072] flex items-center gap-1">
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
