import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { FadeIn } from "@/components/FadeIn";
import { TelefonosEmy } from "@/components/casos/TelefonosEmy";

const SITE = "https://deployuy.com";
const url = `${SITE}/casos/emy`;
const TIENDA = "https://emy.deployuy.com";
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
  { t: "Catálogo con variantes", d: "Cada producto tiene sus colores, fotos y stock por color, con filtros y búsqueda." },
  { t: "Carrito y pedido", d: "El cliente arma el carrito y hace el pedido en pocos pasos, desde el celular." },
  { t: "Panel de administración", d: "La dueña carga productos, fotos y stock, y ve los pedidos. El acceso está protegido." },
  { t: "Envíos y avisos", d: "El pedido calcula el envío por departamento y avisa por correo." },
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
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-[#0a0a0a] px-5 pb-12 pt-28 text-brand-cream sm:px-8 sm:pb-24 sm:pt-36 lg:px-[6vw]">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <nav aria-label="Ruta" className="font-body text-xs text-brand-ink-on-black-soft">
                <Link href="/" className="transition-colors hover:text-brand-cream">Inicio</Link>
                <span className="mx-2">/</span>
                <Link href="/paginas-web" className="transition-colors hover:text-brand-cream">Páginas web</Link>
                <span className="mx-2">/</span>
                <span className="text-brand-cream/80">EMY</span>
              </nav>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-brand-ink-on-black-soft">Caso real</p>
              <h1 className="mt-3 text-balance font-body text-[7.4vw] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] sm:text-[4.2vw] lg:text-[3.4rem]">
                Una tienda online, <span className="text-brand-accent">hecha de punta a punta.</span>
              </h1>
              <p className="mt-5 max-w-md font-body text-[15px] leading-relaxed text-brand-ink-on-black-soft sm:text-base">
                EMY Indumentaria, de Salto: catálogo con variantes por color, carrito, pedidos y un panel para que la dueña cargue stock y fotos.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={TIENDA} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-black transition-[transform,background-color,color] duration-200 hover:bg-brand-accent hover:text-white active:scale-[0.97] sm:text-sm">
                  Ver la tienda
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
                <a href={wa} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-body text-xs font-bold uppercase tracking-wide transition-colors duration-200 hover:border-white sm:text-sm">
                  Quiero una así
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </div>
            </div>
            <TelefonosEmy />
          </div>
        </section>

        <section className="bg-brand-cream px-5 py-14 text-brand-ink-on-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 className="font-body text-[1.65rem] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">Qué incluye</h2>
            </FadeIn>
            <FadeIn className="mt-8 sm:mt-14">
              <ul className="grid gap-x-12 border-t border-brand-ink-on-cream/15 sm:grid-cols-2">
                {INCLUYE.map((x) => (
                  <li key={x.t} className="flex gap-4 border-b border-brand-ink-on-cream/15 py-5">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-accent" strokeWidth={3} />
                    <div>
                      <h3 className="font-body text-lg font-extrabold">{x.t}</h3>
                      <p className="mt-1 font-body text-sm leading-snug text-brand-ink-on-cream-soft sm:text-base">{x.d}</p>
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
