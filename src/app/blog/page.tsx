import type { Metadata } from "next";
import BlogPageClient from "@/components/blog/BlogPageClient";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog LADORM",
  description:
    "Baca cerita, kegiatan, dan momen keseharian komunitas mahasiswa Gorontalo di LADORM, mulai dari kegiatan asrama hingga pengalaman hidup di Jakarta.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog LADORM – Cerita dan Kegiatan Komunitas",
    description:
      "Baca cerita, kegiatan, dan momen keseharian komunitas mahasiswa Gorontalo di LADORM, mulai dari kegiatan asrama hingga pengalaman hidup di Jakarta.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
        alt: "Blog LADORM – Cerita dan Kegiatan Komunitas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog LADORM – Cerita dan Kegiatan Komunitas",
    description:
      "Baca cerita, kegiatan, dan momen keseharian komunitas mahasiswa Gorontalo di LADORM, mulai dari kegiatan asrama hingga pengalaman hidup di Jakarta.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function Blog() {
  return <BlogPageClient />;
}
