import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import type { TemaCaso } from "@/lib/casos";

/* Tarjeta corta que lleva a un caso o demostración. Se muestra al final de la página del servicio. */
export function CasoCard({
  href,
  etiqueta,
  titulo,
  destacado,
  texto,
  imagen,
  alt,
  tema,
}: {
  href: string;
  etiqueta: string;
  titulo: string;
  destacado: string;
  texto: string;
  imagen: string;
  alt: string;
  tema: TemaCaso;
}) {
  return (
    <section className="bg-[#0a0a0a] px-5 pt-14 text-brand-cream sm:px-8 sm:pt-24 lg:px-[6vw]">
      <FadeIn>
        <Link
          href={href}
          className="group mx-auto grid max-w-5xl grid-cols-[1fr_7.5rem] items-center gap-4 overflow-hidden rounded-[1.6rem] bg-white p-5 text-brand-black transition-transform duration-200 hover:-translate-y-1 sm:grid-cols-[1fr_11rem] sm:gap-8 sm:p-8"
        >
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
              <span aria-hidden style={{ background: tema.punto }} className="size-2 rounded-full" />
              {etiqueta}
            </p>
            <h2 className="mt-3 font-display text-[1.9rem] uppercase leading-[1.08] tracking-[0.01em] sm:text-5xl">
              {titulo} <span style={{ color: tema.acento }}>{destacado}</span>
            </h2>
            <p className="mt-3 max-w-md font-body text-sm leading-snug text-neutral-600 sm:text-base">{texto}</p>
            <span className="mt-4 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-wide sm:text-sm">
              Ver más
              <ArrowRight style={{ color: tema.acento }} className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
            </span>
          </div>
          <div className="relative -mb-12 rotate-[5deg] overflow-hidden rounded-[1.2rem] border-[3px] border-neutral-200 sm:-mb-16">
            <Image src={imagen} alt={alt} width={780} height={1688} sizes="(min-width: 640px) 11rem, 7.5rem" className="h-auto w-full" />
          </div>
        </Link>
      </FadeIn>
    </section>
  );
}
