import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { SERVICIOS, getServicio, type ServicioSlug } from "@/lib/servicios";

const SITE = "https://deployuy.com";

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
        <section className="px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Ruta" className="font-body text-xs text-brand-ink-on-black-soft">
              <Link href="/" className="transition-colors hover:text-brand-cream">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span className="text-brand-cream/80">{s.nombre}</span>
            </nav>
            <span className="mt-8 block font-mono text-xs tracking-[0.15em] text-brand-accent">
              {s.eyebrow}
            </span>
            <h1 className="mt-3 text-4xl text-brand-cream sm:text-6xl">{s.h1}</h1>
            <div className="mt-8 flex max-w-2xl flex-col gap-4">
              {s.intro.map((p) => (
                <p
                  key={p}
                  className="font-body text-base leading-relaxed text-brand-ink-on-black-soft sm:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-4 font-body text-sm font-bold uppercase tracking-wide text-brand-black transition hover:scale-105 hover:opacity-90"
            >
              Solicitar una cotización
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </section>

        <section className="bg-brand-black px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl text-brand-cream sm:text-4xl">Qué incluye</h2>
            <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {s.incluye.map((item) => (
                <li key={item.t} className="border-t border-brand-line-on-black pt-4">
                  <h3 className="font-body text-base font-semibold normal-case tracking-normal text-brand-cream">
                    {item.t}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-brand-ink-on-black-soft">
                    {item.d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl text-brand-cream sm:text-4xl">Cuándo conviene</h2>
            <ul className="mt-8 flex max-w-2xl flex-col gap-3">
              {s.cuandoConviene.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base"
                >
                  <span className="text-brand-accent">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-brand-black px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl text-brand-cream sm:text-4xl">Cómo se trabaja</h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2">
              {s.proceso.map((p, i) => (
                <li key={p.t} className="border-t border-brand-line-on-black pt-4">
                  <span className="font-mono text-xs tracking-[0.15em] text-brand-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-body text-base font-semibold normal-case tracking-normal text-brand-cream">
                    {p.t}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-brand-ink-on-black-soft">
                    {p.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl text-brand-cream sm:text-4xl">Valores y plazos</h2>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="border-t border-brand-line-on-black pt-4">
                <dt className="font-mono text-xs tracking-[0.15em] text-brand-accent">VALOR</dt>
                <dd className="mt-2 font-body text-base text-brand-cream">{s.valores.precio}</dd>
              </div>
              <div className="border-t border-brand-line-on-black pt-4">
                <dt className="font-mono text-xs tracking-[0.15em] text-brand-accent">PLAZO</dt>
                <dd className="mt-2 font-body text-base text-brand-cream">{s.valores.plazo}</dd>
              </div>
            </dl>
            <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft">
              {s.valores.nota}
            </p>
          </div>
        </section>

        <section className="bg-brand-black px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl text-brand-cream sm:text-4xl">Preguntas frecuentes</h2>
            <div className="mt-8 border-b border-brand-line-on-black">
              {s.faq.map((f) => (
                <details
                  key={f.q}
                  className="group border-t border-brand-line-on-black py-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-base font-semibold text-brand-cream">
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

        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl text-brand-cream sm:text-2xl">Otros servicios</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {otros.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${o.slug}`}
                    className="inline-flex rounded-full border border-brand-line-on-black px-5 py-2.5 font-body text-sm text-brand-cream/90 transition-colors hover:border-brand-accent/60 hover:text-brand-accent"
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
