"use client";

import { MessageSquare, FileText, Layers, ShieldCheck } from "lucide-react";
import { StepItem } from "@/components/StepItem";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Relevamiento del negocio",
    desc: "Análisis de cómo opera hoy y qué lo está frenando.",
  },
  {
    icon: FileText,
    title: "Propuesta de solución",
    desc: "Alcance claro, sin letra chica.",
  },
  {
    icon: Layers,
    title: "Desarrollo",
    desc: "Construcción del software o el sitio.",
  },
  {
    icon: ShieldCheck,
    title: "Acompañamiento",
    desc: "Ajustes y soporte una vez en marcha.",
  },
];

export function Proceso() {
  return (
    <section id="proceso" className="relative bg-brand-black px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
            PASO A PASO
          </span>
          <span className="h-px flex-1 max-w-24 bg-brand-line-on-black" />
        </div>

        <h2 className="mt-4 max-w-2xl font-display text-[9vw] leading-[0.98] tracking-tight text-brand-cream sm:text-5xl md:text-6xl">
          De la idea a la solución funcionando.
        </h2>

        <div className="mt-10 sm:mt-14">
          {STEPS.map(({ icon, title, desc }, i) => (
            <StepItem
              key={title}
              icon={icon}
              index={i}
              title={title}
              desc={desc}
              isLast={i === STEPS.length - 1}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
