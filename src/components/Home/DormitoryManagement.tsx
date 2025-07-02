"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";

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
          <span className="text-2xl sm:text-1xl md:text-2xl font-bold mb-8 sm:mb-10 text-center text-[#016072]">
            Pengurus Asrma
          </span>
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
                    {/* <Link href="https://wa.me/62811438399" target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-black"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                      >
                        <path d="M16.005 2.003C8.28 2.003 2 8.284 2 16.01c0 2.823.75 5.43 2.05 7.708L2 30l6.42-2.003a13.94 13.94 0 007.585 2.222c7.723 0 14.004-6.28 14.004-14.006S23.728 2.003 16.005 2.003zM16 26.972c-2.468 0-4.766-.72-6.695-1.955l-.478-.306-3.813 1.19 1.19-3.707-.312-.48C4.655 20.755 4 18.438 4 16.01 4 9.388 9.383 4.003 16.005 4.003S28 9.388 28 16.01c0 6.62-5.388 10.962-12 10.962zm6.808-8.745c-.369-.183-2.186-1.078-2.526-1.2-.34-.12-.59-.183-.839.184-.248.369-.96 1.2-1.177 1.448-.217.248-.434.28-.803.093-.368-.185-1.557-.57-2.963-1.817-1.096-.979-1.837-2.188-2.05-2.558-.213-.37-.022-.57.16-.753.164-.162.368-.434.552-.651.184-.217.245-.37.368-.617.122-.248.062-.463-.03-.647-.093-.184-.839-2.027-1.15-2.78-.302-.726-.61-.628-.839-.639l-.712-.012c-.248 0-.647.093-.985.463-.34.369-1.294 1.264-1.294 3.08s1.325 3.57 1.51 3.818c.185.248 2.61 3.986 6.316 5.589.883.38 1.57.608 2.105.778.883.281 1.688.24 2.325.146.709-.106 2.186-.89 2.497-1.752.31-.863.31-1.603.217-1.752-.093-.145-.34-.23-.709-.403z" />
                      </svg>
                    </Link> */}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:flex justify-center items-center gap-0 md:gap-0">
        {dataPengurus.map((pengurus, index) => (
          <div
            key={index}
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
              {/* {pengurus.socials.whatsapp && (
                <Link href={pengurus.socials.whatsapp} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-black"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path d="M16.005 2.003C8.28 2.003 2 8.284 2 16.01c0 2.823.75 5.43 2.05 7.708L2 30l6.42-2.003a13.94 13.94 0 007.585 2.222c7.723 0 14.004-6.28 14.004-14.006S23.728 2.003 16.005 2.003zM16 26.972c-2.468 0-4.766-.72-6.695-1.955l-.478-.306-3.813 1.19 1.19-3.707-.312-.48C4.655 20.755 4 18.438 4 16.01 4 9.388 9.383 4.003 16.005 4.003S28 9.388 28 16.01c0 6.62-5.388 10.962-12 10.962zm6.808-8.745c-.369-.183-2.186-1.078-2.526-1.2-.34-.12-.59-.183-.839.184-.248.369-.96 1.2-1.177 1.448-.217.248-.434.28-.803.093-.368-.185-1.557-.57-2.963-1.817-1.096-.979-1.837-2.188-2.05-2.558-.213-.37-.022-.57.16-.753.164-.162.368-.434.552-.651.184-.217.245-.37.368-.617.122-.248.062-.463-.03-.647-.093-.184-.839-2.027-1.15-2.78-.302-.726-.61-.628-.839-.639l-.712-.012c-.248 0-.647.093-.985.463-.34.369-1.294 1.264-1.294 3.08s1.325 3.57 1.51 3.818c.185.248 2.61 3.986 6.316 5.589.883.38 1.57.608 2.105.778.883.281 1.688.24 2.325.146.709-.106 2.186-.89 2.497-1.752.31-.863.31-1.603.217-1.752-.093-.145-.34-.23-.709-.403z" />
                  </svg>
                </Link>
              )} */}
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
        ))}
      </div>
    </section>
  );
}
