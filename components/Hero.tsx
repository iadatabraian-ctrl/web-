"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrowserFrame } from "@/components/servicios/BrowserFrame";
import { PhoneFrame } from "@/components/servicios/PhoneFrame";

/* Hero oscuro con luz naranja (ver PRODUCT.md). El visual es el producto real:
   el panel y la app de Deploy Fit (demos con datos de ejemplo). */
const SERVICES = ["Software a medida", "Páginas web", "Automatización", "Agentes de IA"];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [start, setStart] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const onSplashDone = () => setStart(true);
    window.addEventListener("splash-done", onSplashDone);
    return () => window.removeEventListener("splash-done", onSplashDone);
  }, []);

  // "en producción." se enciende un instante después de que arranca el hero
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setLive(true), 700);
    return () => clearTimeout(t);
  }, [start]);

  return (
    <section
      id="inicio"
      className="aura-ember relative overflow-hidden px-5 pb-14 pt-24 text-brand-cream sm:px-8 sm:pb-16 sm:pt-28 lg:flex lg:min-h-[100svh] lg:items-center min-[900px]:px-12"
    >
      <div className="grid-hud pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Palabra de marca gigante, de fondo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[6%] select-none text-center font-display text-[clamp(8rem,36vw,32rem)] uppercase leading-[0.85]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(246,241,231,0.20) 0%, rgba(246,241,231,0.05) 60%, rgba(246,241,231,0) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Deploy
      </span>

      {/* Estelas diagonales: la barra "/" del logo hecha luz */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="slash-beam absolute -top-[10%] right-[18%] h-[130%] w-3 opacity-60" />
        <span className="slash-beam absolute -top-[10%] right-[10%] h-[130%] w-1.5 opacity-40" />
        <span className="slash-beam absolute -top-[10%] right-[3%] h-[130%] w-5 opacity-25" />
      </div>

      <div className="relative z-[1] mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        {/* Texto */}
        <div className="mx-auto max-w-xl text-center sm:mx-0 sm:max-w-none sm:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: start ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-accent/50 px-3 py-1.5 sm:gap-2.5 sm:px-4 sm:py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-cream sm:text-xs">
              Soluciones digitales
            </span>
          </motion.div>

          <h1 className="mt-5 text-balance font-display text-[11vw] leading-[1.02] sm:text-6xl lg:text-[3.6rem] xl:text-[4.4rem]">
            <motion.span
              initial="hidden"
              animate={start ? "show" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.45, ease, delay: 0.1 }}
              className="block text-brand-cream"
            >
              Tu idea,
            </motion.span>
            <motion.span
              initial="hidden"
              animate={start ? "show" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.45, ease, delay: 0.2 }}
              className={`block transition-colors duration-700 ${live ? "text-brand-accent" : "text-brand-cream/25"}`}
            >
              en producción.
            </motion.span>
          </h1>

          <motion.p
            initial="hidden"
            animate={start ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, ease, delay: 0.4 }}
            className="mx-auto mt-4 max-w-md font-body text-[15px] leading-relaxed text-brand-ink-on-black-soft sm:mx-0 sm:mt-5 sm:text-lg"
          >
            Diseñamos e implementamos los{" "}
            <strong className="font-semibold text-brand-cream">sistemas</strong> que tu negocio
            necesita para dejar atrás las tareas manuales y seguir creciendo sin fricción.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={start ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, ease, delay: 0.5 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4"
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

          <motion.ul
            initial="hidden"
            animate={start ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, ease, delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-2 sm:justify-start"
          >
            {SERVICES.map((label, i) => (
              <li
                key={label}
                className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-ink-on-black-soft sm:text-xs"
              >
                {i > 0 && <span className="text-brand-accent">/</span>}
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Producto real: panel + app, con etiquetas tipo consola */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: start ? 1 : 0, y: start ? 0 : 28 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[640px]"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative pb-10"
          >
            <BrowserFrame
              url="panel.deployfit.com · administrador"
              className="w-[94%] ring-1 ring-brand-accent/30"
            >
              <div className="relative aspect-[16/10] bg-[#eef2f6]">
                <Image
                  src="/img/demos/gimnasio/admin-dashboard.webp"
                  alt="Panel de administración de un gimnasio, desarrollado por Deploy"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </BrowserFrame>

            <div className="absolute bottom-0 right-0 w-[27%] max-w-[170px]">
              <PhoneFrame className="w-full ring-brand-accent/30">
                <Image
                  src="/img/demos/gimnasio/socio-inicio.webp"
                  alt="Aplicación para socios de un gimnasio, desarrollada por Deploy"
                  fill
                  sizes="170px"
                  className="object-contain object-top"
                />
              </PhoneFrame>
            </div>

            <div className="glass-tag absolute -top-4 left-3 hidden rounded-xl border border-brand-cream/15 px-3 py-2 sm:block">
              <p className="hud-tag">$ deploy --env production</p>
            </div>
            <div className="glass-tag absolute -left-2 bottom-3 hidden rounded-xl border border-brand-cream/15 px-3 py-2 min-[900px]:block">
              <p className="hud-tag flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                en producción
              </p>
            </div>
          </motion.div>

          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-brand-ink-on-black-soft sm:text-right">
            Sistema desarrollado por Deploy · datos de ejemplo
          </p>
        </motion.div>
      </div>
    </section>
  );
}
