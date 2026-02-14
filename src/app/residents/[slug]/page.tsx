import { notFound } from "next/navigation";
import { residents } from "@/utils/residents";
import ResidentDetailClient from "./ResidentDetailClient";
import { Metadata } from "next";

type PropsMetaData = {
  params: { slug: string };
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PropsMetaData): Promise<Metadata> {
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

export function generateStaticParams() {
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

  return <ResidentDetailClient resident={resident} />;
}
