"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BrowserFrame } from "@/components/servicios/BrowserFrame";
import { PhoneFrame } from "@/components/servicios/PhoneFrame";

const ADMIN = [
  { k: "dashboard", label: "Panel general" },
  { k: "socios", label: "Socios" },
  { k: "lista", label: "Pasar lista" },
  { k: "retencion", label: "Constancia y retención" },
  { k: "clases", label: "Clases" },
  { k: "finanzas", label: "Finanzas" },
] as const;
const SOCIO = ["inicio", "racha", "clases", "rutinas", "logros"] as const;

export function ShowcaseSoftware() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(0);
  const [phone, setPhone] = useState(0);
  const [auto, setAuto] = useState(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.4"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 38, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.84, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [reduce ? 1 : 0, 1]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPhone((p) => (p + 1) % SOCIO.length), 3200);
    return () => clearInterval(id);
  }, [reduce]);
  useEffect(() => {
    if (reduce || !auto) return;
    const id = setInterval(() => setTab((t) => (t + 1) % ADMIN.length), 4200);
    return () => clearInterval(id);
  }, [reduce, auto]);

  return (
    <section className="relative overflow-hidden bg-brand-black-soft px-5 py-12 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.15em] text-brand-accent">DEMO</p>
        <h2 className="mt-3 max-w-2xl text-2xl text-brand-cream sm:text-5xl">
          Un sistema de gestión completo, de punta a punta.
        </h2>
        <p className="mt-3 max-w-xl font-body text-xs leading-relaxed text-brand-ink-on-black-soft sm:mt-5 sm:text-base">
          Un panel para el administrador (socios, asistencia, retención, clases y finanzas) y una aplicación
          para los socios (reservas, rutinas, racha de visitas y logros), conectados a la misma base de datos.
        </p>

        <div ref={ref} className="relative mt-7 sm:mt-12" style={{ perspective: "1600px" }}>
          <motion.div style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }} className="relative">
            <div className="flex flex-wrap gap-2 pb-4">
              {ADMIN.map((a, i) => (
                <button
                  key={a.k}
                  type="button"
                  onClick={() => {
                    setTab(i);
                    setAuto(false);
                  }}
                  className={`rounded-full border px-4 py-1.5 font-body text-xs font-semibold transition-colors ${
                    tab === i
                      ? "border-brand-accent bg-brand-accent text-brand-black"
                      : "border-white/15 text-brand-ink-on-black-soft hover:border-white/40 hover:text-brand-cream"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <BrowserFrame url="panel.deployfit.com · administrador" className="w-full sm:w-[88%]">
                <div className="relative aspect-[16/10] bg-[#eef2f6]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={ADMIN[tab].k}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={`/img/demos/gimnasio/admin-${ADMIN[tab].k}.webp`}
                        alt={`Panel de administración: ${ADMIN[tab].label}`}
                        fill
                        sizes="(min-width: 1024px) 60vw, 90vw"
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </BrowserFrame>

              <PhoneFrame className="mx-auto mt-8 w-[46%] max-w-[220px] sm:absolute sm:-bottom-10 sm:right-0 sm:mt-0 sm:w-[24%] sm:max-w-[250px]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={SOCIO[phone]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={`/img/demos/gimnasio/socio-${SOCIO[phone]}.webp`}
                      alt={`Aplicación para socios: ${SOCIO[phone]}`}
                      fill
                      sizes="250px"
                      className="object-contain object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
            </div>
          </motion.div>
        </div>

        <p className="mt-10 font-body text-xs text-brand-ink-on-black-soft sm:mt-20">
          Sistema de gestión desarrollado por Deploy, mostrado con datos de ejemplo.
        </p>
      </div>
    </section>
  );
}
