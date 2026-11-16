"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, type MotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Bar } from "@/components/Bar";

/* Hero (ver PRODUCT.md). Base oscura; tres copias (naranja, azul y otra vez oscura; aria-hidden, sin clics)
   se revelan una tras otra con una ola que sube, y el ciclo es oscuro, naranja, azul, oscuro. Con
   "reducir movimiento" queda fijo en oscuro. Hero oscuro: titular gigante en blanco semitransparente,
   detrás de una figura recortada (public/img/hero/hero-recorte.webp, generada con IA, PNG con alfa) que lo
   tapa apenas en el final de la última línea para dar profundidad. El naranja queda en la luz de la figura
   y de las barras de fondo; los botones son blancos. Los tamaños van en vw para que el solapamiento sea
   parecido en cualquier ancho. */

/* Entrada en dos tiempos (decidido por el fundador, 16/11/2026):
   1. a la vez: la figura sube desde abajo y el titular entra de izquierda a derecha, línea por línea
   2. después: la bajada y los botones ("Hablemos") suben desde abajo */
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
  orange: {
    h1a: "text-white",
    h1b: "text-white/80",
    img: "",
    p: "text-white",
    pz: "text-[15.5px] font-medium sm:text-xl",
    bz: "text-[13px] sm:text-[15px]",
    strong: "text-white",
    btn1: "bg-white text-[#0a0a0a] hover:bg-white/90",
    btn2: "border-white/70 text-white hover:border-white",
  },
  blue: {
    h1a: "text-white",
    h1b: "text-white/80",
    img: "[filter:brightness(1.35)_contrast(0.92)]",
    p: "text-white",
    pz: "text-[15px] font-medium sm:text-xl",
    bz: "text-[13px] sm:text-[15px]",
    strong: "text-white",
    btn1: "bg-white text-[#0a0a0a] hover:bg-white/90",
    btn2: "border-white/70 text-white hover:border-white",
  },
} as const;

type Tone = keyof typeof TONE;

// Máscara de la ola: borde ondulado e inclinado; se desplaza en vertical (300% del alto de la capa).
const WAVE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 300' preserveAspectRatio='none'%3E%3Cpath d='M0 138 C16 120 28 152 46 114 S82 94 100 64 V300 H0 Z'/%3E%3C/svg%3E\")";

const HOLD_MS = 6500;
const WAVE_S = 2;
const waveEase = [0.65, 0, 0.35, 1] as const;

const LAYERS: { tone: Tone; bg: string }[] = [
  { tone: "orange", bg: "bg-[#FF5C1A]" },
  { tone: "blue", bg: "bg-[linear-gradient(100deg,#19a0dc_0%,#0e66b3_38%,#0a4a8e_100%)]" },
  { tone: "dark", bg: "bg-[#0a0a0a]" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const p0 = useMotionValue(0); // naranja
  const p1 = useMotionValue(0); // azul
  const p2 = useMotionValue(0); // oscuro de nuevo
  const ps = [p0, p1, p2];
  const paused = useRef(false);

  // El menú se adapta al color que quedó arriba (ver globals.css).
  const sync = () => {
    const [a, b, c] = ps.map((m) => m.get());
    document.documentElement.dataset.hero = c > 0.7 ? "dark" : b > 0.7 ? "blue" : a > 0.7 ? "orange" : "dark";
  };
  useMotionValueEvent(p0, "change", sync);
  useMotionValueEvent(p1, "change", sync);
  useMotionValueEvent(p2, "change", sync);

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
        for (const m of [p0, p1, p2]) {
          await animate(m, 1, { duration: WAVE_S, ease: waveEase });
          if (m === p2) {
            // la capa oscura ya cubre todo: se reinician las tres, sin que se note
            p0.set(0);
            p1.set(0);
            p2.set(0);
          }
          await hold(HOLD_MS);
          if (!alive) return;
        }
      }
    })();
    return () => {
      alive = false;
      delete document.documentElement.dataset.hero;
    };
  }, [reduce, p0, p1, p2]);

  return (
    <section
      id="inicio"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      className={`relative isolate min-h-[100svh] overflow-hidden bg-[#0a0a0a] text-brand-cream ${PAD}`}
    >
      <Scene tone="dark" />
      {!reduce && LAYERS.map((l, i) => <WaveLayer key={l.tone + i} p={ps[i]} z={4 + i} bg={l.bg} tone={l.tone} />)}
    </section>
  );
}

// Capa que se revela con la ola: de -20% (queda toda por debajo del hero) a 100% (la ola ya pasó por arriba).
function WaveLayer({ p, z, bg, tone }: { p: MotionValue<number>; z: number; bg: string; tone: Tone }) {
  const pos = useTransform(p, (v) => `0% ${-20 + v * 120}%`);
  return (
    <motion.div
      aria-hidden="true"
      inert
      className={`pointer-events-none absolute inset-0 overflow-hidden text-white ${bg} ${PAD}`}
      style={{
        zIndex: z,
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
      <Scene tone={tone} instant />
    </motion.div>
  );
}

function Scene({ tone, instant = false }: { tone: Tone; instant?: boolean }) {
  const t = TONE[tone];
  const ini = (v: string) => (instant ? false : v);
  return (
    <>
      {/* Barras de luz de fondo (medidas sobre las maquetas): paralelogramos con borde duro,
          inicio y fin cortados y un degradé a lo ancho de la barra. Sin halos redondos. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${tone === "orange" ? "[&>span]:[background:rgba(13,11,8,0.1)]! [&>span]:[border-color:rgba(13,11,8,0.25)]!" : tone === "blue" ? "[&>span]:[background:rgba(255,255,255,0.07)]! [&>span]:[border-color:rgba(255,255,255,0.25)]!" : ""}`}
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

      {/* Titular gigante, detrás de la figura */}
      <h1 className="relative z-[1] font-impact font-black uppercase italic leading-[0.8] tracking-[-0.03em] [font-stretch:50%] text-[23.5vw] sm:text-[16vw] lg:text-[14.2vw] lg:leading-[0.82]">
        <motion.span
          initial={ini("hidden")}
          animate="show"
          variants={fromLeft}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className={`block ${t.h1a}`}
        >
          Tu negocio,
        </motion.span>
        <motion.span
          initial={ini("hidden")}
          animate="show"
          variants={fromLeft}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
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
        transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1], delay: 0 }}
        className="pointer-events-none absolute right-[calc(25vw-var(--fw)/2)] top-[72vw] z-[2] w-[var(--fw)] [--fw:max(97vw,calc((100svh-72vw)/1.15))] sm:right-[-9vw] sm:top-[max(40vw,calc(100svh-90vw))] sm:[--fw:70vw] lg:right-[-3.8vw] lg:top-[4.5rem] lg:[--fw:50vw]"
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
          transition={{ duration: 0.6, ease, delay: 0.8 }}
          className={`max-w-[44%] font-body ${t.pz} leading-snug ${t.p} sm:max-w-md sm:leading-relaxed lg:max-w-[32rem]`}
        >
          <strong className={`font-semibold ${t.strong}`}>Software a medida</strong>, páginas web,
          automatización y agentes de WhatsApp.
        </motion.p>

        <motion.div
          initial={ini("hidden")}
          animate="show"
          variants={fromBelow}
          transition={{ duration: 0.6, ease, delay: 0.95 }}
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
