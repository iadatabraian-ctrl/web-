import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Bar } from "@/components/Bar";

/* Hero (ver PRODUCT.md): fondo negro fijo, estilo póster. "DEPLOY" gigante (con desvanecido hacia abajo) detrás de una figura
   recortada (public/img/hero/hero-recorte.webp, generada con IA, PNG con alfa) que asoma desde abajo,
   una copia gris y difuminada de la figura al fondo, y el titular abajo. El naranja queda en la luz de la
   figura. Los tamaños van en vw para que el solapamiento sea parecido en cualquier ancho. Es un componente
   de servidor: sin JavaScript de animación. */

/* Entrada en dos tiempos (decidido por el fundador, 16/11/2026):
   1. a la vez: la figura sube desde abajo y el titular entra de izquierda a derecha, línea por línea
   2. después: la bajada y los botones ("Hablemos") suben desde abajo
   Es CSS puro (clases hero-in-* en globals.css) para que arranque en el primer pintado y no espere
   a que cargue y se ejecute el JavaScript. */


const T = {
  fade: "from-[#0a0a0a]/90 via-[#0a0a0a]/55",
  h1a: "text-white",
  h1b: "text-white",
  img: "[filter:brightness(1.35)_contrast(0.92)]",
  p: "text-brand-ink-on-black-soft",
  pz: "text-[14px] sm:text-lg",
  bz: "text-xs sm:text-sm",
  btn1: "bg-white text-brand-black hover:bg-white/85",
  btn2: "border-brand-cream/40 text-brand-cream hover:border-brand-cream",
} as const;

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[radial-gradient(120%_70%_at_50%_18%,#2a2a2a_0%,#0a0a0a_62%)] text-brand-cream"
    >
      <Content />
    </section>
  );
}

function Content() {
  const t = T;
  return (
    <>
      {/* Barras de luz de fondo (medidas sobre las maquetas): paralelogramos con borde duro,
          inicio y fin cortados y un degradé a lo ancho de la barra. Sin halos redondos. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Celular */}
        <Bar gray className="lg:hidden" style={{ right: "4vw", top: "-8vw", width: "13vw", height: "150vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.04)" }} i={0} />
        <Bar gray className="lg:hidden" style={{ left: "-5.3vw", bottom: 0, width: "21vw", height: "52vw", skew: 37, origin: "0 100%", fill: "linear-gradient(to right, rgba(255,92,26,0.26), rgba(255,92,26,0))", edge: "left", edgeAlpha: 0.5, fadeTop: true }}  i={2} />
        {/* Laptop */}
        <Bar gray className="max-lg:hidden" style={{ left: "40.7vw", bottom: 0, width: "7.2vw", height: "15vw", skew: 37, origin: "0 100%", fill: "linear-gradient(to right, rgba(255,92,26,0.24), rgba(255,92,26,0.22) 45%, rgba(255,92,26,0.06))" }}  i={3} />
        <Bar gray className="max-lg:hidden" style={{ left: "102.8vw", top: 0, width: "9vw", height: "18.7vw", skew: 38, origin: "0 0", fill: "linear-gradient(to right, rgba(255,92,26,0.17), rgba(255,92,26,0.02))", edge: "left", edgeAlpha: 0.5 }}  i={4} />
        <Bar gray className="max-lg:hidden" style={{ left: "93.6vw", top: "18.7vw", width: "12vw", height: "35vw", skew: 38, origin: "0 0", fill: "rgba(255,92,26,0.06)" }}  i={5} />
        <Bar gray className="max-lg:hidden" style={{ left: "79.5vw", top: 0, width: "9vw", height: "28vw", skew: 36, origin: "0 0", fill: "rgba(255,92,26,0.06)" }}  i={6} />
      </div>

      {/* Copia grande, gris y difuminada de la figura, al fondo (como en la referencia) */}
      <div
        aria-hidden="true"
        className={`hero-in-fade pointer-events-none absolute left-[-30vw] top-[38vw] z-0 w-[160vw] lg:left-[10vw] lg:top-[-8vw] lg:w-[80vw]`}
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 50%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 50%, transparent 100%)",
        }}
      >
        <Image
          src="/img/hero/hero-recorte.webp"
          alt=""
          width={1122}
          height={1402}
          sizes="(min-width: 1024px) 30vw, 60vw"
          loading="lazy"
          fetchPriority="low"
          className="h-auto w-full opacity-[0.2] [filter:grayscale(1)_blur(7px)_brightness(1.5)_contrast(0.9)]"
        />
      </div>

      {/* Palabra gigante, detrás de la figura (decorativa; el titular real va abajo) */}
      <span
        aria-hidden="true"
        className={`hero-in-left pointer-events-none absolute inset-x-0 top-[21vw] z-[1] block select-none whitespace-nowrap text-center font-impact text-[46vw] font-black uppercase italic leading-[0.8] tracking-[-0.02em] bg-[linear-gradient(to_bottom,#fff_30%,rgba(255,255,255,0.12)_100%)] bg-clip-text text-transparent [font-stretch:50%] lg:top-[6.5vw] lg:text-[32.6vw] lg:[font-stretch:60%]`}
        style={{ animationDelay: "0.05s" }}
      >
        Deploy
      </span>

      {/* Figura: centrada, delante de la palabra. Solo asoma desde abajo, para que "DEPLOY" se lea entero. */}
      <div
        aria-hidden="true"
        className={`hero-in-fig pointer-events-none absolute inset-x-0 top-[46vw] z-[2] mx-auto w-[min(105vw,62svh)] lg:inset-x-auto lg:left-[30.5vw] lg:top-[22vw] lg:mx-0 lg:w-[44vw]`}
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 66%, transparent 97%)",
          maskImage: "linear-gradient(to bottom, #000 66%, transparent 97%)",
        }}
      >
        <div style={{ animation: "hero-float 7s ease-in-out 1.6s infinite" }}>
          <Image
            src="/img/hero/hero-recorte.webp"
            alt=""
            width={1122}
            height={1402}
            priority
            sizes="(min-width: 1024px) 44vw, 105vw"
            className={`h-auto w-full ${t.img}`}
          />
        </div>
      </div>

      {/* Fundido al color del fondo, para que el texto se lea sobre el pie de la figura */}
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[40svh] bg-gradient-to-t to-transparent lg:h-[30svh] ${t.fade}`} />

      {/* Titular, bajada y botones: abajo, sobre el pie difuminado de la figura */}
      <div className="absolute inset-x-0 bottom-0 z-[3] flex flex-col items-center px-5 pb-[calc(clamp(2.5rem,8vw,7rem)+1.25rem)] sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-[5vw]">
        <h1 className="text-center lg:text-left">
          <span
            className={`hero-in-left block font-mont text-[8.2vw] font-extrabold uppercase leading-none tracking-[-0.02em] sm:text-[6vw] lg:text-[4.3vw] ${t.h1a}`}
            style={{ animationDelay: "0.3s" }}
          >
            Tu negocio,
          </span>
          <span
            className={`hero-in-left block font-didone text-[12vw] font-extrabold [font-optical-sizing:none] [font-variation-settings:"opsz"_10] italic leading-[0.95] sm:text-[8.5vw] lg:text-[6vw] ${t.h1b}`}
            style={{ animationDelay: "0.45s" }}
          >
            tu sistema.
          </span>
        </h1>

        <div className="mt-3 flex flex-col items-center lg:mt-0 lg:items-start lg:pb-[0.6vw]">
          <p
            style={{ animationDelay: "0.85s" }}
            className={`hero-in-below max-w-[22rem] text-center font-mont ${t.pz} leading-snug ${t.p} lg:max-w-[24rem] lg:text-left`}
          >
            Software a medida, páginas web, automatización y agentes de WhatsApp.
          </p>
          <div
            style={{ animationDelay: "1s" }}
            className={`hero-in-below mt-4 flex items-center justify-center gap-2.5 lg:mt-5 lg:justify-start lg:gap-3`}
          >
            <a
              href="#hablemos"
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 font-mont ${t.bz} font-bold uppercase tracking-wide transition-[transform,background-color] duration-200 ease-out active:scale-[0.97] sm:px-7 sm:py-3.5 ${t.btn1}`}
            >
              Hablemos
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <a
              href="#servicios"
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3 font-mont ${t.bz} font-bold uppercase tracking-wide transition-[transform,border-color] duration-200 ease-out active:scale-[0.97] sm:px-7 sm:py-3.5 ${t.btn2}`}
            >
              Ver servicios
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
