import { residents } from "@/utils/residents";

const baseUrl = "https://ladorm.vercel.app";

export default function Head() {
  const title = "Daftar Penghuni LADORM | LADorm";
  const description =
    "Daftar penghuni LADorm — profil singkat, latar belakang akademik, dan keahlian untuk memudahkan pencarian dan koneksi.";

  const image = `${baseUrl}${residents[0]?.coverPhoto || residents[0]?.photo || "/images/og-default.png"}`;

  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${baseUrl}/residents`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: residents.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.name,
        url: `${baseUrl}/residents/${r.slug}`,
      })),
    },
  };

  const siteStructured: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LADorm",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}/residents`} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={`${baseUrl}/residents`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([structuredData, siteStructured]),
        }}
      />
    </>
  );
}
