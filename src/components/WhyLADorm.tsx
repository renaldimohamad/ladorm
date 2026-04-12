"use client";
import { FaHome, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { testimonialsData } from "@/utils/Testimonials";
import { TestimonialsWrapper } from "./Home/TestimonialsWrapper";
import Image from "next/image";
import { CallToAction } from "@/ui/common/CallToAction";
import Fade from "./common/Fade";
import { useLanguage } from "../../stores/useLengauage";

const WhyLADorm = () => {
  const { dictionary } = useLanguage();

  return (
    <section className="relative overflow-hidden py-16 px-6 md:px-36">
      <div className="absolute inset-0">
        <Image
          src="/images/BG_Ladorm.webp"
          alt=""
          fill
          quality={60}
          sizes="100vw"
          className="object-cover"
          loading="lazy"
          priority={false}
          placeholder="blur"
          blurDataURL="/images/bg-blur.jpg"
        />
        {/* Gradasi overlay agar background tidak terlalu terang di dark mode */}
        <div className="absolute inset-0 bg-white/50 dark:bg-gradient-to-b dark:from-background/95 dark:via-background/85 dark:to-background/95 z-10 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}

        <Fade direction="up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            {/* Kenapa Harus Tinggal di <span>LADORM?</span> */}
            {dictionary.homeWhyLadorm?.titleSection}
          </h2>
        </Fade>

        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* <Fade direction="left"> */}

          <Fade direction="left">
            <div>
              <p className="mb-4 text-foreground font-semibold">
                Asrama Mahasiswa Gorontalo
              </p>
              <h3 className="text-[#016072] text-4xl font-bold mb-4">LADORM</h3>
              <p className="text-lg font-semibold mb-3 text-muted-foreground">
                {dictionary.homeWhyLadorm?.desc1}
              </p>
              <p className="text-muted-foreground">{dictionary.homeWhyLadorm?.desc2}</p>
            </div>
          </Fade>

          {/* <Fade direction="right"> */}
          <Fade direction="right">
            <div className="hidden lg:flex items-center justify-center relative">
              {/* Foto kiri (grayscale) */}
              <img
                src="/images/Ladorm_Photos.webp"
                alt="Asrama LADorm"
                className="w-82 h-44 object-cover rounded-md shadow-lg z-20 absolute -left-4 top-6"
              />

              {/* Foto tengah (paling depan) */}
              <img
                src="/images/asrama_profile_img_5.webp"
                alt="Asrama LADorm 2"
                className="w-82 h-44 object-cover rounded-md shadow-lg z-10 grayscale -top-8 relative"
              />

              {/* Foto kanan */}
              <img
                src="/images/asrama_profile_img_4.webp"
                alt="Asrama LADorm 3"
                className="w-82 h-44 object-cover rounded-md shadow-lg z-0 absolute right-14 top-14"
              />
            </div>
          </Fade>
          {/* </Fade> */}

          {/* <Fade direction="right"> */}
          <div className="block sm:hidden flex items-center justify-center relative mt-8">
            {/* Foto kiri (grayscale) */}
            <img
              src="/images/Ladorm_Photos.webp"
              alt="Asrama LADorm"
              className="w-full h-50 sm:w-64 sm:h-36 md:w-82 md:h-44 object-cover rounded-md shadow-lg z-20 absolute -left-2 sm:-left-4 top-6"
            />

            {/* Foto tengah (paling depan) */}
            <img
              src="/images/asrama_profile_img_5.webp"
              alt="Asrama LADorm 2"
              className="w-80 h-40 sm:w-72 sm:h-40 md:w-82 md:h-44 object-cover rounded-md shadow-lg z-10 grayscale -top-15 sm:-top-8 relative"
            />

            {/* Foto kanan */}
            <img
              src="/images/asrama_profile_img_4.webp"
              alt="Asrama LADorm 3"
              className="w-80 h-40 sm:w-60 sm:h-32 md:w-82 md:h-44 object-cover rounded-md shadow-lg z-0 absolute right-6 sm:right-14 top-30 sm:top-14"
            />
          </div>
          {/* </Fade> */}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 text-center mt-36 mb-16">
          <Fade direction="up" delay={100}>
            <div className="p-6 bg-background/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-border/50">
              <FaHome className="text-primary text-4xl mx-auto mb-4" />
              <h4 className="font-semibold text-lg mb-2 text-foreground">
                {dictionary.homeWhyLadorm?.features?.facility?.title}
              </h4>
              <p className="text-muted-foreground text-sm text-left leading-relaxed">
                {dictionary.homeWhyLadorm?.features?.facility?.desc}
              </p>
            </div>
          </Fade>
          {/* </Fade> */}
          <Fade direction="up" delay={250}>
            <div className="p-6 bg-background/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-border/50">
              <FaMapMarkerAlt className="text-primary text-4xl mx-auto mb-4" />
              <h4 className="font-semibold text-lg mb-2 text-foreground">
                {dictionary.homeWhyLadorm?.features?.location?.title}
              </h4>
              <p className="text-muted-foreground text-sm text-left leading-relaxed">
                {dictionary.homeWhyLadorm?.features?.location?.desc}
              </p>
            </div>
          </Fade>
          <Fade direction="up" delay={400}>
            <div className="p-6 bg-background/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-border/50">
              <FaUsers className="text-primary text-4xl mx-auto mb-4" />
              <h4 className="font-semibold text-lg mb-2 text-foreground">
                {dictionary.homeWhyLadorm?.features?.community?.title}
              </h4>
              <p className="text-muted-foreground text-sm text-left leading-relaxed">
                {dictionary.homeWhyLadorm?.features?.community?.desc}
              </p>
            </div>
          </Fade>
        </div>

        {/* CTA */}

        <div className="text-center mb-16">
          <Fade direction="up" delay={100}>
            <h3 className="text-2xl font-bold mb-8 text-foreground tracking-tight">
              {dictionary.homeWhyLadorm?.CTA?.title}
            </h3>
          </Fade>

          {/* <Fade direction="up"> */}
          <CallToAction
            href="/pendaftaran"
            text={dictionary.homeWhyLadorm?.CTA?.ctaBtn || "Laman Pendaftaran"}
            className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]"
          />
          {/* </Fade> */}
        </div>


      </div>
    </section>
  );
};

export default WhyLADorm;
