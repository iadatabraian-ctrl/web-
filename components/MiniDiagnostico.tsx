"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StepItem } from "@/components/StepItem";
import { ITEMS as PROBLEMS } from "@/components/Diagnostico";
import { FadeIn } from "@/components/FadeIn";
import { SectionGlow } from "@/components/SectionGlow";

const RESULTS: Record<string, { service: string; reason: string }> = {
  "Un sitio que no vende": {
    service: "Páginas web",
    reason:
      "Necesitás un sitio rápido y claro que convierta visitas en clientes, no una tarjeta de presentación digital.",
  },
  "Procesos armados a mano": {
    service: "Software a medida",
    reason:
      "Un sistema a medida ordena tu operación diaria en vez de depender de planillas sueltas.",
  },
  "Herramientas que no conversan entre sí": {
    service: "Automatizaciones",
    reason:
      "Conectamos tus herramientas para que dejen de trabajar por separado.",
  },
  "Decisiones sin datos reales": {
    service: "Software a medida (paneles con datos)",
    reason:
      "Un panel a medida te muestra en tiempo real cómo va tu negocio, no supuestos.",
  },
};

const HOURS_OPTIONS = [
  { label: "1-5hs", min: 1, max: 5 },
  { label: "5-10hs", min: 5, max: 10 },
  { label: "10+hs", min: 10, max: null as number | null },
];

function monthlyEstimate(hours: (typeof HOURS_OPTIONS)[number]) {
  const min = hours.min * 4;
  if (hours.max === null) return `~${min}+ horas al mes`;
  return `~${min}-${hours.max * 4} horas al mes`;
}

function whatsappUrl(title: string, hours: (typeof HOURS_OPTIONS)[number]) {
  const problema = title.charAt(0).toLowerCase() + title.slice(1);
  const rango = hours.label.replace(/hs$/, "");
  const text = `Hola, mi negocio tiene problemas con ${problema} y pierdo ~${rango}hs/semana, quiero una consulta`;
  return `https://wa.me/59898648853?text=${encodeURIComponent(text)}`;
}

export function MiniDiagnostico() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hoursIndex, setHoursIndex] = useState<number | null>(null);

  function selectProblem(i: number) {
    setSelected(selected === i ? null : i);
    setHoursIndex(null);
  }

  return (
    <section id="diagnostico-rapido" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <SectionGlow position="bottom-right" />
      <div className="mx-auto max-w-2xl">
        <FadeIn className="text-center">
          <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
            MINI DIAGNÓSTICO
          </span>
          <h2 className="mt-4 font-display text-[9vw] leading-[1.1] text-brand-cream sm:text-5xl md:text-6xl">
            ¿Qué está frenando tu negocio hoy?
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sm text-brand-ink-on-black-soft sm:text-base">
            Elegí la opción que más se parezca a tu situación.
          </p>
        </FadeIn>

        <div className="mt-10 flex flex-col gap-3 sm:mt-12">
          {PROBLEMS.map(({ icon, title, desc }, i) => {
            const isSelected = selected === i;
            const result = RESULTS[title];

            return (
              <div
                key={title}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => selectProblem(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectProblem(i);
                  }
                }}
                className={`cursor-pointer rounded-2xl border p-5 transition-colors sm:p-6 ${
                  isSelected
                    ? "border-brand-accent/60 bg-brand-accent/5"
                    : "border-brand-line-on-black hover:border-brand-accent/30"
                }`}
              >
                <StepItem
                  icon={icon}
                  index={i}
                  title={title}
                  desc={desc}
                  isLast
                  variant="compact"
                />

                <AnimatePresence initial={false}>
                  {isSelected && result && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 border-t border-brand-line-on-black pt-4">
                        <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft">
                          ¿CUÁNTAS HORAS POR SEMANA PERDÉS EN ESO?
                        </span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {HOURS_OPTIONS.map((hours, hi) => (
                            <button
                              key={hours.label}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setHoursIndex(hi);
                              }}
                              className={`rounded-full border px-4 py-2 font-body text-xs font-semibold tracking-wide transition ${
                                hoursIndex === hi
                                  ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                                  : "border-brand-line-on-black text-brand-ink-on-black-soft hover:border-brand-accent/40"
                              }`}
                            >
                              {hours.label}
                            </button>
                          ))}
                        </div>

                        <AnimatePresence initial={false}>
                          {hoursIndex !== null && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 border-t border-brand-line-on-black pt-4">
                                <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft">
                                  SERVICIO RECOMENDADO
                                </span>
                                <p className="mt-1 font-display text-xl text-brand-accent sm:text-2xl">
                                  {result.service}
                                </p>
                                <p className="mt-2 font-body text-sm leading-relaxed text-brand-ink-on-black-soft">
                                  {result.reason}
                                </p>
                                <p className="mt-3 font-body text-sm font-semibold text-brand-cream">
                                  {monthlyEstimate(HOURS_OPTIONS[hoursIndex])}
                                </p>
                                <a
                                  href={whatsappUrl(title, HOURS_OPTIONS[hoursIndex])}
                                  target="_blank"
                                  rel="noopener"
                                  onClick={(e) => e.stopPropagation()}
                                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-brand-black transition hover:scale-105 hover:opacity-90 sm:w-auto"
                                >
                                  Hablemos de esto
                                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
