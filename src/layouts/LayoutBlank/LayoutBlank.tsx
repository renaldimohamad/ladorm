import Navbar from "@/components/common/Navbar";
import "@/styles/globals.css";
import { montserrat } from "@/styles/font";

const LayoutBlank = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`
        ${montserrat.className}
        min-h-screen
        bg-[url('/images/asrama_profile_img.webp')]
        bg-cover
        bg-center
      `}
      // className={`
      //   ${montserrat.className}
      //   min-h-screen
      //   bg-[url('/images/asrama_profile_img.webp')]
      //   bg-[position:12%_center]    // mobile → geser fokus ke kanan sedikit
      //   sm:bg-center                // sm dan ke atas → reset ke tengah
      //   bg-cover
      // `}
    >
      <Navbar />
      <main className="flex items-center justify-center h-full mt-10 lg:mt-10">
        {children}
      </main>
    </div>
  );
};

export { LayoutBlank };
