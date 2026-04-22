import { CallToAction } from "@/ui/common/CallToAction";
import Fade from "../common/Fade";
import { useLanguage } from "../../../stores/useLengauage";
import { useEffect, useState } from "react";
import Image from "next/image";

export const SectionAbout = () => {
  const { dictionary } = useLanguage();

  const images = [
    // "/images/ladorm_family_photos.webp",
    // "/images/ladorm_family_photos_1.webp",
    "/images/ladorm_img.webp",
    "/images/ladorm_about_img_3.webp",
    "/images/ladorm_about_img_4.webp",
    "/images/ladorm_about_img_1.webp",
    "/images/ladorm_about_img_2.webp",
    // "/images/ladorm_moment_iftar.webp"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length, index]); // Adding index to effect to reset interval on manual change

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const actionText =
    dictionary?.heroButtonLabels?.callToAction || "Selengkapnya";

  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 sm:py-24 md:py-32 bg-background text-foreground"
    >
      {/* Decorative Background Elements - Subtle and adjusted for mobile */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none opacity-50 md:opacity-100" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-secondary/10 rounded-full blur-[70px] md:blur-[100px] pointer-events-none opacity-50 md:opacity-100" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24 max-w-7xl mx-auto">

          {/* Visual Side: Asymmetric Image Presentation */}
          <div className="w-full lg:w-[45%] xl:w-1/2 relative order-1 lg:order-none">
            <Fade direction="left" distance={40}>
              <div className="relative group max-w-md lg:max-w-none mx-auto lg:mx-0">
                {/* Main Image Container with elegant border */}
                <div className="relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10">
                  {images.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt="LADORM Activity"
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className={`
                        object-cover
                        transition-all
                        duration-[2000ms]
                        ease-in-out
                        filter contrast-[1.1] brightness-[1.05]
                        ${i === index ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"}
                      `}
                      priority={i <= 1}
                    />
                  ))}

                  {/* Premium Multi-Layer Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/20 mix-blend-overlay z-20 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-20 pointer-events-none" />
                  <div className="absolute inset-0 border-[1px] border-white/10 rounded-3xl z-30 pointer-events-none" />

                  {/* Manual Controls (Visible on Hover) */}
                  <div className="absolute inset-0 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="Previous image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="Next image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                  </div>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`transition-all duration-500 rounded-full cursor-pointer ${i === index ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
                          }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Detail Card (Luxurious Touch) */}
                <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-8 z-50 glass-effect p-4 sm:p-6 rounded-2xl shadow-2xl max-w-[180px] sm:max-w-[220px] border border-white/20 transform hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      Our Philosophy
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-sm font-medium leading-relaxed">
                    Lebih dari sekadar asrama, ini adalah rumah bagi mimpi dan keluarga.
                  </p>
                </div>

                {/* Decorative Frame Element */}
                <div className="absolute -top-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 border-t-2 border-l-2 border-primary/20 rounded-tl-3xl -z-10 hidden sm:block" />
              </div>
            </Fade>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-[55%] xl:w-1/2 flex flex-col gap-6 sm:gap-8 md:gap-10 text-center lg:text-left">
            <div>
              <Fade direction="down" delay={200}>
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 sm:mb-6">
                  <div className="h-[1px] w-8 sm:w-12 bg-primary/50" />
                  <span className="text-primary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                    About Ladorm
                  </span>
                </div>
              </Fade>

              <Fade direction="up" delay={300}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.15] mb-4 sm:mb-6 tracking-tight">
                  {dictionary.homeSectionAbout?.title}
                </h2>
              </Fade>

              <Fade direction="up" delay={400}>
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 font-medium max-w-2xl mx-auto lg:mx-0">
                  {dictionary.homeSectionAbout?.desc}
                </p>
              </Fade>

              <Fade direction="up" delay={500}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                  <CallToAction
                    text={actionText}
                    href="/about"
                    className="px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-full w-full sm:w-auto"
                  />

                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3 sm:-space-x-4">
                      {[2, 3, 4, 5].map((i) => (
                        <div key={i} className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-background overflow-hidden bg-muted shadow-md">
                          <Image
                            src={`/images/asrama_profile_img_${i}.webp`}
                            alt="Student"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary backdrop-blur-sm">
                        +50
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-widest leading-none">
                      Trusted by <br className="sm:hidden" /> students
                    </span>
                  </div>
                </div>
              </Fade>
            </div>

            {/* Stats or Mini Feature */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-border/50 max-w-md mx-auto lg:mx-0 w-full">
              <Fade direction="right" delay={600} distance={10}>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-primary mb-0.5">10+ Years</h4>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-extrabold">Experience</p>
                </div>
              </Fade>
              <Fade direction="right" delay={700} distance={10}>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-primary mb-0.5">100%</h4>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-extrabold">Community Focus</p>
                </div>
              </Fade>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
