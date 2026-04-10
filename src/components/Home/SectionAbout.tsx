import { CallToAction } from "@/ui/common/CallToAction";
import Fade from "../common/Fade";
import { useLanguage } from "../../../stores/useLengauage";
import { useEffect, useState } from "react";
import Image from "next/image";

export const SectionAbout = () => {
  const { dictionary } = useLanguage();

  const images = [
    // "/images/ladorm_photos_rm.webp",
    "/images/ladorm_family_photos.webp",
    "/images/ladorm_family_photos_1.webp",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6 detik
    return () => clearInterval(interval);
  }, []);

  const actionText =
    dictionary?.heroButtonLabels?.callToAction || "Selengkapnya";

  return (
    <section
      id="about"
      className="scroll-smooth mt-8 w-full px-4 py-20 bg-background text-foreground"
    >
      <div className="w-full flex flex-col items-center">
        <Fade direction="down">
          <h5 className="text-2xl font-semibold mb-8 ">About Us</h5>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
          <div className="mb-0 sm:mb-0 relative">
            <Fade direction="left">
              <div className="rounded-custom relative w-full h-[280px] rounded-xl overflow-hidden bg-background">
                {images.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt="LADORM Activity"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`
  object-contain
  md:object-cover
  transition-opacity
  duration-[1600ms]
  ease-[cubic-bezier(0.4,0,0.2,1)]
  ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}
`}
                    priority={i === 0}
                  />
                ))}

                {/* Subtle overlay (lebih dewasa) */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent z-20" />
              </div>
            </Fade>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-8">
              <Fade direction="up">
                <h1 className="text-2xl font-bold mb-1 text-left leading-relaxed">
                  {dictionary.homeSectionAbout?.title}
                </h1>
              </Fade>
              {/* <Fade direction="down"> */}
              <span className="text-muted-foreground mb-1 text-left leading-relaxed">
                {dictionary.homeSectionAbout?.desc}
              </span>
              {/* </Fade> */}
              <Fade direction="right">
                <CallToAction
                  text={actionText}
                  href="/about"
                  className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white"
                />
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
