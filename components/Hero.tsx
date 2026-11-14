"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Bar } from "@/components/Bar";

/* Hero oscuro (ver PRODUCT.md): titular gigante en blanco semitransparente, detrás de una
   figura recortada (public/img/hero/hero-recorte.webp, generada con IA, PNG con alfa) que lo
   tapa apenas en el final de la última línea para dar profundidad. El naranja queda en la luz
   de la figura y de las barras de fondo; los botones son blancos. Los tamaños van en vw para que el
   solapamiento sea parecido en cualquier ancho. */

/* Orden y dirección de la entrada (definidos por el fundador sobre la maqueta):
   1. la figura sube desde abajo
   2. "Tu idea," entra de izquierda a derecha
   3. "en producción." entra igual, justo después
   4. texto y botones ("Hablemos") suben desde abajo, al final */
const fromLeft = {
  hidden: { opacity: 0, x: "-14vw" },
  show: { opacity: 1, x: 0 },
};

const fromBelow = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden bg-[#0d0b08] px-5 pb-10 pt-24 text-brand-cream sm:px-8 lg:px-[10vw] lg:pb-20 lg:pt-28"
    >
      {/* Barras de luz de fondo (medidas sobre las maquetas): paralelogramos con borde duro,
          inicio y fin cortados y un degradé a lo ancho de la barra. Sin halos redondos. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Celular */}
        <Bar className="lg:hidden" style={{ left: "80.4vw", top: 0, width: "10vw", height: "26vw", skew: 35, origin: "0 0", fill: "rgba(255,92,26,0.11)" }}  i={0} />
        <Bar className="lg:hidden" style={{ right: 0, top: "31.5vw", width: "24vw", height: "43vw", skew: 42, origin: "100% 0", fill: "linear-gradient(to left, rgba(255,92,26,0.27), rgba(255,92,26,0.00))", edge: "right" }}  i={1} />
        <Bar className="lg:hidden" style={{ left: "-5.3vw", bottom: 0, width: "21vw", height: "52vw", skew: 37, origin: "0 100%", fill: "linear-gradient(to right, rgba(255,92,26,0.48), rgba(255,92,26,0.00))", edge: "left", fadeTop: true }}  i={2} />
        {/* Laptop */}
        <Bar className="max-lg:hidden" style={{ left: "40.7vw", bottom: 0, width: "7.2vw", height: "15vw", skew: 37, origin: "0 100%", fill: "linear-gradient(to right, rgba(255,92,26,0.43), rgba(255,92,26,0.40) 45%, rgba(255,92,26,0.10))" }}  i={3} />
        <Bar className="max-lg:hidden" style={{ left: "102.8vw", top: 0, width: "9vw", height: "18.7vw", skew: 38, origin: "0 0", fill: "linear-gradient(to right, rgba(255,92,26,0.30), rgba(255,92,26,0.03))", edge: "left" }}  i={4} />
        <Bar className="max-lg:hidden" style={{ left: "93.6vw", top: "18.7vw", width: "12vw", height: "35vw", skew: 38, origin: "0 0", fill: "rgba(255,92,26,0.11)" }}  i={5} />
        <Bar className="max-lg:hidden" style={{ left: "79.5vw", top: 0, width: "9vw", height: "28vw", skew: 36, origin: "0 0", fill: "rgba(255,92,26,0.10)" }}  i={6} />
      </div>

      {/* Titular gigante, detrás de la figura */}
      <h1 className="relative z-[1] font-impact font-black uppercase italic leading-[0.86] tracking-[-0.005em] [font-stretch:50%] text-[23.5vw] sm:text-[16vw] lg:text-[14.2vw] lg:leading-[0.88]">
        <motion.span
          initial="hidden"
          animate="show"
          variants={fromLeft}
          transition={{ duration: 0.75, ease, delay: 0.75 }}
          className="block text-white/95"
        >
          Tu idea,
        </motion.span>
        <motion.span
          initial="hidden"
          animate="show"
          variants={fromLeft}
          transition={{ duration: 0.75, ease, delay: 0.95 }}
          className="block text-white/75"
        >
          en
          <br className="lg:hidden" />
          <span className="hidden lg:inline"> </span>
          producción.
        </motion.span>
      </h1>

      {/* Figura: delante del titular. En celular la altura de la pantalla define su tamaño
          para que siempre se salga por el borde inferior; la cabeza queda a la derecha del texto. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: "14%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.1 }}
        className="pointer-events-none absolute right-[calc(28vw-var(--fw)/2)] top-[76vw] z-[2] w-[var(--fw)] [--fw:max(88vw,calc((100svh-76vw)/1.25))] sm:right-[-9vw] sm:top-[max(40vw,calc(100svh-90vw))] sm:[--fw:70vw] lg:right-[-3.8vw] lg:top-[4.5rem] lg:[--fw:50vw]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
        }}
      >
        <div style={{ animation: "hero-float 7s ease-in-out 1.6s infinite" }}>
        <Image
          src="/img/hero/hero-recorte.webp"
          alt=""
          width={1122}
          height={1402}
          priority
          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 70vw, 112vw"
          className="h-auto w-full [filter:brightness(1.35)_contrast(0.92)]"
        />
        </div>
      </motion.div>

      {/* Texto y botones */}
      <div className="relative z-[3] mt-5 sm:mt-8 lg:mt-8">
        <motion.p
          initial="hidden"
          animate="show"
          variants={fromBelow}
          transition={{ duration: 0.6, ease, delay: 1.35 }}
          className="max-w-[44%] font-body text-[14px] leading-snug text-brand-ink-on-black-soft sm:max-w-md sm:text-lg sm:leading-relaxed lg:max-w-[32rem]"
        >
          Diseñamos e implementamos{" "}
          <strong className="font-semibold text-brand-cream">sistemas</strong> digitales para hacer
          crecer tu negocio.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fromBelow}
          transition={{ duration: 0.6, ease, delay: 1.5 }}
          className="mt-6 flex flex-col items-start gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href="#hablemos"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-brand-black transition-[transform,background-color] duration-200 ease-out hover:bg-white/85 active:scale-[0.97] sm:px-7 sm:py-3.5 sm:text-sm"
          >
            Hablemos
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brand-cream/40 px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-brand-cream transition-[transform,border-color] duration-200 ease-out hover:border-brand-cream active:scale-[0.97] sm:px-7 sm:py-3.5 sm:text-sm"
          >
            Ver servicios
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
