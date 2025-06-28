import Navbar from "@/components/common/Navbar";
import "@/styles/globals.css";
import { montserrat } from "@/styles/font";

const LayoutBlank = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`
        ${montserrat.className} bg-[#ffffff]`}
    >
      <Navbar />
      <main className={`flex items-center justify-center h-full ${className} `}>
        {children}
      </main>
    </div>
  );
};

export { LayoutBlank };
