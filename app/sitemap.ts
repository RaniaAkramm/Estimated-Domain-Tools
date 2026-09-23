import { MetadataRoute } from "next";

const SITE_URL = "https://estimated.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/appraise", "/cvcvcv"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
