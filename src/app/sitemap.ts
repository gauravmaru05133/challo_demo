import type { MetadataRoute } from "next";
import { routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/taxi-in-rajkot"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/routes"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...routes.map((r) => ({
      url: absoluteUrl(`/${r.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: r.popular ? 0.9 : 0.7,
    })),
  ];
}
