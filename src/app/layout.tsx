import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { testimonialsData } from "@/utils/Testimonials";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollToTop from "@/components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { GlobalPreloader } from "@/components/common/GlobalPreloader";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  ORGANIZATION_LOGO,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} – Asrama Mahasiswa Gorontalo di Jakarta`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "LADORM adalah asrama mahasiswa Gorontalo di Jakarta yang menyediakan lingkungan aman, nyaman, dan kondusif untuk menunjang kehidupan akademik dan sosial para mahasiswi dan mahasiswa rantau.",
  keywords: [
    "Asrama Mahasiswa Gorontalo Jakarta",
    "Asrama Gorontalo di Jakarta",
    "LADORM",
    "Asrama mahasiswa",
    "Dormitory Gorontalo",
    "Kost mahasiswa Gorontalo",
    "Asrama Lenteng Agung",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  category: "Education, Dormitory, Student Housing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: `${SITE_NAME} – Asrama Mahasiswa Gorontalo di Jakarta`,
    description:
      "LADORM adalah asrama mahasiswa Gorontalo di Jakarta yang menyediakan lingkungan aman, nyaman, dan kondusif untuk menunjang kehidupan akademik dan sosial para mahasiswi dan mahasiswa rantau.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
        alt: `${SITE_NAME} – Asrama Mahasiswa Gorontalo di Jakarta`,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Asrama Mahasiswa Gorontalo di Jakarta`,
    description:
      "LADORM adalah asrama mahasiswa Gorontalo di Jakarta yang menyediakan lingkungan aman, nyaman, dan kondusif untuk menunjang kehidupan akademik dan sosial para mahasiswi dan mahasiswa rantau.",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "b9beb292c0d5edc6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      try {
        if (localStorage.theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch (_) {}
    `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE_URL}#organization`,
              name: SITE_NAME,
              url: SITE_URL,
              logo: ORGANIZATION_LOGO,
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
                  name: SITE_NAME,
                },
                image: t.avatar.startsWith("http")
                  ? t.avatar
                  : `${SITE_URL}${t.avatar}`,
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}#website`,
              name: SITE_NAME,
              url: SITE_URL,
              inLanguage: "id",
              publisher: {
                "@id": `${SITE_URL}#organization`,
              },
            }),
          }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300 font-sans text-base leading-relaxed md:text-[1.05rem]`}>
        <ThemeProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 5000,
              style: {
                borderRadius: "1.25rem",
                background: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                padding: "16px 24px",
                fontSize: "14px",
                fontWeight: "600",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                maxWidth: "90vw",
              },
              success: {
                iconTheme: {
                  primary: "var(--primary)",
                  secondary: "#fff",
                },
              },
            }}
          />
          <GlobalPreloader />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
