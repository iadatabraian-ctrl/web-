import { Check, ArrowRight } from "lucide-react";
import type { Nivel } from "@/lib/servicios";

/* Tres alcances de referencia. El del medio va destacado en negro. */

export function Niveles({ niveles, servicio }: { niveles: Nivel[]; servicio: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-6">
      {niveles.map((n, i) => {
        const dest = i === 1;
        const wa = `https://wa.me/59898648853?text=${encodeURIComponent(`Hola, quiero cotizar ${servicio}. Me interesa el alcance ${n.nombre.toLowerCase()}.`)}`;
        return (
          <article
            key={n.nombre}
            className={`relative flex flex-col rounded-[1.6rem] p-6 sm:p-8 ${
              dest
                ? "bg-[#0a0a0a] text-brand-cream shadow-[0_40px_60px_-30px_rgba(0,0,0,0.6)] lg:-my-4 lg:py-12"
                : "border border-brand-ink-on-cream/15 bg-[#fffdf9] text-brand-ink-on-cream"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-body text-lg font-extrabold uppercase tracking-wide">{n.nombre}</h3>
              {dest && <span className="rounded-full bg-brand-accent px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">Más elegido</span>}
            </div>
            <p className={`mt-2 min-h-[2.6em] font-body text-sm ${dest ? "text-brand-ink-on-black-soft" : "text-brand-ink-on-cream-soft"}`}>{n.resumen}</p>

            <div className="mt-6">
              <p className={`h-4 font-mono text-[11px] uppercase tracking-[0.15em] ${dest ? "text-brand-ink-on-black-soft" : "text-brand-ink-on-cream-soft"}`}>{n.etiqueta}</p>
              <p className="mt-1 font-body text-[2.4rem] font-extrabold leading-none tracking-[-0.02em] sm:text-5xl">
                {n.precio}
                {n.sufijo && <span className={`ml-2 text-xs font-semibold uppercase tracking-wide ${dest ? "text-brand-ink-on-black-soft" : "text-brand-ink-on-cream-soft"}`}>{n.sufijo}</span>}
              </p>
              <p className={`mt-3 font-mono text-xs uppercase tracking-wide ${dest ? "text-brand-accent" : "text-brand-accent"}`}>Plazo {n.plazo}</p>
            </div>

            <ul className={`mt-6 flex flex-1 flex-col gap-3 border-t pt-6 font-body text-sm sm:text-[15px] ${dest ? "border-white/15" : "border-brand-ink-on-cream/15"}`}>
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
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-xs font-bold uppercase tracking-wide transition-[transform,background-color,color] duration-200 active:scale-[0.97] sm:text-sm ${
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
  );
}
