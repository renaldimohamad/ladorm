"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { LayoutBlank } from "@/layouts";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

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
              className="object-contain grayscale"
            />
          </div>

          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">
            Terjadi Kesalahan
          </h1>
          <p className="text-muted-foreground text-sm mb-10 leading-relaxed">
            Maaf, kami mengalami kendala teknis saat memuat halaman ini. Pastikan koneksi internet Anda stabil atau coba lagi beberapa saat lagi.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => reset()}
              className="w-full py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95"
            >
              Coba Lagi
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full py-4 rounded-2xl bg-muted text-foreground font-black uppercase tracking-widest text-[10px] hover:bg-muted/80 transition-all active:scale-95"
            >
              Kembali ke Beranda
            </button>
          </div>
        </motion.div>
      </div>
    </LayoutBlank>
  );
}
