import type { Metadata } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import { SplashScreen } from "@/components/SplashScreen";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deployuy.com"),
  title: "Deploy · Software a medida, web y automatización en Uruguay",
  description:
    "Desarrollamos software a medida, páginas web, automatización de procesos y agentes de IA para WhatsApp e Instagram. Soluciones digitales para negocios en Uruguay.",
  alternates: { canonical: "https://deployuy.com/" },
  openGraph: {
    type: "website",
    siteName: "Deploy",
    url: "https://deployuy.com/",
    locale: "es_UY",
    title: "Deploy · Software a medida y automatización en Uruguay",
    description:
      "Software a medida, páginas web, automatización de procesos y agentes de IA para WhatsApp e Instagram.",
    images: [{ url: "/img/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deploy · Software a medida y automatización en Uruguay",
    description:
      "Software a medida, páginas web, automatización de procesos y agentes de IA para WhatsApp e Instagram.",
    images: ["/img/og-image.jpg"],
  },
  other: { "theme-color": "#050403" },
};

const SITE = "https://deployuy.com";

// Un solo grafo: el negocio y el sitio con @id, para que el schema `Service`
// de cada página apunte acá en vez de repetir los datos. Sin `priceRange`:
// Deploy cotiza por alcance y no publica rangos de precio (ver PRODUCT.md).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#sitio`,
      url: `${SITE}/`,
      name: "Deploy",
      inLanguage: "es-UY",
      publisher: { "@id": `${SITE}/#negocio` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#negocio`,
      name: "Deploy",
      url: `${SITE}/`,
      logo: `${SITE}/img/deploy-logo.png`,
      image: `${SITE}/img/og-image.jpg`,
      description:
        "Desarrollo de software a medida, páginas web, automatización de procesos y agentes de IA para WhatsApp e Instagram, para negocios en Uruguay.",
      email: "deploy.uy@gmail.com",
      telephone: "+59898648853",
      areaServed: { "@type": "Country", name: "Uruguay" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Salto",
        addressCountry: "UY",
      },
      founder: { "@type": "Person", name: "Braian", jobTitle: "Desarrollador" },
      sameAs: ["https://instagram.com/deploy.uy"],
      serviceType: [
        "Desarrollo de software a medida",
        "Diseño y desarrollo de páginas web",
        "Automatización de procesos",
        "Agentes de IA para WhatsApp e Instagram",
      ],
    },
  ],
};

// Corre antes de pintar: si el splash ya se vio en esta sesión, lo oculta por CSS.
const splashGuard = `try{if(sessionStorage.getItem("deploy-splash-visto")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-splash-visto","")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${archivo.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: splashGuard }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SplashScreen />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
