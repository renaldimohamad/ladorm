"use client";

import Link from "next/link";

interface CallToActionProps {
  text: string;
  href?: string;
  className?: string;
  textColor?: string;
  bgColor?: string;
  rounded?: string;
}

export const CallToAction = ({
  text,
  href = "",
  className,
  textColor,
  bgColor,
  rounded = "custom",
}: CallToActionProps) => {
  return (
    <div className="inline-block">
      <Link
        href={href}
        className={`rounded-${rounded} inline-flex items-center justify-center px-6 py-2 lg:py-[8px] shadow hover:shadow-md transition select-none text-sm sm:text-base whitespace-nowrap ${bgColor} ${textColor} ${className}`}
      >
        {text}
      </Link>
    </div>
  );
};
