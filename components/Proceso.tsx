"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Bar } from "@/components/Bar";

/* Proceso (sección oscura, ver PRODUCT.md): escalera ascendente de 4 pasos sobre una barra de luz
   que se enciende con el scroll. Sin tarjetas. Corte diagonal arriba contra Servicios (clara). */

const STEPS = [
  { title: "Relevamiento del negocio", desc: "Análisis de cómo opera hoy y qué lo está frenando." },
  { title: "Propuesta de solución", desc: "Alcance claro, sin letra chica." },
  { title: "Desarrollo", desc: "Construcción del software o el sitio." },
  { title: "Acompañamiento", desc: "Ajustes y soporte una vez en marcha." },
];

// Geometría de la escalera (laptop): viewBox 1200x640, nodos sobre una recta ascendente.
const W = 1200;
const H = 640;
const NODES = [
  { x: 72, y: 372 },
  { x: 360, y: 264 },
  { x: 648, y: 156 },
  { x: 936, y: 48 },
];
const LINE = { x1: 24, y1: 390, x2: 1050, y2: 6 };
const T = NODES.map((n) => (n.x - LINE.x1) / (LINE.x2 - LINE.x1));

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

        <Escalera />
      </div>
    </section>
  );
}

function Escalera() {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(T.filter((t) => v >= t - 0.04).length));

  return (
    <div ref={ref} className="mt-12 sm:mt-16">
      {/* Laptop: escalera ascendente */}
      <div className="relative mx-auto hidden w-full max-w-6xl lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <line x1={LINE.x1} y1={LINE.y1} x2={LINE.x2} y2={LINE.y2} stroke="rgba(255,255,255,0.12)" strokeWidth="10" vectorEffect="non-scaling-stroke" />
          <motion.line
            x1={LINE.x1}
            y1={LINE.y1}
            x2={LINE.x2}
            y2={LINE.y2}
            stroke="#FF5C1A"
            strokeWidth="10"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
        {STEPS.map((st, i) => (
          <div key={st.title} className="absolute" style={{ left: `${(NODES[i].x / W) * 100}%`, top: `${(NODES[i].y / H) * 100}%`, width: "24%" }}>
            <span
              aria-hidden="true"
              className={`absolute -left-[9px] -top-[9px] h-[18px] w-[18px] rounded-full ring-4 ring-[#0d0b08] transition-colors duration-300 ${i < lit ? "bg-brand-accent" : "bg-[#3a342b]"}`}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="pt-6"
            >
              <span className={`block origin-bottom-left -skew-x-[5deg] font-impact text-[6rem] font-black not-italic leading-[0.85] [font-stretch:80%] transition-colors duration-300 ${i < lit ? "text-brand-accent" : "text-white/20"}`}>
                0{i + 1}
              </span>
              <h3 className="mt-3 origin-bottom-left -skew-x-[5deg] font-impact text-[1.7rem] font-black uppercase not-italic leading-[1.02] [font-stretch:80%]">{st.title}</h3>
              <p className="mt-2 max-w-[17rem] font-body text-sm leading-snug text-brand-ink-on-black-soft">{st.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Celular y tablet: escalera vertical */}
      <div className="relative lg:hidden">
        <span aria-hidden="true" className="absolute bottom-3 left-[8px] top-3 w-[4px] bg-white/12" />
        <motion.span aria-hidden="true" className="absolute bottom-3 left-[8px] top-3 w-[4px] origin-top bg-brand-accent" style={{ scaleY: scrollYProgress }} />
        <ol className="space-y-9 sm:space-y-12">
          {STEPS.map((st, i) => (
            <li key={st.title} className="relative pl-10 sm:pl-14">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-3 h-[20px] w-[20px] rounded-full ring-4 ring-[#0d0b08] transition-colors duration-300 ${i < lit ? "bg-brand-accent" : "bg-[#3a342b]"}`}
              />
              <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={{ duration: 0.6, ease }}>
                <span className={`block origin-bottom-left -skew-x-[5deg] font-impact text-[4.6rem] font-black not-italic leading-[0.85] [font-stretch:80%] transition-colors duration-300 sm:text-[6rem] ${i < lit ? "text-brand-accent" : "text-white/20"}`}>
                  0{i + 1}
                </span>
                <h3 className="mt-2 origin-bottom-left -skew-x-[5deg] font-impact text-[1.7rem] font-black uppercase not-italic leading-[1.02] [font-stretch:80%] sm:text-3xl">{st.title}</h3>
                <p className="mt-1.5 max-w-sm font-body text-[15px] leading-snug text-brand-ink-on-black-soft sm:text-base">{st.desc}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
