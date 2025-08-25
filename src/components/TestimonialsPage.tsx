import { testimonialsData } from "@/utils/Testimonials";

export default function TestimonialsPage() {
  return (
    <section>
      <h2>Alumni LADorm</h2>
      <ul>
        {testimonialsData.map((t) => (
          <li key={t.name}>
            <img src={t.avatar} alt={t.name} width={80} height={80} />
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
