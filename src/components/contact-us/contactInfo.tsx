"use client";
import { motion } from "framer-motion";
import contactItems from "./contactItems";
import "./index.css";
import Link from "next/link";
import { div } from "framer-motion/client";

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
      <p className="text-base sm:text-lg md:text-xl font-semibold text-[#018484] mb-4">
        Kontak Kami
      </p>

      <ul className="text-[#3b9e7e]">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {contactItems.map((item: any, i: number) => (
          <Link
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.li
              key={i}
              // className="flex items-start gap-3 py-4 border-b last:border-none border-dashed border-green-200 transition-all duration-300 rounded-md px-2"
              className="flex items-start gap-3 py-4 border-b border-dashed border-green-200 transition-all duration-300 rounded-md px-2"
              variants={fadeInUp}
              custom={i + 2}
              whileHover={{
                scale: 1.08,
                backgroundColor: "rgba(235, 255, 245, 0.9)",
                boxShadow: "0px 2px 10px rgba(59, 158, 126, 0.2)",
                transition: {
                  duration: 0.01,
                  ease: "easeOut",
                },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-[#016072] mt-1 text-lg sm:text-xl">
                {item.icon}
              </div>
              <div>
                <p className="font-medium text-[#018484] text-sm sm:text-base md:text-lg">
                  {item.label}
                </p>
                {item.href ? (
                  <div>{item.value}</div>
                ) : (
                  <p className="break-all text-xs sm:text-sm md:text-base text-gray-600">
                    {item.value}
                  </p>
                )}
              </div>
            </motion.li>
          </Link>
        ))}
      </ul>
    </motion.div>
  );
}
