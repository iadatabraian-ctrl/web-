import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Deploy",
    short_name: "Deploy",
    description:
      "Software a medida y páginas web para tu negocio. Automatización y agentes de IA como complemento.",
    start_url: "/",
    display: "standalone",
    background_color: "#100e0b",
    theme_color: "#100e0b",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
