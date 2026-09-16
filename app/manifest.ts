import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "El Núcleo Digital",
    short_name: "El Núcleo Digital",
    description:
      "Software a medida y páginas web para tu negocio. Automatización y agentes de IA como complemento.",
    start_url: "/",
    display: "standalone",
    background_color: "#14161b",
    theme_color: "#14161b",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
