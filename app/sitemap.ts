import type { MetadataRoute } from "next";

// Fecha del último cambio de contenido: actualizarla a mano al editar páginas.
const ULTIMA_ACTUALIZACION = "2026-11-11";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://deployuy.com/",
      lastModified: ULTIMA_ACTUALIZACION,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...["software-a-medida", "paginas-web", "automatizacion", "agentes-whatsapp"].map(
      (slug) => ({
        url: `https://deployuy.com/${slug}`,
        lastModified: ULTIMA_ACTUALIZACION,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }),
    ),
  ];
}
