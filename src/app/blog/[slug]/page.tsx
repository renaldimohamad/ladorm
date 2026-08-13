import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineFolder,
} from "react-icons/hi";
import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import Fade from "@/components/common/Fade";
import BlogShareButtons from "@/components/blog/BlogShareButtons";
import {
  getBlogArticleBySlug,
  getBlogArticleSlugs,
  getBlogArticleCanonicalUrl,
  resolveAbsoluteAssetUrl,
  getDefaultBlogOgImage,
} from "@/utils/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogArticleBySlug(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | LADorm",
      description: "Artikel blog yang Anda cari tidak tersedia.",
    };
  }

  const baseUrl = "https://ladorm.vercel.app";
  const canonicalUrl = getBlogArticleCanonicalUrl(slug, baseUrl);
  const imageUrl = resolveAbsoluteAssetUrl(post.image, baseUrl);

  return {
    title: `${post.title} | LADorm Blog`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      authors: ["LADorm"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export function generateStaticParams() {
  return getBlogArticleSlugs();
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogArticleBySlug(slug);
  const backToLabel = "Kembali";

  if (!post) {
    notFound();
  }

  const canonicalUrl = getBlogArticleCanonicalUrl(slug);
  const articleImage = post.image ? post.image : "/images/LADORM_FORM.webp";
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: articleImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "LADorm",
    },
    publisher: {
      "@type": "Organization",
      name: "LADorm",
      logo: {
        "@type": "ImageObject",
        url: "https://ladorm.vercel.app/images/LADORM_FORM.webp",
      },
    },
    mainEntityOfPage: canonicalUrl,
    articleSection: post.category,
    keywords: post.tags?.join(", ") || post.category,
    about: [
      "Asrama Mahasiswa Gorontalo Jakarta",
      "Komunitas mahasiswa Gorontalo",
      "Kegiatan asrama LADorm",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: "https://ladorm.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://ladorm.vercel.app/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <LayoutBlank>
      <>
        <main className="flex-1 w-full bg-background text-foreground">
          {/* Navigation Bar / Return */}
          <div className="w-full max-w-4xl mx-auto pt-28 px-6 mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
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
                  {post.excerpt}
                </p>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground border-b border-border/50 pb-6 mb-8">
                  <span className="flex items-center">
                    <HiOutlineCalendar className="w-4 h-4 mr-1.5" /> {post.date}
                  </span>
                  <span className="flex items-center font-semibold text-primary">
                    <HiOutlineFolder className="w-4 h-4 mr-1.5" />{" "}
                    {post.category}
                  </span>
                </div>
              </Fade>

              <Fade direction="up" delay={150} distance={40} scale={0.95}>
                <div className="relative w-full h-75 md:h-112.5 rounded-4xl overflow-hidden mb-12 shadow-md hover:shadow-xl transition-shadow duration-500">
                  <Image
                    src={articleImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              </Fade>

              {/* CONTENT BODY */}
              <Fade direction="up" delay={250} distance={30}>
                <article className="prose prose-lg md:prose-xl max-w-none text-foreground prose-headings:text-foreground prose-headings:font-sans prose-a:text-[var(--primary)] prose-strong:text-foreground prose-img:rounded-2xl pb-16">
                  <p className="whitespace-pre-line leading-relaxed">
                    {post.content || post.excerpt}
                  </p>

                  {/* Fallback real-looking text if content is too short */}
                  {(!post.content || post.content.length < 100) && (
                    <div className="mt-8 space-y-6">
                      <p>
                        Living in the LADorm community has been a transformative
                        experience for many Gorontalo students. Beyond the daily
                        routines, it is the spirit of togetherness and support
                        that defines our stay here. Every event, from shared
                        meals to weekend sports, contributes to a home-like
                        environment that fosters both personal and academic
                        growth.
                      </p>
                      <p>
                        We continue to strive for excellence in maintaining our
                        facilities and organizing meaningful activities that
                        benefit all residents. We believe that by staying
                        connected to our roots and supporting one another, we
                        can overcome any challenge that comes our way in this
                        big city.
                      </p>
                    </div>
                  )}
                </article>
              </Fade>

              <Fade direction="up">
                <div className="flex flex-col gap-4 py-6 border-t border-border/50 md:flex-row md:items-center md:justify-between">
                  <div className="text-sm">
                    Source:{" "}
                    <span className="font-bold text-foreground">
                      LADorm Editorial
                    </span>
                  </div>
                  <BlogShareButtons
                    title={post.title}
                    description={post.excerpt}
                    url={canonicalUrl}
                    image={articleImage}
                  />
                </div>
              </Fade>
            </div>
          </section>

          <Footer />
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </>
    </LayoutBlank>
  );
}
