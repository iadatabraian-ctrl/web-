"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, Check, Globe, LayoutDashboard, Workflow, type LucideIcon } from "lucide-react";
import { BrowserFrame } from "@/components/servicios/BrowserFrame";
import { PhoneFrame } from "@/components/servicios/PhoneFrame";
import { AutomationFlow } from "@/components/servicios/ShowcaseAutomation";
import { ChatPhone, useChatPlayback } from "@/components/servicios/AgentChat";

type ServicioId = "software" | "web" | "automatizacion" | "agentes";

const SERVICES: {
  id: ServicioId;
  tab: string;
  icon: LucideIcon;
  href: string;
  title: string;
  description: string;
  points: string[];
  caption: string;
}[] = [
  {
    id: "software",
    tab: "Software a medida",
    icon: LayoutDashboard,
    href: "/software-a-medida",
    title: "Software a medida",
    description:
      "Sistemas, paneles y herramientas internas diseñados para la forma real en que opera tu negocio.",
    points: [
      "Panel de administración y aplicación para tus clientes, sobre la misma base de datos",
      "Reportes e indicadores con los datos de tu operación",
      "Cada persona accede solo a lo que le corresponde",
    ],
    caption: "Sistema de gestión desarrollado por Deploy, mostrado con datos de ejemplo.",
  },
  {
    id: "web",
    tab: "Páginas web",
    icon: Globe,
    href: "/paginas-web",
    title: "Páginas web",
    description:
      "Sitios rápidos y claros, con el diseño y la performance que tu marca necesita para convertir.",
    points: [
      "Diseño y código propios, sin plantillas",
      "Pensadas para que te contacten por WhatsApp o formulario",
      "Se ven bien en cualquier tamaño de pantalla",
    ],
    caption: "Este mismo sitio es el ejemplo: deployuy.com.",
  },
  {
    id: "automatizacion",
    tab: "Automatizaciones",
    icon: Workflow,
    href: "/automatizacion",
    title: "Automatizaciones",
    description:
      "Conectamos las herramientas que ya usás para que tu equipo deje de repetir tareas a mano.",
    points: [
      "Se relevan primero las tareas repetitivas y se elige cuáles conviene automatizar",
      "Cada flujo se prueba antes de ponerse en producción",
      "Cuando algo requiere a una persona, se avisa al equipo",
    ],
    caption: "Flujo de ejemplo: un pedido por WhatsApp llega ordenado al sistema.",
  },
  {
    id: "agentes",
    tab: "Agentes de IA",
    icon: Bot,
    href: "/agentes-whatsapp",
    title: "Agentes de IA",
    description:
      "Agentes que responden y atienden en WhatsApp e Instagram con la información real de tu negocio.",
    points: [
      "Responden consultas frecuentes a cualquier hora",
      "Filtran y califican el interés de cada contacto",
      "Derivan a una persona cuando corresponde, con el contexto de la conversación",
    ],
    caption: "Conversación de ejemplo con un agente.",
  },
];

const ADMIN_TABS = [
  { k: "dashboard", label: "Panel general" },
  { k: "socios", label: "Socios" },
  { k: "retencion", label: "Retención" },
  { k: "finanzas", label: "Finanzas" },
] as const;

function SoftwareStage() {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-2 pb-4">
        {ADMIN_TABS.map((a, i) => (
          <button
            key={a.k}
            type="button"
            onClick={() => setTab(i)}
            aria-pressed={tab === i}
            className={`rounded-full border-2 border-[#1a1712] px-3.5 py-1 font-body text-xs font-semibold transition-colors ${
              tab === i ? "bg-[#1a1712] text-[#f6f1e7]" : "bg-[#fffdf8] text-[#1a1712] hover:bg-[#ede5d3]"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <BrowserFrame tone="paper" url="panel.deployfit.com · administrador" className="w-full sm:w-[88%]">
          <div className="relative aspect-[16/10] bg-[#eef2f6]">
            <AnimatePresence initial={false}>
              <motion.div
                key={ADMIN_TABS[tab].k}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={`/img/demos/gimnasio/admin-${ADMIN_TABS[tab].k}.webp`}
                  alt={`Panel de administración: ${ADMIN_TABS[tab].label}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </BrowserFrame>
        <PhoneFrame
          tone="paper"
          className="mx-auto mt-8 w-[40%] max-w-[170px] sm:absolute sm:-bottom-8 sm:right-0 sm:mt-0 sm:w-[22%] sm:max-w-[190px]"
        >
          <Image
            src="/img/demos/gimnasio/socio-inicio.webp"
            alt="Aplicación para los socios: pantalla de inicio"
            fill
            sizes="190px"
            className="object-contain object-top"
          />
        </PhoneFrame>
      </div>
    </div>
  );
}

function WebStage() {
  return (
    <BrowserFrame tone="paper" url="deployuy.com" className="mx-auto w-full max-w-3xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0c0a]">
        <Image
          src="/img/demos/deploy/desktop-top.webp"
          alt="Captura de la página de inicio de Deploy"
          fill
          sizes="(min-width: 1024px) 50vw, 90vw"
          className="object-cover object-top"
        />
      </div>
    </BrowserFrame>
  );
}

function AgentsStage() {
  const { shown, typing, derivado } = useChatPlayback(true);
  return (
    <div className="flex justify-center">
      <ChatPhone tone="paper" shown={shown} typing={typing} derivado={derivado} className="w-[220px] sm:w-[250px]" />
    </div>
  );
}

function Stage({ id }: { id: ServicioId }) {
  if (id === "software") return <SoftwareStage />;
  if (id === "web") return <WebStage />;
  if (id === "automatizacion") return <AutomationFlow tone="paper" immediate className="sm:pt-4" />;
  return <AgentsStage />;
}

export function Servicios() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = SERVICES[active];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % SERVICES.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + SERVICES.length) % SERVICES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = SERVICES.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="servicios" className="tono-claro relative overflow-hidden bg-brand-black px-5 py-14 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
            EN QUÉ TRABAJAMOS
          </span>
          <span className="h-px flex-1 max-w-24 bg-brand-line-on-black" />
        </div>
        <h2 className="mt-4 max-w-3xl font-display text-3xl leading-[1.1] text-brand-cream sm:text-5xl md:text-6xl">
          Lo que construimos, funcionando.
        </h2>

        <div
          role="tablist"
          aria-label="Servicios"
          onKeyDown={onKeyDown}
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4"
        >
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 rounded-xl border-2 border-[#1a1712] px-3 py-3 text-left transition-all sm:px-4 sm:py-4 ${
                  selected
                    ? "bg-[#1a1712] text-[#f6f1e7] shadow-[4px_4px_0_#ff5c1a]"
                    : "bg-[#fffdf8] text-[#1a1712] shadow-[4px_4px_0_#1a1712] hover:-translate-y-0.5"
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 sm:h-6 sm:w-6 ${selected ? "text-[#ff5c1a]" : "text-[#1a1712]"}`}
                  strokeWidth={1.75}
                />
                <span className="font-display text-sm leading-tight tracking-wide sm:text-lg">{s.tab}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${service.id}`}
          className="mt-10 sm:mt-14"
        >
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
          >
            <div>
              <h3 className="font-display text-3xl leading-tight text-brand-cream sm:text-4xl">{service.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
                {service.description}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {service.points.map((p) => (
                  <li key={p} className="flex gap-3 font-body text-sm leading-snug text-brand-cream sm:text-base">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#1a1712] bg-[#ff5c1a]">
                      <Check className="h-3 w-3 text-[#1a1712]" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={service.href}
                className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[#1a1712] bg-brand-accent px-6 py-3 font-body text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0_#1a1712] transition-transform hover:-translate-y-0.5"
              >
                Ver el servicio completo
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>

            <div className="min-w-0">
              <Stage id={service.id} />
              <p className="mt-6 font-body text-xs text-brand-ink-on-black-soft sm:mt-10">{service.caption}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
