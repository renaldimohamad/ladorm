"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export const GeneralInfo = () => {
  const scrollDir = useScrollDirection();
  const initialY = scrollDir === "down" ? 80 : -80;

  return (
    <section className="w-full px-4 py-16 sm:py-20 bg-gray-100 text-black flex flex-col items-center">
      <motion.section
        initial={{ opacity: 0, y: initialY }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.2, 1, 0.3, 1],
          delay: 0.2,
        }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full"
      >
        <div className="flex items-center justify-center">
          <div className="relative w-full aspect-[16/9] sm:h-screen sm:aspect-auto">
            <Image
              src="/images/General Info 1.webp"
              alt="Info Asrama"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 100vh"
              priority
            />
          </div>
        </div>
      </motion.section>
    </section>
  );
};
