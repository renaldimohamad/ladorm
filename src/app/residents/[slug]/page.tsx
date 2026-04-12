import { notFound } from "next/navigation";
import { residents } from "@/utils/residents";
import ResidentDetailClient from "./ResidentDetailClient";
import { Metadata } from "next";

type PropsMetaData = {
  params: { slug: string };
};

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
      title: "Resident Not Found | LADorm",
    };
  }

  const baseUrl = "https://ladorm.vercel.app";

  const imageUrl = resident.coverPhoto
    ? `${baseUrl}${resident.coverPhoto}`
    : `${baseUrl}${resident.photo}`;

  const statusLabel = resident.status === "active" ? "Active Member" : "Alumni";

  const shortSummary =
    resident.about?.summary?.slice(0, 120) || resident.bio || "";

  const description = `${resident.name} adalah ${statusLabel} LADorm dari ${resident.university
    }. ${shortSummary}${resident.joinedYear ? ` Bergabung sejak ${resident.joinedYear}.` : ""
    }`;

  return {
    title: `${resident.name} | ${resident.major} | LADorm`,
    description: description,
    openGraph: {
      title: `${resident.name} | ${resident.major} | LADorm`,
      description: description,
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
      description: description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/residents/${resident.slug}`,
    },
  };
}

export function generateStaticParams() {
  console.log(
    "BUILD SLUGS:",
    residents.map((r) => r.slug),
  );
  return residents.map((r) => ({
    slug: r.slug,
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const resident = residents.find((r) => r.slug === slug);

  if (!resident) {
    notFound();
  }

  const baseUrl = "https://ladorm.vercel.app";
  const imageUrl = resident.coverPhoto
    ? `${baseUrl}${resident.coverPhoto}`
    : `${baseUrl}${resident.photo}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resident.name,
    image: imageUrl,
    url: `${baseUrl}/residents/${resident.slug}`,
    description: resident.about?.summary || resident.bio || "",
    affiliation: resident.university,
    jobTitle: resident.major,
    alumniOf: resident.university,
    sameAs: Object.values(resident.socials || {}).filter(Boolean),
  } as any;

  return (
    <>
      <ResidentDetailClient resident={resident} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
