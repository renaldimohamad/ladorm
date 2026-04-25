"use client";

import React from "react";
import Image from "next/image";
import { LayoutBlank } from "@/layouts";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <LayoutBlank bgColor="bg-background">
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-card border border-border/50 rounded-[2.5rem] p-10 shadow-2xl"
        >
          <div className="flex justify-center mb-8">
            <Image
              src="/images/Visual Idententy - Remake Logo Ladorm 2.webp"
              alt="LADorm"
              width={180}
              height={50}
              className="object-contain"
            />
          </div>

          <div className="w-16 h-16 bg-teal-500/10 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 font-black text-2xl">
            404
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-muted-foreground text-sm mb-10 leading-relaxed">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black uppercase tracking-widest text-[10px] hover:shadow-2xl hover:opacity-90 transition-all active:scale-95"
            >
              Kembali ke Beranda
            </button>
          </div>
        </motion.div>
      </div>
    </LayoutBlank>
  );
}
