"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* Frases grandes de a una que van cambiando (cada 6 s; se detiene al interactuar). */
export function CuandoConviene({ items }: { items: string[] }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotion();
  const n = items.length;
  const go = (to: number, manual = false) => {
    setI(((to % n) + n) % n);
    if (manual) setAuto(false);
  };

  useEffect(() => {
    if (!auto || reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), 6000);
    return () => clearTimeout(t);
  }, [i, auto, reduce, n]);

  return (
    <div role="group" aria-roledescription="carrusel" aria-label="Cuándo conviene" tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1, true);
        if (e.key === "ArrowLeft") go(i - 1, true);
      }}
      className="outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
    >
      <div className="relative min-h-[15rem] sm:min-h-[16rem]">
        <span className="font-impact text-6xl font-black not-italic leading-none text-brand-accent [font-stretch:80%] sm:text-8xl">
          {String(i + 1).padStart(2, "0")}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
            className="mt-4 max-w-4xl text-balance font-impact text-[1.65rem] font-extrabold not-italic leading-[1.1] [font-stretch:80%] sm:mt-6 sm:text-5xl"
          >
            {items[i]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center gap-4 sm:mt-10">
        <button type="button" onClick={() => go(i - 1, true)} aria-label="Anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-[transform,background-color,color] duration-200 hover:bg-white hover:text-brand-black active:scale-[0.95]">
          <ArrowLeft className="h-5 w-5" strokeWidth={2.25} />
        </button>
        <button type="button" onClick={() => go(i + 1, true)} aria-label="Siguiente"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-[transform,background-color,color] duration-200 hover:bg-white hover:text-brand-black active:scale-[0.95]">
          <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
        </button>
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {items.map((_, k) => (
            <button key={k} type="button" tabIndex={-1} onClick={() => go(k, true)}
              className={`h-1 flex-1 rounded-full transition-colors ${k === i ? "bg-brand-accent" : "bg-white/20"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
