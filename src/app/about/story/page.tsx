import type { Metadata } from "next";
import AboutStory from "./AboutStory";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Sejarah LADORM",
  description:
    "Pelajari perjalanan LADORM sebagai wadah komunitas mahasiswa Gorontalo di Jakarta, dari awal berdiri hingga berkembang hingga saat ini.",
  openGraph: {
    title: "Sejarah LADORM – Asrama Mahasiswa Gorontalo",
    description:
      "Pelajari perjalanan LADORM sebagai wadah komunitas mahasiswa Gorontalo di Jakarta, dari awal berdiri hingga berkembang hingga saat ini.",
    url: `${SITE_URL}/about/story`,
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
    title: "Sejarah LADORM – Asrama Mahasiswa Gorontalo",
    description:
      "Pelajari perjalanan LADORM sebagai wadah komunitas mahasiswa Gorontalo di Jakarta, dari awal berdiri hingga berkembang hingga saat ini.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/about/story`,
  },
};

export default function AboutStoryPage() {
  return <AboutStory />;
}
