"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, Layers, MessageSquare, ShieldCheck, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

/* Los cuatro pasos ya publicados en las subpáginas, ahora con "qué recibís" en cada uno.
   Los plazos son los mismos que figuran en las preguntas frecuentes. */
const STEPS: { icon: LucideIcon; title: string; desc: string; recibis: string }[] = [
  {
    icon: MessageSquare,
    title: "Relevamiento del negocio",
    desc: "Análisis de cómo opera hoy y qué lo está frenando.",
    recibis: "Un diagnóstico de lo que hoy genera fricción.",
  },
  {
    icon: FileText,
    title: "Propuesta de solución",
    desc: "Alcance claro, sin letra chica.",
    recibis: "Alcance, plazos y valores definidos antes de empezar.",
  },
  {
    icon: Layers,
    title: "Desarrollo",
    desc: "Construcción del software o el sitio.",
    recibis: "Avances visibles que validás en cada etapa.",
  },
  {
    icon: ShieldCheck,
    title: "Acompañamiento",
    desc: "Ajustes y soporte una vez en marcha.",
    recibis: "30 días de garantía con arreglos sin costo.",
  },
];

const PLAZOS = [
  { k: "Páginas web", min: 7, max: 20 },
  { k: "Sistemas a medida", min: 20, max: 30 },
  { k: "Automatizaciones", min: 10, max: 15 },
  { k: "Agentes de IA", min: 10, max: 15 },
];
const EJE_MAX = 30;

export function Proceso() {
  const reduce = useReducedMotion();

  return (
    <section id="proceso" className="tono-claro relative overflow-hidden bg-brand-black-soft px-5 py-14 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
              PASO A PASO
            </span>
            <span className="h-px max-w-24 flex-1 bg-brand-line-on-black" />
          </div>

          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-[1.1] text-brand-cream sm:text-5xl md:text-6xl">
            De la idea a la solución funcionando.
          </h2>
        </FadeIn>

        <ol className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:mx-0 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-8">
          {STEPS.map(({ icon: Icon, title, desc, recibis }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : i * 0.1 }}
              className="relative w-[82%] shrink-0 snap-center sm:w-auto"
            >
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-14 right-[-2rem] top-7 hidden h-0.5 bg-[#1a1712]/25 lg:block"
                />
              )}
              <div className="relative hidden items-center gap-3 lg:flex">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#1a1712] bg-[#ff5c1a] shadow-[3px_3px_0_#1a1712]">
                  <Icon className="h-6 w-6 text-[#1a1712]" strokeWidth={1.75} />
                </span>
                <span className="font-mono text-sm text-brand-ink-on-black-soft">0{i + 1}</span>
              </div>

              <div className="rounded-xl border-2 border-[#1a1712] bg-[#f6f1e7] p-5 shadow-[5px_5px_0_#1a1712] lg:mt-5">
                <div className="mb-3 flex items-center gap-3 lg:hidden">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1a1712] bg-[#ff5c1a]">
                    <Icon className="h-5 w-5 text-[#1a1712]" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-sm text-brand-ink-on-black-soft">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl leading-tight text-brand-cream">{title}</h3>
                <p className="mt-2 font-body text-sm leading-snug text-brand-ink-on-black-soft">{desc}</p>
                <div className="mt-4 border-t-2 border-dashed border-[#1a1712]/25 pt-4">
                  <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-brand-accent">
                    QUÉ RECIBÍS
                  </span>
                  <p className="mt-1 font-body text-sm font-semibold leading-snug text-brand-cream">{recibis}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <FadeIn className="mt-14 rounded-xl border-2 border-[#1a1712] bg-[#f6f1e7] p-6 shadow-[6px_6px_0_#ff5c1a] sm:mt-20 sm:p-8">
          <h3 className="font-display text-2xl leading-tight text-brand-cream sm:text-3xl">
            Cuánto demora el desarrollo
          </h3>
          <p className="mt-2 font-body text-sm text-brand-ink-on-black-soft">
            Plazo según el servicio, en días. Depende del alcance acordado en la propuesta.
          </p>

          <ul className="mt-8 flex flex-col gap-5">
            {PLAZOS.map(({ k, min, max }, i) => (
              <li key={k} className="grid items-center gap-2 sm:grid-cols-[11rem_1fr_8rem] sm:gap-4">
                <span className="font-body text-sm font-semibold text-brand-cream">{k}</span>
                <div className="relative h-4 rounded-full border-2 border-[#1a1712] bg-[#fffdf8]" aria-hidden="true">
                  <motion.span
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.15 + i * 0.1 }}
                    style={{
                      left: `${(min / EJE_MAX) * 100}%`,
                      width: `${((max - min) / EJE_MAX) * 100}%`,
                      transformOrigin: "left",
                    }}
                    className="absolute -top-[2px] bottom-[-2px] rounded-full border-2 border-[#1a1712] bg-[#ff5c1a]"
                  />
                </div>
                <span className="whitespace-nowrap font-mono text-sm text-brand-cream sm:text-right">
                  {min} a {max} días
                </span>
              </li>
            ))}
          </ul>
          <div
            aria-hidden="true"
            className="mt-2 hidden grid-cols-[11rem_1fr_8rem] gap-4 font-mono text-[10px] text-brand-ink-on-black-soft sm:grid"
          >
            <span />
            <div className="flex justify-between">
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
            </div>
            <span />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
