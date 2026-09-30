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
      { icon: CircleCheck, label: "Sin errores manuales" },
      { icon: BarChart3, label: "Decisiones con datos reales" },
    ],
    includes: [
      "Relevamiento de tu proceso actual",
      "Panel a medida con los datos que necesitás ver",
      "Permisos por usuario",
      "Integraciones con las herramientas que ya usás",
    ],
    example:
      "Una inmobiliaria que hoy anota reservas de visitas en un cuaderno pasa a un panel donde ve el estado de cada propiedad en tiempo real.",
  },
  {
    eyebrow: "02 · PÁGINAS WEB",
    title: "Páginas web",
    description:
      "Sitios rápidos y claros, con el diseño y la performance que tu marca necesita para convertir.",
    image: "/img/laptop/laptop-front-web.png",
    alt: "Laptop mostrando un sitio web",
    badges: [
      { icon: Globe, label: "Presencia a tu altura" },
      { icon: Sparkles, label: "Diseño exclusivo, sin plantillas" },
      { icon: MessageSquare, label: "Construida para generar contactos" },
    ],
    includes: [
      "Diseño a medida, sin plantillas",
      "Copy y estructura pensados para convertir",
      "Optimización de velocidad y SEO on-page",
      "Botón o formulario de contacto conectado a WhatsApp",
    ],
    example:
      "Un local de indumentaria que hoy solo tiene Instagram pasa a tener un catálogo simple donde el cliente ve productos y precios antes de escribir.",
  },
  {
    eyebrow: "03 · AUTOMATIZACIONES",
    title: "Automatizaciones",
    description:
      "Conectamos tus herramientas y automatizamos las tareas repetitivas para que tu equipo deje de hacerlas a mano.",
    image: "/img/laptop/laptop-front-automation.png",
    alt: "Laptop mostrando un flujo de automatización",
    badges: [
      { icon: Workflow, label: "Cero intervención manual" },
      { icon: ShieldCheck, label: "Cero margen de error" },
      { icon: Clock, label: "Tiempo operativo, no administrativo" },
    ],
    includes: [
      "Mapeo de las tareas repetitivas actuales",
      "Conexión entre las herramientas que ya usás (planillas, WhatsApp, mail, sistemas de gestión)",
      "Alertas automáticas cuando algo necesita atención",
    ],
    example:
      "Un local que hoy pasa a mano cada pedido de una planilla a WhatsApp pasa a que el pedido llegue armado automáticamente, sin tipearlo dos veces.",
  },
  {
    eyebrow: "04 · AGENTES DE IA",
    title: "Agentes de IA",
    description:
      "Agentes de IA que responden y atienden en WhatsApp e Instagram, cuando tu negocio lo necesita.",
    image: "/img/laptop/laptop-front-agents.png",
    alt: "Laptop mostrando un agente de IA conversacional",
    badges: [
      { icon: Bot, label: "Criterio de negocio real" },
      { icon: Filter, label: "Filtra y califica leads" },
      { icon: InfinityIcon, label: "Disponibilidad sin ampliar equipo" },
    ],
    includes: [
      "Agente conectado a WhatsApp o Instagram, entrenado con la información real de tu negocio",
      "Filtro de consultas para que solo lleguen los leads que valen la pena",
      "Traspaso a una persona cuando el caso lo requiere",
    ],
    example:
      "Un negocio que hoy responde los mismos horarios y precios uno por uno en WhatsApp pasa a que el agente responda eso al instante y solo avise cuando alguien está listo para comprar.",
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-brand-cream px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-cream-soft sm:text-xs">
            EN QUÉ TRABAJAMOS
          </span>
          <span className="h-px flex-1 max-w-24 bg-brand-line-on-cream" />
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
