"use client";

import Footer from "@/components/common/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TestimonialsWrapper } from "@/components/Home/TestimonialsWrapper";
import { LayoutBlank } from "@/layouts";
import { motion } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { AboutDormitory } from "@/components/Home/AboutAsrama";
import { testimonialsData } from "@/utils/Testimonials";
import DormitoryManagement from "@/components/Home/DormitoryManagement";
import Image from "next/image";
import { useLanguage } from "../../stores/useLengauage";
import { CallToAction } from "@/ui/common/CallToAction";

export default function Home() {
  const scrollDir = useScrollDirection();
  const initialY = scrollDir === "down" ? 80 : -80;

  const { dictionary } = useLanguage();

  const slides = [
    {
      img: "/images/asrama_profile_img_5.webp",
    },
    {
      img: "/images/asrama_profile_img_2.webp",
    },
    {
      img: "/images/asrama_profile_img_3.webp",
    },
  ];

  const heroContents = dictionary?.heroSectionHome ?? [];

  return (
    <LayoutBlank>
      <main className="flex flex-col w-full">
        <section
          id="home"
          // className="w-full min-h-[90vh] md:min-h-[70vh] lg:min-h-[60vh] relative flex items-center justify-center "
          className="relative w-full h-full flex flex-col justify-center"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={600}
            pagination={{ clickable: true }}
            loop
            className="w-full h-[80vh]"
          >
            {slides.map((slide, index) => {
              const content = heroContents[index];

              return (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[90vh] md:h-screen flex flex-col justify-center">
                    <div
                      className="absolute inset-0 bg-cover bg-center z-[-1]"
                      style={{ backgroundImage: `url(${slide.img})` }}
                    />

                    <div className="hidden md:block absolute left-0 top-0 h-full w-full bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-0 block md:hidden bg-white/70 z-10 pointer-events-none" />

                    <div className="relative z-20 px-4 lg:px-20 -mt-8 md:-mt-50">
                      <div className="text-left max-w-2xl space-y-6">
                        <h2
                          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-[rgba(1,96,114,0.8)] to-[rgba(44,112,91,0.8)] bg-clip-text text-transparent font-montserrat leading-relaxed"
                          style={{
                            textShadow: "0.5px 0.5px 1px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          {content?.title ?? ""}
                        </h2>
                        <p
                          className="text-black/80 text-sm md:text-xl drop-shadow-sm max-w-xl leading-relaxed"
                          style={{
                            textShadow: "0.5px 0.5px 1px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          {content?.desc ?? ""}
                        </p>
                        <CallToAction
                          text={dictionary.heroButtonLabels.callToAction}
                          href="#about"
                          className="bg-gradient-to-r from-[rgba(1,96,114,0.7)] to-[rgba(44,112,91,0.7)]"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>

        <section
          id="about"
          className="scroll-mt-20 w-full px-4 py-20 bg-white text-black"
        >
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              duration: 1.2,
              ease: [0.2, 1, 0.3, 1],
              delay: 0.2,
            }}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full"
          >
            <AboutDormitory />
          </motion.section>
        </section>
        {/* <GeneralInfo /> */}
        <section className="w-full px-4 py-16 sm:py-20 bg-gray-100 text-black flex flex-col items-center">
          <motion.section
            initial={{ opacity: 0, y: initialY }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.2, 1, 0.3, 1],
              delay: 0.2,
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full"
          >
            <h1 className="text-2xl sm:text-1xl md:text-2xl font-bold mb-8 sm:mb-10 text-center text-[#016072]">
              Testimonials
            </h1>

            <div className="w-full max-w-6xl px-2 sm:px-4 mx-auto">
              <Swiper
                modules={[Autoplay]}
                loop={true}
                grabCursor={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                allowTouchMove={true}
                touchStartPreventDefault={false}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {testimonialsData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-full px-1 sm:px-2">
                      <TestimonialsWrapper>
                        <div className="leading-relaxed">
                          <span className="text-sm sm:text-base leading-relaxed text-gray-800 text-justify">
                            “{item.message}”
                          </span>
                        </div>

                        <div className="mt-auto flex items-center gap-3 pt-6 gap-4">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            width={48}
                            height={48}
                            unoptimized
                            className="rounded-full object-cover"
                          />

                          <div className="flex flex-col items-start space-y-0.5 leading-tight">
                            <span className="font-bold text-sm sm:text-base">
                              {item.name}
                            </span>
                            <span className="text-gray-500 text-xs italic">
                              {item.role}
                            </span>
                          </div>
                        </div>
                      </TestimonialsWrapper>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.section>
        </section>
        <section>
          <DormitoryManagement />
        </section>
        <Footer />
      </main>
    </LayoutBlank>
  );
}
