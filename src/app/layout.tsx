import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { testimonialsData } from "@/utils/Testimonials";
import Navbar from "@/components/common/Navbar";
import { residents } from "@/utils/residents";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollToTop from "@/components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { GlobalPreloader } from "@/components/common/GlobalPreloader";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

  alternates: {
    canonical: "https://ladorm.vercel.app",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: "b9beb292c0d5edc6",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
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
        className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300 font-sans text-base leading-relaxed md:text-[1.05rem]`}
      >
        <ThemeProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 5000,
              style: {
                borderRadius: '1.25rem',
                background: 'var(--card)',
                color: 'var(--foreground)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                padding: '16px 24px',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                maxWidth: '90vw',
              },
              success: {
                iconTheme: {
                  primary: 'var(--primary)',
                  secondary: '#fff',
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
