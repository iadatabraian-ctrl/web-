import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { FadeIn } from "@/components/FadeIn";
import { Bar } from "@/components/Bar";
import { CuandoConviene } from "@/components/servicios/CuandoConviene";
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
  const CARD = "rounded-[1.25rem] border p-3.5 sm:rounded-[1.75rem] sm:p-6";

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

        {/* Qué incluye (clara) */}
        <section className="bg-brand-cream px-5 py-14 text-brand-ink-on-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className={H2}>Qué incluye</h2>
            </FadeIn>
            <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-4 lg:grid-cols-4">
              {s.incluye.map((item, i) => {
                const extras = Math.max(s.incluye.length - 5, 0);
                const isExtra = i >= 5;
                const lastOdd = i === s.incluye.length - 1 && i % 2 === 1;
                const span = `${lastOdd ? "max-sm:col-span-2" : ""} ${isExtra ? (extras === 1 ? "lg:col-span-4" : extras === 2 ? "lg:col-span-2" : "") : ""}`;
                if (i === 0) {
                  return (
                    <li key={item.t} className="col-span-2 lg:row-span-2">
                      <FadeIn className="relative h-full min-h-[17rem] overflow-hidden sm:min-h-[22rem] rounded-[1.25rem] bg-brand-black text-brand-cream sm:rounded-[1.75rem]">
                        <Image src={CARD_IMG[s.visual]} alt="" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover opacity-60" />
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-[#0d0b08]/50 to-transparent" />
                        <div className="relative flex h-full flex-col justify-end p-5 sm:p-8">
                          <span className="font-impact text-6xl font-black not-italic leading-none text-brand-accent [font-stretch:80%] sm:text-7xl">01</span>
                          <h3 className="mt-3 font-body text-lg font-semibold normal-case tracking-normal sm:text-2xl">{item.t}</h3>
                          <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-brand-cream/80 sm:text-base">{item.d}</p>
                        </div>
                      </FadeIn>
                    </li>
                  );
                }
                return (
                  <li key={item.t} className={span}>
                    <FadeIn delay={(i % 4) * 0.08} className={`${CARD} h-full border-transparent bg-brand-black text-brand-cream`}>
                      <span className="font-impact text-3xl font-black not-italic leading-none text-brand-accent [font-stretch:80%] sm:text-4xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 font-body text-[13px] font-semibold normal-case leading-tight tracking-normal sm:mt-4 sm:text-base">{item.t}</h3>
                      <p className="mt-1.5 font-body text-[11.5px] leading-snug text-brand-ink-on-black-soft sm:mt-2 sm:text-sm sm:leading-relaxed">{item.d}</p>
                    </FadeIn>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

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
            <ol className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-4 lg:grid-cols-4">
              {s.proceso.map((p, i) => (
                <li key={p.t}>
                  <FadeIn delay={i * 0.1} className="h-full rounded-[1.25rem] border-transparent bg-brand-black p-3.5 text-brand-cream sm:rounded-[1.75rem] sm:p-6">
                    <span className="font-impact text-4xl font-black not-italic leading-none text-brand-accent [font-stretch:80%] sm:text-5xl">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-body text-[13px] font-semibold normal-case leading-tight tracking-normal sm:mt-5 sm:text-base">{p.t}</h3>
                    <p className="mt-1.5 font-body text-[11.5px] leading-snug text-brand-ink-on-black-soft sm:mt-2 sm:text-sm">{p.d}</p>
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
            <FadeIn className="mt-7 overflow-hidden rounded-[1.25rem] border border-white/10 bg-brand-black sm:mt-12 sm:rounded-[1.75rem]">
              <div className="grid lg:grid-cols-[1.2fr_1fr]">
                <div className="p-6 sm:p-10">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">{s.valores.prefijo}</p>
                  <p className="mt-2 origin-bottom-left -skew-x-[5deg] font-impact text-[2.6rem] font-black uppercase not-italic leading-none text-brand-accent [font-stretch:80%] sm:text-7xl lg:text-[5.2rem]">
                    {s.valores.cifra}
                  </p>
                  <p className="mt-3 font-body text-sm text-brand-ink-on-black-soft sm:text-lg">{s.valores.detalle}</p>
                </div>
                <div className="border-t border-white/10 p-6 sm:p-10 lg:border-l lg:border-t-0">
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
                          <span
                            className="absolute inset-y-0 rounded-full bg-brand-accent"
                            style={{ left: `${(lo / max) * 100}%`, width: `${((hi - lo) / max) * 100}%` }}
                          />
                        </div>
                        <div className="mt-2 flex justify-between font-mono text-[10px] text-brand-ink-on-black-soft">
                          <span>0</span><span>10</span><span>20</span><span>30 días</span>
                        </div>
                      </div>
                    );
                  })()}
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
            <div className="mt-7 flex flex-col gap-2 sm:mt-12 sm:gap-3">
              {s.faq.map((f) => (
                <details key={f.q} className="group rounded-[1.1rem] bg-brand-black px-4 py-3.5 text-brand-cream open:border-brand-accent sm:rounded-[1.25rem] sm:px-6 sm:py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-[13px] font-semibold sm:text-base">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-brand-accent transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft">{f.a}</p>
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
