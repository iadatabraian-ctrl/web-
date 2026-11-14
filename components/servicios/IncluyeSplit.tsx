"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

/* Qué incluye en pantalla partida (referencia: Extravagante). Al bajar, la pantalla queda fija
   y cambia el ítem activo: a la izquierda la palabra gigante y su descripción; a la derecha un
   bloque de color plano con el número. 5-6 ítems: un tramo de scroll por ítem. */

const COLORS = [
  { bg: "#FF5C1A", fg: "#0d0b08" },
  { bg: "#0d0b08", fg: "#FF5C1A" },
];

export function IncluyeSplit({ items }: { items: { t: string; d: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const n = items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));

  const c = COLORS[i % 2];

  return (
    <div ref={ref} style={{ height: `${n * 70 + 30}svh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col-reverse overflow-hidden bg-brand-cream text-brand-ink-on-cream md:flex-row">
        {/* Izquierda: palabra gigante */}
        <div className="relative flex flex-1 flex-col justify-between px-5 pb-8 pt-6 sm:px-10 md:basis-1/2 md:pb-12 md:pt-24 lg:px-[5vw]">
          <p className="origin-bottom-left -skew-x-[5deg] font-impact text-[1.4rem] font-black uppercase not-italic leading-none [font-stretch:80%] sm:text-3xl">
            Qué incluye
          </p>

          <div className="relative min-h-[11rem] md:min-h-[22rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="origin-bottom-left -skew-x-[5deg] text-balance font-impact text-[clamp(2.1rem,9vw,3.6rem)] font-black uppercase not-italic leading-[0.92] tracking-[-0.01em] [font-stretch:80%] md:text-[clamp(2.6rem,5.2vw,5.4rem)]">
                  {items[i].t}
                </h3>
                <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-brand-ink-on-cream-soft sm:mt-5 sm:text-lg">
                  {items[i].d}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-1.5" aria-hidden="true">
            {items.map((_, k) => (
              <span key={k} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${k <= i ? "bg-brand-accent" : "bg-brand-ink-on-cream/15"}`} />
            ))}
          </div>
        </div>

        {/* Derecha: bloque de color con el número */}
        <motion.div
          animate={{ backgroundColor: c.bg }}
          transition={{ duration: 0.5 }}
          className="relative flex h-[34svh] shrink-0 items-center justify-center overflow-hidden pt-16 md:h-auto md:flex-1 md:basis-1/2 md:pt-0"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: c.fg }}
              className="select-none font-impact text-[34vw] font-black not-italic leading-none [font-stretch:80%] md:text-[22vw]"
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span aria-hidden="true" className="absolute bottom-4 right-5 font-mono text-xs font-bold md:bottom-8 md:right-8" style={{ color: c.fg }}>
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </motion.div>
      </div>
      <ul className="sr-only">
        {items.map((it) => (
          <li key={it.t}>
            {it.t}. {it.d}
          </li>
        ))}
      </ul>
    </div>
  );
}
