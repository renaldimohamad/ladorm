"use client";

import Footer from "@/components/common/Footer";
import { WrapContainerHome } from "@/components/Home";
import { LayoutBlank } from "@/layouts";

export default function Home() {
  return (
    <LayoutBlank>
      <main className="flex flex-col w-full">
        <section
          className="w-full min-h-screen flex items-center justify-center px-4 py-16 relative bg-red-500 min-h-screen
        bg-[url('/images/asrama_profile_img.webp')]
        bg-cover
        bg-center"
        >
          <WrapContainerHome />
        </section>
        {/* HIDE FOR NOW */}
        <section className="w-full px-4 py-20 bg-white text-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Tentang Asrama</h2>
            <p>
              {/* Ini adalah informasi tentang asrama mahasiswa Gorontalo di
              Jakarta. */}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Repellendus repellat totam voluptas asperiores assumenda numquam.
              Nostrum, quibusdam expedita! Reiciendis, beatae.
            </p>
          </div>
        </section>
        <section className="w-full px-4 py-20 bg-gray-100 text-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Fasilitas</h2>
            <ul className="list-disc pl-5">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem ipsum dolor sit.</li>
            </ul>
          </div>
        </section>
        <Footer />
      </main>
    </LayoutBlank>
  );
}
