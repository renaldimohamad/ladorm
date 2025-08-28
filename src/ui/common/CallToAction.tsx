"use client";

import Link from "next/link";

interface CallToActionProps {
  text: string;
  href?: string;
  className?: string;
  textColor?: string;
  bgColor?: string;
}

export const CallToAction = ({
  text,
  href = "",
  className,
  textColor,
  bgColor,
}: CallToActionProps) => {
  return (
    <div className="inline-block">
      <Link
        href={href}
        className={`inline-flex items-center justify-center px-6 py-2 lg:py-[10px] rounded-sm shadow hover:shadow-md transition select-none text-sm sm:text-base whitespace-nowrap ${bgColor} ${textColor} ${className}`}
      >
        {text}
      </Link>
    </div>
  );
};
