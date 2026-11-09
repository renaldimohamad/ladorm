import { residents } from "@/utils/residents";
import { blogArticles } from "@/utils/blog";
import { SITE_URL } from "@/lib/site";

export default async function sitemap() {
  const staticPages = [
    "/",
    "/about",
    "/about/story",
    "/blog",
    "/contact-us",
    "/register",
    "/residents",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));

  const residentUrls = residents.map((r) => ({
    url: `${SITE_URL}/residents/${r.slug}`,
  }));

  const blogUrls = blogArticles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
  }));

  return [...staticUrls, ...residentUrls, ...blogUrls];
}
