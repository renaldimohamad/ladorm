import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Insight LADORM",
  description:
    "Pratinjau insight LADORM tentang kehidupan asrama dan pengalaman mahasiswa Gorontalo di Jakarta. Konten lengkap sedang disiapkan.",
  alternates: {
    canonical: `${SITE_URL}/insight`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Insight LADORM – Pratinjau Konten",
    description:
      "Pratinjau insight LADORM tentang kehidupan asrama dan pengalaman mahasiswa Gorontalo di Jakarta. Konten lengkap sedang disiapkan.",
    url: `${SITE_URL}/insight`,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
        alt: "LADORM – Asrama Mahasiswa Gorontalo di Jakarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insight LADORM – Pratinjau Konten",
    description:
      "Pratinjau insight LADORM tentang kehidupan asrama dan pengalaman mahasiswa Gorontalo di Jakarta. Konten lengkap sedang disiapkan.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function InsightLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
