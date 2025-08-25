import { testimonialsData } from "@/utils/Testimonials";
import { useRouter } from "next/router";
import Head from "next/head";

export default function TestimonialDetail() {
  const router = useRouter();
  const { name } = router.query;

  const testimonial = testimonialsData.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (!testimonial) return <p>Data tidak ditemukan</p>;

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
                name: "Asrama Mahasiswa",
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
