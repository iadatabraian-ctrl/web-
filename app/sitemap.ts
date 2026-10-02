import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://deployuy.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...["software-a-medida", "paginas-web", "automatizacion", "agentes-whatsapp"].map(
      (slug) => ({
        url: `https://deployuy.com/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }),
    ),
  ];
}
