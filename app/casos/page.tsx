import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { CtaFooter } from "@/components/CtaFooter";
import { FadeIn } from "@/components/FadeIn";
import { CASOS } from "@/lib/casos";

const SITE = "https://deployuy.com";
const url = `${SITE}/casos`;
const titulo = "Casos: lo que construimos | Deploy";
const descripcion = "Proyectos desarrollados por Deploy: tiendas online, sistemas de gestión y más. Desde Salto, Uruguay.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: url },
  openGraph: { type: "website", siteName: "Deploy", url, locale: "es_UY", title: titulo, description: descripcion, images: [{ url: "/img/og-hero.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: titulo, description: descripcion, images: ["/img/og-hero.jpg"] },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Casos", item: url },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-[#0a0a0a] px-5 pb-14 pt-24 text-brand-cream sm:px-8 sm:pb-24 sm:pt-36 lg:px-[6vw]">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Ruta" className="font-body text-xs text-brand-ink-on-black-soft">
              <Link href="/" className="transition-colors hover:text-brand-cream">Inicio</Link>
              <span className="mx-2">/</span>
              <span className="text-brand-cream/80">Casos</span>
            </nav>
            <h1 className="mt-5 text-balance font-body text-[8vw] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] sm:text-[4.6vw] lg:text-[4rem]">
              Lo que <span className="text-brand-accent">construimos.</span>
            </h1>
            <ul className="mt-8 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {CASOS.map((c) => (
                <li key={c.slug}>
                  <FadeIn>
                    <Link
                      href={`/casos/${c.slug}`}
                      className="group grid h-full grid-cols-[1fr_7rem] items-center gap-4 overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#141414] p-5 transition-colors duration-200 hover:border-brand-accent sm:grid-cols-1 sm:gap-6 sm:p-7"
                    >
                      <div className="sm:order-2">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink-on-black-soft sm:text-xs">{c.etiqueta}</p>
                        <h2 className="mt-2 font-body text-[1.3rem] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] sm:text-[1.7rem]">
                          {c.titulo} <span className="text-brand-accent">{c.destacado}</span>
                        </h2>
                        <p className="mt-3 font-body text-sm leading-snug text-brand-ink-on-black-soft">{c.texto}</p>
                        <span className="mt-4 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-wide">
                          Ver el caso
                          <ArrowRight className="h-4 w-4 text-brand-accent transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
                        </span>
                      </div>
                      <div className="relative -mb-10 rotate-[4deg] overflow-hidden rounded-[1.2rem] border-[3px] border-[#2a2a2a] shadow-[0_20px_30px_-12px_rgba(0,0,0,0.9)] sm:order-1 sm:mx-auto sm:mb-0 sm:-mt-2 sm:h-56 sm:w-40 sm:rotate-[3deg]">
                        <Image src={c.imagen} alt={c.alt} width={780} height={1688} sizes="(min-width: 640px) 10rem, 7rem" className="h-auto w-full" />
                      </div>
                    </Link>
                  </FadeIn>
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
