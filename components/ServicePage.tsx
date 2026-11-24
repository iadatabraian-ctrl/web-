import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { FadeIn } from "@/components/FadeIn";
import { Bar } from "@/components/Bar";
import { CuandoConviene } from "@/components/servicios/CuandoConviene";
import { IncluyeSplit } from "@/components/servicios/IncluyeSplit";
import { OtrosServicios } from "@/components/servicios/OtrosServicios";
import { NotasPaso } from "@/components/NotasPaso";
import { CasoCard } from "@/components/casos/CasoCard";
import { Niveles } from "@/components/servicios/Niveles";
import { SERVICIOS, getServicio, type ServicioSlug } from "@/lib/servicios";

const SITE = "https://deployuy.com";

const CARD_IMG = {
  software: "/img/servicios/card-software-2.webp",
  web: "/img/servicios/card-web.webp",
  automatizacion: "/img/servicios/card-automatizacion.webp",
  agentes: "/img/servicios/card-agentes.webp",
} as const;

export function ServicePage({ slug }: { slug: ServicioSlug }) {
  const s = getServicio(slug);
  const url = `${SITE}/${s.slug}`;
  const otros = SERVICIOS.filter((o) => o.slug !== s.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.nombre,
        description: s.metaDescription,
        url,
        serviceType: s.nombre,
        areaServed: { "@type": "Country", name: "Uruguay" },
        provider: {
          "@type": "ProfessionalService",
          name: "Deploy",
          url: `${SITE}/`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Salto",
            addressCountry: "UY",
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: s.nombre, item: url },
        ],
      },
    ],
  };

  const wa = `https://wa.me/59898648853?text=${encodeURIComponent(s.whatsappTexto)}`;

  const H2 =
    "font-body text-[1.65rem] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main>
        {/* Cabecera (oscura) */}
        <section className="relative overflow-hidden bg-[#0a0a0a] px-5 pb-12 pt-0 text-brand-cream sm:px-8 sm:pb-24 sm:pt-36 lg:px-[6vw]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <Bar gray style={{ right: "4vw", top: "-8vw", width: "13vw", height: "150vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.08)" }} i={0} />
            <Bar gray className="max-sm:hidden" style={{ right: "-3vw", top: "12vw", width: "0.5vw", height: "125vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.55)" }} i={1} />
          </div>
          <div className="relative mx-auto grid max-w-6xl items-center gap-0 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="max-sm:relative max-sm:z-10 max-sm:-mt-36">
              <nav aria-label="Ruta" className="max-sm:hidden font-body text-xs text-brand-ink-on-black-soft">
                <Link href="/" className="transition-colors hover:text-brand-cream">
                  Inicio
                </Link>
                <span className="mx-2">/</span>
                <span className="text-brand-cream/80">{s.nombre}</span>
              </nav>
              <h1 className="mt-0 sm:mt-6 origin-bottom-left -skew-x-[5deg] text-balance font-impact text-[2.6rem] font-black uppercase not-italic leading-[0.95] tracking-[-0.005em] [font-stretch:80%] sm:text-6xl lg:text-[4.4rem]">
                {s.h1}
              </h1>
              <div className="mt-5 flex max-w-xl flex-col gap-3 sm:mt-8 sm:gap-4">
                {s.intro.map((p) => (
                  <p key={p} className="font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>
              <a
                href={wa}
                target="_blank"
                rel="noopener"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-brand-black transition-[transform,background-color] duration-200 hover:bg-white/85 active:scale-[0.97] sm:mt-10 sm:px-8 sm:py-4 sm:text-sm"
              >
                Solicitar una cotización
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-brand-black max-sm:order-first max-sm:-mx-5 max-sm:aspect-[4/5.4] max-sm:w-[calc(100%+2.5rem)] max-sm:max-w-none max-sm:rounded-none max-sm:[mask-image:linear-gradient(to_bottom,#000_50%,transparent_96%)] lg:max-w-none">
              <Image
                src={CARD_IMG[s.visual]}
                alt={`Ilustración de ${s.nombre.toLowerCase()}`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent sm:hidden" />
            </div>
          </div>
        </section>

        {/* Qué incluye (pantalla partida con scroll) */}
        <IncluyeSplit items={s.incluye} />

        {/* Cuándo conviene (oscura) */}
        <section className="bg-[#0a0a0a] px-5 py-14 text-brand-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <h2 className={H2}>Cuándo conviene</h2>
            </FadeIn>
            <div className="mt-8 sm:mt-14">
              <CuandoConviene items={s.cuandoConviene} />
            </div>
          </div>
        </section>

        {/* Cómo se trabaja (oscura) */}
        <section className="bg-[#0a0a0a] px-5 py-14 text-brand-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={H2}>Cómo se trabaja</h2>
            </FadeIn>
            <NotasPaso pasos={s.proceso} />
          </div>
        </section>

        {/* Valores y plazos (clara, tres alcances) */}
        <section className="bg-brand-cream px-5 py-14 text-brand-ink-on-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={H2}>Valores y plazos</h2>
              <p className="mt-4 max-w-2xl font-body text-sm text-brand-ink-on-cream-soft sm:text-base">Tres alcances de referencia. {s.valores.nota}</p>
            </FadeIn>
            <FadeIn className="mt-10 sm:mt-16">
              <Niveles niveles={s.niveles} servicio={s.nombre.toLowerCase()} />
            </FadeIn>
            <FadeIn className="mt-12 sm:mt-20">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-cream-soft">Qué influye en el valor</p>
              <ul className="mt-4 grid gap-x-10 border-y border-brand-ink-on-cream/15 font-body text-[15px] font-semibold sm:text-base lg:grid-cols-3">
                {s.valores.factores.map((f, i) => (
                  <li key={f} className="flex items-baseline gap-3 border-brand-ink-on-cream/15 py-3.5 max-lg:border-b max-lg:last:border-b-0 sm:py-4">
                    <span className="font-mono text-xs font-normal text-brand-accent">0{i + 1}</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-body text-sm text-brand-ink-on-cream-soft">{s.valores.detalle}</p>
            </FadeIn>
          </div>
        </section>

        {/* Preguntas frecuentes (clara) */}
        <section className="bg-brand-cream px-5 py-14 text-brand-ink-on-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <h2 className={H2}>Preguntas frecuentes</h2>
            </FadeIn>
            <div className="mt-8 border-b border-brand-ink-on-cream/20 sm:mt-14">
              {s.faq.map((f) => (
                <details key={f.q} className="group border-t border-brand-ink-on-cream/20 py-4 sm:py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-impact text-lg font-extrabold uppercase not-italic leading-tight [font-stretch:80%] sm:text-2xl">
                    {f.q}
                    <span aria-hidden="true" className="relative h-5 w-5 shrink-0 before:absolute before:left-0 before:right-0 before:top-1/2 before:h-[2px] before:-translate-y-1/2 before:bg-brand-accent after:absolute after:bottom-0 after:left-1/2 after:top-0 after:w-[2px] after:-translate-x-1/2 after:bg-brand-accent after:transition-transform group-open:after:scale-y-0" />
                  </summary>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-brand-ink-on-cream-soft sm:text-base">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {s.slug === "paginas-web" && (
          <CasoCard
            href="/casos/emy"
            etiqueta="Caso real"
            titulo="EMY Indumentaria,"
            destacado="tienda online."
            texto="Catálogo, carrito, pedidos y panel para cargar stock y fotos."
            imagen="/img/emy-movil-home.webp"
            alt="Tienda online de EMY Indumentaria en celular"
          />
        )}
        {s.slug === "software-a-medida" && (
          <CasoCard
            href="/casos/riofit"
            etiqueta="Demostración"
            titulo="Río Fit,"
            destacado="sistema para gimnasios."
            texto="Panel de administrador y panel de socio, de punta a punta."
            imagen="/img/riofit-socio-2.webp"
            alt="Panel del socio de Río Fit en celular"
          />
        )}

        {/* Otros servicios (oscura) */}
        <section className="bg-[#0a0a0a] px-5 pb-16 pt-6 text-brand-cream sm:px-8 sm:pb-24 sm:pt-10 lg:px-[6vw]">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-body text-xl font-extrabold uppercase tracking-[-0.02em] sm:text-3xl">Otros servicios</h2>
            <OtrosServicios items={otros.map((o) => ({ slug: o.slug, nombre: o.nombre, img: CARD_IMG[o.visual] }))} />
          </div>
        </section>
      </main>
      <CtaFooter />
    </>
  );
}

