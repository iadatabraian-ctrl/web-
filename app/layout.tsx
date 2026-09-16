import type { Metadata } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import { SplashScreen } from "@/components/SplashScreen";
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
  metadataBase: new URL("https://elnucleodigital.com"),
  title: "El Núcleo Digital · Software a medida y páginas web",
  description:
    "Diseñamos y desarrollamos software a medida y páginas web para tu negocio. También automatización de procesos y agentes de WhatsApp e Instagram cuando los necesitás.",
  alternates: { canonical: "https://elnucleodigital.com/" },
  openGraph: {
    type: "website",
    siteName: "El Núcleo Digital",
    url: "https://elnucleodigital.com/",
    locale: "es_UY",
    title: "El Núcleo Digital",
    description: "Software a medida y páginas web hechos para tu negocio.",
    images: [{ url: "/img/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Núcleo Digital",
    description: "Software a medida y páginas web hechos para tu negocio.",
    images: ["/img/og-image.jpg"],
  },
  other: { "theme-color": "#14161b" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "El Núcleo Digital",
  url: "https://elnucleodigital.com/",
  logo: "https://elnucleodigital.com/img/logo.webp",
  image: "https://elnucleodigital.com/img/og-image.jpg",
  description:
    "Software a medida y páginas web para tu negocio. Automatización de procesos y agentes de WhatsApp e Instagram como complemento.",
  email: "elnucleodigital1@gmail.com",
  telephone: "+59898648853",
  areaServed: "UY",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Salto",
    addressCountry: "UY",
  },
  sameAs: ["https://instagram.com/elnucleodigital_"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${archivo.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
