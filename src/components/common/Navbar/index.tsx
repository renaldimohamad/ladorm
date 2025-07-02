"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import CurrentTime from "./CurrentTime";
import { motion, AnimatePresence } from "framer-motion";
import { itemVariants, menuVariants } from "@/utils/variants";
import Image from "next/image";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import "./index.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scroll, isScrolling } = useScrollProgress();
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const [tooltip, setTooltip] = useState<
    "blog" | "insight" | "contact us" | null
  >(null);

  const showTooltip = (key: "blog" | "insight" | "contact us") => {
    setTooltip(key);
    setTimeout(() => setTooltip(null), 2000);
  };

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
            src="/images/Ladorm Logo - Putih.png"
            alt="LADORM - LOGO"
            width={60}
            height={20}
            className="object-contain"
          />
          <div className="leading-tight text-sm">
            <h5 className="font-bold uppercase">Asrama Mahasiswa Gorontalo</h5>
          </div>
          <nav className="hidden sm:flex gap-6 ml-10 items-center">
            <Link href="/" className="link-underline">
              Beranda
            </Link>
            <div className="relative group">
              <button
                onClick={(e) => e.preventDefault()}
                className="text-white link-underline cursor-not-allowed select-none"
              >
                Blog
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
                Insight
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
          className="sm:hidden text-white text-2xl"
        >
          {mobileMenuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>

        <div className="relative hidden sm:block w-36">
          <Link
            href="/contact-us"
            className="flex items-center justify-center w-full bg-white text-black px-4 py-2 rounded-lg shadow transition-all transform hover:shadow-lg hover:-translate-y-1"
          >
            <span className="text-sm font-semibold text-[#016072] flex items-center gap-1">
              Contact Us
            </span>
          </Link>
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
                Beranda
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
                Insight
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

            <motion.div variants={itemVariants}>
              <button
                onClick={() => showTooltip("contact us")}
                className="flex items-center justify-center w-36 bg-white text-black px-3 py-2 rounded-lg shadow hover:shadow-md transition cursor-not-allowed"
              >
                <span className="text-sm font-semibold text-[#2C705B]">
                  Contact Us
                </span>
              </button>

              {tooltip === "contact us" && (
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
