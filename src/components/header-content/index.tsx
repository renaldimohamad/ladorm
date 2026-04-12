import React from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";

interface HeaderContentProps {
  type?: "back" | "title";
  label?: string;
  onBack?: () => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  type = "back",
  label = "Kembali",
  onBack,
  className = "",
  title,
  subtitle,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined" && window.history) {
      window.history.back();
    }
  };

  if (type === "back") {
    return (
      <button
        className={`group inline-flex items-center justify-center gap-2 
        px-5 sm:px-6 py-2.5 sm:py-3
        text-sm sm:text-base font-bold tracking-wide
        text-foreground bg-white/70 dark:bg-black/40 backdrop-blur-md 
        border border-gray-200 dark:border-white/10 rounded-full
        hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white
        transition-all duration-300 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50
        active:scale-95 cursor-pointer 
        ${className}`}
        onClick={handleBack}
      >
        <HiArrowNarrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform duration-300" />
        {label}
      </button>
    );
  }

  if (type === "title") {
    return (
      <div className={`w-full max-w-3xl mb-8 relative ${className}`}>
        {/* Accent Bar */}
        <div className="w-12 h-1.5 bg-[var(--primary)] rounded-full mb-4"></div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-foreground drop-shadow-sm leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default HeaderContent;
