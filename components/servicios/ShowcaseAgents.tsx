"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ChatPhone, MSGS, useChatPlayback } from "@/components/servicios/AgentChat";

const STEPS = [
  { t: "Llega la consulta", d: "El cliente escribe a cualquier hora, por WhatsApp o Instagram." },
  { t: "Respuesta inmediata", d: "El agente responde con la información real del negocio." },
  { t: "Califica el interés", d: "Detecta si la persona quiere avanzar y qué necesita." },
  { t: "Deriva a una persona", d: "Cuando corresponde, avisa al equipo con todo el contexto." },
];

export function ShowcaseAgents() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const { shown, typing, derivado } = useChatPlayback(inView);

  const step = shown === 0 ? -1 : MSGS[shown - 1].step;

  return (
    <section className="relative overflow-hidden bg-brand-black-soft px-5 py-12 sm:px-8 sm:py-28">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <p className="font-mono text-xs tracking-[0.15em] text-brand-accent">ASÍ FUNCIONA</p>
          <h2 className="mt-3 max-w-xl text-2xl text-brand-cream sm:text-5xl">
            Una conversación real, de la consulta al cierre.
          </h2>
          <ol className="mt-6 flex max-w-lg flex-col gap-1 sm:mt-10">
            {STEPS.map((s, i) => (
              <li
                key={s.t}
                className={`flex gap-4 rounded-xl border px-4 py-3 transition-colors duration-500 ${
                  step === i ? "border-brand-accent/50 bg-brand-accent/[0.07]" : "border-transparent"
                }`}
              >
                <span
                  className={`font-mono text-xs transition-colors duration-500 ${
                    step >= i ? "text-brand-accent" : "text-brand-ink-on-black-soft"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-body text-base font-semibold normal-case tracking-normal text-brand-cream">{s.t}</h3>
                  <p className="mt-1 font-body text-sm leading-relaxed text-brand-ink-on-black-soft">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ChatPhone shown={shown} typing={typing} derivado={derivado} className="mx-auto w-[210px] sm:w-[290px]" />
      </div>
    </section>
  );
}
