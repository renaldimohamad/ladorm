import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Pendaftaran LADORM",
  description:
    "Ajukan pendaftaran untuk menjadi penghuni asrama mahasiswa Gorontalo LADORM di Jakarta dan dapatkan informasi proses penerimaan.",
  alternates: {
    canonical: `${SITE_URL}/register`,
  },
  openGraph: {
    title: "Pendaftaran LADORM – Asrama Mahasiswa Gorontalo",
    description:
      "Ajukan pendaftaran untuk menjadi penghuni asrama mahasiswa Gorontalo LADORM di Jakarta dan dapatkan informasi proses penerimaan.",
    url: `${SITE_URL}/register`,
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
    title: "Pendaftaran LADORM – Asrama Mahasiswa Gorontalo",
    description:
      "Ajukan pendaftaran untuk menjadi penghuni asrama mahasiswa Gorontalo LADORM di Jakarta dan dapatkan informasi proses penerimaan.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
