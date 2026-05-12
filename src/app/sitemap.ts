import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/audit`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
