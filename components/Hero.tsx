"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroLaunch } from "@/components/HeroLaunch";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";

const SERVICES = ["Software a medida", "Páginas web", "Automatización", "Agentes de IA"];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const lineUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const [start, setStart] = useState(false);
  const [live, setLive] = useState(false);
  const onLive = useCallback(() => setLive(true), []);

  useEffect(() => {
    const onSplashDone = () => setStart(true);
    window.addEventListener("splash-done", onSplashDone);
    return () => window.removeEventListener("splash-done", onSplashDone);
  }, []);

  return (
    <section id="inicio" className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-20 sm:px-8 sm:pb-10 sm:pt-32 min-[900px]:px-12">
      <HeroLaunch start={start} onLive={onLive} />

      <div className="relative z-[1] mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <div className="mx-auto max-w-4xl text-center sm:mx-0 sm:text-left min-[900px]:max-w-[50%]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: start ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-accent/50 px-3 py-1.5 sm:gap-2.5 sm:px-4 sm:py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            <span className="font-body text-[10px] font-semibold tracking-[0.15em] text-brand-cream sm:text-xs">
              SOLUCIONES DIGITALES
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={start ? "show" : "hidden"}
            variants={lineUp}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="mt-7 hidden items-center gap-3 lg:flex"
          >
            <span className="font-body text-xs font-semibold tracking-[0.2em] text-brand-ink-on-black-soft">
              DESARROLLADOR DE SOLUCIONES DIGITALES
            </span>
            <span className="h-px flex-1 bg-brand-line-on-black" />
          </motion.div>

          <h1 className="mt-6 font-display text-[8vw] leading-[1.15] sm:mt-4 sm:text-6xl sm:leading-[0.98] xl:text-[4.6rem]">
            {[
              { text: "Tu idea,", className: "text-brand-cream" },
              {
                text: "en producción.",
                className: `transition-colors duration-700 ${live ? "text-brand-accent" : "text-brand-cream/25"}`,
              },
            ].map(({ text, className }, i) => (
              <motion.span
                key={text}
                initial="hidden"
                animate={start ? "show" : "hidden"}
                variants={lineUp}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}
                className={`block ${className}`}
              >
                {text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial="hidden"
            animate={start ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="mx-auto mt-4 max-w-xl font-body text-[13px] leading-normal text-brand-ink-on-black-soft sm:mx-0 sm:mt-6 sm:text-lg sm:leading-relaxed [@media(max-height:780px)]:mt-3"
          >
            Diseñamos e implementamos los{" "}
            <strong className="font-semibold text-brand-cream">sistemas</strong>{" "}
            que tu negocio necesita para dejar atrás las tareas manuales y
            seguir creciendo sin fricción.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={start ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:justify-start sm:gap-4 [@media(max-height:780px)]:mt-4"
          >
            <a
              href="#hablemos"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-4 py-2 font-body text-[11px] font-bold uppercase tracking-wide text-brand-black transition hover:scale-105 hover:opacity-90 sm:gap-2 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Hablemos
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={2.5} />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-cream/40 px-4 py-2 font-body text-[11px] font-bold uppercase tracking-wide text-brand-cream transition hover:scale-105 hover:border-brand-cream sm:gap-2 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Ver servicios
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={2.5} />
            </a>
          </motion.div>

          <div className="mt-6 hidden items-center gap-2 lg:flex">
            <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
              EXPLORAR
            </span>
            <ArrowDown className="h-3 w-3 text-brand-ink-on-black-soft" />
          </div>

        </div>

      </div>

      <motion.div
        initial="hidden"
        animate={start ? "show" : "hidden"}
        variants={fadeUp}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        className="relative z-[1] mx-auto flex w-full max-w-6xl flex-col items-center gap-2 pb-2 sm:hidden"
      >
        <span className="relative flex h-9 w-6 items-start justify-center rounded-full border-2 border-brand-accent/70 p-1.5">
          <span className="h-1.5 w-1 animate-scroll-wheel rounded-full bg-brand-accent" />
        </span>
        <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft">
          SEGUÍ DESCUBRIENDO
        </span>
        <ArrowDown className="h-3.5 w-3.5 text-brand-accent" />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={start ? "show" : "hidden"}
        variants={fadeUp}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        className="relative z-[1] mx-auto hidden w-full max-w-6xl flex-wrap items-center justify-start gap-3 pb-6 pt-4 sm:flex sm:pb-8 sm:pt-6"
      >
        {SERVICES.map((label, i) => (
          <span key={label} className="flex items-center gap-3 font-mono text-[9px] tracking-[0.15em] text-brand-ink-on-black-soft sm:text-xs">
            {i > 0 && <span className="text-brand-accent">/</span>}
            {label.toUpperCase()}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
