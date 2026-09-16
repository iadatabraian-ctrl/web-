"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  AppWindow,
  ClipboardList,
  Unlink,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { StepItem } from "@/components/StepItem";
import { FadeIn } from "@/components/FadeIn";

export const ITEMS = [
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

function DiagnosticoImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [35, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.75, 1], [0.75, 1.03, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[4/3] w-full max-w-[260px] sm:max-w-sm lg:max-w-md"
      style={{ perspective: "1200px" }}
    >
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
      <motion.div
        style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <Image
          src="/img/diagnostico/notebook-excel-web.png"
          alt="Laptop con una planilla desordenada y un sitio web anticuado en pantalla, junto a un cuaderno con anotaciones manuscritas"
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 36rem, (min-width: 640px) 32rem, 24rem"
        />
      </motion.div>
    </div>
  );
}

export function Diagnostico() {
  return (
    <section id="diagnostico" className="relative bg-brand-black px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
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
            <DiagnosticoImage />
          </div>

          <div className="lg:col-start-2 lg:row-start-2">
            <FadeIn delay={0.15}>
              <p className="max-w-md font-body text-base leading-relaxed text-brand-ink-on-black-soft">
                Cada negocio tiene su propia forma de trabajar. Pero cuando los
                procesos no acompañan el crecimiento, el costo se siente en el
                día a día.
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

        <FadeIn
          className="crossmarks mt-16 border border-brand-accent/40 px-6 py-9 text-center sm:px-10 sm:py-10"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(0,229,255,.1) 0%, transparent 65%)",
          }}
        >
          <div className="mx-auto flex max-w-lg flex-col items-center gap-3">
            <ArrowRight className="h-5 w-5 text-brand-accent" />
            <p className="font-body text-base font-bold uppercase tracking-[0.12em] text-brand-accent sm:text-xl">
              La solución está en la digitalización
            </p>
            <p className="font-body text-xs uppercase leading-relaxed tracking-[0.15em] text-brand-ink-on-black-soft">
              Sistemas a medida para tu negocio
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
