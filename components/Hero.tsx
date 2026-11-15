"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Bar } from "@/components/Bar";

/* Hero (ver PRODUCT.md). Base oscura; una segunda copia en naranja puro (aria-hidden, sin clics) se revela con
   una ola que sube y baja cada ~11 s (oscuro y naranja). Con "reducir movimiento" queda fijo en oscuro. Hero oscuro: titular gigante en blanco semitransparente, detrás de una
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

const PAD = "px-5 pb-10 pt-24 sm:px-8 lg:px-[10vw] lg:pb-20 lg:pt-28";

const TONE = {
  dark: {
    h1a: "text-white/95",
    h1b: "text-white/75",
    img: "[filter:brightness(1.35)_contrast(0.92)]",
    p: "text-brand-ink-on-black-soft",
    pz: "text-[14px] sm:text-lg",
    bz: "text-xs sm:text-sm",
    strong: "text-brand-cream",
    btn1: "bg-white text-brand-black hover:bg-white/85",
    btn2: "border-brand-cream/40 text-brand-cream hover:border-brand-cream",
  },
  light: {
    h1a: "text-white",
    h1b: "text-white/80",
    img: "",
    p: "text-white",
    pz: "text-[15.5px] font-medium sm:text-xl",
    bz: "text-[13px] sm:text-[15px]",
    strong: "text-white",
    btn1: "bg-white text-[#0d0b08] hover:bg-white/90",
    btn2: "border-white/70 text-white hover:border-white",
  },
} as const;

// Máscara de la ola: borde ondulado e inclinado; se desplaza en vertical (300% del alto de la capa).
const WAVE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 300' preserveAspectRatio='none'%3E%3Cpath d='M0 138 C16 120 28 152 46 114 S82 94 100 64 V300 H0 Z'/%3E%3C/svg%3E\")";

const HOLD_MS = 9000;
const WAVE_S = 2;
const waveEase = [0.65, 0, 0.35, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const p = useMotionValue(0); // 0 = oscuro, 1 = claro
  // De -20% (la capa clara queda toda por debajo del hero) a 100% (la ola ya pasó por arriba).
  const pos = useTransform(p, (v) => `0% ${-20 + v * 120}%`);
  const paused = useRef(false);

  // El menú se adapta cuando la ola ya pasó por arriba (ver globals.css).
  useMotionValueEvent(p, "change", (v) => {
    document.documentElement.dataset.hero = v > 0.7 ? "light" : "dark";
  });

  useEffect(() => {
    if (reduce) return;
    let alive = true;
    const hold = async (ms: number) => {
      let t = 0;
      while (alive && t < ms) {
        await new Promise((r) => setTimeout(r, 200));
        if (!paused.current) t += 200;
      }
    };
    (async () => {
      await hold(HOLD_MS - 2000);
      while (alive) {
        await animate(p, 1, { duration: WAVE_S, ease: waveEase });
        await hold(HOLD_MS);
        if (!alive) break;
        await animate(p, 0, { duration: WAVE_S, ease: waveEase });
        await hold(HOLD_MS);
      }
    })();
    return () => {
      alive = false;
      delete document.documentElement.dataset.hero;
    };
  }, [reduce, p]);

  return (
    <section
      id="inicio"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      className={`relative isolate min-h-[100svh] overflow-hidden bg-[#0d0b08] text-brand-cream ${PAD}`}
    >
      <Scene tone="dark" />
      {!reduce && (
        <motion.div
          aria-hidden="true"
          inert
          className={`pointer-events-none absolute inset-0 z-[4] overflow-hidden bg-[#FF5C1A] text-white ${PAD}`}
          style={{
            WebkitMaskImage: WAVE,
            maskImage: WAVE,
            WebkitMaskSize: "100% 300%",
            maskSize: "100% 300%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: pos,
            maskPosition: pos,
          }}
        >
          <Scene tone="light" instant />
        </motion.div>
      )}
    </section>
  );
}

function Scene({ tone, instant = false }: { tone: "dark" | "light"; instant?: boolean }) {
  const t = TONE[tone];
  const ini = (v: string) => (instant ? false : v);
  return (
    <>
      {/* Barras de luz de fondo (medidas sobre las maquetas): paralelogramos con borde duro,
          inicio y fin cortados y un degradé a lo ancho de la barra. Sin halos redondos. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${tone === "light" ? "[&>span]:[background:rgba(13,11,8,0.1)]! [&>span]:[border-color:rgba(13,11,8,0.25)]!" : ""}`}
      >
        {/* Celular */}
        <Bar className="lg:hidden" style={{ right: "4vw", top: "-8vw", width: "13vw", height: "150vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.04)" }} i={0} />
        <Bar className="lg:hidden" style={{ left: "-5.3vw", bottom: 0, width: "21vw", height: "52vw", skew: 37, origin: "0 100%", fill: "linear-gradient(to right, rgba(255,92,26,0.26), rgba(255,92,26,0))", edge: "left", edgeAlpha: 0.5, fadeTop: true }}  i={2} />
        {/* Laptop */}
        <Bar className="max-lg:hidden" style={{ left: "40.7vw", bottom: 0, width: "7.2vw", height: "15vw", skew: 37, origin: "0 100%", fill: "linear-gradient(to right, rgba(255,92,26,0.24), rgba(255,92,26,0.22) 45%, rgba(255,92,26,0.06))" }}  i={3} />
        <Bar className="max-lg:hidden" style={{ left: "102.8vw", top: 0, width: "9vw", height: "18.7vw", skew: 38, origin: "0 0", fill: "linear-gradient(to right, rgba(255,92,26,0.17), rgba(255,92,26,0.02))", edge: "left", edgeAlpha: 0.5 }}  i={4} />
        <Bar className="max-lg:hidden" style={{ left: "93.6vw", top: "18.7vw", width: "12vw", height: "35vw", skew: 38, origin: "0 0", fill: "rgba(255,92,26,0.06)" }}  i={5} />
        <Bar className="max-lg:hidden" style={{ left: "79.5vw", top: 0, width: "9vw", height: "28vw", skew: 36, origin: "0 0", fill: "rgba(255,92,26,0.06)" }}  i={6} />
      </div>

      {/* Titular gigante, detrás de la figura */}
      <h1 className="relative z-[1] font-impact font-black uppercase italic leading-[0.8] tracking-[-0.03em] [font-stretch:50%] text-[23.5vw] sm:text-[16vw] lg:text-[14.2vw] lg:leading-[0.82]">
        <motion.span
          initial={ini("hidden")}
          animate="show"
          variants={fromLeft}
          transition={{ duration: 0.75, ease, delay: 0.75 }}
          className={`block ${t.h1a}`}
        >
          Tu negocio,
        </motion.span>
        <motion.span
          initial={ini("hidden")}
          animate="show"
          variants={fromLeft}
          transition={{ duration: 0.75, ease, delay: 0.95 }}
          className={`block ${t.h1b}`}
        >
          tu sistema.
        </motion.span>
      </h1>

      {/* Figura: delante del titular. En celular la altura de la pantalla define su tamaño
          para que siempre se salga por el borde inferior; la cabeza queda a la derecha del texto. */}
      <motion.div
        aria-hidden="true"
        initial={instant ? false : { opacity: 0, y: "14%" }}
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
          priority={tone === "dark"}
          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 70vw, 112vw"
          className={`h-auto w-full ${t.img}`}
        />
        </div>
      </motion.div>

      {/* Texto y botones */}
      <div className="relative z-[3] mt-5 sm:mt-8 lg:mt-8">
        <motion.p
          initial={ini("hidden")}
          animate="show"
          variants={fromBelow}
          transition={{ duration: 0.6, ease, delay: 1.35 }}
          className={`max-w-[44%] font-body ${t.pz} leading-snug ${t.p} sm:max-w-md sm:leading-relaxed lg:max-w-[32rem]`}
        >
          <strong className={`font-semibold ${t.strong}`}>Software a medida</strong>, páginas web,
          automatización y agentes de WhatsApp.
        </motion.p>

        <motion.div
          initial={ini("hidden")}
          animate="show"
          variants={fromBelow}
          transition={{ duration: 0.6, ease, delay: 1.5 }}
          className="mt-6 flex flex-col items-start gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href="#hablemos"
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 font-body ${t.bz} font-bold uppercase tracking-wide transition-[transform,background-color] duration-200 ease-out active:scale-[0.97] sm:px-7 sm:py-3.5 ${t.btn1}`}
          >
            Hablemos
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href="#servicios"
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-6 py-3 font-body ${t.bz} font-bold uppercase tracking-wide transition-[transform,border-color] duration-200 ease-out active:scale-[0.97] sm:px-7 sm:py-3.5 ${t.btn2}`}
          >
            Ver servicios
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>
    </>
  );
}
