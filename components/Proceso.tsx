import { MessageSquare, FileText, Layers, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Contanos tu negocio",
    desc: "Cómo opera hoy y qué te está frenando.",
  },
  {
    icon: FileText,
    title: "Propongo una solución",
    desc: "Alcance claro, sin letra chica.",
  },
  {
    icon: Layers,
    title: "Construyo",
    desc: "Desarrollo el software o el sitio.",
  },
  {
    icon: ShieldCheck,
    title: "Acompaño",
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

        <div className="mt-16 sm:mt-20">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-brand-accent/60">
                  <Icon className="h-6 w-6 text-brand-accent" strokeWidth={1.75} />
                </div>
                {i < STEPS.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-brand-line-on-black" />
                )}
              </div>
              <div className={i < STEPS.length - 1 ? "flex-1 pb-10" : "flex-1"}>
                <span className="font-mono text-sm text-brand-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-1 font-display text-2xl text-brand-cream sm:text-3xl">
                  {title}
                </h3>
                <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
                  {desc}
                </p>
                {i < STEPS.length - 1 && (
                  <hr className="mt-8 max-w-xl border-brand-line-on-black" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
