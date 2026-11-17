"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* Estimador orientativo: cada factor tiene tres niveles; el marcador recorre la línea entre el
   "Desde" y el "Hasta" y el plazo se ajusta. El botón abre WhatsApp con el alcance elegido. */

const NIVELES = ["Básico", "Medio", "Amplio"] as const;

function parse(t: string) {
  const m = t.match(/^(\D*?)([\d.]+)(.*)$/);
  if (!m) return null;
  return { pre: m[1], n: Number(m[2].replace(/\./g, "")), suf: m[3] };
}
const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function useCuenta(objetivo: number) {
  const [v, setV] = useState(objetivo);
  const ref = useRef(objetivo);
  useEffect(() => {
    const from = ref.current;
    const t0 = performance.now();
    let id = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 450);
      const e = 1 - Math.pow(1 - k, 3);
      ref.current = from + (objetivo - from) * e;
      setV(ref.current);
      if (k < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [objetivo]);
  return v;
}

export function Estimador({
  nombre,
  valores,
  mensaje,
  heading,
}: {
  nombre: string;
  valores: { desde: string; hasta?: string; detalle: string; factores: string[]; plazo: string; nota: string };
  mensaje: string;
  heading: string;
}) {
  const [niv, setNiv] = useState<number[]>(valores.factores.map(() => 1));
  const score = niv.reduce((a, b) => a + b, 0) / (niv.length * 2);

  const d = parse(valores.desde);
  const h = valores.hasta ? parse(valores.hasta) : null;
  const rango = d && h ? h.n - d.n : 0;
  const paso = rango > 2000 ? 500 : 50;
  const precio = d ? (h ? Math.round((d.n + rango * score) / paso) * paso : d.n) : 0;

  const pm = valores.plazo.match(/(\d+)\s*a\s*(\d+)/);
  const dias = pm ? Math.round(Number(pm[1]) + (Number(pm[2]) - Number(pm[1])) * score) : 0;

  const precioAnim = useCuenta(precio);
  const diasAnim = useCuenta(dias);

  const wa = `https://wa.me/59898648853?text=${encodeURIComponent(
    `${mensaje}\n\nAlcance que estimo:\n${valores.factores.map((f, i) => `- ${f}: ${NIVELES[niv[i]].toLowerCase()}`).join("\n")}`,
  )}`;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">{heading}</p>
        <div className="mt-5 flex flex-col gap-7 sm:gap-8">
          {valores.factores.map((f, i) => (
            <fieldset key={f}>
              <legend className="flex items-baseline gap-3 font-body text-[15px] font-semibold sm:text-lg">
                <span className="font-mono text-xs font-normal text-brand-accent">0{i + 1}</span>
                {f}
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {NIVELES.map((n, k) => (
                  <label key={n} className="cursor-pointer">
                    <input
                      type="radio"
                      name={`f${i}`}
                      checked={niv[i] === k}
                      onChange={() => setNiv((p) => p.map((x, j) => (j === i ? k : x)))}
                      className="peer sr-only"
                    />
                    <span className="block rounded-full border border-white/25 py-2 text-center font-body text-xs font-semibold text-brand-ink-on-black-soft transition-colors duration-200 hover:border-white/60 peer-checked:border-white peer-checked:bg-white peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-brand-accent sm:text-sm">
                      {n}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      <div className="lg:pt-8">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Rango orientativo · {nombre}</p>
        <p
          aria-live="polite"
          className="mt-3 bg-[linear-gradient(to_bottom,#fff_35%,rgba(255,255,255,0.35)_100%)] bg-clip-text font-body text-[3.1rem] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-transparent sm:text-[5.5rem] lg:text-[6.5rem]"
        >
          {d && `${d.pre}${fmt(precioAnim)}`}
          {d && !h && <span className="ml-2 text-[0.28em] tracking-normal text-brand-ink-on-black-soft [-webkit-text-fill-color:currentColor]">{d.suf.trim() || "y más"}</span>}
        </p>

        <div aria-hidden="true" className="relative mt-6 h-4">
          <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/20" />
          <span className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-brand-accent transition-[width] duration-500 ease-out" style={{ width: h ? `${score * 100}%` : "100%" }} />
          {h && (
            <span className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#0a0a0a] bg-brand-accent shadow-[0_0_0_1px_rgba(255,106,31,0.6)] transition-[left] duration-500 ease-out" style={{ left: `${score * 100}%` }} />
          )}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-wide text-brand-ink-on-black-soft sm:text-xs">
          <span>Desde {valores.desde}</span>
          <span>{valores.hasta ? `Hasta ${valores.hasta}` : "y sube según alcance"}</span>
        </div>
        <p className="mt-3 font-body text-sm text-brand-ink-on-black-soft">{valores.detalle}</p>

        {pm && (
          <div className="mt-8 flex items-end gap-4 border-t border-white/15 pt-6 sm:mt-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Plazo estimado</p>
              <p className="mt-2 font-body text-[2.4rem] font-extrabold leading-none tracking-[-0.02em] sm:text-6xl">
                {Math.round(diasAnim)} <span className="text-[0.4em] uppercase tracking-normal text-brand-accent">días</span>
              </p>
            </div>
            <p className="pb-1 font-body text-sm text-brand-ink-on-black-soft">+ 30 días de garantía desde la entrega</p>
          </div>
        )}

        <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-brand-ink-on-black-soft">{valores.nota}</p>
        <a
          href={wa}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-black transition-[transform,background-color,color] duration-200 hover:bg-brand-accent hover:text-white active:scale-[0.97] sm:text-sm"
        >
          Cotizar con este alcance
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}
