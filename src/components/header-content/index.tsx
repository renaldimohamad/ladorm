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

  if (type == "back") {
    return (
      <button
        className={`rounded-custom
  flex items-center gap-2 
  px-3 sm:px-4 
  py-1.5 sm:py-2 
  text-xs sm:text-sm md:text-base 
  font-medium 
  text-gray-700 
  bg-white border border-gray-300 
  hover:opacity-90 focus:outline-none 
  cursor-pointer active:opacity-60 
  ${className}`}
        onClick={handleBack}
      >
        <HiArrowNarrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        {label}
      </button>
    );
  }

  if (type == "title") {
    return (
      <div className="md:w-[50%] mb-4">
        <h1 className="text-left text-xl md:text-2xl font-bold mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="leading-relaxed text-sm md:text-md text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
};

export default HeaderContent;
