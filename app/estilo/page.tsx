import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

// Página interna para revisar el sistema visual. No se indexa ni se enlaza.
// Se elimina antes de pasar a producción.
export const metadata: Metadata = {
  title: "Guía de estilo · Deploy",
  robots: { index: false, follow: false },
};

const NEON = [
  { name: "Neon blue", v: "#2f6bff", c: "bg-neon-blue" },
  { name: "Neon cyan", v: "#22d3ee", c: "bg-neon-cyan" },
  { name: "Neon violet", v: "#7c3aed", c: "bg-neon-violet" },
  { name: "Neon magenta", v: "#d946ef", c: "bg-neon-magenta" },
];
const NIGHT = [
  { name: "Night", v: "#070816", c: "bg-night" },
  { name: "Night 2", v: "#0d1030", c: "bg-night-2" },
  { name: "Night 3", v: "#151a45", c: "bg-night-3" },
];
const BASE = [
  { name: "Crema", v: "#f6f1e7", c: "bg-brand-cream" },
  { name: "Crema 2", v: "#e4dcc9", c: "bg-brand-cream-2" },
  { name: "Carbón", v: "#1a1712", c: "bg-brand-black" },
  { name: "Acento (botones)", v: "#FF5C1A", c: "bg-brand-accent" },
];

function Chip({ name, v, c, light }: { name: string; v: string; c: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-12 w-12 shrink-0 rounded-xl border ${light ? "border-brand-line-on-cream" : "border-line-on-night"} ${c}`} />
      <div>
        <p className="font-body text-sm font-bold">{name}</p>
        <p className="font-mono text-xs opacity-70">{v}</p>
      </div>
    </div>
  );
}

export default function Estilo() {
  return (
    <main>
      {/* OSCURA */}
      <section className="aura-night relative overflow-hidden px-6 py-20 text-ink-on-night sm:px-12">
        <div className="grid-hud pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl">
          <p className="hud-tag">Sección oscura · noche</p>
          <h1 className="glow-text mt-6 font-display text-6xl leading-[0.95] sm:text-8xl">
            Software que <span className="text-neon">trabaja</span> por tu negocio
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg text-ink-on-night-soft">
            Texto de lectura sobre noche: blanco azulado, sin brillo detrás, contraste alto.
            Lo que brilla es el titular y los detalles, no el párrafo.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-7 py-3.5 font-body text-sm font-bold uppercase tracking-wide text-brand-black transition hover:scale-105">
              Hablemos <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#" className="edge-neon inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-body text-sm font-bold uppercase tracking-wide text-ink-on-night">
              Ver servicios
            </a>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {["Software a medida", "Páginas web", "Agentes de IA"].map((t, i) => (
              <div key={t} className="edge-neon rounded-2xl bg-night-2/70 p-6">
                <p className="hud-tag">Módulo 0{i + 1}</p>
                <h3 className="mt-4 font-display text-3xl">{t}</h3>
                <p className="mt-3 font-body text-sm text-ink-on-night-soft">Tarjeta con borde de neón sobre fondo noche.</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {NEON.concat(NIGHT.slice(0, 2)).map((x) => <Chip key={x.name} {...x} />)}
          </div>
        </div>
      </section>

      {/* CLARA */}
      <section className="bg-brand-cream px-6 py-20 text-brand-ink-on-cream sm:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-accent-ink">Sección clara · crema</p>
          <h2 className="mt-6 font-display text-5xl sm:text-7xl">Plano, sin degradados ni brillos</h2>
          <p className="mt-6 max-w-xl font-body text-lg text-brand-ink-on-cream-soft">
            Las secciones claras no cambian: crema, tinta cálida y acento naranja. Se alternan con las noche para dar ritmo.
          </p>
          <div className="mt-8">
            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-7 py-3.5 font-body text-sm font-bold uppercase tracking-wide text-brand-black transition hover:scale-105">
              Hablemos <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {BASE.map((x) => <Chip key={x.name} {...x} light />)}
          </div>
        </div>
      </section>
    </main>
  );
}
