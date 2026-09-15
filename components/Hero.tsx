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
    <section id="inicio" className="relative overflow-hidden bg-brand-black px-5 pb-6 pt-6 sm:px-8 sm:pb-16 sm:pt-16">
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/img/hero/hero-photo-mobile.png"
          alt="Persona trabajando de espaldas frente a una laptop, iluminación turquesa"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-6.5rem)] max-w-6xl flex-col justify-start lg:block lg:min-h-0">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/50 px-3 py-1.5 sm:gap-2.5 sm:px-4 sm:py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              <span className="font-body text-[10px] font-semibold tracking-[0.15em] text-brand-cream sm:text-xs">
                SOLUCIONES DIGITALES
              </span>
            </div>

            <div className="mt-7 hidden items-center gap-3 lg:flex">
              <span className="font-body text-xs font-semibold tracking-[0.2em] text-brand-ink-on-black-soft">
                DESARROLLADOR DE SOLUCIONES DIGITALES
              </span>
              <span className="h-px flex-1 bg-brand-line-on-black" />
            </div>

            <h1 className="mt-4 font-display text-[9vw] leading-[1.05] tracking-tight sm:mt-4 sm:text-6xl sm:leading-[0.98] lg:text-[4.6rem]">
              <span className="block text-brand-cream">Sistemas digitales,</span>
              <span className="block text-hero-outline">Construidos a medida</span>
              <span className="block text-brand-accent">de tu operación.</span>
            </h1>

            <p className="mt-4 max-w-xl font-body text-[13px] leading-relaxed text-brand-ink-on-black-soft sm:mt-6 sm:text-lg">
              Diseñamos e implementamos los{" "}
              <strong className="font-semibold text-brand-cream">sistemas</strong>{" "}
              que tu negocio necesita para dejar atrás las tareas manuales y
              seguir creciendo sin fricción.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <a
                href="#hablemos"
                className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-brand-black transition-opacity hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Hablemos
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 rounded-full border border-brand-cream/40 px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-brand-cream transition-colors hover:border-brand-cream sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Ver servicios
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 sm:mt-6 lg:flex hidden">
              <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
                EXPLORAR
              </span>
              <ArrowDown className="h-3 w-3 text-brand-ink-on-black-soft" />
            </div>
          </div>

          <div className="relative hidden aspect-[4/3] w-full lg:block">
            <Image
              src="/img/hero/hero-photo.png"
              alt="Persona trabajando de espaldas frente a una laptop, iluminación turquesa"
              fill
              priority
              className="object-cover"
              sizes="40rem"
            />
          </div>
        </div>

        <div className="mt-auto grid grid-cols-4 gap-2 pt-8 sm:mt-16 sm:pt-0 sm:gap-6">
          {ICONS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center sm:gap-2.5">
              <Icon className="h-5 w-5 text-brand-accent sm:h-6 sm:w-6" strokeWidth={1.75} />
              <span className="font-body text-[9px] leading-tight text-brand-cream sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
