"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

const ITEMS = [
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Depende del alcance, pero como referencia: páginas web desde $8.000 hasta $25.000 UYU según complejidad; sistemas a medida desde USD 800–1.200 + USD 40–80/mes de mantenimiento; automatizaciones desde $10.000 UYU; agentes de WhatsApp/Instagram con mensualidad desde $3.000 UYU. La cotización final se ajusta a lo que tu negocio necesita, no vendemos paquetes cerrados.",
  },
  {
    q: "¿Cuánto tardan en entregar?",
    a: "Páginas web: 7 a 20 días. Sistemas a medida: 20 a 30 días. Automatizaciones y agentes de WhatsApp/Instagram: 10 a 15 días. Depende del alcance acordado en la propuesta.",
  },
  {
    q: "¿Cómo se paga?",
    a: "Adelanto para arrancar y el resto contra entrega.",
  },
  {
    q: "¿Qué pasa si algo falla después de entregado?",
    a: "30 días de garantía con arreglos sin costo. Pasado ese plazo, cualquier cambio, ajuste o función nueva se cotiza aparte.",
  },
  {
    q: "¿Los agentes de WhatsApp/Instagram tienen costo mensual?",
    a: "Sí: una mensualidad desde $3.000 UYU que cubre que el agente siga funcionando (API de WhatsApp Business, mantenimiento e IA detrás).",
  },
  {
    q: "¿Puedo pedir cambios o funciones nuevas más adelante?",
    a: "Sí, en cualquier momento — se cotiza como un alcance nuevo, igual que el proyecto original.",
  },
  {
    q: "¿Qué tecnología usan?",
    a: "Next.js/React para páginas web y sistemas a medida, WhatsApp Business API para los agentes, IA (OpenAI/Claude u otros modelos) para las respuestas automáticas, y n8n/Make/Zapier para conectar herramientas en las automatizaciones.",
  },
  {
    q: "¿Trabajan con paquetes cerrados?",
    a: "No — cada proyecto se cotiza según lo que tu negocio necesita. Los rangos de arriba son orientativos, no un catálogo de precios fijos.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="preguntas" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
            PREGUNTAS FRECUENTES
          </span>
          <span className="h-px flex-1 max-w-24 bg-brand-line-on-black" />
        </div>

        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-[1.1] text-brand-cream sm:text-5xl md:text-6xl">
          Lo que preguntan antes de arrancar.
        </h2>

        <FadeIn className="mt-10 flex flex-col gap-2 sm:mt-14">
          {ITEMS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div
                key={q}
                className="rounded-2xl border border-brand-line-on-black transition-colors hover:border-brand-accent/30"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="font-body text-sm font-semibold text-brand-cream sm:text-base">
                    {q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-brand-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:px-6 sm:pb-6">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}
