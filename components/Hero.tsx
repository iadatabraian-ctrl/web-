"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowDown, Code2, Settings2, BrainCircuit, Globe } from "lucide-react";

const ICONS = [
  { icon: Code2, label: "Software a medida" },
  { icon: Settings2, label: "Automatización" },
  { icon: BrainCircuit, label: "IA & Agentes" },
  { icon: Globe, label: "Desarrollo web" },
];

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

  useEffect(() => {
    const onSplashDone = () => setStart(true);
    window.addEventListener("splash-done", onSplashDone);
    return () => window.removeEventListener("splash-done", onSplashDone);
  }, []);

  return (
    <section id="inicio" className="relative overflow-hidden px-5 pb-6 pt-6 sm:px-8 sm:pb-16 sm:pt-16">
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: [1.08, 1.14, 1.08] }}
        transition={{
          opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 20, ease: "easeInOut", repeat: Infinity },
        }}
        className="absolute inset-x-0 bottom-0 top-3 sm:top-4"
      >
        <Image
          src="/img/hero/hero-photo-mobile.png"
          alt="Persona trabajando de espaldas frente a una laptop, iluminación turquesa"
          fill
          priority
          className="object-cover object-[center_78%] lg:object-[center_68%]"
          sizes="100vw"
        />
      </motion.div>

      <div className="relative mx-auto flex min-h-[95dvh] max-w-6xl flex-col justify-start lg:min-h-[88vh]">
        <div className="max-w-4xl">
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

          <h1 className="mt-8 font-display text-[9vw] leading-[1.25] sm:mt-4 sm:text-6xl sm:leading-[0.98] xl:text-[4.6rem]">
            {[
              { text: "Sistemas digitales,", className: "text-brand-cream" },
              { text: "Construidos a medida", className: "text-hero-outline" },
              { text: "de tu operación.", className: "text-brand-accent" },
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
            className="mt-8 max-w-xl font-body text-[13px] leading-loose text-brand-ink-on-black-soft sm:mt-6 sm:text-lg sm:leading-relaxed"
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
            className="mt-9 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4"
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

          <motion.div
            initial="hidden"
            animate={start ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-8 flex gap-3 sm:mt-10 lg:hidden"
          >
            <span className="w-px bg-brand-accent" />
            <div className="flex flex-col justify-center gap-1.5">
              {["IDEAS", "SISTEMAS", "RESULTADOS"].map((word) => (
                <span
                  key={word}
                  className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft"
                >
                  {word}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate={start ? "show" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
          className="mt-auto flex flex-col items-center gap-2 pb-2 sm:hidden"
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
          className="hidden grid-cols-4 gap-2 pt-4 sm:mt-16 sm:grid sm:max-w-2xl sm:gap-6 sm:pt-0"
        >
          {ICONS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center sm:gap-2.5">
              <Icon className="h-5 w-5 text-brand-accent sm:h-6 sm:w-6" strokeWidth={1.75} />
              <span className="font-body text-[9px] leading-tight text-brand-cream sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
