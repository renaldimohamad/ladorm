import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pendaftaran Berhasil",
  description: "Informasi konfirmasi pendaftaran LADORM.",
  alternates: {
    canonical: `${SITE_URL}/register/success`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Pendaftaran Berhasil | LADORM",
    description: "Informasi konfirmasi pendaftaran LADORM.",
    url: `${SITE_URL}/register/success`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pendaftaran Berhasil | LADORM",
    description: "Informasi konfirmasi pendaftaran LADORM.",
  },
};

export default function RegisterSuccessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
