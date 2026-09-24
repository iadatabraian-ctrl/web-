"use client";

import Image from "next/image";
import { ArrowDown, Folder, Clock, Link2, BarChart3 } from "lucide-react";
import { StepItem } from "@/components/StepItem";
import { FadeIn } from "@/components/FadeIn";

const ITEMS = [
  {
    icon: Folder,
    title: "Información fragmentada",
    desc: "Cada área trabaja por separado.",
  },
  {
    icon: Clock,
    title: "Procesos manuales",
    desc: "Más tareas. Más tiempo perdido.",
  },
  {
    icon: Link2,
    title: "Herramientas desconectadas",
    desc: "Los datos existen, pero no conversan.",
  },
  {
    icon: BarChart3,
    title: "Decisiones a ciegas",
    desc: "Sin una visión clara de lo que pasa.",
  },
];

export function Diagnostico() {
  return (
    <section id="diagnostico" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
              NUESTRO PROCESO
            </span>
            <span className="h-px flex-1 max-w-24 bg-brand-line-on-black" />
          </div>

          <h2 className="mt-4 font-display text-3xl leading-[1.1] sm:text-5xl md:text-6xl">
            <span className="block text-brand-cream">El negocio creció.</span>
            <span className="block text-brand-cream">El sistema no.</span>
            <span className="block text-brand-cream">Y ahí empieza el problema.</span>
          </h2>
        </FadeIn>
      </div>

      <FadeIn delay={0.1} className="relative mt-10 aspect-[16/9] w-full sm:mt-14">
        <Image
          src="/img/diagnostico/desk-caos.png"
          alt="Escritorio desbordado de papeles y notas, con una laptop mostrando una planilla desordenada"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </FadeIn>

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mt-14 sm:mt-16">
          {ITEMS.map(({ icon, title, desc }, i) => (
            <StepItem
              key={title}
              icon={icon}
              index={i}
              title={title}
              desc={desc}
              isLast={i === ITEMS.length - 1}
              variant="default"
            />
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-8">
          <p className="font-display text-2xl leading-tight text-brand-cream sm:text-5xl">
            El problema no es crecer.
          </p>
          <p className="font-display text-2xl leading-tight text-brand-cream sm:text-5xl">
            Es seguir operando como antes.
          </p>
        </FadeIn>

        <div className="mt-8 flex justify-center">
          <ArrowDown className="h-5 w-5 text-brand-ink-on-black-soft" />
        </div>
      </div>
    </section>
  );
}
