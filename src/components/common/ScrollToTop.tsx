"use client";
import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";
import clsx from "clsx";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        "fixed bottom-6 right-6 z-[9999] p-3 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none transform hover:-translate-y-1",
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <HiArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
}
