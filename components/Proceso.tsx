"use client";

import { motion } from "framer-motion";
import { Bar } from "@/components/Bar";

/* Proceso (sección oscura, ver PRODUCT.md): 4 tarjetas redondeadas con el paso a paso.
   Sin íconos ni línea vertical. Corte diagonal arriba contra Servicios (clara). */

const STEPS = [
  { title: "Relevamiento del negocio", desc: "Análisis de cómo opera hoy y qué lo está frenando." },
  { title: "Propuesta de solución", desc: "Alcance claro, sin letra chica." },
  { title: "Desarrollo", desc: "Construcción del software o el sitio." },
  { title: "Acompañamiento", desc: "Ajustes y soporte una vez en marcha." },
];

const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-10% 0px" } as const;

export function Proceso() {
  return (
    <section
      id="proceso"
      className="relative overflow-hidden bg-[#0d0b08] px-5 pb-20 pt-[calc(2.5rem+4rem)] text-brand-cream sm:px-8 sm:pb-28 sm:pt-[calc(8vw+5rem)] lg:px-[6vw]"
      style={{
        clipPath: "polygon(0 0, 100% var(--cut), 100% 100%, 0 100%)",
        marginTop: "calc(-1 * var(--cut))",
        ["--cut" as string]: "clamp(2.5rem, 8vw, 7rem)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Bar style={{ left: "-4vw", top: "22vw", width: "9vw", height: "40vw", skew: 37, origin: "0 0", fill: "linear-gradient(to right, rgba(255,92,26,0.26), rgba(255,92,26,0))", edge: "left" }} i={0} />
        <Bar className="max-sm:hidden" style={{ right: "6vw", bottom: 0, width: "4vw", height: "22vw", skew: 37, origin: "100% 100%", fill: "rgba(255,92,26,0.12)" }} i={1} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <h2 className="origin-bottom -skew-x-[5deg] text-balance text-center font-impact text-[11.5vw] font-black uppercase not-italic leading-[0.92] tracking-[-0.005em] [font-stretch:80%] sm:text-[7.6vw] lg:text-[6.2rem]">
          <motion.span
            initial={{ opacity: 0, x: "-12vw" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease }}
            className="block text-white/95"
          >
            De la idea
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: "-12vw" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease, delay: 0.18 }}
            className="block text-white/75"
          >
            a la solución.
          </motion.span>
        </h2>

        <ol className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="group flex min-h-[11rem] flex-col rounded-[1.75rem] border border-white/10 bg-brand-black p-5 transition-colors duration-300 hover:border-brand-accent/60 sm:min-h-[15rem] sm:p-6"
            >
              <span className="font-impact text-5xl font-black not-italic leading-none text-brand-accent [font-stretch:80%] sm:text-6xl">
                0{i + 1}
              </span>
              <h3 className="mt-auto origin-bottom-left -skew-x-[5deg] pt-6 font-impact text-[1.45rem] font-black uppercase not-italic leading-none [font-stretch:80%] sm:text-[1.65rem]">
                {s.title}
              </h3>
              <p className="mt-2 font-body text-[13px] leading-snug text-brand-ink-on-black-soft sm:text-sm">{s.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
