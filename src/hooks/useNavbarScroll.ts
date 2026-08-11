"use client";

import { useState, useEffect } from "react";

/**
 * Hook untuk mendeteksi apakah user sudah scroll melewati threshold.
 * Digunakan oleh Navbar untuk mengubah appearance dari transparan ke frosted glass.
 *
 * @param threshold - pixel dari top sebelum navbar berubah (default: 10)
 */
export function useNavbarScroll(threshold = 10) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Cek kondisi awal (misalnya user me-refresh halaman di tengah scroll)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled };
}
