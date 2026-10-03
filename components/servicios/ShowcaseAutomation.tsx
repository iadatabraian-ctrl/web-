"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GmailIcon, WhatsAppIcon } from "@/components/BrandIcons";

function Node({ children, label, sub, accent = false }: { children: ReactNode; label: string; sub: string; accent?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center text-center sm:w-44">
      <div
        className={`flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-[#0d0c0a] shadow-xl shadow-black/50 ${
          accent ? "border-brand-accent/70" : "border-white/12"
        }`}
      >
        {children}
      </div>
      <p className="mt-3 font-body text-sm font-semibold text-brand-cream">{label}</p>
      <p className="mt-1 max-w-[11rem] font-body text-xs leading-snug text-brand-ink-on-black-soft">{sub}</p>
    </div>
  );
}

function Connector({ delay, reduce }: { delay: number; reduce: boolean | null }) {
  const trans = { duration: 2.2, repeat: Infinity, ease: "linear" as const, delay, repeatDelay: 0.6 };
  return (
    <div className="relative mx-auto h-14 w-px bg-white/15 sm:mt-[3rem] sm:h-px sm:w-full sm:flex-1">
      {!reduce && (
        <>
          <motion.span
            animate={{ top: ["0%", "100%"] }}
            transition={trans}
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent shadow-[0_0_10px_2px_rgba(255,92,26,0.6)] sm:hidden"
          />
          <motion.span
            animate={{ left: ["0%", "100%"] }}
            transition={trans}
            className="absolute top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent shadow-[0_0_10px_2px_rgba(255,92,26,0.6)] sm:block"
          />
        </>
      )}
    </div>
  );
}

export function ShowcaseAutomation() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-brand-black-soft px-5 py-12 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.15em] text-brand-accent">ASÍ FUNCIONA</p>
        <h2 className="mt-3 max-w-2xl text-2xl text-brand-cream sm:text-5xl">
          Un pedido que se carga solo, sin que nadie lo escriba dos veces.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:mt-14 items-center gap-2 sm:flex-row sm:items-start sm:gap-0"
        >
          <Node label="Llega un mensaje" sub="Un cliente hace un pedido por WhatsApp.">
            <WhatsAppIcon className="h-11 w-11" />
          </Node>
          <Connector delay={0} reduce={reduce} />
          <Node label="Se automatiza" sub="Se interpreta el pedido y se arma el registro." accent>
            <span className="font-display text-4xl text-brand-cream">
              <span className="text-brand-accent">/</span>
            </span>
          </Node>
          <Connector delay={1.1} reduce={reduce} />
          <Node label="Se carga en el sistema" sub="Queda ordenado en el panel de gestión.">
            <Image
              src="/img/demos/gimnasio/admin-dashboard.webp"
              alt="Panel de gestión"
              width={192}
              height={120}
              className="h-full w-full object-cover object-left-top"
            />
          </Node>
          <Connector delay={2.2} reduce={reduce} />
          <Node label="Se avisa al equipo" sub="Llega una notificación por correo.">
            <GmailIcon className="h-11 w-11" />
          </Node>
        </motion.div>
      </div>
    </section>
  );
}
