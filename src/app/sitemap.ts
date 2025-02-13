import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/utils/Helpers";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}/`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.7,
    },
    {
      url: `${getBaseUrl()}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${getBaseUrl()}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];
}
