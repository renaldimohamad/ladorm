import Navbar from "@/components/common/Navbar";
import "@/styles/globals.css";
import { montserrat, poppins } from "@/styles/font";
import { html } from "framer-motion/m";

const LayoutBlank = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${poppins.className} bg-[#ffffff]`}>
      <Navbar />
      <main className={`flex items-center justify-center h-full ${className} `}>
        {children}
      </main>
    </div>
  );
};

export { LayoutBlank };
