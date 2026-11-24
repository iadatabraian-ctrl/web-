import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

/* Caso real: la tienda de EMY Indumentaria (emy.deployuy.com). Capturas propias de la tienda
   (catálogo con los productos y precios reales; el stock cargado es provisorio). */

const URL_TIENDA = "https://emy.deployuy.com";

export function EjemploReal() {
  return (
    <section id="ejemplo" className="relative overflow-hidden bg-[#0a0a0a] px-5 py-14 text-brand-cream sm:px-8 sm:py-28 lg:px-[6vw]">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-ink-on-black-soft">Caso real</p>
          <h2 className="mt-4 text-balance font-body text-[7vw] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] sm:text-[4vw] lg:text-[3.2rem]">
            Una tienda online, <span className="text-brand-accent">hecha de punta a punta.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-[15px] leading-relaxed text-brand-ink-on-black-soft sm:text-base">
            EMY Indumentaria, de Salto: catálogo con variantes por color, carrito, pedidos y un panel para que la dueña cargue stock y fotos.
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
          {/* Dos pantallas de celular en diagonal, con "EMY" gigante detrás (como el hero) y una línea fina que las cruza */}
          <div className="relative mx-auto h-[128vw] max-w-[28rem] sm:h-[36rem] lg:h-[40rem]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[-2%] select-none text-center font-impact text-[52vw] font-black uppercase italic leading-[0.8] tracking-[-0.02em] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.9)_20%,rgba(255,255,255,0.06)_100%)] bg-clip-text text-transparent [font-stretch:50%] sm:text-[13rem] lg:text-[15rem]"
            >
              EMY
            </span>
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              <path d="M-30 78 L130 40" fill="none" stroke="#FF6A1F" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute left-[5%] top-[24%] w-[46%] -rotate-[5deg] overflow-hidden rounded-[1.5rem] border-[3px] border-[#2a2a2a] bg-[#161616] shadow-[0_30px_50px_-16px_rgba(0,0,0,0.95)] sm:rounded-[1.8rem]">
              <Image src="/img/emy-movil-home.webp" alt="Portada de la tienda online de EMY Indumentaria en celular" width={780} height={1688} sizes="(min-width: 1024px) 15rem, 50vw" className="h-auto w-full" />
            </div>
            <div className="absolute right-[3%] top-[34%] w-[46%] rotate-[4deg] overflow-hidden rounded-[1.5rem] border-[3px] border-[#2a2a2a] bg-[#161616] shadow-[0_30px_50px_-16px_rgba(0,0,0,0.95)] sm:rounded-[1.8rem]">
              <Image src="/img/emy-movil.webp" alt="Página de producto de la tienda de EMY Indumentaria en celular" width={780} height={1688} sizes="(min-width: 1024px) 15rem, 50vw" className="h-auto w-full" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
