import type { Metadata } from "next";
import AboutLanding from "./AboutLanding";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang LADORM",
  description:
    "Kenali LADORM, sejarah, visi, dan semangat komunitas asrama mahasiswa Gorontalo di Jakarta yang telah tumbuh sejak lama.",
  openGraph: {
    title: "Tentang LADORM – Asrama Mahasiswa Gorontalo",
    description:
      "Kenali LADORM, sejarah, visi, dan semangat komunitas asrama mahasiswa Gorontalo di Jakarta yang telah tumbuh sejak lama.",
    url: `${SITE_URL}/about`,
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
    title: "Tentang LADORM – Asrama Mahasiswa Gorontalo",
    description:
      "Kenali LADORM, sejarah, visi, dan semangat komunitas asrama mahasiswa Gorontalo di Jakarta yang telah tumbuh sejak lama.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return <AboutLanding />;
}
