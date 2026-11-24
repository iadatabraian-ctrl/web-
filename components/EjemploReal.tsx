import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

/* Ejemplo real: la tienda de EMY Indumentaria (emy.deployuy.com). Capturas propias de la tienda
   (catálogo con los productos y precios reales; el stock cargado es provisorio). */

const URL_TIENDA = "https://emy.deployuy.com";

export function EjemploReal() {
  return (
    <section id="ejemplo" className="relative overflow-hidden bg-[#0a0a0a] px-5 py-14 text-brand-cream sm:px-8 sm:py-28 lg:px-[6vw]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-ink-on-black-soft">Ejemplo real</p>
          <h2 className="mt-4 text-balance font-body text-[7vw] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] sm:text-[4vw] lg:text-[3.2rem]">
            Una tienda online, <span className="text-brand-accent">hecha de punta a punta.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-[15px] leading-relaxed text-brand-ink-on-black-soft sm:text-base">
            EMY Indumentaria, de Salto: catálogo con variantes por color, carrito, pedidos y un panel para que la dueña cargue stock y fotos. Funciona en celular y tiene dominio propio.
          </p>
          <ul className="mt-6 flex flex-col gap-2.5 font-body text-sm sm:text-[15px]">
            {["Catálogo con filtros y búsqueda", "Carrito y pedido en pocos pasos", "Panel de administración protegido", "Mercado Pago: se conecta en la próxima etapa"].map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                {t}
              </li>
            ))}
          </ul>
          <a
            href={URL_TIENDA}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-black transition-[transform,background-color,color] duration-200 hover:bg-brand-accent hover:text-white active:scale-[0.97] sm:text-sm"
          >
            Ver la tienda
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </FadeIn>

        <FadeIn>
          <div className="relative pb-10 pr-[18%] sm:pb-14">
            {/* Laptop */}
            <div className="overflow-hidden rounded-xl border border-white/15 bg-[#161616] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-white/25" />
                <span className="h-2 w-2 rounded-full bg-white/25" />
                <span className="h-2 w-2 rounded-full bg-white/25" />
                <span className="ml-2 truncate rounded-full bg-white/10 px-3 py-0.5 font-mono text-[10px] text-brand-ink-on-black-soft sm:text-[11px]">emy.deployuy.com</span>
              </div>
              <Image src="/img/emy-laptop.webp" alt="Portada de la tienda online de EMY Indumentaria en computadora" width={1440} height={900} sizes="(min-width: 1024px) 40rem, 90vw" className="h-auto w-full" />
            </div>
            {/* Celular, apoyado abajo a la derecha */}
            <div className="absolute bottom-0 right-0 w-[34%] overflow-hidden rounded-[1.3rem] border-[3px] border-[#2a2a2a] bg-[#161616] shadow-[0_24px_40px_-14px_rgba(0,0,0,0.95)] sm:rounded-[1.6rem]">
              <Image src="/img/emy-movil.webp" alt="Página de producto de la tienda de EMY Indumentaria en celular" width={780} height={1688} sizes="(min-width: 1024px) 14rem, 34vw" className="h-auto w-full" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
