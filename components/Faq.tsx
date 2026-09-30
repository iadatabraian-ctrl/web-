"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

type Item = {
  q: string;
  a?: string;
  list?: { k: string; v: string }[];
  note?: string;
};

const ITEMS: Item[] = [
  {
    q: "¿Cuánto cuesta un proyecto?",
    list: [
      { k: "Páginas web", v: "desde $8.000 hasta $25.000 UYU según complejidad" },
      { k: "Sistemas a medida", v: "desde USD 800–1.200 + USD 40–80/mes de mantenimiento" },
      { k: "Automatizaciones", v: "desde $10.000 UYU" },
      { k: "Agentes de WhatsApp/Instagram", v: "mensualidad desde $3.000 UYU" },
    ],
    note: "La cotización final se ajusta a lo que tu negocio necesita, no vendemos paquetes cerrados.",
  },
  {
    q: "¿Cuánto tardan en entregar?",
    list: [
      { k: "Páginas web", v: "7 a 20 días" },
      { k: "Sistemas a medida", v: "20 a 30 días" },
      { k: "Automatizaciones", v: "10 a 15 días" },
      { k: "Agentes de WhatsApp/Instagram", v: "10 a 15 días" },
    ],
    note: "Depende del alcance acordado en la propuesta.",
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
    list: [
      { k: "Páginas web y sistemas a medida", v: "Next.js / React" },
      { k: "Agentes de WhatsApp/Instagram", v: "WhatsApp Business API + IA (OpenAI/Claude u otros modelos)" },
      { k: "Automatizaciones", v: "n8n / Make / Zapier" },
    ],
  },
  {
    q: "¿Trabajan con paquetes cerrados?",
    a: "No — cada proyecto se cotiza según lo que tu negocio necesita. Los rangos de arriba son orientativos, no un catálogo de precios fijos.",
  },
];

function itemText({ a, list, note }: Item) {
  const body = a ?? list!.map(({ k, v }) => `${k}: ${v}.`).join(" ");
  return note ? `${body} ${note}` : body;
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: itemText(item) },
  })),
};

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="preguntas" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
          {ITEMS.map(({ q, a, list, note }, i) => {
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
                      <div className="px-5 pb-5 font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:px-6 sm:pb-6">
                        {list ? (
                          <ul className="flex flex-col gap-2">
                            {list.map(({ k, v }) => (
                              <li key={k} className="flex flex-col sm:flex-row sm:gap-2">
                                <span className="font-semibold text-brand-cream">{k}:</span>
                                <span>{v}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>{a}</p>
                        )}
                        {note && <p className={list ? "mt-3" : "mt-2"}>{note}</p>}
                      </div>
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
