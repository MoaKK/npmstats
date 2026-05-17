import type { MetadataRoute } from "next";

function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://npmstats.dev/sitemap.xml",
  };
}

export default robots;
