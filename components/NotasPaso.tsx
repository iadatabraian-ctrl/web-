"use client";

import { useId } from "react";
import { motion } from "framer-motion";

/* Pasos como notas inclinadas con chinche, en zigzag, unidas por un camino punteado que se dibuja
   al entrar en pantalla. Se usa en el home (De la idea a la solución) y en las páginas de servicio. */

const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-10% 0px" } as const;

export function NotasPaso({ pasos }: { pasos: { t: string; d: string }[] }) {
  return (
    <ol className="mx-auto mt-8 max-w-4xl sm:mt-20">
          {pasos.map((st, i) => (
            <li key={st.t}>
              {i > 0 && <Camino from={i % 2 === 0 ? "right" : "left"} />}
              <div className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2.5 : 2.5 }}
                  viewport={view}
                  transition={{ duration: 0.8, ease }}
                  className="relative w-[68%] max-w-[26rem] rounded-[1.3rem] bg-brand-cream p-2 text-brand-ink-on-cream shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] sm:w-[60%] sm:p-3"
                >
                  <span aria-hidden="true" className="absolute -top-2.5 left-1/2 z-10 h-5 w-5 sm:-top-3 sm:h-6 sm:w-6 -translate-x-1/2 rounded-full border-b-[3px] border-[#c4430a] bg-brand-accent shadow-[0_6px_10px_rgba(0,0,0,0.45)]" />
                  <div className={`rounded-[1rem] px-3.5 pb-4 pt-5 sm:rounded-[1.2rem] sm:px-5 sm:pb-6 sm:pt-6 ${i % 2 === 0 ? "bg-[#ffe3d3]" : "bg-[#ebe3d2]"}`}>
                    <span className="block font-impact text-[1.8rem] font-light not-italic leading-none text-brand-accent [font-stretch:90%] sm:text-[2.6rem]">
                      0{i + 1}
                    </span>
                    <h3 className="mt-2 origin-bottom-left -skew-x-[5deg] font-impact text-[1.15rem] font-semibold uppercase not-italic leading-[1.05] [font-stretch:85%] sm:text-[1.75rem]">
                      {st.t}
                    </h3>
                    <p className="mt-1.5 font-body text-[12.5px] leading-snug text-brand-ink-on-cream-soft sm:mt-2 sm:text-base">{st.d}</p>
                  </div>
                </motion.div>
              </div>
            </li>
          ))}
    </ol>
  );
}

/* Camino punteado entre una nota y la siguiente. Se revela con una máscara que se dibuja. */
function Camino({ from }: { from: "left" | "right" }) {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden="true" className="relative mx-auto h-9 w-full sm:h-24">
      <CaminoSvg id={`${id}m`} from={from} xs={[34, 66]} className="sm:hidden" />
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
