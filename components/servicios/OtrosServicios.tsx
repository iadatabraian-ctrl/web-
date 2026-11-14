"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

/* Otros servicios como notas inclinadas con chinche (mismo estilo que "De la idea a la solución"). */

const DESC: Record<string, string> = {
  "software-a-medida": "Sistemas, paneles y herramientas internas hechas a la medida de tu operación.",
  "paginas-web": "Sitios y tiendas online diseñados desde cero, rápidos y pensados para el celular.",
  automatizacion: "Conectamos las herramientas que ya usás para dejar de copiar y pegar a mano.",
  "agentes-whatsapp": "Agentes que atienden WhatsApp e Instagram y pasan el caso a una persona cuando hace falta.",
};

const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-10% 0px" } as const;
const TILT = [-2.5, 2, -1.5];

export function OtrosServicios({ items }: { items: { slug: string; nombre: string }[] }) {
  return (
    <ul className="mt-10 flex flex-col gap-7 sm:mt-14 sm:grid sm:grid-cols-3 sm:gap-6">
      {items.map((o, i) => (
        <li key={o.slug} className={`w-[78%] sm:w-auto ${i % 2 === 0 ? "self-start" : "self-end"}`}>
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: TILT[i % 3] }}
            whileHover={{ rotate: 0, y: -4 }}
            viewport={view}
            transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            className="relative h-full rounded-[1.3rem] bg-brand-cream p-2 text-brand-ink-on-cream shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] sm:p-3"
          >
            <span aria-hidden="true" className="absolute -top-2.5 left-1/2 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-b-[3px] border-[#c4430a] bg-brand-accent shadow-[0_6px_10px_rgba(0,0,0,0.45)] sm:-top-3 sm:h-6 sm:w-6" />
            <Link
              href={`/${o.slug}`}
              className={`group flex h-full flex-col rounded-[1rem] px-3.5 pb-4 pt-5 sm:rounded-[1.2rem] sm:px-5 sm:pb-5 sm:pt-6 ${i % 2 === 0 ? "bg-[#ffe3d3]" : "bg-[#ebe3d2]"}`}
            >
              <h3 className="origin-bottom-left -skew-x-[5deg] font-impact text-[1.15rem] font-semibold uppercase not-italic leading-[1.05] [font-stretch:85%] sm:text-[1.5rem]">
                {o.nombre}
              </h3>
              <p className="mt-1.5 font-body text-[12.5px] leading-snug text-brand-ink-on-cream-soft sm:mt-2 sm:text-sm">{DESC[o.slug]}</p>
              <span className="mt-3 flex h-8 w-8 items-center justify-center self-end rounded-full bg-brand-black text-brand-cream transition-colors duration-200 group-hover:bg-brand-accent group-hover:text-brand-black sm:mt-auto sm:h-9 sm:w-9">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
            </Link>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
