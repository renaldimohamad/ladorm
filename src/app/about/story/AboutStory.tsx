"use client";

import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import HeaderContent from "@/components/header-content";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../../../../stores/useLengauage";

export default function AboutStory() {
  const router = useRouter();
  const { dictionary } = useLanguage();

  return (
    <LayoutBlank>
      <div className="relative flex w-full flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full transition-all duration-500 dark:opacity-10 dark:invert">
            <Image
              src="/images/BG LADORM_WHITE.webp"
              alt=""
              fill
              className="object-cover"
              quality={80}
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-white/60 transition-colors duration-500 dark:bg-background/90" />
        </div>
        <div className="relative z-10 mt-6 flex px-6">
          <HeaderContent
            label={dictionary.common?.backButton || "Kembali"}
            onBack={() => router.push("/about")}
            className="mb-4"
          />
        </div>
        <section
          aria-labelledby="about-story-title"
          className="relative z-10 w-full px-6 py-10 text-foreground"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-6 leading-relaxed">
            <div className="flex items-center justify-center">
              <h1
                id="about-story-title"
                className="text-3xl font-bold text-muted-foreground"
              >
                {dictionary.aboutPage.title}
              </h1>
            </div>

            {dictionary.aboutPage.content.map((text, idx) => (
              <p key={`p-${idx}`}>{text}</p>
            ))}

            <ul className="list-disc pl-6">
              {dictionary.aboutPage.list.map((item, idx) => (
                <li key={`li-${idx}`}>{item}</li>
              ))}
            </ul>

            {dictionary.aboutPage.philosophy.map((text, idx) => (
              <p key={`phil-${idx}`}>{text}</p>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </LayoutBlank>
  );
}
