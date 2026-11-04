import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/site";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const canonical = `${SITE_URL}/insight/${encodeURIComponent(id)}`;
  const description =
    "Pratinjau insight LADORM tentang kehidupan asrama dan pengalaman mahasiswa Gorontalo di Jakarta. Konten lengkap sedang disiapkan.";

  return {
    title: `Insight ${id} | LADORM`,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `Insight ${id} | LADORM`,
      description,
      url: canonical,
      type: "article",
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
      title: `Insight ${id} | LADORM`,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function InsightArticleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
