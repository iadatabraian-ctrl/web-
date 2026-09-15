"use client";

import Image from "next/image";
import {
  AppWindow,
  ClipboardList,
  Unlink,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { StepItem } from "@/components/StepItem";
import { FadeIn } from "@/components/FadeIn";

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

export function Diagnostico() {
  return (
    <section id="diagnostico" className="relative bg-brand-black px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start lg:gap-16">
          <FadeIn className="lg:col-start-2 lg:row-start-1">
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
          </FadeIn>

          <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24 lg:self-start">
            <FadeIn delay={0.1} className="relative mx-auto aspect-[4/3] w-full max-w-[200px] sm:max-w-xs lg:max-w-md">
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
                src="/img/diagnostico/notebook-excel-web.png"
                alt="Laptop con una planilla desordenada y un sitio web anticuado en pantalla, junto a un cuaderno con anotaciones manuscritas"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 20rem, 200px"
              />
            </FadeIn>
          </div>

          <div className="lg:col-start-2 lg:row-start-2">
            <FadeIn delay={0.15}>
              <p className="max-w-md font-body text-base leading-relaxed text-brand-ink-on-black-soft">
                Cada negocio tiene su propia forma de trabajar. Pero cuando los
                procesos no acompañan el crecimiento, el costo se siente en el
                día a día.
              </p>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-brand-ink-on-black-soft/70">
                Acá te mostramos cómo ayudamos a transformar esa realidad con
                soluciones digitales a medida.
              </p>
            </FadeIn>

            <div className="mt-10 sm:mt-14">
              {ITEMS.map(({ icon, title, desc }, i) => (
                <StepItem
                  key={title}
                  icon={icon}
                  index={i}
                  title={title}
                  desc={desc}
                  isLast={i === ITEMS.length - 1}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>

        <FadeIn className="mt-16 flex flex-col gap-4 border-t border-brand-line-on-black pt-8 sm:flex-row sm:items-center sm:justify-between">
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
        </FadeIn>
      </div>
    </section>
  );
}
