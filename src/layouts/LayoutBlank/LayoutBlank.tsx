import Navbar from "@/components/common/Navbar";
import "@/styles/globals.css";
import { montserrat } from "@/styles/font";
const LayoutBlank = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${montserrat.className} min-h-screen bg-[#FFFFFF]`}>
      <Navbar />
      <main className="flex items-center justify-center h-full mt-10 lg:mt-20">
        {children}
      </main>
    </div>
  );
};

export { LayoutBlank };
