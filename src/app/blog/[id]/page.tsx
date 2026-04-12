"use client";

import { useLanguage } from "../../../../stores/useLengauage";
import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import Fade from "@/components/common/Fade";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineCalendar, HiOutlineShare, HiOutlineFolder } from "react-icons/hi";
import Image from "next/image";
import React from "react";

export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { dictionary } = useLanguage();
  const { id: idValue } = React.use(params);

  // Find the post in the dictionary
  const blogData = dictionary.mockBlogData;
  let post = blogData?.posts?.find((p) => String(p.id) === idValue);
  
  // If not found in regular posts, check if it's the latest event
  if (!post && blogData?.latestEvent && String(blogData.latestEvent.id) === idValue) {
    post = blogData.latestEvent;
  }

  const translations = dictionary.blogPage || {
      heroTitle: "Journals & Stories",
      readStoryButton: "Read Story",
      latestNewsTitle: "Latest News"
  };

  const backToLabel = dictionary.common?.backButton || "Back";

  if (!post) {
    return (
      <LayoutBlank>
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
                <Link href="/blog" className="text-[var(--primary)] hover:underline">
                    Return to Blog
                </Link>
            </div>
        </div>
      </LayoutBlank>
    );
  }

  return (
    <LayoutBlank>
      <main className="flex-1 w-full bg-background text-foreground">
        
        {/* Navigation Bar / Return */}
        <div className="w-full max-w-4xl mx-auto pt-28 px-6 mb-6">
          <Link href="/blog" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-[var(--primary)] transition-colors">
            <HiOutlineArrowLeft className="mr-2" /> {backToLabel}
          </Link>
        </div>

        {/* HERO ARTICLE */}
        <section className="w-full px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <Fade direction="up" distance={40}>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {post.desc}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground border-b border-border/50 pb-6 mb-8">
                <span className="flex items-center">
                  <HiOutlineCalendar className="w-4 h-4 mr-1.5" /> {post.date}
                </span>
                <span className="flex items-center font-semibold text-[var(--primary)]">
                  <HiOutlineFolder className="w-4 h-4 mr-1.5" /> {post.category}
                </span>
              </div>
            </Fade>
            
            <Fade direction="up" delay={150} distance={40} scale={0.95}>
              <div className="relative w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden mb-12 shadow-md hover:shadow-xl transition-shadow duration-500">
                <Image 
                    src={post.img || ""} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                    priority
                />
              </div>
            </Fade>
            
            {/* CONTENT BODY */}
            <Fade direction="up" delay={250} distance={30}>
              <article className="prose prose-lg md:prose-xl max-w-none text-foreground prose-headings:text-foreground prose-headings:font-sans prose-a:text-[var(--primary)] prose-strong:text-foreground prose-img:rounded-2xl pb-16">
                <p className="whitespace-pre-line leading-relaxed">
                    {post.content || post.desc}
                </p>
                
                {/* Fallback real-looking text if content is too short */}
                {(!post.content || post.content.length < 100) && (
                    <div className="mt-8 space-y-6">
                        <p>
                            Living in the LADorm community has been a transformative experience for many Gorontalo students. 
                            Beyond the daily routines, it is the spirit of togetherness and support that defines our stay here. 
                            Every event, from shared meals to weekend sports, contributes to a home-like environment that fosters both personal and academic growth.
                        </p>
                        <p>
                            We continue to strive for excellence in maintaining our facilities and organizing meaningful activities 
                            that benefit all residents. We believe that by staying connected to our roots and supporting one another, 
                            we can overcome any challenge that comes our way in this big city.
                        </p>
                    </div>
                )}
              </article>
            </Fade>

            <Fade direction="up">
                <div className="flex justify-between items-center py-6 border-t border-border/50">
                    <div className="text-sm">Source: <span className="font-bold text-foreground">LADorm Editorial</span></div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-[var(--primary)] hover:text-white rounded-full transition-colors text-sm font-semibold">
                        <HiOutlineShare /> <span>Share</span>
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

