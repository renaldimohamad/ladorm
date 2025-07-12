"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import Fade from "../common/Fade";

const dataPengurus = [
  {
    name: "Yodi Putra Zulkifli",
    role: "Sekretaris Asrama",
    image: "/images/Yodi Saputra.png",
    socials: {
      instagram: "https://www.instagram.com/yodizulkifli/",
      twitter: "",
      whatsapp: "",
      linkedin: "",
    },
  },
  {
    name: "Ricky Mateka",
    role: "Ketua Asrama",
    image: "/images/Ricky Mateka.png",
    socials: {
      instagram: "https://www.instagram.com/rey_daud17/",
      twitter: "",
      whatsapp: "",
      linkedin:
        "https://www.linkedin.com/in/ricky-syarifuddin-septian-mateka-5a62b0246/",
    },
  },
  {
    name: "Zikram",
    role: "Bendahara Asrama",
    image: "/images/Zikram.png",
    socials: {
      instagram: "https://www.instagram.com/zuhdany/",
      twitter: "",
      whatsapp: "",
      linkedin:
        "https://www.linkedin.com/search/results/all/?keywords=Zikrama%20Zuhdany%20Nur&origin=GLOBAL_SEARCH_HEADER&sid=!7l",
    },
  },
];

export default function DormitoryManagement() {
  return (
    <section className="bg-gray-200 py-16 px-4">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-10 text-[#124734]">
        <div className="flex justify-center mb-2">
          <Fade direction="up">
            <span className="text-2xl sm:text-1xl md:text-2xl font-bold mb-8 sm:mb-10 text-center text-[#016072]">
              Pengurus Asrma
            </span>
          </Fade>
        </div>
      </h2>

      <div className="block md:hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full"
        >
          {dataPengurus.map((pengurus, index) => (
            <SwiperSlide key={index}>
              <Fade direction="up">
                <div className="flex justify-center">
                  <div className="bg-white rounded-2xl px-6 py-8 w-[250px] flex flex-col items-center text-center">
                    <div className="relative w-36 h-48 rounded-xl overflow-hidden mb-4">
                      <Image
                        src={pengurus.image}
                        alt={pengurus.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-black font-bold">{pengurus.name}</h3>
                    <p className="text-sm text-gray-600 italic">
                      {pengurus.role}
                    </p>

                    <div className="flex items-center justify-center gap-3 mt-auto pt-6">
                      {pengurus.socials.instagram && (
                        <Link href={pengurus.socials.instagram} target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3 text-black font-bold"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15.75 8.25h.008v.008h-.008V8.25z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                            />
                          </svg>
                        </Link>
                      )}
                      {pengurus.socials.twitter && (
                        <Link href={pengurus.socials.twitter} target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3 text-black"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M17.72 2H21l-6.77 7.73L22 22h-6.88l-5.4-6.66L3.27 22H0l7.45-8.5L2 2h7.12l4.94 6.1L17.72 2zm-2.07 18h2.3L8.35 4H5.9l9.75 16z" />
                          </svg>
                        </Link>
                      )}

                      {pengurus.socials.linkedin && (
                        <Link href={pengurus.socials.linkedin} target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3 text-black"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.12 8.25h4.74V24H.12V8.25zM8.98 8.25h4.54v2.13h.06c.63-1.2 2.18-2.46 4.48-2.46 4.79 0 5.67 3.15 5.67 7.25V24h-4.74v-6.92c0-1.65-.03-3.77-2.3-3.77s-2.65 1.8-2.65 3.64V24H8.98V8.25z" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Fade>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:flex justify-center items-center gap-0 md:gap-0">
        {dataPengurus.map((pengurus, index) => {
          const direction = index % 2 === 0 ? "left" : "right";

          return (
            <Fade key={index} direction={direction}>
              <div
                className={`bg-white rounded-2xl px-6 py-8 w-[250px] flex flex-col items-center text-center relative transition-all duration-300 ${
                  index === 1
                    ? "scale-110 z-10 shadow-2xl"
                    : "scale-100 z-0 hover:shadow-xl"
                }`}
              >
                <div className="relative w-36 h-48 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={pengurus.image}
                    alt={pengurus.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-black font-bold">{pengurus.name}</h3>
                <p className="text-sm text-gray-600 italic">{pengurus.role}</p>

                <div className="flex items-center justify-center gap-3 mt-auto pt-6">
                  {pengurus.socials.instagram && (
                    <Link href={pengurus.socials.instagram} target="_blank">
                      {/* IG Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15.75 8.25h.008v.008h-.008V8.25z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                        />
                      </svg>
                    </Link>
                  )}

                  {pengurus.socials.twitter && (
                    <Link href={pengurus.socials.twitter} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-black"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.72 2H21l-6.77 7.73L22 22h-6.88l-5.4-6.66L3.27 22H0l7.45-8.5L2 2h7.12l4.94 6.1L17.72 2zm-2.07 18h2.3L8.35 4H5.9l9.75 16z" />
                      </svg>
                    </Link>
                  )}

                  {pengurus.socials.linkedin && (
                    <Link href={pengurus.socials.linkedin} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-black"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.12 8.25h4.74V24H.12V8.25zM8.98 8.25h4.54v2.13h.06c.63-1.2 2.18-2.46 4.48-2.46 4.79 0 5.67 3.15 5.67 7.25V24h-4.74v-6.92c0-1.65-.03-3.77-2.3-3.77s-2.65 1.8-2.65 3.64V24H8.98V8.25z" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </Fade>
          );
        })}
      </div>
    </section>
  );
}
