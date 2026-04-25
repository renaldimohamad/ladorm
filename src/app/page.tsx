"use client";
import Footer from "@/components/common/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { LayoutBlank } from "@/layouts";
import { useLanguage } from "../../stores/useLengauage";
import { CallToAction } from "@/ui/common/CallToAction";
import WhyLADorm from "@/components/WhyLADorm";
import { SectionAbout } from "@/components/Home/SectionAbout";
import Fade from "@/components/common/Fade";
import { testimonialsData } from "@/utils/Testimonials";
import { TestimonialsWrapper } from "@/components/Home/TestimonialsWrapper";
import HowWeWork from "@/components/Home/HowWeWork";
import CTASection from "@/components/Home/CTASection";
import HomeBlogSection from "@/components/HomeBlogSection";
import HomeInsightSection from "@/components/HomeInsightSection";
import Image from "next/image";

export default function Home() {

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
  const actionText =
    dictionary?.heroButtonLabels?.callToAction || "Selengkapnya";

  return (
    <LayoutBlank>
      <main className="flex flex-col w-full">
        <section
          id="home"
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

                    <div className="hidden md:block absolute left-0 top-0 h-full w-full bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-0 block md:hidden bg-background/80 z-10 pointer-events-none" />

                    <div className="relative z-20 px-4 lg:px-20 -mt-8 md:-mt-50">
                      <div className="text-left max-w-2xl space-y-6">
                        <h2
                          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-[var(--gradient-from)] dark:to-[var(--gradient-to)] bg-clip-text text-transparent font-montserrat drop-shadow-sm"
                        >
                          {content?.title ?? ""}
                        </h2>
                        <p
                          className="text-foreground/90 font-medium text-base md:text-xl drop-shadow-sm max-w-xl leading-relaxed opacity-90"
                        >
                          {content?.desc ?? ""}
                        </p>
                        <div className="pt-4 flex flex-wrap gap-4 drop-shadow hover:drop-shadow-lg transition-transform duration-300 hover:-translate-y-1">
                          <CallToAction
                            text={actionText}
                            href="#about"
                            className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-foreground hover:bg-muted/80"
                          />
                          <CallToAction
                            text="Daftar Asrama"
                            href="/register"
                            className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
        <SectionAbout />
        <WhyLADorm />
        <HowWeWork />
        <section className="w-full px-4 py-16 sm:py-20 bg-muted/30 dark:bg-[var(--card)]/100 text-foreground flex flex-col items-center">
          <Fade direction="up" className="w-full">
            <h3 className="text-3xl font-extrabold mb-10 text-center text-foreground tracking-tight">
              {dictionary.homeWhyLadorm?.CTA?.title ? "Testimonials" : "Testimonials"}
            </h3>
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
                {(dictionary.testimonialsData || testimonialsData).map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-full px-1 sm:px-2">
                      <TestimonialsWrapper>
                        <div className="leading-relaxed">
                          <span className="text-sm sm:text-base leading-relaxed text-foreground text-justify">
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
                            <span className="text-muted-foreground text-xs italic">
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
          </Fade>
        </section>

        <HomeBlogSection />
        <HomeInsightSection />

        <CTASection />
        <Footer />
      </main>
    </LayoutBlank>
  );
}
