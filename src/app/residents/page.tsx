import { Metadata } from "next";
import ResidentsClient from "./ResidentsClient";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Penghuni LADORM",
  description:
    "Kenali komunitas penghuninya, profil akademik, serta kegiatan keseharian mahasiswa Gorontalo yang tinggal di LADORM Jakarta.",
  openGraph: {
    title: "Penghuni LADORM – Komunitas Mahasiswa Gorontalo",
    description:
      "Kenali komunitas penghuninya, profil akademik, serta kegiatan keseharian mahasiswa Gorontalo yang tinggal di LADORM Jakarta.",
    url: `${SITE_URL}/residents`,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
        alt: "Penghuni LADORM – Komunitas Mahasiswa Gorontalo",
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/residents`,
  },
};

export default function ResidentsPage() {
  return <ResidentsClient />;
}
