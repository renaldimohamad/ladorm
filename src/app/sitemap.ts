import { residents } from "@/utils/residents";

const baseUrl = "https://ladorm.vercel.app";

export default async function sitemap() {
  const staticPages = ["/", "/about", "/blog", "/contact-us", "/residents"];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const residentUrls = residents.map((r) => ({
    url: `${baseUrl}/residents/${r.slug}`,
    lastModified: r.joinedYear
      ? `${r.joinedYear}-01-01`
      : new Date().toISOString(),
  }));

  return [...staticUrls, ...residentUrls];
}
