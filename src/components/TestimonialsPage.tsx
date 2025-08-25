import { testimonialsData } from "@/utils/Testimonials";
import Image from "next/image";

export default function TestimonialsPage() {
  return (
    <section>
      <h2>Alumni LADorm</h2>
      <ul>
        {testimonialsData.map((t) => (
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
