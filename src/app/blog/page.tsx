import type { Metadata } from "next";
import BlogPageClient from "@/components/blog/BlogPageClient";

export const metadata: Metadata = {
  title: "Blog & Kabar Kegiatan LADorm | Asrama Mahasiswa Gorontalo Jakarta",
  description:
    "Temukan berita, kegiatan, dan kisah komunitas LADorm untuk mahasiswa Gorontalo di Jakarta. Baca artikel seputar asrama, kegiatan sosial, dan kehidupan mahasiswa rantau.",
  alternates: {
    canonical: "https://ladorm.vercel.app/blog",
  },
  openGraph: {
    title: "Blog & Kabar Kegiatan LADorm",
    description:
      "Temukan berita, kegiatan, dan kisah komunitas LADorm untuk mahasiswa Gorontalo di Jakarta.",
    url: "https://ladorm.vercel.app/blog",
    type: "website",
    images: [
      {
        url: "https://ladorm.vercel.app/images/LADORM_FORM.webp",
        width: 1200,
        height: 630,
        alt: "LADorm blog dan kegiatan asrama",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Kabar Kegiatan LADorm",
    description:
      "Temukan berita, kegiatan, dan kisah komunitas LADorm untuk mahasiswa Gorontalo di Jakarta.",
    images: ["https://ladorm.vercel.app/images/LADORM_FORM.webp"],
  },
};

export default function Blog() {
  return <BlogPageClient />;
}
