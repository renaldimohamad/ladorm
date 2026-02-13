import { notFound } from "next/navigation";
import { residents } from "@/utils/residents";
import ResidentDetailClient from "./ResidentDetailClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
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
