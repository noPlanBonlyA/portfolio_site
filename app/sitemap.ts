import type { MetadataRoute } from "next";

import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/cv", "/cv/ru"].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly" }));
}
