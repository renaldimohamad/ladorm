import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // title: "LADorm",
  // description: "Asrama Mahasiswa Gorontalo - Tempat nyaman dan terjangkau.",
  // openGraph: {
  //   title: "LADorm - Asrama Mahasiswa Gorontalo",
  //   description: "Tempat nyaman dan terjangkau untuk mahasiswa Gorontalo.",
  //   url: "https://student-dormitory.vercel.app",
  //   siteName: "LADorm",
  //   images: [
  //     {
  //       url: "https://student-dormitory.vercel.app/images/LADORM_FORM.webp",
  //       width: 1200,
  //       height: 630,
  //       alt: "LADorm - Asrama Mahasiswa Gorontalo",
  //     },
  //   ],
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "LADorm - Asrama Mahasiswa Gorontalo",
  //   description: "Tempat nyaman dan terjangkau untuk mahasiswa Gorontalo.",
  //   images: ["https://student-dormitory.vercel.app/images/LADORM_FORM.webp"],
  // },
  title: "LADorm",
  description:
    "Tempat tinggal nyaman, aman, dan penuh kebersamaan untuk mahasiswa Gorontalo yang merantau. Di sini, kamu nggak cuma sekadar tinggal - kamu bakal nemuin keluarga baru yang siap support perjalanan kuliah kamu.",
  keywords: [
    "Asrama Gorontalo Lenteng Agung",
    "Asrama Jakarta",
    "Asrama Gorontalo",
    "Asrama Mahasiswa",
    "Kost Mahasiswa Gorontalo",
    "Student Dormitory",
    "Asrama murah Gorontalo",
  ],
  authors: [{ name: "LADorm" }],
  creator: "LADorm",
  publisher: "LADorm",
  metadataBase: new URL("https://student-dormitory.vercel.app"),

  openGraph: {
    title: "LADorm - Asrama Mahasiswa Gorontalo",
    description:
      "Tempat tinggal nyaman, aman, dan penuh kebersamaan untuk mahasiswa Gorontalo yang merantau. Di sini, kamu nggak cuma sekadar tinggal - kamu bakal nemuin keluarga baru yang siap support perjalanan kuliah kamu.",
    url: "https://student-dormitory.vercel.app",
    siteName: "LADorm",
    images: [
      {
        url: "https://student-dormitory.vercel.app/images/LADORM_FORM.webp",
        width: 1200,
        height: 630,
        alt: "LADorm - Asrama Mahasiswa Gorontalo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@Ladorm_Family",
    creator: "@Ladorm_Family",
    title: "LADorm - Asrama Mahasiswa Gorontalo",
    description:
      "Tempat tinggal nyaman, aman, dan penuh kebersamaan untuk mahasiswa Gorontalo yang merantau. Di sini, kamu nggak cuma sekadar tinggal - kamu bakal nemuin keluarga baru yang siap support perjalanan kuliah kamu.",
    images: ["https://student-dormitory.vercel.app/images/LADORM_FORM.webp"],
  },

  alternates: {
    canonical: "https://student-dormitory.vercel.app",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    other: {
      "msvalidate.01": "Bing-verification-code",
    },
  },

  applicationName: "LADorm",
  category: "Real Estate, Education, Dormitory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
