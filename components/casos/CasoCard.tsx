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
          style={{ background: tema.fondo, color: tema.tinta }}
          className="group mx-auto grid max-w-5xl grid-cols-[1fr_7.5rem] items-center gap-4 overflow-hidden rounded-[1.6rem] p-5 transition-transform duration-200 hover:-translate-y-1 sm:grid-cols-[1fr_11rem] sm:gap-8 sm:p-8"
        >
          <div>
            <span style={{ background: tema.pastilla, color: tema.sobrePastilla }} className="inline-block rounded-full px-3 py-1.5 font-body text-[11px] font-bold uppercase leading-none tracking-[0.14em] sm:text-xs">{etiqueta}</span>
            <h2 className="mt-3 font-display text-[1.9rem] uppercase leading-[1.2] tracking-[0.01em] sm:text-5xl">
              {titulo}{" "}
              <span style={{ background: tema.acento, color: tema.sobreAcento }} className="box-decoration-clone rounded-lg px-2.5 py-[0.05em]">{destacado}</span>
            </h2>
            <p style={{ color: tema.suave }} className="mt-3 max-w-md font-body text-sm leading-snug sm:text-base">{texto}</p>
            <span className="mt-4 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-wide sm:text-sm">
              Ver más
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
            </span>
          </div>
          <div className="relative -mb-12 rotate-[5deg] overflow-hidden rounded-[1.2rem] border-[3px] border-black/30 shadow-[0_20px_30px_-12px_rgba(0,0,0,0.55)] sm:-mb-16">
            <Image src={imagen} alt={alt} width={780} height={1688} sizes="(min-width: 640px) 11rem, 7.5rem" className="h-auto w-full" />
          </div>
        </Link>
      </FadeIn>
    </section>
  );
}
