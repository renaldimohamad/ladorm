import { motion } from "framer-motion";

type DynamicButtonProps = {
  children?: React.ReactNode;
  type?: "button" | "submit";
  isLoading?: boolean;
  onClick?: () => void;
  path?: string;
  custom?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variant?: any;
  className?: string;
  loaderButton?: React.ReactNode;
};

const DynamicButton: React.FC<DynamicButtonProps> = ({
  children,
  type = "button",
  isLoading = false,
  onClick,
  custom,
  variant,
  className = "",
  loaderButton,
}) => {
  const handleClick = () => {
    if (!isLoading) {
      onClick?.();
    }
  };

  return (
    <motion.button
      type={type}
      disabled={isLoading}
      onClick={handleClick}
      variants={variant}
      custom={custom}
      className={`w-full md:w-auto
        bg-gradient-to-r from-[#018484] to-[#3b9e7e]
        text-sm sm:text-base md:text-sm
        text-white font-medium
        px-6 py-2 rounded shadow rounded-sm
        transition-colors duration-300
        hover:from-[#016072] hover:to-[#2c705b]
        ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
        ${className}`}
    >
      {isLoading ? loaderButton ?? "Loading..." : children}
    </motion.button>
  );
};

export default DynamicButton;
