"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* Hero oscuro (ver PRODUCT.md): titular gigante en blanco semitransparente, detrás de una
   figura recortada (public/img/hero/hero-recorte.webp, generada con IA, PNG con alfa) que lo
   tapa apenas en el final de la última línea para dar profundidad. El naranja queda en la luz
   de la figura y de las estelas; los botones son blancos. Los tamaños van en vw para que el
   solapamiento sea parecido en cualquier ancho. */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="inicio"
      className="aura-ember relative min-h-[100svh] overflow-hidden px-5 pb-10 pt-24 text-brand-cream sm:px-8 lg:px-[10vw] lg:pb-20 lg:pt-28"
    >
      {/* Estelas diagonales de fondo: la barra "/" del logo hecha luz */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="slash-beam absolute -top-[10%] right-[20%] h-[140%] w-[7vw] opacity-20" />
        <span className="slash-beam absolute -top-[10%] right-[6%] h-[140%] w-[1.2vw] opacity-30" />
        <span className="slash-beam absolute -bottom-[30%] left-[-6%] h-[90%] w-[4vw] opacity-15 max-lg:hidden" />
      </div>

      {/* Titular gigante, detrás de la figura */}
      <h1 className="relative z-[1] font-impact font-black uppercase italic leading-[0.86] tracking-[-0.005em] [font-stretch:50%] text-[23.5vw] sm:text-[16vw] lg:text-[14.2vw] lg:leading-[0.88]">
        <motion.span
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="block text-white/95"
        >
          Tu idea,
        </motion.span>
        <motion.span
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease, delay: 0.22 }}
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
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.3 }}
        className="pointer-events-none absolute right-[calc(28vw-var(--fw)/2)] top-[76vw] z-[2] w-[var(--fw)] [--fw:max(88vw,calc((100svh-76vw)/1.25))] sm:right-[-9vw] sm:top-[max(40vw,calc(100svh-90vw))] sm:[--fw:70vw] lg:right-[-3.8vw] lg:top-[4.5rem] lg:[--fw:50vw]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
        }}
      >
        <Image
          src="/img/hero/hero-recorte.webp"
          alt=""
          width={1122}
          height={1402}
          priority
          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 70vw, 112vw"
          className="h-auto w-full"
        />
      </motion.div>

      {/* Texto y botones */}
      <div className="relative z-[3] mt-5 sm:mt-8 lg:mt-8">
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.5, ease, delay: 0.45 }}
          className="max-w-[44%] font-body text-[14px] leading-snug text-brand-ink-on-black-soft sm:max-w-md sm:text-lg sm:leading-relaxed lg:max-w-[32rem]"
        >
          Diseñamos e implementamos{" "}
          <strong className="font-semibold text-brand-cream">sistemas</strong> digitales para hacer
          crecer tu negocio.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.5, ease, delay: 0.55 }}
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
