"use client";

import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import Fade from "@/components/common/Fade";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineCalendar, HiOutlineVideoCamera, HiPlay, HiOutlinePhotograph, HiX } from "react-icons/hi";
import { useLanguage } from "../../../stores/useLengauage";
import { useState } from "react";
import Image from "next/image";

export default function Blog() {
  const { dictionary } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const mockLatestEvent = dictionary.mockBlogData?.latestEvent || {
    id: "latest",
    title: "", desc: "", category: "", date: "", img: "",
    videoUrl: "", hasGallery: false
  };

  const mockBlogPosts = dictionary.mockBlogData?.posts || [];

  const handleFeaturedClick = (e: React.MouseEvent) => {
    // If it has a video and user clicked the play button area, we could open video
    // Otherwise navigate to the story
  };

  return (
    <LayoutBlank>
      <main className="flex-1 w-full flex flex-col bg-background text-foreground overflow-x-hidden">

        {/* 1. HERO SECTION (BLOG FOCUS) */}
        <section className="relative w-full pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[60%] h-[500px] bg-gradient-to-bl from-[var(--primary)]/10 to-transparent blur-[80px] -z-10 pointer-events-none" />

          <div className="max-w-5xl mx-auto text-left relative z-10 border-l-4 border-[var(--primary)] pl-6">
            <Fade direction="right">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                {dictionary.blogPage?.heroTitle || "Journals & Stories"}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {dictionary.blogPage?.heroDesc || "Explore the daily lives, achievements, and unique events of Gorontalo students in Jakarta."}
              </p>
            </Fade>
          </div>
        </section>

        {/* 2. FEATURED STORY / HIGHLIGHT SECTION */}
        <section className="px-6 pb-20 relative z-20">
          <div className="max-w-5xl mx-auto">
            <Fade direction="up">
              <div className="group relative w-full h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 bg-black">

                {/* Visual Content: Image with scale effect */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={mockLatestEvent.img || ""}
                    alt={mockLatestEvent.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Top Badges */}
                <div className="absolute top-8 left-8 z-20 flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                    {mockLatestEvent.videoUrl ? <HiOutlineVideoCamera className="w-4 h-4 mr-2" /> : <HiOutlinePhotograph className="w-4 h-4 mr-2" />}
                    {mockLatestEvent.videoUrl ? "Video Highlight" : "Featured Story"}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/20">
                    {mockLatestEvent.category}
                  </span>
                </div>

                {/* Video Play Trigger (Optional) */}
                {mockLatestEvent.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <button
                      onClick={() => setIsVideoOpen(true)}
                      className="w-20 h-20 md:w-24 md:h-24 bg-white text-[var(--primary)] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group/play"
                    >
                      <HiPlay className="w-10 h-10 md:w-12 md:h-12 translate-x-1" />
                      <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-25 group-hover/play:opacity-40" />
                    </button>
                  </div>
                )}

                {/* Metadata & Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                  <div className="flex items-center text-white/70 text-sm mb-4 font-bold tracking-wide">
                    <HiOutlineCalendar className="w-4 h-4 mr-2" />
                    {mockLatestEvent.date}
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1] max-w-4xl tracking-tight">
                    {mockLatestEvent.title}
                  </h3>

                  <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 line-clamp-2 md:line-clamp-none opacity-90 group-hover:opacity-100 transition-opacity">
                    {mockLatestEvent.desc}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/blog/${mockLatestEvent.id}`}
                      className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-wider hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-xl"
                    >
                      {mockLatestEvent.hasGallery ? "Explore Event" : "Read Full Story"}
                      <HiOutlineArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Interactive Click Layer for the whole card (except buttons) */}
                <Link href={`/blog/${mockLatestEvent.id}`} className="absolute inset-0 z-10" aria-label="View Highlight" />
              </div>
            </Fade>
          </div>
        </section>

        {/* Video Lightbox Modal */}
        {isVideoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setIsVideoOpen(false)} />
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20"
              >
                <HiX className="w-6 h-6" />
              </button>
              <iframe
                src={mockLatestEvent.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* 3. BLOG POSTS GRID */}
        <section className="px-6 pb-24 relative z-20">
          <div className="max-w-5xl mx-auto">
            <Fade direction="up">
              <div className="mb-10 flex items-center justify-between border-b border-border/50 pb-6">
                <h2 className="text-3xl font-black tracking-tight">{dictionary.blogPage?.latestNewsTitle || "Recent Stories"}</h2>
                <div className="hidden md:flex items-center space-x-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="w-12 h-0.5 bg-[var(--primary)]" />
                  <span>Updates from our community</span>
                </div>
              </div>
            </Fade>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch pt-6 pb-4">
              {mockBlogPosts.map((post, index) => (
                <Fade direction="up" delay={index * 150} key={post.id}>
                  <Link href={`/blog/${post.id}`} className="group block h-full">
                    <div className="h-full flex flex-col rounded-3xl bg-[var(--card)] border border-border/50 shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

                      {/* Thumbnail */}
                      <div className="w-full h-56 overflow-hidden relative grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500">
                        <Image
                          src={post.img || ""}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[9px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg opacity-90">
                          {post.category}
                        </div>
                      </div>

                      {/* Post Data */}
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center text-xs text-muted-foreground font-bold mb-4 uppercase tracking-tighter">
                          <HiOutlineCalendar className="w-4 h-4 mr-2" /> {post.date}
                        </div>

                        <h3 className="text-xl font-black mb-4 group-hover:text-[var(--primary)] transition-colors leading-tight tracking-tight">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                          {post.desc}
                        </p>

                        <div className="mt-auto flex items-center text-[var(--primary)] text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                          {dictionary.blogPage?.readStoryButton || "Read Full Story"}
                          <HiOutlineArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </Fade>
              ))}
            </div>

            {/* Load More Section */}
            <Fade direction="up" delay={500}>
              <div className="w-full flex flex-col items-center mt-20">
                <div className="w-24 h-px bg-border mb-8" />
                <button className="px-10 py-4 border-2 border-[var(--primary)]/20 text-[var(--primary)] font-black text-sm uppercase tracking-widest rounded-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-md">
                  {dictionary.blogPage?.loadMoreButton || "Load More Entries"}
                </button>
              </div>
            </Fade>

          </div>
        </section>
        <Footer />
      </main>
    </LayoutBlank>
  );
}

