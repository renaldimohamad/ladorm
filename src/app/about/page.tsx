"use client";

import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import HeaderContent from "@/components/header-content";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <LayoutBlank>
      <main className="flex flex-col w-full">
        <div className="flex px-6 mt-6">
          <HeaderContent
            label="Home"
            onBack={() => router.push("/")}
            className="mb-4"
          />
        </div>
        <section className="w-full px-6 py-10 bg-white text-black">
          <div className="max-w-5xl mx-auto flex flex-col gap-6 leading-relaxed">
            <div className="flex justify-center items-center">
              <h5 className="font-bold text-gray-700 text-3xl">About Us</h5>
            </div>
            <p>
              Asrama Mahasiswa Gorontalo Lenteng Agung atau Ladorm berdiri atas
              peran kolaboratif antara dan pemerintah daerah (pemda) provinsi
              Gorontalo dan organisasi kemahasiswaan .
            </p>

            <p>
              Di gerakkan oleh Ketua Himpunan Pelajar dan Mahasiswa Indonesia
              Gorontalo Cabang Jakarta Raya (HPMIG Jaya) ketika itu Ririn Afitri
              Tatu, yang berinisiatif mencari tempat tinggal untuk mahasiswa
              bisa bernaung. Aspirasi mahasiswa melalui HPMIG Jaya tersebut,
              terdorong karena mahasiswa masih menempati sekretariat organisasi
              Kerukunan Pelajar dan Mahasiswa Indonesia Pohuwato (KPMIP) ditahun
              2012. Ketika masa kontrak sekretariat itu berakhir, kebutuhan
              tempat tinggal menjadi hal yang urgen.
            </p>

            <p>
              Gayung bersambut, usaha itu diterima baik oleh pemda. Pemda
              berkeinginan untuk mendirikan asrama mahasiswa yang bertujuan
              menyediakan tempat tinggal yang layak, aman, dan kondusif bagi
              mahasiswa asal Gorontalo, yang tengah menempuh pendidikan di
              Jakarta dan sekitarnya.
            </p>

            <p>
              Bermodalkan hubungan baik dengan pemerintah provinsi Gorontalo,
              maka pada tahun 2015 upaya itu berhasil mendapat persetujuan.
              Bangunan yang dulunya mes (fasilitas pemerintah untuk pegawai
              negeri di Gorontalo yang melakukan perjalanan dinas ke Jakarta)
              dialih-fungsikan menjadi asrama mahasiswa. Tepatnya, pada tanggal
              9 November 2015 Ladorm diresmikan oleh Gubernur Rusli Habibie.
              Tanggal tersebut disepakati sebagai hari ulang tahun Ladorm. Saat
              itu pertanggungjawaban Ladorm melekat di kantor perwakilan, yang
              kini menjadi kewenangan biro umum.
            </p>

            <p>
              Kemudian, pada pertengahan tahun 2015 semua mahasiswa mulai
              beranjak masuk, dan Ririn menjadi ketua asrama untuk
              pertama-kalinya. Hingga saat ini Ladorm sudah mengalami pergantian
              kepengurusan dari masa ke masa:
            </p>

            <ul className="list-disc pl-6">
              <li>Ririn Afitri Tatu (Periode 2015-2016)</li>
              <li>Yusuf Polimengo (Periode 2016-2017)</li>
              <li>Inton Lasenga (Periode 2017–2018)</li>
              <li>Iksan Mohamad (Periode 2018–2022)</li>
              <li>Clift Lumingas (Periode 2022–2023)</li>
              <li>Nadia Nur Arifah Hulawa (Periode 2024–2025)</li>
              <li>Ricky Mateka (Periode 2025–Sekarang)</li>
            </ul>

            <p>
              Masing-masing kepimpinan memiliki program kerja dan keunikannya.
              Belajar dari pengalaman pengurus asrama pada periode awal
              pembangunan, prinsip dan nilai yang berhasil ditanamkan yaitu
              adanya budaya saling mengenal tidak hanya wajah dan nama. Lebih
              dari itu, harus terbangun sisi emosional antar individu pengurus,
              adanya sikap saling menghormati dan menghargai tanpa terjebak pada
              relasi senior-junior, serta ada rasa kepemilikan terhadap asrama
              (sense of belonging) dalam menjaga nama baik didalam maupun diluar
              lingkungan asrama.
            </p>

            <p>
              Selanjutnya, terdapat mekanisme "kritik otokritik" sebagai forum
              internalisasi nilai-nilai persatuan, ikatan solidaritas, dan
              hubungan kebersamaan, yang memiliki orientasi memperkuat kohesi
              antar individu penghuni Ladorm.
            </p>

            <p>
              Aspek penting lainnya dari sisi budaya kemahasiswaan, yaitu
              membangun literasi (spesifik membaca dan berdiskusi), sebagai ciri
              khas kaum intelektual atau mahasiswa.
            </p>

            <p>
              Terakhir, untuk memperkuat hubungan eksternal asrama, pengurus
              asrama mengadakan ulang tahun asrama yang dirayakan dengan
              mengundang asrama mahasiswa Gorontalo lainnya (Bogor dan Salemba).
              Perayaan itu diisi dengan kegiatan olahraga dan peringatan
              hari-hari besar.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    </LayoutBlank>
  );
}
