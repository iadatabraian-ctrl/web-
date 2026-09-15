import Image from "next/image";
import { ArrowRight, ArrowUpRight, ArrowDown, Code2, Settings2, BrainCircuit, Globe } from "lucide-react";

const ICONS = [
  { icon: Code2, label: "Software a medida" },
  { icon: Settings2, label: "Automatización" },
  { icon: BrainCircuit, label: "IA & Agentes" },
  { icon: Globe, label: "Desarrollo web" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-brand-black px-5 pb-16 pt-10 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-8">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-accent/50 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              <span className="font-body text-xs font-semibold tracking-[0.15em] text-brand-cream">
                SOLUCIONES DIGITALES
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
                DESARROLLADOR DE SOLUCIONES DIGITALES
              </span>
              <span className="h-px flex-1 bg-brand-line-on-black" />
            </div>

            <h1 className="mt-4 font-display text-[10.5vw] leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.6rem]">
              <span className="block text-brand-cream">Sistemas digitales,</span>
              <span className="block text-hero-outline">Construidos a medida</span>
              <span className="block text-brand-accent">de tu operación.</span>
            </h1>

            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-brand-ink-on-black-soft sm:text-lg">
              Diseñamos e implementamos los{" "}
              <strong className="font-semibold text-brand-cream">sistemas</strong>{" "}
              que tu negocio necesita para dejar atrás las tareas manuales y
              seguir creciendo sin fricción.
            </p>

            <div className="mt-8 flex items-center justify-between gap-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href="#hablemos"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-7 py-3.5 font-body text-sm font-bold uppercase tracking-wide text-brand-black transition-opacity hover:opacity-90"
                >
                  Hablemos
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-cream/40 px-7 py-3.5 font-body text-sm font-bold uppercase tracking-wide text-brand-cream transition-colors hover:border-brand-cream"
                >
                  Ver servicios
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 self-stretch">
                <span className="h-8 w-px bg-brand-line-on-black" />
                <span className="text-center font-body text-[9px] font-semibold leading-tight tracking-[0.2em] text-brand-ink-on-black-soft">
                  SCROLL
                  <br />
                  PARA VER MÁS
                </span>
                <ArrowDown className="h-3.5 w-3.5 text-brand-ink-on-black-soft" />
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/img/hero/hero-photo.png"
              alt="Persona trabajando de espaldas frente a una laptop, iluminación turquesa"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 40rem, 100vw"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-3 sm:mt-16 sm:gap-6">
          {ICONS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2.5 text-center">
              <Icon className="h-6 w-6 text-brand-accent" strokeWidth={1.75} />
              <span className="font-body text-[11px] leading-tight text-brand-cream sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
