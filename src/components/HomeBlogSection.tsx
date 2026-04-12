"use client";

import React from "react";
import Link from "next/link";
import Fade from "./common/Fade";
import { HiOutlineCalendar, HiOutlineArrowRight } from "react-icons/hi";
import Image from "next/image";
import { useLanguage } from "../../stores/useLengauage";

export default function HomeBlogSection() {
  const { dictionary } = useLanguage();

  const translations = dictionary.homeBlogPreview || {
    title: "Dormitory News & Daily Life",
    subtitle: "Keep up with the excitement, social activities, and students' daily routines.",
    cta: "View All Blogs",
    readMore: "Read more"
  };

  // Mock data fallback if dictionary is not populated
  const posts = dictionary.mockBlogData?.posts?.slice(0, 3) || [];

  if (posts.length === 0) return null;

  return (
    <section className="w-full px-6 py-20 bg-background text-foreground relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <Fade direction="up" distance={40} scale={0.9} blur={5}>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-sm">
                {translations.title}
              </h2>
            </Fade>
            <Fade direction="left" distance={30} delay={200}>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                {translations.subtitle}
              </p>
            </Fade>
          </div>

          <Fade direction="right" distance={50} delay={400} rotate={5}>
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap"
            >
              <span>{translations.cta}</span>
              <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Fade
              direction="up"
              delay={index * 200 + 400}
              key={post.id}
              scale={0.8}
              rotate={index % 2 === 0 ? -2 : 2}
              distance={60}
            >
              <Link href={`/blog/${post.id}`} className="group block h-full">
                <div className="h-full flex flex-col bg-[var(--card)] border border-border/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    <Image
                      src={post.img || ""}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="inline-block px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium flex items-center">
                        <HiOutlineCalendar className="mr-1.5 w-4 h-4" />
                        {post.date}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-[var(--primary)] transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {post.desc}
                    </p>

                    <div className="mt-auto flex items-center text-sm font-bold text-foreground group-hover:text-[var(--primary)] transition-colors duration-300 uppercase tracking-wide">
                      {translations.readMore} <HiOutlineArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
