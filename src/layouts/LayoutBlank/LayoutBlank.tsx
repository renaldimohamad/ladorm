import Navbar from "@/components/common/Navbar";
import "@/styles/globals.css";
import { jakarta } from "@/styles/font";
import PageTransition from "@/components/PageTransition";

const LayoutBlank = ({
  children,
  className = "",
  bgColor = "white",
}: {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}) => {
  return (
    <div className={`${jakarta.className} bg-${bgColor}`}>
      <Navbar />
      <PageTransition>
        <main
          className={`flex items-center justify-center h-full ${className} `}
        >
          {children}
        </main>
      </PageTransition>
    </div>
  );
};

export { LayoutBlank };
