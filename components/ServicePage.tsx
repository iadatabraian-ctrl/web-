import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { FadeIn } from "@/components/FadeIn";
import { Bar } from "@/components/Bar";
import { CuandoConviene } from "@/components/servicios/CuandoConviene";
import { IncluyeSplit } from "@/components/servicios/IncluyeSplit";
import { SERVICIOS, getServicio, type ServicioSlug } from "@/lib/servicios";

const SITE = "https://deployuy.com";

const CARD_IMG = {
  software: "/img/servicios/card-software.webp",
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
    "origin-bottom-left -skew-x-[5deg] font-impact text-[2.1rem] font-black uppercase not-italic leading-[0.95] tracking-[-0.005em] [font-stretch:80%] sm:text-6xl";

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
        <section className="relative overflow-hidden bg-[#0d0b08] px-5 pb-14 pt-24 text-brand-cream sm:px-8 sm:pb-24 sm:pt-36 lg:px-[6vw]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <Bar style={{ right: "4vw", top: "-8vw", width: "13vw", height: "150vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.08)" }} i={0} />
            <Bar style={{ right: "-3vw", top: "12vw", width: "0.5vw", height: "125vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.55)" }} i={1} />
          </div>
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <nav aria-label="Ruta" className="font-body text-xs text-brand-ink-on-black-soft">
                <Link href="/" className="transition-colors hover:text-brand-cream">
                  Inicio
                </Link>
                <span className="mx-2">/</span>
                <span className="text-brand-cream/80">{s.nombre}</span>
              </nav>
              <h1 className="mt-6 origin-bottom-left -skew-x-[5deg] text-balance font-impact text-[2.4rem] font-black uppercase not-italic leading-[0.95] tracking-[-0.005em] [font-stretch:80%] sm:text-6xl lg:text-[4.4rem]">
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
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-brand-black lg:max-w-none">
              <Image
                src={CARD_IMG[s.visual]}
                alt={`Ilustración de ${s.nombre.toLowerCase()}`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Qué incluye (pantalla partida con scroll) */}
        <IncluyeSplit items={s.incluye} />

        {/* Cuándo conviene (oscura) */}
        <section className="bg-[#0d0b08] px-5 py-14 text-brand-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <h2 className={H2}>Cuándo conviene</h2>
            </FadeIn>
            <div className="mt-8 sm:mt-14">
              <CuandoConviene items={s.cuandoConviene} />
            </div>
          </div>
        </section>

        {/* Cómo se trabaja (clara) */}
        <section className="bg-brand-cream px-5 py-14 text-brand-ink-on-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={H2}>Cómo se trabaja</h2>
            </FadeIn>
            <ol className="relative mt-10 grid gap-8 sm:mt-16 lg:grid-cols-4 lg:gap-6">
              <span aria-hidden="true" className="absolute bottom-2 left-[0.62rem] top-2 w-px bg-brand-ink-on-cream/25 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[0.62rem] lg:h-px lg:w-auto" />
              {s.proceso.map((p, i) => (
                <li key={p.t} className="relative pl-10 lg:pl-0 lg:pt-10">
                  <span aria-hidden="true" className="absolute left-0 top-1.5 h-[1.3rem] w-[1.3rem] rounded-full bg-brand-accent ring-4 ring-brand-cream lg:top-0" />
                  <FadeIn delay={i * 0.1}>
                    <span className="font-mono text-xs font-bold text-brand-accent">0{i + 1}</span>
                    <h3 className="mt-1 font-impact text-2xl font-extrabold uppercase not-italic leading-none [font-stretch:80%] sm:text-3xl">{p.t}</h3>
                    <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-brand-ink-on-cream-soft">{p.d}</p>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Valores y plazos (oscura) */}
        <section className="bg-[#0d0b08] px-5 py-14 text-brand-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={H2}>Valores y plazos</h2>
            </FadeIn>
            <FadeIn className="mt-8 sm:mt-14">
              <div className="grid gap-10 border-y border-white/15 py-8 sm:py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                <div>
                  <div className="flex items-end justify-between gap-4 sm:gap-8">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Desde</p>
                      <p className="mt-2 origin-bottom-left -skew-x-[5deg] font-impact text-[2.4rem] font-black uppercase not-italic leading-none text-brand-accent [font-stretch:80%] sm:text-6xl lg:text-[4.2rem]">{s.valores.desde}</p>
                    </div>
                    {s.valores.hasta && (
                      <div className="text-right">
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Hasta</p>
                        <p className="mt-2 origin-bottom-right -skew-x-[5deg] font-impact text-[2.4rem] font-black uppercase not-italic leading-none [font-stretch:80%] sm:text-6xl lg:text-[4.2rem]">{s.valores.hasta}</p>
                      </div>
                    )}
                  </div>
                  <div aria-hidden="true" className="relative mt-5 h-[3px] bg-white/15 sm:mt-6">
                    <span className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-brand-accent to-brand-accent/10" />
                    <span className="absolute -top-1.5 left-0 h-3 w-3 rounded-full bg-brand-accent" />
                    {s.valores.hasta ? <span className="absolute -top-1.5 right-0 h-3 w-3 rounded-full bg-white" /> : <span className="absolute -top-2 right-0 font-mono text-xs text-brand-ink-on-black-soft">→</span>}
                  </div>
                  <p className="mt-3 font-body text-sm text-brand-ink-on-black-soft sm:text-base">{s.valores.detalle}</p>
                  <p className="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Qué hace subir el valor</p>
                  <ul className="mt-3 flex flex-col gap-2 font-body text-sm sm:text-base">
                    {s.valores.factores.map((f) => (
                      <li key={f} className="flex gap-3"><span className="text-brand-accent">+</span>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="lg:border-l lg:border-white/15 lg:pl-16">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Plazo</p>
                  <p className="mt-2 font-impact text-4xl font-black uppercase not-italic leading-none [font-stretch:80%] sm:text-6xl">{s.valores.plazo}</p>
                  {(() => {
                    const m = s.valores.plazo.match(/(\d+)\s*a\s*(\d+)/);
                    if (!m) return null;
                    const [lo, hi] = [Number(m[1]), Number(m[2])];
                    const max = 30;
                    return (
                      <div className="mt-6 sm:mt-8" aria-hidden="true">
                        <div className="relative h-3 rounded-full bg-white/10">
                          <span className="absolute inset-y-0 rounded-full bg-brand-accent" style={{ left: `${(lo / max) * 100}%`, width: `${((hi - lo) / max) * 100}%` }} />
                        </div>
                        <div className="mt-2 flex justify-between font-mono text-[10px] text-brand-ink-on-black-soft">
                          <span>0</span><span>10</span><span>20</span><span>30 días</span>
                        </div>
                      </div>
                    );
                  })()}
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-brand-black transition-[transform,background-color] duration-200 hover:bg-white/85 active:scale-[0.97] sm:mt-10 sm:text-sm"
                  >
                    Cotizar mi proyecto
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </FadeIn>
            <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft">{s.valores.nota}</p>
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

        {/* Otros servicios (oscura) */}
        <section className="bg-[#0d0b08] px-5 py-12 text-brand-cream sm:px-8 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-impact text-2xl font-black uppercase not-italic [font-stretch:80%] sm:text-3xl">Otros servicios</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {otros.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${o.slug}`}
                    className="inline-flex rounded-full border border-white/20 px-5 py-2.5 font-body text-sm text-brand-cream transition-colors hover:border-brand-accent hover:text-brand-accent"
                  >
                    {o.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <CtaFooter />
    </>
  );
}
