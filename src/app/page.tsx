"use client";

import Footer from "@/components/common/Footer";
import { WrapContainerHome } from "@/components/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
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

export default function Home() {
  const scrollDir = useScrollDirection();
  const initialY = scrollDir === "down" ? 80 : -80;

  return (
    <LayoutBlank>
      <main className="flex flex-col w-full">
        <section
          id="home"
          className="w-full min-h-screen relative flex items-center justify-center px-4 py-16"
        >
          <div className="absolute inset-0 z-0">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              loop={true}
              className="w-full h-full relative z-10"
            >
              {[
                "/images/asrama_profile_img.webp",
                "/images/asrama_profile_img_2.webp",
                "/images/asrama_profile_img_3.webp",
                "/images/asrama_profile_img_4.webp",
                "/images/asrama_profile_img_5.webp",
              ].map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
          </div>

          <div className="relative z-10 w-full">
            <motion.section
              initial={{ opacity: 0, y: initialY }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.2, 1, 0.3, 1],
                delay: 0.2,
              }}
              viewport={{ once: false, amount: 0.4 }}
              className="w-full px-4 py-20"
            >
              <WrapContainerHome />
            </motion.section>
          </div>
        </section>

        <section className="w-full px-4 py-20 bg-white text-black">
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
            <AboutDormitory />
          </motion.section>
        </section>
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
            <DormitoryManagement />
          </motion.section>
        </section>
        <Footer />
      </main>
    </LayoutBlank>
  );
}
