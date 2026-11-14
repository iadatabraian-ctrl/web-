"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Bar } from "@/components/Bar";

/* Servicios (sección oscura, ver PRODUCT.md): abre con la frase que antes era la sección
   Diagnóstico y lista los 4 servicios como filas grandes. Cada fila se enciende con una barra
   diagonal de borde duro. Sin imágenes: las capturas anteriores tenían cifras inventadas. */

const SERVICES = [
  {
    href: "/software-a-medida",
    title: "Software a medida",
    description:
      "Sistemas, paneles y herramientas internas diseñados para la forma real en que opera tu negocio.",
  },
  {
    href: "/paginas-web",
    title: "Páginas web",
    description:
      "Sitios rápidos y claros, con el diseño y la performance que tu marca necesita para convertir.",
  },
  {
    href: "/automatizacion",
    title: "Automatizaciones",
    description:
      "Conectamos tus herramientas y automatizamos las tareas repetitivas para que tu equipo deje de hacerlas a mano.",
  },
  {
    href: "/agentes-whatsapp",
    title: "Agentes de IA",
    description:
      "Agentes de IA que responden y atienden en WhatsApp e Instagram, cuando tu negocio lo necesita.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-10% 0px" } as const;

export function Servicios() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-brand-black-deep px-5 pb-20 pt-[calc(2.5rem+4rem)] text-brand-cream sm:px-8 sm:pb-28 sm:pt-[calc(8vw+5rem)] lg:px-[6vw]"
      // corte diagonal arriba: separa esta sección oscura del hero, también oscuro
      style={{
        clipPath: "polygon(0 var(--cut), 100% 0, 100% 100%, 0 100%)",
        marginTop: "calc(-1 * var(--cut))",
        ["--cut" as string]: "clamp(2.5rem, 8vw, 7rem)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Bar style={{ right: "-4vw", top: "12vw", width: "9vw", height: "46vw", skew: 37, origin: "100% 0", fill: "linear-gradient(to left, rgba(255,92,26,0.30), rgba(255,92,26,0))", edge: "right" }} i={0} />
        <Bar className="max-sm:hidden" style={{ right: "14vw", top: "20vw", width: "4vw", height: "30vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.10)" }} i={1} />
        <Bar className="max-lg:hidden" style={{ left: "-5vw", bottom: 0, width: "9vw", height: "20vw", skew: 37, origin: "0 100%", fill: "linear-gradient(to right, rgba(255,92,26,0.28), rgba(255,92,26,0))", edge: "left" }} i={2} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Titular */}
        <h2 className="font-impact text-[14vw] font-black uppercase italic leading-[0.88] tracking-[-0.005em] [font-stretch:50%] sm:text-[9.5vw] lg:text-[7.4rem]">
          <motion.span
            initial={{ opacity: 0, x: "-12vw" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease }}
            className="block text-white/95"
          >
            El negocio creció.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: "-12vw" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease, delay: 0.18 }}
            className="block text-white/75"
          >
            El sistema no.
          </motion.span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="mt-6 max-w-md font-body text-base leading-relaxed text-brand-ink-on-black-soft sm:mt-8 sm:text-lg"
        >
          Cuatro formas de que el sistema crezca al ritmo del negocio.
        </motion.p>

        {/* Servicios */}
        <ol className="mt-14 border-t border-brand-line-on-black sm:mt-20">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="border-b border-brand-line-on-black"
            >
              <Link
                href={s.href}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 overflow-hidden py-7 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-8 sm:py-10"
              >
                {/* barra diagonal que se enciende */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-[-6%] w-0 -skew-x-[37deg] bg-brand-accent/[0.13] transition-[width] duration-500 ease-out group-hover:w-[112%] group-focus-visible:w-[112%]"
                />
                <span className="relative font-impact text-3xl font-black italic leading-none text-brand-cream/35 [font-stretch:50%] sm:text-6xl">
                  0{i + 1}
                </span>
                <span className="relative">
                  <span className="block font-impact text-[2.6rem] font-black uppercase italic leading-[0.95] [font-stretch:50%] sm:text-7xl lg:text-[5.4rem]">
                    {s.title}
                  </span>
                  <span className="mt-3 block max-w-xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
                    {s.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border border-brand-cream/30 transition-colors duration-300 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-brand-black sm:h-14 sm:w-14"
                >
                  <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
                </span>
                <span className="sr-only">Ver el servicio completo</span>
              </Link>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
