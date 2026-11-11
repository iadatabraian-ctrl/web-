"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AppWindow, ArrowRight, ClipboardList, TrendingUp, Unlink, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { BrowserFrame } from "@/components/servicios/BrowserFrame";

type Problema = {
  icon: LucideIcon;
  title: string;
  desc: string;
  service: string;
  reason: string;
  demo: { src: string; url: string; alt: string; caption: string };
};

/* Las cuatro situaciones que antes estaban repartidas en dos listas ("El negocio creció…"
   y "Mini diagnóstico"). Cada una apunta al servicio que la resuelve y a una demo real. */
const PROBLEMAS: Problema[] = [
  {
    icon: AppWindow,
    title: "Un sitio que no vende",
    desc: "Una página vieja o armada con plantillas no genera confianza ni convierte visitas en clientes.",
    service: "Páginas web",
    reason:
      "Necesitás un sitio rápido y claro que convierta visitas en clientes, no una tarjeta de presentación digital.",
    demo: {
      src: "/img/demos/deploy/desktop-top.webp",
      url: "deployuy.com",
      alt: "Captura de la página de inicio de Deploy",
      caption: "Este mismo sitio, diseñado y programado a medida.",
    },
  },
  {
    icon: ClipboardList,
    title: "Procesos armados a mano",
    desc: "Planillas, papeles y WhatsApp sueltos en vez de un sistema que ordena la operación diaria.",
    service: "Software a medida",
    reason: "Un sistema a medida ordena tu operación diaria en vez de depender de planillas sueltas.",
    demo: {
      src: "/img/demos/gimnasio/admin-lista.webp",
      url: "panel.deployfit.com · pasar lista",
      alt: "Panel de gestión de un gimnasio: pasar lista",
      caption: "Demo con datos de ejemplo: la asistencia, en pantalla y no en papel.",
    },
  },
  {
    icon: Unlink,
    title: "Herramientas que no conversan entre sí",
    desc: "Cada área usa lo suyo y nadie tiene una vista completa de cómo va el negocio.",
    service: "Automatizaciones",
    reason: "Conectamos tus herramientas para que dejen de trabajar por separado.",
    demo: {
      src: "/img/demos/gimnasio/admin-dashboard.webp",
      url: "panel.deployfit.com · panel general",
      alt: "Panel general de un sistema de gestión",
      caption: "Demo con datos de ejemplo: la información de varias fuentes, en un solo panel.",
    },
  },
  {
    icon: TrendingUp,
    title: "Decisiones sin datos reales",
    desc: "Sin información clara, todo se maneja por intuición y se pierden oportunidades de crecimiento.",
    service: "Software a medida (paneles con datos)",
    reason: "Un panel a medida te muestra en tiempo real cómo va tu negocio, no supuestos.",
    demo: {
      src: "/img/demos/gimnasio/admin-retencion.webp",
      url: "panel.deployfit.com · constancia y retención",
      alt: "Panel de constancia y retención de un gimnasio",
      caption: "Demo con datos de ejemplo: indicadores que se ven de un vistazo.",
    },
  },
];

const HORAS = [
  { label: "1-5hs", min: 1, max: 5 },
  { label: "5-10hs", min: 5, max: 10 },
  { label: "10+hs", min: 10, max: null as number | null },
];

function estimacionMensual(h: (typeof HORAS)[number]) {
  const min = h.min * 4;
  if (h.max === null) return `~${min}+ horas al mes`;
  return `~${min}-${h.max * 4} horas al mes`;
}

function whatsappUrl(title: string, horas: (typeof HORAS)[number] | null) {
  const problema = title.charAt(0).toLowerCase() + title.slice(1);
  const perdida = horas ? ` y pierdo ~${horas.label.replace(/hs$/, "")}hs/semana` : "";
  const text = `Hola, mi negocio tiene problemas con ${problema}${perdida}, quiero una consulta`;
  return `https://wa.me/59898648853?text=${encodeURIComponent(text)}`;
}

function Detalle({
  p,
  horas,
  setHoras,
}: {
  p: Problema;
  horas: number | null;
  setHoras: (v: number | null) => void;
  reduce: boolean;
}) {
  return (
    <>
      <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-accent">CON DEPLOY</span>
      <p className="mt-2 font-display text-2xl leading-tight text-brand-cream sm:text-3xl">{p.service}</p>
      <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
        {p.reason}
      </p>

      <BrowserFrame tone="paper" hard="accent" url={p.demo.url} className="mt-6 w-full">
        <div className="relative aspect-[16/10] bg-[#eef2f6]">
          <Image
            src={p.demo.src}
            alt={p.demo.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover object-top"
          />
        </div>
      </BrowserFrame>
      <p className="mt-4 font-body text-xs text-brand-ink-on-black-soft">{p.demo.caption}</p>

      <div className="mt-6 border-t border-brand-line-on-black pt-5">
        <span className="font-body text-[10px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft">
          OPCIONAL: ¿CUÁNTAS HORAS POR SEMANA PERDÉS EN ESO?
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {HORAS.map((h, hi) => (
            <button
              key={h.label}
              type="button"
              aria-pressed={horas === hi}
              onClick={() => setHoras(horas === hi ? null : hi)}
              className={`rounded-full border px-4 py-2 font-body text-xs font-semibold tracking-wide transition ${
                horas === hi
                  ? "border-brand-accent bg-brand-accent text-[#1a1712]"
                  : "border-brand-cream/30 text-brand-cream hover:border-brand-accent"
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
        {horas !== null && (
          <p className="mt-3 font-body text-sm font-semibold text-brand-cream">{estimacionMensual(HORAS[horas])}</p>
        )}

        <a
          href={whatsappUrl(p.title, horas === null ? null : HORAS[horas])}
          target="_blank"
          rel="noopener"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-[#1a1712] transition hover:scale-105 hover:opacity-90 sm:w-auto"
        >
          Hablemos de esto
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </a>
      </div>
    </>
  );
}

const INCLINACION = ["-rotate-1", "rotate-1", "rotate-[0.6deg]", "-rotate-[0.8deg]"];

export function Problema() {
  const reduce = useReducedMotion();
  const [sel, setSel] = useState(0);
  const [horas, setHoras] = useState<number | null>(null);
  const p = PROBLEMAS[sel];

  function elegir(i: number) {
    setSel(i);
    setHoras(null);
  }

  return (
    <section id="diagnostico" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
              EL PROBLEMA
            </span>
            <span className="h-px max-w-24 flex-1 bg-brand-line-on-black" />
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

      <div className="mx-auto mt-14 max-w-6xl px-5 sm:mt-20 sm:px-8">
        <FadeIn>
          <h3 className="max-w-2xl font-display text-2xl leading-tight text-brand-cream sm:text-4xl">
            ¿Cuál se parece más a tu negocio?
          </h3>
          <p className="mt-3 max-w-xl font-body text-sm text-brand-ink-on-black-soft sm:text-base">
            Elegí una nota y te mostramos cómo lo resolveríamos.
          </p>
        </FadeIn>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14">
          <div role="group" aria-label="Situaciones" className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {PROBLEMAS.map(({ icon: Icon, title, desc }, i) => {
              const activa = i === sel;
              return (
                <div key={title} className="sm:contents">
                <button
                  type="button"
                  aria-pressed={activa}
                  onClick={() => elegir(i)}
                  className={`relative rounded-md border-2 bg-[#f6f1e7] p-5 text-left text-[#1a1712] transition-all duration-200 ${
                    INCLINACION[i]
                  } ${
                    activa
                      ? "-translate-y-1 !rotate-0 border-[#1a1712] shadow-[6px_6px_0_#ff5c1a]"
                      : "border-transparent shadow-[5px_5px_0_rgba(246,241,231,0.2)] hover:-translate-y-0.5"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 -rotate-2 bg-[#ff5c1a]/80"
                  />
                  <Icon className="h-6 w-6 text-[#B8400F]" strokeWidth={1.75} />
                  <span className="mt-3 block font-display text-xl leading-tight">{title}</span>
                  <span className="mt-2 block font-body text-sm leading-snug text-[#5c5142]">{desc}</span>
                </button>
                {activa && (
                  <div className="mt-6 sm:hidden">
                    <Detalle p={p} horas={horas} setHoras={setHoras} reduce={!!reduce} />
                  </div>
                )}
                </div>
              );
            })}
          </div>

          <div aria-live="polite" className="hidden min-w-0 sm:block lg:sticky lg:top-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={sel}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
              >
                <Detalle p={p} horas={horas} setHoras={setHoras} reduce={!!reduce} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
