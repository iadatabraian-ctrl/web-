import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { FadeIn } from "@/components/FadeIn";
import { PantallasRiofit } from "@/components/casos/PantallasRiofit";

const SITE = "https://deployuy.com";
const url = `${SITE}/casos/riofit`;
const titulo = "Fitness app: sistema de gestión para gimnasios | Deploy";
const descripcion = "Río Fit: sistema de gestión para gimnasios con panel de administrador y panel de socio. Socios, cuotas, rutinas por socio y constancia. Desarrollo propio de Deploy.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: url },
  openGraph: { type: "website", siteName: "Deploy", url, locale: "es_UY", title: titulo, description: descripcion, images: [{ url: "/img/og-hero.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: titulo, description: descripcion, images: ["/img/og-hero.jpg"] },
};

const INCLUYE = [
  { t: "Socios y cuotas", d: "Estado al día, próximo o vencido, con fecha de vencimiento y aviso a quien asiste sin cuota." },
  { t: "Rutinas por socio", d: "Catálogo por género y nivel. Se asigna con el día y se ajusta solo para ese socio." },
  { t: "Panel del socio", d: "Desde el celular ve la rutina de hoy, las clases, sus logros y la comunidad." },
  { t: "Constancia y retención", d: "Detecta a los socios al día que dejaron de venir, para contactarlos a tiempo." },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Software a medida", item: `${SITE}/software-a-medida` },
      { "@type": "ListItem", position: 3, name: "Río Fit", item: url },
    ],
  };
  const wa = `https://wa.me/59898648853?text=${encodeURIComponent("Hola, vi la demostración de Río Fit y quiero un sistema para mi negocio.")}`;
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
                <Link href="/software-a-medida" className="transition-colors hover:text-brand-ink-on-cream">Software a medida</Link>
                <span className="mx-2">/</span>
                <span className="text-brand-ink-on-cream/80">Río Fit</span>
              </nav>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-ink-on-cream-soft">Fitness app</p>
              <h1 className="mt-2 text-balance font-body text-[7vw] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] sm:text-[4.2vw] lg:text-[3.4rem]">
                Un sistema para gimnasios, de punta a punta.
              </h1>
              <p className="mt-3 max-w-md font-body text-sm leading-snug text-brand-ink-on-cream-soft sm:mt-5 sm:text-base">
                Río Fit: panel de administrador para gestionar socios, cuotas y rutinas, y un panel para cada socio en el celular.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-8">
                <a href={wa} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-brand-ink-on-cream/30 px-5 py-2.5 sm:px-6 sm:py-3 font-body text-xs font-bold uppercase tracking-wide transition-colors duration-200 hover:border-brand-ink-on-cream sm:text-sm">
                  Quiero algo así
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </div>
            </div>
            <PantallasRiofit />
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
