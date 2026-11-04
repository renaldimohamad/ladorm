import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak LADORM",
  description:
    "Hubungi LADORM untuk bertanya tentang asrama mahasiswa Gorontalo di Jakarta, informasi pendaftaran, dan komunitas penghuni.",
  alternates: {
    canonical: `${SITE_URL}/contact-us`,
  },
  openGraph: {
    title: "Kontak LADORM – Asrama Mahasiswa Gorontalo Jakarta",
    description:
      "Hubungi LADORM untuk bertanya tentang asrama mahasiswa Gorontalo di Jakarta, informasi pendaftaran, dan komunitas penghuni.",
    url: `${SITE_URL}/contact-us`,
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
    title: "Kontak LADORM – Asrama Mahasiswa Gorontalo Jakarta",
    description:
      "Hubungi LADORM untuk bertanya tentang asrama mahasiswa Gorontalo di Jakarta, informasi pendaftaran, dan komunitas penghuni.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
