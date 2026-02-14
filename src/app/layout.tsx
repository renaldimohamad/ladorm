import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { testimonialsData } from "@/utils/Testimonials";
import Navbar from "@/components/common/Navbar";
import { residents } from "@/utils/residents";

type Props = {
  params: { slug: string };
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resident = residents.find((r) => r.slug === params.slug);

  if (!resident) {
    return {
      title: "Resident Not Found | LADorm",
    };
  }

  const baseUrl = "https://ladorm.vercel.app";

  const imageUrl = resident.coverPhoto
    ? `${baseUrl}${resident.coverPhoto}`
    : `${baseUrl}${resident.photo}`;

  return {
    title: `${resident.name} | LADorm`,
    description: resident.bio || `Profil ${resident.name} - ${resident.major}`,
    openGraph: {
      title: `${resident.name} | LADorm`,
      description:
        resident.bio || `Profil ${resident.name} - ${resident.major}`,
      url: `${baseUrl}/residents/${resident.slug}`,
      type: "profile",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resident.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${resident.name} | LADorm`,
      description: resident.bio || `Profil ${resident.name}`,
      images: [imageUrl],
    },
  };
}

export const metadata: Metadata = {
  title: "LADorm - Asrama Mahasiswa Gorontalo",
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
  metadataBase: new URL("https://ladorm.vercel.app"),

  openGraph: {
    title: "LADorm - Asrama Mahasiswa Gorontalo",
    description:
      "Tempat tinggal nyaman, aman, dan penuh kebersamaan untuk mahasiswa Gorontalo yang merantau. Di sini, kamu nggak cuma sekadar tinggal - kamu bakal nemuin keluarga baru yang siap support perjalanan kuliah kamu.",
    url: "https://ladorm.vercel.app",
    siteName: "LADorm",
    images: [
      {
        url: "https://ladorm.vercel.app/images/LADORM_FORM.webp",
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
    images: ["https://ladorm.vercel.app/images/LADORM_FORM.webp"],
  },

  other: {
    "og:title": "LADorm - Asrama Mahasiswa Gorontalo",
    "og:description":
      "Tempat tinggal nyaman, aman, dan penuh kebersamaan untuk mahasiswa Gorontalo yang merantau. Di sini, kamu nggak cuma sekadar tinggal - kamu bakal nemuin keluarga baru yang siap support perjalanan kuliah kamu.",
    "og:image": "https://ladorm.vercel.app/images/LADORM_FORM.webp",
    "og:url": "https://ladorm.vercel.app",
  },

  alternates: {
    canonical: "https://ladorm.vercel.app",
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
        {/*JSON-LD*/}
        <Script
          id="ld-json-testimonials"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LADorm",
              url: "https://ladorm.vercel.app",
              logo: "https://ladorm.vercel.app/images/LADORM_FORM.webp",
              review: testimonialsData.map((t) => ({
                "@type": "Review",
                author: {
                  "@type": "Person",
                  name: t.name,
                },
                reviewBody: t.message,
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                  worstRating: "1",
                },
                publisher: {
                  "@type": "Organization",
                  name: "LADorm",
                },
                image: t.avatar.startsWith("http")
                  ? t.avatar
                  : `https://ladorm.vercel.app${t.avatar}`,
              })),
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
