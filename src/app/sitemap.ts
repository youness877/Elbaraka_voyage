import type { MetadataRoute } from "next";
import { posts } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/voyages`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/location-voitures`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${site.url}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...postRoutes];
}
