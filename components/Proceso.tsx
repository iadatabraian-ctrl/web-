"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Bar } from "@/components/Bar";

/* Proceso (sección oscura, ver PRODUCT.md): 4 notas inclinadas con chinche en zigzag, unidas por un
   camino punteado que se dibuja al entrar en pantalla. Corte diagonal arriba contra Servicios (clara). */

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

        <ol className="mx-auto mt-12 max-w-4xl sm:mt-20">
          {STEPS.map((st, i) => (
            <li key={st.title}>
              {i > 0 && <Camino from={i % 2 === 0 ? "right" : "left"} />}
              <div className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2.5 : 2.5 }}
                  viewport={view}
                  transition={{ duration: 0.8, ease }}
                  className="relative w-[80%] max-w-[26rem] rounded-[1.6rem] bg-brand-cream p-2.5 text-brand-ink-on-cream shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] sm:w-[60%] sm:p-3"
                >
                  <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-b-[3px] border-[#c4430a] bg-brand-accent shadow-[0_6px_10px_rgba(0,0,0,0.45)]" />
                  <div className={`rounded-[1.2rem] px-4 pb-5 pt-6 sm:px-5 sm:pb-6 ${i % 2 === 0 ? "bg-[#ffe3d3]" : "bg-[#ebe3d2]"}`}>
                    <span className="block font-impact text-[3.2rem] font-light not-italic leading-none text-brand-accent [font-stretch:90%] sm:text-[4rem]">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 origin-bottom-left -skew-x-[5deg] font-impact text-[1.5rem] font-semibold uppercase not-italic leading-[1.05] [font-stretch:85%] sm:text-[1.75rem]">
                      {st.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-snug text-brand-ink-on-cream-soft sm:text-base">{st.desc}</p>
                  </div>
                </motion.div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Camino punteado entre una nota y la siguiente. Se revela con una máscara que se dibuja. */
function Camino({ from }: { from: "left" | "right" }) {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden="true" className="relative mx-auto h-16 w-full sm:h-24">
      <CaminoSvg id={`${id}m`} from={from} xs={[40, 60]} className="sm:hidden" />
      <CaminoSvg id={`${id}d`} from={from} xs={[23, 77]} className="max-sm:hidden" />
    </div>
  );
}

function CaminoSvg({ id, from, xs, className }: { id: string; from: "left" | "right"; xs: [number, number]; className: string }) {
  // Del centro de una nota (chinche) al centro de la siguiente, en porcentajes del ancho.
  const [x1, x2] = from === "left" ? xs : [xs[1], xs[0]];
  const d = `M ${x1} 0 C ${x1} 55, ${x2} 45, ${x2} 100`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`absolute inset-0 h-full w-full overflow-visible ${className}`}>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="-10" y="-5" width="120" height="110">
          <motion.path
            d={d}
            fill="none"
            stroke="#fff"
            strokeWidth="14"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={view}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.3 }}
          />
        </mask>
      </defs>
      <path d={d} fill="none" stroke="#FF5C1A" strokeOpacity="0.75" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" vectorEffect="non-scaling-stroke" mask={`url(#${id})`} />
    </svg>
  );
}
