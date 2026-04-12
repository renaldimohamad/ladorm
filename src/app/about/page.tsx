"use client";

import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import HeaderContent from "@/components/header-content";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../../../stores/useLengauage";

export default function Home() {
  const router = useRouter();
  const { dictionary } = useLanguage();

  return (
    <LayoutBlank>
      <main className="relative overflow-hidden flex flex-col w-full">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full dark:invert dark:opacity-10 transition-all duration-500">
            <Image
              src="/images/BG LADORM_WHITE.webp"
              alt=""
              fill
              className="object-cover"
              quality={80}
              sizes="(max-width: 768px) 100vw, 100vw"
              priority
              loading="eager"
            />
          </div>
          {/* Overlay gradient to ensure text readability in both modes */}
          <div className="absolute inset-0 bg-white/60 dark:bg-background/90 transition-colors duration-500" />
        </div>
        <div className="relative z-10 flex px-6 mt-6">
          <HeaderContent
            label={dictionary.common?.backButton || "Kembali"}
            onBack={() => router.push("/")}
            className="mb-4"
          />
        </div>
        <section className="relative z-10 w-full px-6 py-10 text-foreground">
          <div className="max-w-5xl mx-auto flex flex-col gap-6 leading-relaxed">
            <div className="flex justify-center items-center">
              <h5 className="font-bold text-muted-foreground text-3xl">{dictionary.aboutPage?.title || "About Us"}</h5>
            </div>

            {dictionary.aboutPage?.content?.map((text, idx) => (
              <p key={`p-${idx}`}>{text}</p>
            ))}

            <ul className="list-disc pl-6">
              {dictionary.aboutPage?.list?.map((item, idx) => (
                <li key={`li-${idx}`}>{item}</li>
              ))}
            </ul>

            {dictionary.aboutPage?.philosophy?.map((text, idx) => (
              <p key={`phil-${idx}`}>{text}</p>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </LayoutBlank>
  );
}
