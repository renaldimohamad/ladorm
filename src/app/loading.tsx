"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]">
      {/* Noise Texture */}
      <div className="absolute inset-0 z-50 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
      
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: [0.99, 1, 0.99]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-12"
        >
          <Image
            src="/images/Visual Idententy - Remake Logo Ladorm 2.webp"
            alt="LADorm Loading"
            width={200}
            height={60}
            className="object-contain"
          />
        </motion.div>
        
        {/* Refined Minimalist Loading */}
        <div className="relative w-40 h-[1px] bg-white/5 overflow-hidden rounded-full">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ 
              duration: 2.2, 
              repeat: Infinity, 
              ease: [0.65, 0, 0.35, 1] 
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          className="mt-6 text-[7px] font-bold tracking-[0.8em] text-white uppercase"
        >
          Elevating Spaces
        </motion.p>
      </div>
    </div>
  );
}
