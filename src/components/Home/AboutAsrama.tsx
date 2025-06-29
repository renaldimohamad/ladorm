"use client";
import { useState } from "react";

export const AboutDormitory = () => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <h5 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center md:text-left text-[#016072]">
        Tentang Asrama
      </h5>

      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 mb-4 text-justify">
        Asrama Gorontalo dibangun sebagai wujud kepedulian pemerintah daerah
        terhadap mahasiswa asal Gorontalo yang menempuh pendidikan di luar
        daerah khususnya di DKI Jakarta. Dengan desain modern dan fasilitas
        lengkap, asrama ini telah menjadi rumah kedua bagi ratusan mahasiswa.
        Fungsi utama meliputi pembinaan akademik, wawasan dan multibudaya,
        pengembangan sumber daya manusia, pembinaan minat dan bakat, pembinaan
        karakter, mental, dan spiritual, pembinaan kepemimpinan, dan
        kewirausahaan.
      </p>

      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 mb-4 text-justify">
        Beberapa keunggulan dan fasilitas yang tersedia di asrama ini antara
        lain:
      </p>

      <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-gray-800 space-y-2 pl-4 md:pl-6 mb-4">
        <li>Kamar tidur bersama yang nyaman dan bersih</li>
        <li>Fasilitas dapur bersama dan ruang makan</li>
        <li>Ruang belajar yang tenang dan kondusif</li>
        <li>Lokasi strategis, dekat dengan kampus dan transportasi umum</li>
        <li>
          Pengelolaan asrama yang baik oleh pengurus dan koordinator mahasiswa
        </li>
      </ul>

      <div className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 text-justify space-y-4">
        <span>
          <b>Asrama Mahasiswa Provinsi Gorontalo</b> yang terletak di Lenteng
          Agung, Jakarta Selatan, berdiri sebagai wujud komitmen Pemerintah
          Provinsi Gorontalo dalam mendukung pendidikan generasi muda di
          perantauan. Asrama ini mulai dirintis sejak tahun 2012, melalui proses
          perencanaan dan pembangunan yang bertujuan menyediakan tempat tinggal
          yang layak, aman, dan kondusif bagi mahasiswa asal Gorontalo yang
          sedang menempuh pendidikan di Jakarta dan sekitarnya.
        </span>

        {showFull && (
          <div className="flex flex-col gap-2 leading-relaxed">
            <span>
              Asrama ini diresmikan melalui acara Pemanfaatan Asrama Mahasiswa
              Provinsi Gorontalo, pada tanggal <b>4 November 2015</b>oleh
              Pemerintah Provinsi Gorontalo, yang pada saat itu dipimpin oleh
              Gubernur
              <b>Drs. H. Rusli Habibie, M.A.P.</b>
              Peresmian tersebut menandai pemanfaatan penuh fasilitas asrama
              sebagai pusat pembinaan, penguatan solidaritas, dan pengembangan
              potensi mahasiswa Gorontalo.
            </span>
            <span>
              Dalam perjalanannya, <b>Asrama Mahasiswa Provinsi Gorontalo</b>{" "}
              telah mengalami berbagai periode kepemimpinan mahasiswa yang turut
              berkontribusi dalam pengelolaan kegiatan dan menjaga nilai
              kekeluargaan di lingkungan asrama. Berikut nama-nama mahasiswa
              yang pernah menjabat sebagai Ketua Asrama:
            </span>
            <span>
              <div className="mt-4 text-sm sm:text-base md:text-lg text-gray-800">
                <ul className="list-disc pl-4 space-y-3">
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
                </ul>
              </div>
            </span>
            <span>
              Hingga saat ini, asrama tersebut terus berfungsi sebagai rumah
              kedua bagi mahasiswa Gorontalo, menjadi ruang tumbuh, belajar, dan
              mempererat kebersamaan dalam semangat persatuan dan tanggung jawab
              bersama.
            </span>
          </div>
        )}

        <button
          onClick={() => setShowFull((prev) => !prev)}
          className="mt-4 text-[#016072] font-semibold cursor-pointer"
        >
          {showFull ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
        </button>
      </div>
    </div>
  );
};
