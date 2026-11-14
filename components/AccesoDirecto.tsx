"use client";

import { motion } from "framer-motion";
import { Bar } from "@/components/Bar";

/* Cómo trabajamos (sección oscura, continúa a Proceso): una sola frase grande en tarjeta redondeada. */

const ease = [0.16, 1, 0.3, 1] as const;

export function AccesoDirecto() {
  return (
    <section id="directo" className="relative overflow-hidden bg-[#0d0b08] px-5 pb-20 pt-4 text-brand-cream sm:px-8 sm:pb-28 lg:px-[6vw]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Bar style={{ right: "-5vw", top: 0, width: "9vw", height: "40vw", skew: 37, origin: "100% 0", fill: "linear-gradient(to left, rgba(255,92,26,0.24), rgba(255,92,26,0))", edge: "right" }} i={2} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease }}
        className="relative mx-auto max-w-5xl rounded-[1.75rem] border border-white/10 bg-brand-black px-6 py-12 text-center sm:px-16 sm:py-20"
      >
        <p className="mx-auto max-w-3xl font-body text-lg leading-snug sm:text-3xl sm:leading-snug">
          Cuando trabajás con Deploy <strong className="font-semibold text-brand-accent">hablás directo</strong> con quien
          programa, diseña y resuelve tu proyecto, sin pasar por vendedores ni intermediarios.
        </p>
        <p className="mx-auto mt-5 max-w-xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:mt-6 sm:text-base">
          Cada proyecto se cotiza a medida, según lo que tu negocio necesita realmente.
        </p>
      </motion.div>
    </section>
  );
}
