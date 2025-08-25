import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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

  other: {
    "og:title": "LADorm - Asrama Mahasiswa Gorontalo",
    "og:description":
      "Tempat tinggal nyaman, aman, dan penuh kebersamaan untuk mahasiswa Gorontalo yang merantau. Di sini, kamu nggak cuma sekadar tinggal - kamu bakal nemuin keluarga baru yang siap support perjalanan kuliah kamu.",
    "og:image": "https://student-dormitory.vercel.app/images/LADORM_FORM.webp",
    "og:url": "https://student-dormitory.vercel.app",
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
      <head>
        {/*Tambahin JSON-LD*/}
        <Script
          id="ld-json-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LADorm",
              url: "https://student-dormitory.vercel.app",
              logo: "https://student-dormitory.vercel.app/images/LADORM_FORM.webp",
              sameAs: [
                "https://www.facebook.com/LadormFamily",
                "https://twitter.com/Ladorm_Family",
                "https://www.instagram.com/Ladorm_Family",
              ],
              description:
                "Asrama Mahasiswa Gorontalo di Lenteng Agung Jakarta. Nyaman, aman, terjangkau, dan penuh kebersamaan.",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
