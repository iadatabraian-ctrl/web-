import Image from "next/image";
import {
  AppWindow,
  ClipboardList,
  Unlink,
  TrendingUp,
  UserRound,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const ITEMS = [
  {
    icon: AppWindow,
    title: "Un sitio que no vende",
    desc: "Una página vieja o armada con plantillas no genera confianza ni convierte visitas en clientes.",
  },
  {
    icon: ClipboardList,
    title: "Procesos armados a mano",
    desc: "Planillas, papeles y WhatsApp sueltos en vez de un sistema que ordena la operación diaria.",
  },
  {
    icon: Unlink,
    title: "Herramientas que no conversan entre sí",
    desc: "Cada área usa lo suyo y nadie tiene una vista completa de cómo va el negocio.",
  },
  {
    icon: TrendingUp,
    title: "Decisiones sin datos reales",
    desc: "Sin información clara, todo se maneja por intuición y se pierden oportunidades de crecimiento.",
  },
];

const BADGES = [
  { icon: UserRound, label: "Nuevos socios", className: "left-0 top-6 sm:-left-4" },
  { icon: CheckCircle2, label: "Pagos al día", className: "right-0 top-1/3 sm:-right-6" },
  { icon: UserRound, label: "Clases completadas", className: "bottom-8 right-4 sm:right-0" },
];

export function Diagnostico() {
  return (
    <section id="diagnostico" className="relative bg-brand-black px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
                NUESTRO PROCESO
              </span>
              <span className="h-px flex-1 max-w-24 bg-brand-line-on-black" />
            </div>

            <h2 className="mt-4 font-display text-[9vw] leading-[0.98] tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-brand-cream">Así se ve una operación</span>
              <span className="block text-brand-cream">que no evolucionó</span>
              <span className="block text-brand-accent">al mismo ritmo.</span>
            </h2>

            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-brand-ink-on-black-soft">
              Cada negocio tiene su propia forma de trabajar. Pero cuando los
              procesos no acompañan el crecimiento, el costo se siente en el
              día a día.
            </p>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-brand-ink-on-black-soft/70">
              Acá te mostramos cómo ayudamos a transformar esa realidad con
              soluciones digitales a medida.
            </p>
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(circle at 55% 55%, rgba(0,229,255,.24) 0%, transparent 45%)",
                filter: "blur(28px)",
              }}
            />
            <svg
              aria-hidden
              viewBox="0 0 400 300"
              className="absolute inset-0 -z-10 h-full w-full opacity-40"
            >
              <ellipse cx="200" cy="170" rx="185" ry="55" fill="none" stroke="var(--brand-accent)" strokeWidth="1" transform="rotate(-8 200 170)" />
              <circle cx="20" cy="190" r="2" fill="var(--brand-accent)" />
              <circle cx="380" cy="130" r="2.5" fill="var(--brand-accent)" />
            </svg>
            <Image
              src="/img/laptop/laptop-open.webp"
              alt="Panel de control a medida para gestionar un negocio"
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 32rem, 90vw"
            />
            {BADGES.map(({ icon: Icon, label, className }) => (
              <div
                key={label}
                className={`absolute flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-black/80 px-3.5 py-2 shadow-lg shadow-black/30 backdrop-blur ${className}`}
              >
                <Icon className="h-4 w-4 text-brand-accent" strokeWidth={2} />
                <span className="whitespace-nowrap font-body text-xs font-medium text-brand-cream">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          {ITEMS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-brand-accent/60">
                  <Icon className="h-6 w-6 text-brand-accent" strokeWidth={1.75} />
                </div>
                {i < ITEMS.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-brand-line-on-black" />
                )}
              </div>
              <div className={i < ITEMS.length - 1 ? "flex-1 pb-10" : "flex-1"}>
                <span className="font-mono text-sm text-brand-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-1 font-display text-2xl text-brand-cream sm:text-3xl">
                  {title}
                </h3>
                <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
                  {desc}
                </p>
                {i < ITEMS.length - 1 && (
                  <hr className="mt-8 max-w-xl border-brand-line-on-black" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-brand-line-on-black pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <ArrowRight className="h-4 w-4 text-brand-accent" />
            <span className="font-body text-xs font-semibold tracking-[0.15em] text-brand-cream">
              LA SOLUCIÓN ESTÁ EN LA DIGITALIZACIÓN
            </span>
          </div>
          <span className="font-body text-xs leading-relaxed tracking-[0.1em] text-brand-ink-on-black-soft sm:text-right">
            SISTEMAS A MEDIDA
            <br />
            PARA TU NEGOCIO
          </span>
        </div>
      </div>
    </section>
  );
}
