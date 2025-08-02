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
  href = "#about",
  className,
  textColor,
  bgColor,
}: CallToActionProps) => {
  return (
    <div className="inline-block">
      <Link
        href={href}
        className={`inline-flex items-center justify-center px-4 py-2 lg:py-[6px] rounded-sm shadow hover:shadow-md transition select-none text-sm sm:text-base whitespace-nowrap ${bgColor} ${textColor} ${className}`}
      >
        {text}
      </Link>
    </div>
  );
};
