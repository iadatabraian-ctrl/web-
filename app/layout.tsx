import type { Metadata } from "next";
import { Anton, Bodoni_Moda, JetBrains_Mono, Montserrat, Saira } from "next/font/google";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

// Texto de todo el sitio (descripciones, bajadas, preguntas, botones).
const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
});

// Titulares de impacto (hero): condensada, cuadrada e inclinada. Variable con eje de ancho.
const saira = Saira({
  variable: "--font-saira",
  style: ["normal", "italic"],
  axes: ["wdth"],
  subsets: ["latin"],
});

// "tu sistema." del hero: Bodoni itálica, solo en el estilo itálico para no cargar de más.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  style: ["italic"],
  axes: ["opsz"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  preload: false, // solo se usa en etiquetas debajo del primer pantallazo
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deployuy.com"),
  title: "Deploy · Software a medida, web y automatización",
  description:
    "Desarrollamos software a medida, páginas web, automatización de procesos y agentes de IA para WhatsApp e Instagram. Soluciones digitales para negocios en Uruguay.",
  alternates: { canonical: "https://deployuy.com/" },
  openGraph: {
    type: "website",
    siteName: "Deploy",
    url: "https://deployuy.com/",
    locale: "es_UY",
    title: "Deploy · Software a medida y automatización",
    description:
      "Software a medida, páginas web, automatización de procesos y agentes de IA para WhatsApp e Instagram.",
    images: [{ url: "/img/og-hero.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deploy · Software a medida y automatización",
    description:
      "Software a medida, páginas web, automatización de procesos y agentes de IA para WhatsApp e Instagram.",
    images: ["/img/og-hero.jpg"],
  },
  other: { "theme-color": "#050403" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Deploy",
  url: "https://deployuy.com/",
  logo: "https://deployuy.com/img/deploy-logo.png",
  image: "https://deployuy.com/img/og-hero.jpg",
  description:
    "Desarrollo de software a medida, páginas web, automatización de procesos y agentes de IA para WhatsApp e Instagram, para negocios en Uruguay.",
  email: "deploy.uy@gmail.com",
  telephone: "+59898648853",
  areaServed: "UY",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Salto",
    addressCountry: "UY",
  },
  sameAs: ["https://instagram.com/deploy.uy"],
  serviceType: [
    "Desarrollo de software a medida",
    "Diseño y desarrollo de páginas web",
    "Automatización de procesos",
    "Agentes de IA para WhatsApp e Instagram",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${montserrat.variable} ${jetbrainsMono.variable} ${saira.variable} ${bodoni.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
