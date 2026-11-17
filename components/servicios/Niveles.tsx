"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import type { Nivel } from "@/lib/servicios";

/* Tres alcances de referencia. El del medio va destacado en negro. */

export function Niveles({ niveles, servicio }: { niveles: Nivel[]; servicio: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [act, setAct] = useState(1);

  // En celular arranca centrada en la tarjeta del medio.
  useEffect(() => {
    const el = ref.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const c = el.children[1] as HTMLElement;
    el.scrollLeft = c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2;
  }, []);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let d = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const h = c as HTMLElement;
      const dd = Math.abs(h.offsetLeft + h.offsetWidth / 2 - mid);
      if (dd < d) { d = dd; best = i; }
    });
    setAct(best);
  };

  return (
    <>
    <div
      ref={ref}
      onScroll={onScroll}
      className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 py-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-6 lg:overflow-visible lg:p-0 [&::-webkit-scrollbar]:hidden">
      {niveles.map((n, i) => {
        const dest = i === 1;
        const wa = `https://wa.me/59898648853?text=${encodeURIComponent(`Hola, quiero cotizar ${servicio}. Me interesa el alcance ${n.nombre.toLowerCase()}.`)}`;
        return (
          <article
            key={n.nombre}
            className={`relative flex flex-col rounded-[1.3rem] p-5 max-lg:w-[78%] max-lg:shrink-0 max-lg:snap-center max-sm:max-w-[19rem] sm:rounded-[1.6rem] sm:p-8 max-lg:sm:w-[24rem] ${
              dest
                ? "bg-[#0a0a0a] text-brand-cream shadow-[0_40px_60px_-30px_rgba(0,0,0,0.6)] lg:-my-4 lg:py-12"
                : "border border-brand-ink-on-cream/15 bg-[#fffdf9] text-brand-ink-on-cream"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-body text-lg font-extrabold uppercase tracking-wide">{n.nombre}</h3>
              {dest && <span className="rounded-full bg-brand-accent px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">Más elegido</span>}
            </div>
            <p className={`mt-1.5 font-body text-[13px] sm:mt-2 sm:min-h-[2.6em] sm:text-sm ${dest ? "text-brand-ink-on-black-soft" : "text-brand-ink-on-cream-soft"}`}>{n.resumen}</p>

            <div className="mt-4 sm:mt-6">
              <p className={`h-4 font-mono text-[11px] uppercase tracking-[0.15em] ${dest ? "text-brand-ink-on-black-soft" : "text-brand-ink-on-cream-soft"}`}>{n.etiqueta}</p>
              <p className="mt-1 font-body text-[2rem] font-extrabold leading-none tracking-[-0.02em] sm:text-5xl">
                {n.precio}
                {n.sufijo && <span className={`ml-2 text-xs font-semibold uppercase tracking-wide ${dest ? "text-brand-ink-on-black-soft" : "text-brand-ink-on-cream-soft"}`}>{n.sufijo}</span>}
              </p>
              <p className={`mt-3 font-mono text-xs uppercase tracking-wide ${dest ? "text-brand-accent" : "text-brand-accent"}`}>Plazo {n.plazo}</p>
            </div>

            <ul className={`mt-4 flex flex-1 flex-col gap-2 border-t pt-4 font-body text-[13px] sm:mt-6 sm:gap-3 sm:pt-6 sm:text-[15px] ${dest ? "border-white/15" : "border-brand-ink-on-cream/15"}`}>
              {n.incluye.map((x) => (
                <li key={x} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" strokeWidth={3} />
                  {x}
                </li>
              ))}
            </ul>

            <a
              href={wa}
              target="_blank"
              rel="noopener"
              className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 sm:mt-8 sm:px-6 sm:py-3 font-body text-xs font-bold uppercase tracking-wide transition-[transform,background-color,color] duration-200 active:scale-[0.97] sm:text-sm ${
                dest ? "bg-white text-black hover:bg-brand-accent hover:text-white" : "bg-brand-black text-brand-cream hover:bg-brand-accent"
              }`}
            >
              Cotizar este alcance
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </article>
        );
      })}
    </div>
    <div aria-hidden="true" className="mt-1 flex justify-center gap-2 lg:hidden">
      {niveles.map((n, i) => (
        <span key={n.nombre} className={`h-1.5 rounded-full transition-all duration-300 ${i === act ? "w-6 bg-brand-accent" : "w-1.5 bg-brand-ink-on-cream/25"}`} />
      ))}
    </div>
    </>
  );
}
