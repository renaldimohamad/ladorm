"use client";

import { useMemo } from "react";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { HiOutlineLink, HiOutlineShare } from "react-icons/hi";
import { toast } from "react-hot-toast";

interface BlogShareButtonsProps {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export default function BlogShareButtons({
  title,
  description,
  url,
  image,
}: BlogShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const shareImage = useMemo(() => image || "https://ladorm.vercel.app/images/LADORM_FORM.webp", [image]);

  const shareTargets = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: FaWhatsapp,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FaFacebook,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: FaLinkedin,
    },
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: FaXTwitter,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Tautan artikel berhasil disalin.");
    } catch {
      toast.error("Tidak bisa menyalin tautan saat ini.");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {shareTargets.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          aria-label={`Bagikan ke ${label}`}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </a>
      ))}

      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
      >
        <HiOutlineLink className="h-4 w-4" />
        <span>Copy Link</span>
      </button>

      <span className="hidden text-sm text-muted-foreground md:inline-flex">
        <HiOutlineShare className="mr-2 h-4 w-4" />
        Bagikan artikel ini ke teman komunitas Anda.
      </span>
    </div>
  );
}
