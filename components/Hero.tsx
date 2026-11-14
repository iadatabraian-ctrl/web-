"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* Hero oscuro (ver PRODUCT.md): titular gigante en blanco semitransparente, detrás de una
   figura recortada (public/img/hero/hero-recorte.webp, generada con IA, PNG con alfa) que lo
   tapa apenas en el final de cada línea para dar profundidad. El naranja queda solo en el
   botón y en la luz de la figura. Los tamaños van en vw para que el solapamiento sea el mismo
   en cualquier ancho. */

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
          className="block text-white/55"
        >
          en
          <br className="lg:hidden" />
          <span className="hidden lg:inline"> </span>
          producción.
        </motion.span>
      </h1>

      {/* Figura: delante del titular */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.3 }}
        className="pointer-events-none absolute right-[-16vw] top-[max(100vw,calc(100svh-140vw))] z-[2] w-[112vw] sm:right-[-9vw] sm:top-[max(40vw,calc(100svh-90vw))] sm:w-[70vw] lg:right-[-3.8vw] lg:top-[4.5rem] lg:w-[50vw]"
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
      <div className="relative z-[3] mt-6 max-w-md sm:mt-8 lg:mt-10 lg:max-w-[28rem]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.5, ease, delay: 0.45 }}
          className="flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <a
            href="#hablemos"
            className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-brand-black transition-[transform,opacity] duration-200 ease-out hover:opacity-90 active:scale-[0.97] sm:px-7 sm:py-3.5 sm:text-sm"
          >
            Hablemos
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 rounded-full border border-brand-cream/40 px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-brand-cream transition-[transform,border-color] duration-200 ease-out hover:border-brand-cream active:scale-[0.97] sm:px-7 sm:py-3.5 sm:text-sm"
          >
            Ver servicios
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
