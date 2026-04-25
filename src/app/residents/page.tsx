import { Metadata } from "next";
import ResidentsClient from "./ResidentsClient";

export const metadata: Metadata = {
  title: "Daftar Penghuni LADORM | LADorm",
  description:
    "Daftar penghuni LADorm — profil singkat, latar belakang akademik, dan keahlian untuk memudahkan pencarian dan koneksi.",
  openGraph: {
    title: "Daftar Penghuni LADORM | LADorm",
    description:
      "Daftar penghuni LADorm — profil singkat, latar belakang akademik, dan keahlian untuk memudahkan pencarian dan koneksi.",
    url: "https://ladorm.vercel.app/residents",
    type: "website",
    images: [
      {
        url: "https://ladorm.vercel.app/images/LADORM_FORM.webp",
        width: 1200,
        height: 630,
        alt: "Daftar Penghuni LADORM",
      },
    ],
  },
  alternates: {
    canonical: "https://ladorm.vercel.app/residents",
  },
};

export default function ResidentsPage() {
  return <ResidentsClient />;
}
