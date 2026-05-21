import type { MetadataRoute } from "next";

const baseUrl = "https://struxa.cloud";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: string[] = [
    "/",
    "/legal",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/blog",
    "/hiring",
    "/about",
    "/pricing",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : route.includes("/legal") ? 0.5 : 0.7,
  }));
}
