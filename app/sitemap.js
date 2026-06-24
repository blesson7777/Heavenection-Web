import { services } from "./site-data";

const baseUrl = "https://www.heavenection.com";

export default function sitemap() {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.82,
    })),
  ];
}
