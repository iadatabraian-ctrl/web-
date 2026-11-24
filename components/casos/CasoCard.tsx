import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

/* Tarjeta corta que lleva al caso real de EMY. Se muestra en la página de Páginas web. */
export function CasoCard() {
  return (
    <section className="bg-[#0a0a0a] px-5 pt-14 text-brand-cream sm:px-8 sm:pt-24 lg:px-[6vw]">
      <FadeIn>
        <Link
          href="/casos/emy"
          className="group mx-auto grid max-w-5xl grid-cols-[1fr_7.5rem] items-center gap-4 overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#141414] p-5 transition-colors duration-200 hover:border-brand-accent sm:grid-cols-[1fr_11rem] sm:gap-8 sm:p-8"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink-on-black-soft sm:text-xs">Caso real</p>
            <h2 className="mt-2 font-body text-[1.35rem] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] sm:text-4xl">
              EMY Indumentaria, <span className="text-brand-accent">tienda online.</span>
            </h2>
            <p className="mt-3 max-w-md font-body text-sm leading-snug text-brand-ink-on-black-soft sm:text-base">Catálogo, carrito, pedidos y panel para cargar stock y fotos.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-wide sm:text-sm">
              Ver el caso
              <ArrowRight className="h-4 w-4 text-brand-accent transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
            </span>
          </div>
          <div className="relative -mb-12 rotate-[5deg] overflow-hidden rounded-[1.2rem] border-[3px] border-[#2a2a2a] shadow-[0_20px_30px_-12px_rgba(0,0,0,0.9)] sm:-mb-16">
            <Image src="/img/emy-movil-home.webp" alt="Tienda online de EMY Indumentaria en celular" width={780} height={1688} sizes="(min-width: 640px) 11rem, 7.5rem" className="h-auto w-full" />
          </div>
        </Link>
      </FadeIn>
    </section>
  );
}
