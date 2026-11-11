"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PhoneFrame } from "@/components/servicios/PhoneFrame";

export type Msg = { from: "cliente" | "agente"; text: string; step: number };

export const MSGS: Msg[] = [
  { from: "cliente", text: "Hola, ¿cuánto sale la cuota mensual?", step: 0 },
  { from: "agente", text: "Hola. La cuota mensual libre es de $1.800 e incluye todas las clases. ¿Desea conocer los horarios?", step: 1 },
  { from: "cliente", text: "Sí, y quisiera ir a probar mañana.", step: 2 },
  { from: "agente", text: "Perfecto. Lo anoto para mañana a las 18:00. Una persona del equipo lo recibirá en recepción.", step: 3 },
];

const WAIT = [700, 2300, 2300, 2500];

/* Reproduce la conversación cuando `active` pasa a true. */
export function useChatPlayback(active: boolean) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? MSGS.length : 0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduce || !active) return;
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
  }, [active, reduce]);

  return { shown, typing, derivado: shown === MSGS.length };
}

export function ChatPhone({
  shown,
  typing,
  derivado,
  className = "",
  tone = "dark",
}: {
  shown: number;
  typing: boolean;
  derivado: boolean;
  className?: string;
  tone?: "dark" | "paper";
}) {
  return (
    <PhoneFrame className={className} tone={tone}>
      <div className="flex h-full flex-col bg-[#0b141a]">
        <div className="flex items-center gap-3 bg-[#1f2c34] px-4 pb-3 pt-9">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent font-display text-sm text-[#1a1712]">
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
  );
}
