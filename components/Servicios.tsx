"use client";

import {
  Layers,
  CircleCheck,
  BarChart3,
  Globe,
  Sparkles,
  MessageSquare,
  Workflow,
  ShieldCheck,
  Clock,
  Bot,
  Filter,
  Infinity as InfinityIcon,
} from "lucide-react";
import { ServiceBlock } from "@/components/ServiceBlock";
import { SectionGlow } from "@/components/SectionGlow";

const SERVICES = [
  {
    eyebrow: "01 · SOFTWARE A MEDIDA",
    title: "Software a medida",
    description:
      "Sistemas, paneles y herramientas internas diseñados para la forma real en que opera tu negocio.",
    image: "/img/laptop/laptop-front-software.png",
    alt: "Laptop mostrando un panel interno a medida",
    badges: [
      { icon: Layers, label: "Todo en un solo lugar" },
      { icon: CircleCheck, label: "Menos errores manuales" },
      { icon: BarChart3, label: "Decisiones con datos reales" },
    ],
  },
  {
    eyebrow: "02 · PÁGINAS WEB",
    title: "Páginas web",
    description:
      "Sitios rápidos y claros, con el diseño y la performance que tu marca necesita para convertir.",
    image: "/img/laptop/laptop-front-web.png",
    alt: "Laptop mostrando un sitio web",
    badges: [
      { icon: Globe, label: "Presencia digital a la altura de tu negocio" },
      { icon: Sparkles, label: "Diseño exclusivo, sin plantillas" },
      { icon: MessageSquare, label: "Construida para generar contactos" },
    ],
  },
  {
    eyebrow: "03 · AUTOMATIZACIONES",
    title: "Automatizaciones",
    description:
      "Conectamos tus herramientas y automatizamos las tareas repetitivas para que tu equipo deje de hacerlas a mano.",
    image: "/img/laptop/laptop-front-automation.png",
    alt: "Laptop mostrando un flujo de automatización",
    badges: [
      { icon: Workflow, label: "Procesos sin intervención manual" },
      { icon: ShieldCheck, label: "Cero margen de error humano" },
      { icon: Clock, label: "Tiempo operativo, no administrativo" },
    ],
  },
  {
    eyebrow: "04 · AGENTES",
    title: "Agentes",
    description:
      "Agentes de IA que responden y atienden en WhatsApp e Instagram, cuando tu negocio lo necesita.",
    image: "/img/laptop/laptop-front-agents.png",
    alt: "Laptop mostrando un agente de IA conversacional",
    badges: [
      { icon: Bot, label: "Atención con criterio de negocio, no un chatbot genérico" },
      { icon: Filter, label: "Filtra y califica antes de llegar a vos" },
      { icon: InfinityIcon, label: "Disponibilidad total sin ampliar tu equipo" },
    ],
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-brand-black px-5 py-20 sm:px-8 sm:py-28">
      <SectionGlow position="bottom-left" />
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
            EN QUÉ TRABAJAMOS
          </span>
          <span className="h-px flex-1 max-w-24 bg-brand-line-on-black" />
        </div>

        <div className="mt-10 flex flex-col gap-24 sm:mt-14 sm:gap-32">
          {SERVICES.map((service) => (
            <ServiceBlock key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
