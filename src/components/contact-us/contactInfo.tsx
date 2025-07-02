"use client";
import { motion } from "framer-motion";
import contactItems from "./contactItems";
import "./index.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export default function ContactInfo() {
  return (
    <motion.div
      className="border border-gray-200 rounded-xl p-6 bg-white shadow-lg"
      variants={fadeInUp}
      custom={1}
    >
      <p className="text-base sm:text-lg md:text-xl font-semibold text-green-800 mb-4">
        Kontak Kami
      </p>

      <ul className="text-gray-700">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {contactItems.map((item: any, i: number) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 py-4 border-b last:border-none border-dashed border-green-200 hover:bg-green-100/100 transition-all duration-300 rounded-md px-2"
            variants={fadeInUp}
            custom={i + 2}
          >
            <div className="text-green-700 mt-1 text-lg sm:text-xl">
              {item.icon}
            </div>
            <div>
              <p className="font-medium text-gray-800 text-sm sm:text-base md:text-lg">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-xs sm:text-sm md:text-base text-green-700 footer-link-contact-hover"
                >
                  {item.value}
                </a>
              ) : (
                <p className="break-all text-xs sm:text-sm md:text-base text-gray-600">
                  {item.value}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
