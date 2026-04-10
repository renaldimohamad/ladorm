"use client";
import { useState } from "react";
import { useLanguage } from "../../../stores/useLengauage";

export const AboutDormitory = () => {
  const [showFull, setShowFull] = useState(false);

  const { dictionary } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <h5 className="text-2xl sm:text-1xl md:text-1xl font-bold mb-6 text-center md:text-left text-[#016072] font-montserrat">
        {dictionary.aboutDormitory?.title}
      </h5>

      <p className="text-sm sm:text-base md:text-md leading-relaxed text-foreground mb-4 text-justify">
        <b>{dictionary.aboutDormitory?.paragraph1.bold}</b>{" "}
        {dictionary.aboutDormitory?.paragraph1.normal}
      </p>

      {/* <p className="text-sm sm:text-base md:text-lg leading-relaxed text-foreground mb-4 text-justify">
        Beberapa keunggulan dan fasilitas yang tersedia di asrama ini antara
        lain:
      </p>

      <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-foreground space-y-2 pl-4 md:pl-6 mb-4">
        <li>Kamar tidur bersama yang nyaman dan bersih</li>
        <li>Fasilitas dapur bersama dan ruang makan</li>
        <li>Ruang belajar yang tenang dan kondusif</li>
        <li>Lokasi strategis, dekat dengan kampus dan transportasi umum</li>
        <li>
          Pengelolaan asrama yang baik oleh pengurus dan koordinator mahasiswa
        </li>
      </ul> */}

      <div className="flex flex-col gap-2 mt-6 text-sm sm:text-base md:text-md leading-relaxed text-foreground text-justify space-y-4">
        <span>
          {dictionary.aboutDormitory?.paragraph2.section1}{" "}
          <b>{dictionary.aboutDormitory?.paragraph2.date}</b>{" "}
          {dictionary.aboutDormitory?.paragraph2.section2}{" "}
          <b>{dictionary.aboutDormitory?.paragraph2.author}</b>.{" "}
          {dictionary.aboutDormitory?.paragraph2.section3}
        </span>

        {showFull && (
          <div className="flex flex-col gap-2 leading-relaxed">
            <span>
              {dictionary.aboutDormitory?.paragraph3.section1}{" "}
              <b>{dictionary.aboutDormitory?.paragraph3.bold}</b>{" "}
              {dictionary.aboutDormitory?.paragraph3.section2}
            </span>
            <span>
              <div className="mt-4 text-sm sm:text-base md:text-sm text-foreground">
                {/* <ul className="list-disc pl-4 space-y-3">
                  {[
                    ["Yusuf T. Polimengo", "Periode 2015-2017"],
                    ["Inton Lasenga", "Periode 2017-2018"],
                    ["Iksan Mohamad", "Periode 2018-2022"],
                    ["Clift Lumingas", "Periode 2022-2023"],
                    ["Nadia Nur Arifah Hulawa", "Periode 2024-2025"],
                    ["Ricky Mateka", "Periode 2025-Sekarang"],
                  ].map(([name, periode], i) => (
                    <li key={i}>
                      <div className="flex flex-wrap gap-x-1 sm:gap-x-2">
                        <span className="font-semibold">{name}</span>
                        <span>({periode})</span>
                      </div>
                    </li>
                  ))}
                </ul> */}
                <ul className="list-disc pl-4 space-y-3">
                  {dictionary.aboutDormitory?.full.leaders?.map((leader, i) => (
                    <li key={i}>
                      <div className="flex flex-wrap gap-x-1 sm:gap-x-2">
                        <span className="font-semibold">{leader.name}</span>
                        <span>({leader.period})</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </span>
            <span className="mt-4">
              {dictionary.aboutDormitory?.full.paragraph3}
            </span>
          </div>
        )}
      </div>
      <div className="flex mt-4">
        <button
          onClick={() => setShowFull((prev) => !prev)}
          className="mt-4 text-[#016072] font-semibold cursor-pointer text-sm sm:text-base md:text-sm"
        >
          {showFull
            ? `${dictionary.aboutDormitory?.readLess}`
            : `${dictionary.aboutDormitory?.readMore}`}
        </button>
      </div>
    </div>
  );
};
