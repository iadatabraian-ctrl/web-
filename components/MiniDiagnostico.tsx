"use client";

import { useState } from "react";
import { ArrowRight, AppWindow, ClipboardList, Unlink, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";

const PROBLEMS = [
  {
    icon: AppWindow,
    title: "Un sitio que no vende",
    desc: "Una página vieja o armada con plantillas no genera confianza ni convierte visitas en clientes.",
  },
  {
    icon: ClipboardList,
    title: "Procesos armados a mano",
    desc: "Planillas, papeles y WhatsApp sueltos en vez de un sistema que ordena la operación diaria.",
  },
  {
    icon: Unlink,
    title: "Herramientas que no conversan entre sí",
    desc: "Cada área usa lo suyo y nadie tiene una vista completa de cómo va el negocio.",
  },
  {
    icon: TrendingUp,
    title: "Decisiones sin datos reales",
    desc: "Sin información clara, todo se maneja por intuición y se pierden oportunidades de crecimiento.",
  },
];

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
    <section id="diagnostico-rapido" className="relative overflow-hidden bg-brand-black-soft px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <FadeIn className="text-center">
          <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
            MINI DIAGNÓSTICO
          </span>
          <h2 className="mt-4 font-display text-3xl leading-[1.1] text-brand-cream sm:text-5xl md:text-6xl">
            ¿Qué está frenando tu negocio hoy?
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sm text-brand-ink-on-black-soft sm:text-base">
            Elegí la opción que más se parezca a tu situación.
          </p>
        </FadeIn>

        <div className="mt-10 sm:mt-12">
          {PROBLEMS.map(({ icon: Icon, title, desc }, i) => {
            const isSelected = selected === i;
            const isLast = i === PROBLEMS.length - 1;
            const result = RESULTS[title];
            const showTail = isSelected || !isLast;

            return (
              <div key={title} className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectProblem(i)}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:h-16 sm:w-16 ${
                      isSelected
                        ? "border-brand-accent"
                        : "border-brand-cream/25 hover:border-brand-accent/50"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${isSelected ? "text-brand-accent" : "text-brand-cream"}`}
                      strokeWidth={1.75}
                    />
                  </button>
                  {showTail && (
                    <span className="mt-2 w-px flex-1 bg-brand-line-on-black" />
                  )}
                </div>

                <div className={showTail ? "flex-1 pb-8 sm:pb-10" : "flex-1"}>
                  <button
                    type="button"
                    onClick={() => selectProblem(i)}
                    className="w-full text-left"
                  >
                    <span className="font-mono text-xs text-brand-ink-on-black-soft sm:text-sm">
                      0{i + 1}
                    </span>
                    <h3
                      className={`mt-1 font-display text-xl sm:text-3xl ${isSelected ? "text-brand-accent" : "text-brand-cream"}`}
                    >
                      {title}
                    </h3>
                    <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
                      {desc}
                    </p>
                  </button>

                  <AnimatePresence initial={false}>
                    {isSelected && result && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 max-w-xl border-l-2 border-brand-accent/40 pl-4 sm:pl-6">
                          <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft">
                            ¿CUÁNTAS HORAS POR SEMANA PERDÉS EN ESO?
                          </span>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {HOURS_OPTIONS.map((hours, hi) => (
                              <button
                                key={hours.label}
                                type="button"
                                onClick={() => setHoursIndex(hi)}
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
                                <div className="mt-5">
                                  <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft">
                                    SERVICIO RECOMENDADO
                                  </span>
                                  <p className="mt-1 font-display text-xl text-brand-cream sm:text-2xl">
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

                  {!isLast && <hr className="mt-6 max-w-xl border-brand-line-on-black sm:mt-8" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
