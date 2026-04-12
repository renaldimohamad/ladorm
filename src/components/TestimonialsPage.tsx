"use client";
import { testimonialsData } from "@/utils/Testimonials";
import Image from "next/image";
import { useLanguage } from "../../stores/useLengauage";

export default function TestimonialsPage() {
  const { dictionary } = useLanguage();
  const activeTestimonials = dictionary.testimonialsData || testimonialsData;

  return (
    <section>
      <h2>{dictionary.homeWhyLadorm?.CTA?.title || "Alumni LADorm"}</h2>
      <ul>
        {activeTestimonials.map((t) => (
          <li key={t.name}>
            <Image src={t.avatar} alt={t.name} width={80} height={80} />
            <p>
              <strong>{t.name}</strong> - {t.role} ({t.location})
            </p>
            <blockquote>{t.message}</blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
