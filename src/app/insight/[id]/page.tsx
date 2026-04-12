"use client";

import { useLanguage } from "../../../../stores/useLengauage";
import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import Fade from "@/components/common/Fade";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineClock, HiOutlineShare, HiOutlineTag } from "react-icons/hi";
import Image from "next/image";
import React from "react";

export default function InsightDetail({ params }: { params: Promise<{ id: string }> }) {
  const { dictionary } = useLanguage();
  const { id: idValue } = React.use(params);

  // Find the article in the dictionary
  const insightData = dictionary.mockInsightsData;
  let article = insightData?.list?.find((i) => String(i.id) === idValue);
  
  // If not found in regular list, check if it's the featured article
  if (!article && insightData?.featured && String(insightData.featured.id) === idValue) {
    article = insightData.featured;
  }

  const translations = dictionary.insightPage || {
      heroTitle: "Insights & Information",
      readMore: "Read more"
  };

  const backToLabel = dictionary.common?.backButton || "Back";

  if (!article) {
    return (
      <LayoutBlank>
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
                <Link href="/insight" className="text-[var(--primary)] hover:underline">
                    Return to Insights
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
          <Link href="/insight" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-[var(--primary)] transition-colors">
            <HiOutlineArrowLeft className="mr-2" /> {backToLabel}
          </Link>
        </div>

        {/* HERO ARTICLE */}
        <section className="w-full px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <Fade direction="up" distance={40}>
              <div className="flex items-center space-x-3 text-xs font-semibold text-[var(--primary)] mb-5 uppercase tracking-wide">
                <HiOutlineTag className="w-4 h-4" />
                <span>{article.category}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                {article.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {article.desc}
              </p>
              
              <div className="flex items-center justify-between border-y border-border/50 py-4 mb-10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-full flex items-center justify-center text-white font-bold">
                    LD
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">LADorm Research Team</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      {article.date} <span className="mx-2">•</span> <HiOutlineClock className="mr-1 w-3 h-3" /> {article.readTime}
                    </p>
                  </div>
                </div>
                <button className="p-2 rounded-full border border-border/50 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
                  <HiOutlineShare className="w-5 h-5" />
                </button>
              </div>
            </Fade>
            
            <Fade direction="up" delay={150} distance={40} scale={0.95}>
              <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
                <Image 
                    src={article.img || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop"} 
                    alt={article.title} 
                    fill 
                    className="object-cover"
                    priority
                />
              </div>
            </Fade>
            
            {/* CONTENT BODY */}
            <Fade direction="up" delay={250} distance={30}>
              <article className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-[var(--primary)] prose-strong:text-foreground prose-img:rounded-2xl pb-16">
                <p className="lead whitespace-pre-line leading-relaxed">
                    {article.content || article.desc}
                </p>
                
                {/* Fallback real-looking text if content is too short */}
                {(!article.content || article.content.length < 100) && (
                    <div className="mt-8 space-y-6">
                        <h3>In-Depth Analysis</h3>
                        <p>
                            Our research indicates that the environmental factors of a student's residence play a massive role in their overall productivity. 
                            Being surrounded by peers from the same cultural background reduces the 'adjustment period' that typically affects 
                            academic performance during the first few years of college.
                        </p>
                        <p>
                            Furthermore, the cost of living in Jakarta has seen a significant rise. 
                            Choosing a communal living space like LADorm allows students to allocate their resources more efficiently towards 
                            learning materials and other essential needs.
                        </p>
                    </div>
                )}
              </article>
            </Fade>
          </div>
        </section>
        
        <Footer />
      </main>
    </LayoutBlank>
  );
}

