"use client";

import { useId } from "react";
import { motion } from "framer-motion";

/* Pasos como notas inclinadas con chinche, en zigzag, unidas por un camino punteado que se dibuja
   al entrar en pantalla. Se usa en el home (De la idea a la solución) y en las páginas de servicio. */

const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-10% 0px" } as const;

export function NotasPaso({ pasos }: { pasos: { t: string; d: string }[] }) {
  return (
    <ol className="mx-auto mt-5 max-w-4xl sm:mt-20">
          {pasos.map((st, i) => (
            <li key={st.t}>
              {i > 0 && <Camino from={i % 2 === 0 ? "right" : "left"} />}
              <div className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2.5 : 2.5 }}
                  viewport={view}
                  transition={{ duration: 0.8, ease }}
                  className={`relative w-[72%] max-w-[26rem] rounded-[1.4rem] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] sm:w-[60%] sm:rounded-[1.8rem] ${
                    i % 2 === 0 ? "bg-brand-cream text-[#0a0a0a]" : "bg-brand-accent text-[#0a0a0a]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -top-2.5 left-1/2 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-b-[3px] shadow-[0_6px_10px_rgba(0,0,0,0.45)] sm:-top-3 sm:h-6 sm:w-6 ${
                      i % 2 === 0 ? "border-[#c4430a] bg-brand-accent" : "border-black bg-[#0a0a0a]"
                    }`}
                  />
                  <div className="px-4 pb-3.5 pt-5 sm:px-7 sm:pb-7 sm:pt-9">
                    <span className={`block font-body text-[1.7rem] font-extrabold leading-none tracking-[-0.02em] sm:text-5xl ${i % 2 === 0 ? "text-brand-accent" : "text-[#0a0a0a]/85"}`}>
                      0{i + 1}
                    </span>
                    <h3 className="mt-1.5 font-body text-[0.95rem] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] sm:text-[1.6rem]">
                      {st.t}
                    </h3>
                    <p className={`mt-1 font-body text-[12px] leading-snug sm:mt-3 sm:text-base ${i % 2 === 0 ? "text-brand-ink-on-cream-soft" : "text-[#0a0a0a]/80"}`}>{st.d}</p>
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
    <div aria-hidden="true" className="relative mx-auto h-6 w-full sm:h-24">
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
