"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Bar } from "@/components/Bar";

/* Servicios (sección clara, ver PRODUCT.md: colores planos fuera de las tarjetas).
   Abre con la frase de la ex sección Diagnóstico y muestra los 4 servicios como un abanico de
   tarjetas: la activa al centro y las demás abiertas detrás. Se arrastra, se toca una tarjeta,
   o se usan las flechas / el teclado.
   Para usar un render propio en una tarjeta: poner el archivo en public/img/servicios/ y
   completar su ruta en CARD_IMAGES (4:5, fondo negro sólido). Mientras tanto se dibuja una
   ilustración plana provisoria, sin cifras ni texto. */

type Kind = "software" | "web" | "automatizacion" | "agentes";

const CARD_IMAGES: Partial<Record<Kind, string>> = {
  software: "/img/servicios/card-software.webp",
  web: "/img/servicios/card-web.webp",
  automatizacion: "/img/servicios/card-automatizacion.webp",
  agentes: "/img/servicios/card-agentes.webp",
};

/** Imágenes de fondo oscuro: el número de la tarjeta va en claro. */
const DARK_IMAGE = new Set<Kind>(["automatizacion"]);

const SERVICES: { kind: Kind; href: string; title: string; description: string }[] = [
  {
    kind: "software",
    href: "/software-a-medida",
    title: "Software a medida",
    description: "Sistemas, paneles y herramientas internas diseñados para la forma real en que opera tu negocio.",
  },
  {
    kind: "web",
    href: "/paginas-web",
    title: "Páginas web",
    description: "Sitios rápidos y claros, con el diseño y la performance que tu marca necesita para convertir.",
  },
  {
    kind: "automatizacion",
    href: "/automatizacion",
    title: "Automatizaciones",
    description: "Conectamos tus herramientas y automatizamos las tareas repetitivas para que tu equipo deje de hacerlas a mano.",
  },
  {
    kind: "agentes",
    href: "/agentes-whatsapp",
    title: "Agentes de IA",
    description: "Agentes de IA que responden y atienden en WhatsApp e Instagram, cuando tu negocio lo necesita.",
  },
];

const N = SERVICES.length;
const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-10% 0px" } as const;

/** Posición relativa de la tarjeta i respecto de la activa, circular: -1, 0, 1 o 2. */
const rel = (i: number, active: number) => ((i - active + N + 1) % N) - 1;

const POSE: Record<number, { x: string; y: number; rotate: number; scale: number; opacity: number; z: number }> = {
  "-1": { x: "-58%", y: 22, rotate: -8, scale: 0.88, opacity: 0.92, z: 5 },
  "0": { x: "0%", y: 0, rotate: 0, scale: 1, opacity: 1, z: 10 },
  "1": { x: "58%", y: 22, rotate: 8, scale: 0.88, opacity: 0.92, z: 5 },
  "2": { x: "92%", y: 46, rotate: 13, scale: 0.78, opacity: 0.8, z: 2 },
};

export function Servicios() {
  const [active, setActive] = useState(0);
  const dragged = useRef(false);

  const go = (to: number) => setActive(((to % N) + N) % N);

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-brand-cream px-5 pb-20 pt-[calc(2.5rem+4rem)] text-brand-ink-on-cream sm:px-8 sm:pb-28 sm:pt-[calc(8vw+5rem)] lg:px-[6vw]"
      // corte diagonal arriba: separa esta sección clara del hero oscuro
      style={{
        clipPath: "polygon(0 var(--cut), 100% 0, 100% 100%, 0 100%)",
        marginTop: "calc(-1 * var(--cut))",
        ["--cut" as string]: "clamp(2.5rem, 8vw, 7rem)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Bar style={{ right: "-4vw", top: "12vw", width: "9vw", height: "46vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.14)", edge: "right" }} i={0} />
        <Bar className="max-sm:hidden" style={{ right: "14vw", top: "20vw", width: "4vw", height: "30vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.08)" }} i={1} />
        <Bar className="max-lg:hidden" style={{ left: "-5vw", bottom: 0, width: "9vw", height: "20vw", skew: 37, origin: "0 100%", fill: "rgba(255,92,26,0.14)", edge: "left" }} i={2} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Titular */}
        <h2 className="origin-bottom -skew-x-[5deg] text-balance text-center font-impact text-[11.5vw] font-black uppercase not-italic leading-[0.92] tracking-[-0.005em] [font-stretch:80%] sm:text-[7.6vw] lg:text-[6.2rem]">
          <motion.span
            initial={{ opacity: 0, x: "-12vw" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease }}
            className="block"
          >
            El negocio creció.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: "-12vw" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease, delay: 0.18 }}
            className="block text-brand-ink-on-cream-soft"
          >
            El sistema no.
          </motion.span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="mx-auto mt-6 max-w-md text-center font-body text-base leading-relaxed text-brand-ink-on-cream-soft sm:mt-8 sm:text-lg"
        >
          Cuatro formas de que el sistema crezca al ritmo del negocio.
        </motion.p>

        {/* Abanico de tarjetas */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          role="group"
          aria-roledescription="carrusel"
          aria-label="Servicios"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(active + 1);
            if (e.key === "ArrowLeft") go(active - 1);
          }}
          className="mt-14 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:mt-20"
        >
          <div className="relative mx-auto w-[72vw] max-w-[22rem] sm:max-w-[26rem] lg:max-w-[28rem]">
            {/* reserva el alto del abanico */}
            <div aria-hidden="true" className="invisible">
              <Card service={SERVICES[0]} index={0} />
            </div>

            {SERVICES.map((s, i) => {
              const d = rel(i, active);
              const pose = POSE[d];
              const isActive = d === 0;
              return (
                <motion.div
                  key={s.title}
                  className="absolute left-0 top-0 w-full"
                  animate={{ x: pose.x, y: pose.y, rotate: pose.rotate, scale: pose.scale, opacity: pose.opacity }}
                  transition={{ type: "spring", stiffness: 170, damping: 24, mass: 0.9 }}
                  style={{ zIndex: pose.z, touchAction: isActive ? "pan-y" : "auto" }}
                  drag={isActive ? "x" : false}
                  dragSnapToOrigin
                  dragElastic={0.25}
                  onDragStart={() => {
                    dragged.current = true;
                  }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) go(active + 1);
                    else if (info.offset.x > 70) go(active - 1);
                    setTimeout(() => (dragged.current = false), 0);
                  }}
                  aria-hidden={!isActive}
                >
                  <Card
                    service={s}
                    index={i}
                    active={isActive}
                    onLinkClick={(e) => {
                      if (dragged.current) e.preventDefault();
                    }}
                  />
                  {!isActive && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => go(i)}
                      aria-label={`Ver ${s.title}`}
                      className="absolute inset-0 z-10 cursor-pointer rounded-[6px]"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Controles */}
          <div className="mt-14 flex items-center justify-center gap-5 sm:mt-20">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Servicio anterior"
              className="flex h-12 w-12 items-center justify-center rounded-[4px] border border-brand-ink-on-cream/30 transition-[transform,background-color,color] duration-200 hover:bg-brand-ink-on-cream hover:text-brand-cream active:scale-[0.95]"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.25} />
            </button>
            <p className="min-w-[4.5rem] text-center font-mono text-sm font-bold" aria-live="polite">
              0{active + 1} <span className="opacity-40">/ 0{N}</span>
            </p>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Servicio siguiente"
              className="flex h-12 w-12 items-center justify-center rounded-[4px] border border-brand-ink-on-cream/30 transition-[transform,background-color,color] duration-200 hover:bg-brand-ink-on-cream hover:text-brand-cream active:scale-[0.95]"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </div>
        </motion.div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-brand-ink-on-cream-soft sm:text-xs">
          Imágenes ilustrativas · datos de ejemplo
        </p>

        {/* Enlaces siempre disponibles para lectores de pantalla y buscadores */}
        <nav aria-label="Servicios" className="sr-only">
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href}>
              {s.title}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

function Card({
  service,
  index,
  active = false,
  onLinkClick,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  active?: boolean;
  onLinkClick?: (e: React.MouseEvent) => void;
}) {
  const img = CARD_IMAGES[service.kind];
  return (
    <div className="overflow-hidden rounded-[6px] bg-brand-black text-brand-cream shadow-[0_24px_40px_-28px_rgba(26,23,18,0.6)]">
      <div className="relative aspect-[4/5] w-full bg-[#0b0a08]">
        {img ? (
          <Image src={img} alt={`Ilustración de ${service.title.toLowerCase()} con datos de ejemplo`} fill sizes="(min-width: 1024px) 28rem, 72vw" className="object-cover" />
        ) : (
          <Placeholder kind={service.kind} />
        )}
        <span className={`absolute left-4 top-4 rounded-[3px] px-2.5 py-1 font-mono text-xs font-bold ${img && !DARK_IMAGE.has(service.kind) ? "bg-brand-cream/90 text-brand-ink-on-cream" : "bg-brand-black/60 text-brand-cream"}`}>
          0{index + 1}
        </span>
      </div>
      <div className="min-h-[9.75rem] px-5 pb-6 pt-5 sm:min-h-[10.5rem] sm:px-6">
        <span aria-hidden="true" className="mb-3 block h-[3px] w-10 -skew-x-[37deg] bg-brand-accent" />
        <h3 className="origin-bottom-left -skew-x-[5deg] font-impact text-[1.65rem] font-black uppercase not-italic leading-none [font-stretch:80%] sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-brand-ink-on-black-soft">{service.description}</p>
        <Link
          href={service.href}
          tabIndex={active ? 0 : -1}
          onClick={onLinkClick}
          className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-wide text-brand-cream underline decoration-brand-accent decoration-2 underline-offset-4 transition-colors hover:text-brand-accent"
        >
          Ver el servicio
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

/* Ilustraciones provisorias: formas planas naranja sobre carbón, sin texto ni cifras. */
function Placeholder({ kind }: { kind: Kind }) {
  const o = "#FF5C1A";
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="400" height="400" fill="#14110d" />
      <g transform="skewX(-20) translate(90 0)" opacity="0.18" fill={o}>
        <rect x="270" y="-20" width="40" height="460" />
      </g>
      {kind === "software" && (
        <g>
          <rect x="70" y="120" width="260" height="170" rx="10" fill="#241f18" stroke={o} strokeOpacity="0.6" strokeWidth="2" />
          <rect x="90" y="142" width="80" height="60" rx="4" fill={o} opacity="0.85" />
          <rect x="182" y="142" width="128" height="26" rx="4" fill={o} opacity="0.45" />
          <rect x="182" y="178" width="128" height="24" rx="4" fill={o} opacity="0.3" />
          <rect x="90" y="214" width="220" height="12" rx="3" fill={o} opacity="0.25" />
          <rect x="90" y="238" width="160" height="12" rx="3" fill={o} opacity="0.25" />
          <rect x="50" y="296" width="300" height="12" rx="6" fill="#241f18" stroke={o} strokeOpacity="0.5" strokeWidth="2" />
        </g>
      )}
      {kind === "web" && (
        <g>
          <rect x="60" y="100" width="280" height="200" rx="12" fill="#241f18" stroke={o} strokeOpacity="0.6" strokeWidth="2" />
          <rect x="60" y="100" width="280" height="30" rx="12" fill="#2e281f" />
          <circle cx="82" cy="115" r="5" fill={o} opacity="0.8" />
          <circle cx="100" cy="115" r="5" fill={o} opacity="0.5" />
          <rect x="84" y="152" width="170" height="34" rx="4" fill={o} opacity="0.85" />
          <rect x="84" y="198" width="120" height="10" rx="3" fill={o} opacity="0.35" />
          <rect x="84" y="218" width="140" height="10" rx="3" fill={o} opacity="0.25" />
          <rect x="84" y="246" width="70" height="24" rx="12" fill={o} opacity="0.7" />
          <rect x="248" y="204" width="68" height="68" rx="6" fill={o} opacity="0.4" />
        </g>
      )}
      {kind === "automatizacion" && (
        <g stroke={o} strokeOpacity="0.7" strokeWidth="3" fill="none">
          <path d="M110 140 L200 200 L290 140" />
          <path d="M200 200 L200 290" />
          <path d="M110 140 L110 250 L200 290" strokeOpacity="0.35" />
          <rect x="84" y="114" width="52" height="52" rx="8" fill="#241f18" />
          <rect x="264" y="114" width="52" height="52" rx="8" fill="#241f18" />
          <rect x="172" y="172" width="56" height="56" rx="10" fill={o} stroke="none" />
          <rect x="174" y="264" width="52" height="52" rx="8" fill="#241f18" />
        </g>
      )}
      {kind === "agentes" && (
        <g>
          <rect x="130" y="70" width="140" height="260" rx="24" fill="#241f18" stroke={o} strokeOpacity="0.6" strokeWidth="2" />
          <rect x="154" y="116" width="82" height="30" rx="14" fill={o} opacity="0.45" />
          <rect x="164" y="160" width="82" height="30" rx="14" fill={o} opacity="0.85" />
          <rect x="154" y="204" width="60" height="30" rx="14" fill={o} opacity="0.45" />
          <rect x="176" y="248" width="70" height="30" rx="14" fill={o} opacity="0.85" />
        </g>
      )}
    </svg>
  );
}
