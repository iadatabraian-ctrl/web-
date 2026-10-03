"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { PhoneFrame } from "@/components/servicios/PhoneFrame";

type Msg = { from: "cliente" | "agente"; text: string; step: number };

const MSGS: Msg[] = [
  { from: "cliente", text: "Hola, ¿cuánto sale la cuota mensual?", step: 0 },
  { from: "agente", text: "Hola. La cuota mensual libre es de $1.800 e incluye todas las clases. ¿Desea conocer los horarios?", step: 1 },
  { from: "cliente", text: "Sí, y quisiera ir a probar mañana.", step: 2 },
  { from: "agente", text: "Perfecto. Lo anoto para mañana a las 18:00. Una persona del equipo lo recibirá en recepción.", step: 3 },
];

const STEPS = [
  { t: "Llega la consulta", d: "El cliente escribe a cualquier hora, por WhatsApp o Instagram." },
  { t: "Respuesta inmediata", d: "El agente responde con la información real del negocio." },
  { t: "Califica el interés", d: "Detecta si la persona quiere avanzar y qué necesita." },
  { t: "Deriva a una persona", d: "Cuando corresponde, avisa al equipo con todo el contexto." },
];

const WAIT = [700, 2300, 2300, 2500];

export function ShowcaseAgents() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [shown, setShown] = useState(reduce ? MSGS.length : 0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduce || !inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 0;
    MSGS.forEach((m, i) => {
      t += WAIT[i];
      if (m.from === "agente") {
        timers.push(setTimeout(() => !cancelled && setTyping(true), t - 1300));
      }
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setShown(i + 1);
        }, t),
      );
    });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce]);

  const step = shown === 0 ? -1 : MSGS[shown - 1].step;
  const derivado = shown === MSGS.length;

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

        <PhoneFrame className="mx-auto w-[210px] sm:w-[290px]">
          <div className="flex h-full flex-col bg-[#0b141a]">
            <div className="flex items-center gap-3 bg-[#1f2c34] px-4 pb-3 pt-9">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent font-display text-sm text-brand-black">
                /
              </span>
              <div className="leading-tight">
                <p className="font-body text-[12px] font-semibold text-white">Asistente virtual</p>
                <p className="font-body text-[10px] text-[#8696a0]">{typing ? "escribiendo…" : "en línea"}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 pb-4">
              <AnimatePresence initial={false}>
                {MSGS.slice(0, shown).map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`max-w-[84%] rounded-xl px-3 py-2 font-body text-[11px] leading-snug text-[#e9edef] ${
                      m.from === "cliente" ? "self-start bg-[#202c33]" : "self-end bg-[#005c4b]"
                    }`}
                  >
                    {m.text}
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex w-12 items-center justify-center gap-1 self-end rounded-xl bg-[#005c4b] py-2.5"
                  >
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                        className="h-1.5 w-1.5 rounded-full bg-white"
                      />
                    ))}
                  </motion.div>
                )}
                {derivado && (
                  <motion.div
                    key="deriva"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="mt-1 self-center rounded-full border border-brand-accent/60 px-3 py-1 font-mono text-[9px] tracking-wide text-brand-accent"
                  >
                    DERIVADO AL EQUIPO
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </section>
  );
}
