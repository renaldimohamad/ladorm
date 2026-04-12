"use client";
import { testimonialsData } from "@/utils/Testimonials";
import { useRouter } from "next/router";
import Head from "next/head";
import { useLanguage } from "../../../stores/useLengauage";

export default function TestimonialDetail() {
  const router = useRouter();
  const { dictionary, lang } = useLanguage();
  const { name } = router.query;

  const activeTestimonials = dictionary.testimonialsData || testimonialsData;

  const testimonial = activeTestimonials.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (!testimonial) return <p>{lang === 'en' ? 'Data not found' : 'Data tidak ditemukan'}</p>;

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              author: {
                "@type": "Person",
                name: testimonial.name,
              },
              reviewBody: testimonial.message,
              itemReviewed: {
                "@type": "Organization",
                name: dictionary.footer?.brandText || "Asrama Mahasiswa",
              },
            }),
          }}
        />
      </Head>

      <div>
        <h1>{testimonial.name}</h1>
        <img src={testimonial.avatar} alt={testimonial.name} />
        <p>{testimonial.message}</p>
        <p>{testimonial.role}</p>
        <p>{testimonial.location}</p>
      </div>
    </>
  );
}
