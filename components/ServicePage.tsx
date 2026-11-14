import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { FadeIn } from "@/components/FadeIn";
import { Bar } from "@/components/Bar";
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
  const CARD = "rounded-[1.25rem] border p-5 sm:rounded-[1.75rem] sm:p-6";

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
            <ul className="mt-7 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {s.incluye.map((item, i) => (
                <li key={item.t}>
                  <FadeIn delay={(i % 3) * 0.08} className={`${CARD} h-full border-transparent bg-brand-black text-brand-cream`}>
                    <span className="font-impact text-4xl font-black not-italic leading-none text-brand-accent [font-stretch:80%] sm:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-body text-sm font-semibold normal-case tracking-normal sm:mt-4 sm:text-base">{item.t}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-brand-ink-on-black-soft">{item.d}</p>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cuándo conviene (oscura) */}
        <section className="bg-[#0d0b08] px-5 py-14 text-brand-cream sm:px-8 sm:py-28 lg:px-[6vw]">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <h2 className={H2}>Cuándo conviene</h2>
            </FadeIn>
            <ul className="mt-7 flex flex-col gap-3 sm:mt-12">
              {s.cuandoConviene.map((item, i) => (
                <li key={item}>
                  <FadeIn delay={i * 0.07} className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-brand-black px-5 py-4 font-body text-sm leading-relaxed sm:px-6 sm:py-5 sm:text-base">
                    <span className="font-mono text-xs font-bold text-brand-accent">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </FadeIn>
                </li>
              ))}
            </ul>
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
            <div className="mt-7 grid gap-3 sm:mt-12 sm:grid-cols-[1.5fr_1fr] sm:gap-4">
              <FadeIn>
                <div className={`${CARD} h-full border-brand-accent/50 bg-brand-black sm:p-8`}>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Valor</p>
                  <p className="mt-3 font-body text-lg font-semibold leading-snug sm:mt-4 sm:text-3xl">{s.valores.precio}</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className={`${CARD} h-full border-white/10 bg-brand-black sm:p-8`}>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Plazo</p>
                  <p className="mt-3 font-body text-lg font-semibold leading-snug sm:mt-4 sm:text-3xl">{s.valores.plazo}</p>
                </div>
              </FadeIn>
            </div>
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
