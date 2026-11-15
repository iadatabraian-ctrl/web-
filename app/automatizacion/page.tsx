import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";
import { getServicio } from "@/lib/servicios";

const s = getServicio("automatizacion");
const url = "https://deployuy.com/automatizacion";

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    siteName: "Deploy",
    url,
    locale: "es_UY",
    title: s.metaTitle,
    description: s.metaDescription,
    images: [{ url: "/img/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: s.metaTitle,
    description: s.metaDescription,
    images: ["/img/og-image.jpg"],
  },
};

export default function Page() {
  return <ServicePage slug="automatizacion" />;
}
