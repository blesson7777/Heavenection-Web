import { services } from "./site-data";

const baseUrl = "https://www.heavenection.com";
const lastModified = new Date("2026-06-26");

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    })),
  ];
}
