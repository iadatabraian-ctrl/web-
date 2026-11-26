"use client";

import { motion } from "framer-motion";
import { Bar } from "@/components/Bar";
import { ProcesoCamino } from "@/components/ProcesoCamino";

/* Proceso (sección oscura, ver PRODUCT.md): 4 pasos sobre un camino en S naranja con círculos crema (ProcesoCamino).
   Corte diagonal arriba contra Servicios (clara). Las páginas de servicio siguen usando NotasPaso. */

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
      className="relative overflow-hidden bg-[#0a0a0a] px-5 pb-12 pt-[calc(2.5rem+1.75rem)] text-brand-cream sm:px-8 sm:pb-28 sm:pt-[calc(8vw+5rem)] lg:px-[6vw]"
      style={{
        clipPath: "polygon(0 0, 100% var(--cut), 100% 100%, 0 100%)",
        marginTop: "calc(-1 * var(--cut))",
        ["--cut" as string]: "clamp(2.5rem, 8vw, 7rem)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Bar gray style={{ left: "-4vw", top: "22vw", width: "9vw", height: "40vw", skew: 37, origin: "0 0", fill: "linear-gradient(to right, rgba(255,92,26,0.26), rgba(255,92,26,0))", edge: "left" }} i={0} />
        <Bar gray className="max-sm:hidden" style={{ right: "6vw", bottom: 0, width: "4vw", height: "22vw", skew: 37, origin: "100% 100%", fill: "rgba(255,92,26,0.12)" }} i={1} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-balance text-center font-body text-[7.4vw] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] sm:text-[5vw] lg:text-[4.4rem]">
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]"><motion.span
            initial={{ y: "108%" }}
            whileInView={{ y: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease }}
            className="block text-white/95"
          >
            De la idea
          </motion.span></span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]"><motion.span
            initial={{ y: "108%" }}
            whileInView={{ y: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease, delay: 0.18 }}
            className="block text-white/75"
          >
            a la solución.
          </motion.span></span>
        </h2>

        <ProcesoCamino pasos={STEPS.map((s) => ({ t: s.title, d: s.desc }))} />
      </div>
    </section>
  );
}
