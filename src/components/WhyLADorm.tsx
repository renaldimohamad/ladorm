"use client";

import React from "react";
import { FaHome, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { testimonialsData } from "@/utils/Testimonials";
import { TestimonialsWrapper } from "./Home/TestimonialsWrapper";
import Image from "next/image";
import { CallToAction } from "@/ui/common/CallToAction";

const WhyLADorm = () => {
  return (
    <section className="w-full bg-[url('/images/BG_Ladorm.webp')] bg-cover bg-center bg-no-repeat py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-black">
          Kenapa Harus Tinggal di <span>LADORM?</span>
        </h2>

        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <p className="mb-4 text-black font-semibold">
              Asrama Mahasiswa Gorontalo
            </p>
            <h3 className="text-[#016072] text-4xl font-bold mb-4">LADORM</h3>
            <p className="text-lg font-semibold mb-3 text-gray-700">
              Merupakan tempat tinggal yang lebih dari sekadar Asrama.
            </p>
            <p className="text-gray-700">
              Kamu dapat menemukan kenyamanan, kebersamaan, dan support system
              buat perjalanan kuliah kamu di Jakarta.
            </p>
          </div>

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
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 text-center mt-36 mb-16">
          <div className="p-6 bg-white/20 rounded-2xl shadow-md">
            <FaHome className="text-[#016072] text-3xl mx-auto mb-3" />
            <h4 className="font-semibold text-lg mb-2 text-black">
              Fasilitas Lengkap
            </h4>
            <p className="text-gray-700 text-sm">
              Semua kebutuhan lo terpenuhi mulai dari kamar nyaman, ruang
              belajar, akses Wi-Fi stabil, dapur bersama, sampai area santai
              buat recharge energi.
            </p>
          </div>
          <div className="p-6 bg-white/20 rounded-2xl shadow-md">
            <FaMapMarkerAlt className="text-[#016072] text-3xl mx-auto mb-3" />
            <h4 className="font-semibold text-lg mb-2 text-black">
              Lokasi Strategis
            </h4>
            <p className="text-gray-700 text-sm">
              Dekat kampus, transportasi umum, dan pusat aktivitas mahasiswa,
              jadi lo gampang kemana aja tanpa ribet.
            </p>
          </div>
          <div className="p-6 bg-white/20 rounded-2xl shadow-md">
            <FaUsers className="text-[#016072] text-3xl mx-auto mb-3" />
            <h4 className="font-semibold text-lg mb-2 text-black">
              Komunitas Positif
            </h4>
            <p className="text-gray-700 text-sm">
              Tinggal bareng teman-teman seperjuangan yang saling support, bikin
              lo merasa punya keluarga baru di Jakarta.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-6">Ayo Gabung Sekarang!</h3>

          <CallToAction
            href="/pendaftaran"
            text="Laman Pendaftaran"
            className="bg-gradient-to-r from-[rgba(1,96,114,0.7)] to-[rgba(44,112,91,0.7)]"
          />
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-xl font-bold text-center mb-8">Testimoni</h3>
          <div className="w-full max-w-6xl px-2 sm:px-4 mx-auto">
            <Swiper
              modules={[Autoplay, Navigation]}
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
                // 320: { slidesPerView: 1 },
                // 640: { slidesPerView: 1 },
                // 768: { slidesPerView: 2 },
                // 1024: { slidesPerView: 3 },
                320: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              navigation
            >
              {testimonialsData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full px-1 sm:px-2">
                    <TestimonialsWrapper>
                      <div className="leading-relaxed">
                        <span className="text-sm sm:text-sm leading-relaxed text-gray-800 text-justify">
                          “{item.message}”
                        </span>
                      </div>

                      <div className="mt-auto flex items-center gap-3 pt-6">
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
                          <span className="text-gray-800 text-xs italic">
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
        </div>
      </div>
    </section>
  );
};

export default WhyLADorm;
