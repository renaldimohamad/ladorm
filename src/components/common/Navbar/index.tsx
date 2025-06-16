"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import CurrentTime from "./CurrentTime";
import { motion, AnimatePresence } from "framer-motion";
import { itemVariants, menuVariants } from "@/utils/variants";
import "./index.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-[999] bg-gradient-to-r from-[#016072] to-[#2C705B] text-white">
      <div className="h-8 w-full flex items-center px-4">
        <span className="text-lg text-white">
          <CurrentTime />
        </span>
      </div>

      <div className="relative h-[68px] w-full px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/LADORM - LOGO WHITE.webp"
            alt="LADORM - LOGO"
            className="w-10 h-10"
          />
          <div className="leading-tight text-sm">
            <h5 className="font-bold uppercase">Asrama Mahasiswa Gorontalo</h5>
          </div>
          <nav className="hidden sm:flex gap-6 ml-10">
            <Link href="/" className="link-underline">
              Beranda
            </Link>
            <Link href="/blog" className="link-underline">
              Blog
            </Link>
            <Link href="/insight" className="link-underline">
              Insight
            </Link>
          </nav>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="sm:hidden text-white text-2xl"
        >
          {mobileMenuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>

        <div className="relative hidden sm:block">
          <button className="flex items-center justify-center w-36 bg-white text-black px-4 py-3 rounded-lg shadow hover:shadow-md transition cursor-pointer">
            <span className="text-sm font-semibold text-[#016072]">
              Contact Us
            </span>
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
            className="sm:hidden px-4 pb-4 space-y-3 bg-gradient-to-r from-[#016072] to-[#2C705B] text-white"
          >
            <motion.div variants={itemVariants}>
              <Link href="/" className="block hover:link-underline">
                Beranda
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/blog" className="block hover:link-underline">
                Blog
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/insight" className="block hover:link-underline">
                Insight
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button className="flex items-center justify-center w-36 bg-white text-black px-3 py-2 rounded-lg shadow hover:shadow-md transition cursor-pointer">
                <span className="text-sm font-semibold text-[#2C705B]">
                  Contact Us
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
