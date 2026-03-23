import type { MetadataRoute } from "next";

const BASE_URL = "https://continuumiq.ai";

const pages = [
  "",
  "/platform",
  "/industries",
  "/case-studies",
  "/pricing",
  "/security",
  "/resources",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of ["en", "ar"]) {
    for (const page of pages) {
      routes.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page === "/pricing" ? 0.9 : 0.8,
      });
    }
  }

  return routes;
}
