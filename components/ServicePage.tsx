import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { FadeIn } from "@/components/FadeIn";
import { ShowcaseSoftware } from "@/components/servicios/ShowcaseSoftware";
import { ShowcaseWeb } from "@/components/servicios/ShowcaseWeb";
import { ShowcaseAutomation } from "@/components/servicios/ShowcaseAutomation";
import { ShowcaseAgents } from "@/components/servicios/ShowcaseAgents";
import { SERVICIOS, getServicio, type ServicioSlug } from "@/lib/servicios";

const SITE = "https://deployuy.com";

const SHOWCASE = {
  software: ShowcaseSoftware,
  web: ShowcaseWeb,
  automatizacion: ShowcaseAutomation,
  agentes: ShowcaseAgents,
} as const;

export function ServicePage({ slug }: { slug: ServicioSlug }) {
  const s = getServicio(slug);
  const url = `${SITE}/${s.slug}`;
  const otros = SERVICIOS.filter((o) => o.slug !== s.slug);
  const Showcase = SHOWCASE[s.visual];

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
        {/* Cabecera con fotograma del lanzamiento */}
        <section className="relative isolate overflow-hidden px-5 pb-12 pt-24 sm:px-8 sm:pb-28 sm:pt-44">
          <Image
            src={`/img/servicios/header-${s.slug}.jpg`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-[48%_42%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(5,4,3,.94), rgba(5,4,3,.72) 45%, rgba(5,4,3,.25) 80%), linear-gradient(to bottom, transparent 70%, #050403)",
            }}
          />
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Ruta" className="font-body text-xs text-brand-ink-on-black-soft">
              <Link href="/" className="transition-colors hover:text-brand-cream">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span className="text-brand-cream/80">{s.nombre}</span>
            </nav>
            <span className="mt-8 block font-mono text-xs tracking-[0.15em] text-brand-accent">{s.eyebrow}</span>
            <h1 className="mt-3 max-w-3xl text-[1.7rem] leading-[1.1] text-brand-cream sm:text-6xl">{s.h1}</h1>
            <div className="mt-5 flex max-w-xl flex-col gap-3 sm:mt-8 sm:gap-4">
              {s.intro.map((p) => (
                <p key={p} className="font-body text-sm leading-relaxed text-brand-cream/80 sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3 font-body text-xs sm:mt-10 sm:px-8 sm:py-4 sm:text-sm font-bold uppercase tracking-wide text-brand-black transition hover:scale-105 hover:opacity-90"
            >
              Solicitar una cotización
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </section>

        <Showcase />

        {/* Qué incluye */}
        <section className="px-5 py-12 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="font-mono text-xs tracking-[0.15em] text-brand-accent">ALCANCE</p>
              <h2 className="mt-3 text-2xl text-brand-cream sm:text-5xl">Qué incluye</h2>
            </FadeIn>
            <ul className="mt-7 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {s.incluye.map((item, i) => (
                <li key={item.t}>
                  <FadeIn delay={(i % 3) * 0.08} className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-brand-black-soft p-4 transition-colors sm:p-6 hover:border-brand-accent/40">
                    <span className="font-display text-4xl leading-none text-white/[0.07] sm:text-6xl transition-colors group-hover:text-brand-accent/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-body text-sm font-semibold normal-case tracking-normal text-brand-cream sm:mt-4 sm:text-base">
                      {item.t}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-brand-ink-on-black-soft">{item.d}</p>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cuándo conviene, sobre la imagen del escritorio */}
        <section className="relative isolate overflow-hidden px-5 py-12 sm:px-8 sm:py-28">
          <Image
            src="/img/diagnostico/desk-caos.png"
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover object-right"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(5,4,3,.96), rgba(5,4,3,.82) 55%, rgba(5,4,3,.5)), linear-gradient(to bottom, #050403, transparent 18%, transparent 82%, #050403)",
            }}
          />
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="font-mono text-xs tracking-[0.15em] text-brand-accent">SEÑALES</p>
              <h2 className="mt-3 text-2xl text-brand-cream sm:text-5xl">Cuándo conviene</h2>
            </FadeIn>
            <ul className="mt-6 flex max-w-xl flex-col gap-3 sm:mt-10 sm:gap-4">
              {s.cuandoConviene.map((item, i) => (
                <li key={item}>
                  <FadeIn delay={i * 0.07} className="flex gap-4 border-b border-white/10 pb-4 font-body text-sm leading-relaxed text-brand-cream/85 sm:text-base">
                    <span className="font-mono text-xs text-brand-accent">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cómo se trabaja */}
        <section className="bg-brand-black-soft px-5 py-12 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="font-mono text-xs tracking-[0.15em] text-brand-accent">PROCESO</p>
              <h2 className="mt-3 text-2xl text-brand-cream sm:text-5xl">Cómo se trabaja</h2>
            </FadeIn>
            <ol className="relative mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:mt-14 lg:grid-cols-4 lg:gap-6">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 top-[1.6rem] hidden h-px bg-gradient-to-r from-brand-accent via-white/15 to-transparent lg:block"
              />
              {s.proceso.map((p, i) => (
                <li key={p.t} className="relative">
                  <FadeIn delay={i * 0.1}>
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent bg-brand-black-soft font-display text-base sm:h-[3.2rem] sm:w-[3.2rem] sm:text-lg text-brand-accent">
                      {i + 1}
                    </span>
                    <h3 className="mt-5 font-body text-base font-semibold normal-case tracking-normal text-brand-cream">
                      {p.t}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-brand-ink-on-black-soft">{p.d}</p>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Valores y plazos */}
        <section className="px-5 py-12 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="font-mono text-xs tracking-[0.15em] text-brand-accent">INVERSIÓN</p>
              <h2 className="mt-3 text-2xl text-brand-cream sm:text-5xl">Valores y plazos</h2>
            </FadeIn>
            <div className="mt-7 grid gap-3 sm:mt-12 sm:grid-cols-[1.5fr_1fr] sm:gap-4">
              <FadeIn>
                <div className="h-full rounded-2xl border border-brand-accent/40 bg-brand-accent/[0.05] p-5 sm:p-8">
                  <p className="font-mono text-xs tracking-[0.15em] text-brand-ink-on-black-soft">VALOR</p>
                  <p className="mt-3 font-display text-xl leading-[1.15] text-brand-cream sm:mt-4 sm:text-4xl">
                    {s.valores.precio}
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-brand-black-soft p-5 sm:p-8">
                  <p className="font-mono text-xs tracking-[0.15em] text-brand-ink-on-black-soft">PLAZO</p>
                  <p className="mt-3 font-display text-xl leading-[1.15] text-brand-cream sm:mt-4 sm:text-4xl">
                    {s.valores.plazo}
                  </p>
                </div>
              </FadeIn>
            </div>
            <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft">
              {s.valores.nota}
            </p>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="bg-brand-black-soft px-5 py-12 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <p className="font-mono text-xs tracking-[0.15em] text-brand-accent">DUDAS</p>
              <h2 className="mt-3 text-2xl text-brand-cream sm:text-5xl">Preguntas frecuentes</h2>
            </FadeIn>
            <div className="mt-6 border-b border-white/10 sm:mt-10">
              {s.faq.map((f) => (
                <details key={f.q} className="group border-t border-white/10 py-4 sm:py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-sm sm:text-base font-semibold text-brand-cream">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-brand-accent transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl text-brand-cream sm:text-2xl">Otros servicios</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {otros.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${o.slug}`}
                    className="inline-flex rounded-full border border-white/15 px-5 py-2.5 font-body text-sm text-brand-cream/90 transition-colors hover:border-brand-accent/60 hover:text-brand-accent"
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
