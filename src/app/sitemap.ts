import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_LOCAL_URL as string,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ]
}
