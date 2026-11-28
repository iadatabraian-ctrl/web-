import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { FadeIn } from "@/components/FadeIn";
import { TelefonosEmy } from "@/components/casos/TelefonosEmy";

const SITE = "https://deployuy.com";
const url = `${SITE}/casos/emy`;
const TIENDA = "https://emyindumentaria.com";
const titulo = "Caso real: tienda online de EMY Indumentaria | Deploy";
const descripcion = "Tienda online de EMY Indumentaria, de Salto: catálogo con variantes por color, carrito, pedidos y panel para cargar stock y fotos. Desarrollada por Deploy.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: url },
  openGraph: { type: "website", siteName: "Deploy", url, locale: "es_UY", title: titulo, description: descripcion, images: [{ url: "/img/og-hero.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: titulo, description: descripcion, images: ["/img/og-hero.jpg"] },
};

const INCLUYE = [
  { t: "Catálogo con variantes", d: "Colores, fotos y stock por color, con filtros y búsqueda." },
  { t: "Carrito y pedido", d: "Se arma el carrito y se hace el pedido en pocos pasos." },
  { t: "Panel de administración", d: "La dueña carga productos, fotos y stock, y ve los pedidos." },
  { t: "Pago, envíos y avisos", d: "Cobro con Mercado Pago, envío por DAC a domicilio, envío en Salto a coordinar por Instagram y correos de aviso con el diseño de la marca." },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Páginas web", item: `${SITE}/paginas-web` },
      { "@type": "ListItem", position: 3, name: "EMY Indumentaria", item: url },
    ],
  };
  const wa = `https://wa.me/59898648853?text=${encodeURIComponent("Hola, vi el caso de EMY y quiero una tienda online para mi negocio.")}`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav claro />
      <main>
        <section className="relative overflow-hidden bg-brand-cream px-5 pb-8 pt-20 text-brand-ink-on-cream sm:px-8 sm:pb-20 sm:pt-32 lg:px-[6vw]">
          <div className="mx-auto grid max-w-6xl items-center gap-5 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <nav aria-label="Ruta" className="font-body text-xs text-brand-ink-on-cream-soft">
                <Link href="/" className="transition-colors hover:text-brand-ink-on-cream">Inicio</Link>
                <span className="mx-2">/</span>
                <Link href="/paginas-web" className="transition-colors hover:text-brand-ink-on-cream">Páginas web</Link>
                <span className="mx-2">/</span>
                <span className="text-brand-ink-on-cream/80">EMY</span>
              </nav>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-ink-on-cream-soft">Caso real</p>
              <h1 className="mt-2 text-balance font-body text-[7vw] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] sm:text-[4.2vw] lg:text-[3.4rem]">
                Una tienda online, hecha de punta a punta.
              </h1>
              <p className="mt-3 max-w-md font-body text-sm leading-snug text-brand-ink-on-cream-soft sm:mt-5 sm:text-base">
                EMY Indumentaria, de Salto: catálogo con variantes por color, carrito, pago con Mercado Pago y un panel para que la dueña cargue stock, fotos y pedidos.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-8">
                <a href={TIENDA} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-brand-black px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-brand-cream sm:px-6 sm:py-3 transition-[transform,background-color,color] duration-200 hover:bg-brand-accent hover:text-white active:scale-[0.97] sm:text-sm">
                  Ver la tienda
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
                <a href={wa} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-brand-ink-on-cream/30 px-5 py-2.5 sm:px-6 sm:py-3 font-body text-xs font-bold uppercase tracking-wide transition-colors duration-200 hover:border-brand-ink-on-cream sm:text-sm">
                  Quiero una así
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </div>
            </div>
            <TelefonosEmy />
          </div>
        </section>

        <section className="bg-white px-5 py-9 text-brand-ink-on-cream sm:px-8 sm:py-24 lg:px-[6vw]">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-body text-[1.4rem] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">Qué incluye</h2>
            </FadeIn>
            <FadeIn className="mt-4 sm:mt-14">
              <ul className="grid gap-x-12 border-t border-brand-ink-on-cream/15 sm:grid-cols-2">
                {INCLUYE.map((x) => (
                  <li key={x.t} className="flex gap-3 border-b border-brand-ink-on-cream/15 py-3 sm:gap-4 sm:py-5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent sm:mt-1 sm:h-5 sm:w-5" strokeWidth={3} />
                    <div>
                      <h3 className="font-body text-base font-extrabold sm:text-lg">{x.t}</h3>
                      <p className="mt-0.5 font-body text-[13px] leading-snug text-brand-ink-on-cream-soft sm:mt-1 sm:text-base">{x.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>
      </main>
      <CtaFooter />
    </>
  );
}
