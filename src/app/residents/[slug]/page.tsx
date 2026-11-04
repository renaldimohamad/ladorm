import { notFound } from "next/navigation";
import {
  getResidentProfileDescription,
  residents,
} from "@/utils/residents";
import ResidentDetailClient from "./ResidentDetailClient";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const resident = residents.find((r) => r.slug === slug);

  if (!resident) {
    return {
      title: { absolute: "Profil Tidak Ditemukan | LADORM" },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const imageUrl = resident.photo.trim()
    ? new URL(resident.photo, SITE_URL).toString()
    : DEFAULT_OG_IMAGE;
  const canonicalUrl = `${SITE_URL}/residents/${resident.slug}`;
  const description = getResidentProfileDescription(resident);
  const title = `${resident.name} – Profil Penghuni ${SITE_NAME}`;

  return {
    title: { absolute: title },
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "profile",
      images: [
        {
          url: imageUrl,
          alt: `Foto profil ${resident.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export function generateStaticParams() {
  return residents.map((r) => ({
    slug: r.slug,
  }));
}

export const dynamicParams = false;

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const resident = residents.find((r) => r.slug === slug);

  if (!resident) {
    notFound();
  }

  const imageUrl = resident.photo.trim()
    ? new URL(resident.photo, SITE_URL).toString()
    : DEFAULT_OG_IMAGE;
  const organization = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
  const socialProfiles = Object.values(resident.socials || {}).filter(
    (url): url is string => Boolean(url?.trim()),
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resident.name,
    image: imageUrl,
    url: `${SITE_URL}/residents/${resident.slug}`,
    description: getResidentProfileDescription(resident),
    ...(resident.status === "alumni"
      ? { alumniOf: organization }
      : { affiliation: organization }),
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Penghuni",
        item: `${SITE_URL}/residents`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: resident.name,
        item: `${SITE_URL}/residents/${resident.slug}`,
      },
    ],
  };

  return (
    <>
      <ResidentDetailClient resident={resident} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
}
