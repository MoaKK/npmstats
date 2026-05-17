import type { MetadataRoute } from "next";

function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://npmstats.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

export default sitemap;