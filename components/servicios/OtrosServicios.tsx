"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* Otros servicios: nombres gigantes de ancho completo, sin cajas. En laptop, al apoyar el mouse el
   nombre se enciende en naranja y aparece la imagen del servicio detrás. En celular la imagen se
   ve apagada de fondo, porque no hay hover. */

const NOMBRE: Record<string, string> = {
  "software-a-medida": "Software a medida",
  "paginas-web": "Páginas web",
  automatizacion: "Automatización",
  "agentes-whatsapp": "Agentes de IA",
};

const DESC: Record<string, string> = {
  "software-a-medida": "Sistemas, paneles y herramientas internas hechas a la medida de tu operación.",
  "paginas-web": "Sitios y tiendas online diseñados desde cero, rápidos y pensados para el celular.",
  automatizacion: "Conectamos las herramientas que ya usás para dejar de copiar y pegar a mano.",
  "agentes-whatsapp": "Agentes que atienden WhatsApp e Instagram y pasan el caso a una persona cuando hace falta.",
};

export function OtrosServicios({ items }: { items: { slug: string; nombre: string; img: string }[] }) {
  return (
    <ul className="mt-8 sm:mt-12">
      {items.map((o) => (
        <li key={o.slug} className="border-t border-white/15 last:border-b">
          <Link href={`/${o.slug}`} className="group relative block overflow-hidden py-7 sm:py-12">
            <Image
              src={o.img}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-[0.3] transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-70"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/45 to-transparent" />
            <span className="relative flex items-center justify-between gap-4 px-1 sm:px-2">
              <span className="min-w-0">
                <span className="block origin-bottom-left -skew-x-[5deg] font-impact text-[2.6rem] font-black uppercase not-italic leading-[0.95] tracking-[-0.005em] text-brand-cream transition-colors duration-200 [font-stretch:80%] group-hover:text-brand-accent sm:text-[5rem] lg:text-[6.5rem]">
                  {NOMBRE[o.slug] ?? o.nombre}
                </span>
                <span className="mt-2 block max-w-md font-body text-[13px] leading-snug text-brand-ink-on-black-soft sm:mt-3 sm:text-base">
                  {DESC[o.slug]}
                </span>
              </span>
              <ArrowUpRight aria-hidden="true" className="h-8 w-8 shrink-0 text-white transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-brand-accent sm:h-14 sm:w-14" strokeWidth={1.5} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
