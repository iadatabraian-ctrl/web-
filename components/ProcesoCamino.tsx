"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ClipboardList, CodeXml, LifeBuoy, Search } from "lucide-react";

/* Proceso de la home: camino en S de color naranja que baja de paso en paso, con un círculo crema y un ícono en cada paso.
   En escritorio el texto alterna a izquierda y derecha; en celular es una sola columna con el camino a un costado.
   El camino se dibuja y los círculos aparecen al entrar en pantalla (sin animación si se pidió menos movimiento). */

const ICONOS = [Search, ClipboardList, CodeXml, LifeBuoy];
const CAMINO = "M 25 12.5 C 25 25, 75 25, 75 37.5 C 75 50, 25 50, 25 62.5 C 25 75, 75 75, 75 87.5";
const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-15% 0px" } as const;

export function ProcesoCamino({ pasos }: { pasos: { t: string; d: string }[] }) {
  const quieto = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const aparece = (delay: number) =>
    quieto
      ? {}
      : { initial: { opacity: 0, scale: 0.55 }, whileInView: { opacity: 1, scale: 1 }, viewport: view, transition: { duration: 0.6, ease, delay } };
  const sube = (delay: number) =>
    quieto
      ? {}
      : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: view, transition: { duration: 0.6, ease, delay } };

  return (
    <ol className="relative mx-auto mt-10 max-w-4xl sm:mt-20">
      {/* Camino en S (escritorio): pasa por el centro de cada círculo */}
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible max-sm:hidden">
        <defs>
          <linearGradient id="proceso-naranja" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff7a3d" />
            <stop offset="100%" stopColor="#e2490f" />
          </linearGradient>
        </defs>
        {/* El tubo es un trazo fijo; una máscara con un trazo que se dibuja lo va revelando (así el ancho del tubo no depende de la animación) */}
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="140" height="140">
          <motion.path
            d={CAMINO}
            fill="none"
            stroke="#fff"
            strokeWidth="24"
            strokeLinecap="round"
            {...(quieto ? {} : { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: view, transition: { duration: 2.2, ease: "easeInOut", delay: 0.2 } })}
          />
        </mask>
        <path d={CAMINO} fill="none" stroke="url(#proceso-naranja)" strokeWidth="64" strokeLinecap="round" vectorEffect="non-scaling-stroke" mask={`url(#${id}m)`} />
      </svg>

      {pasos.map((p, i) => {
        const Icono = ICONOS[i] ?? Search;
        const derecha = i % 2 === 1; // el círculo va a la derecha en los pasos 2 y 4
        const ultimo = i === pasos.length - 1;
        return (
          <li key={p.t} className="relative max-sm:flex max-sm:min-h-[7.4rem] max-sm:items-center sm:grid sm:h-[15.5rem] sm:grid-cols-2 sm:items-center">
            {/* Camino en celular: tramo de este paso */}
            <span
              aria-hidden="true"
              className="absolute left-[2.6rem] w-6 -translate-x-1/2 bg-brand-accent sm:hidden"
              style={{ top: i === 0 ? "3.7rem" : 0, bottom: ultimo ? "calc(100% - 3.7rem)" : 0 }}
            />

            {/* Círculo */}
            <motion.div
              {...aparece(0.35 + i * 0.5)}
              className={`relative z-10 flex size-[5.2rem] shrink-0 items-center justify-center rounded-full bg-brand-cream text-[#0a0a0a] ring-[7px] ring-brand-accent max-sm:absolute max-sm:left-0 max-sm:top-[1.1rem] sm:size-[9.5rem] sm:ring-[12px] ${derecha ? "sm:col-start-2 sm:justify-self-center" : "sm:col-start-1 sm:justify-self-center"}`}
            >
              <Icono className="size-9 sm:size-[3.6rem]" strokeWidth={1.4} />
              <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-[#0a0a0a] font-mono text-[11px] font-bold text-brand-cream ring-2 ring-brand-accent sm:-right-0 sm:-top-0 sm:size-9 sm:text-sm">0{i + 1}</span>
            </motion.div>

            {/* Texto */}
            <motion.div
              {...sube(0.55 + i * 0.5)}
              className={`py-3 pl-[6.6rem] sm:py-0 sm:pl-0 ${derecha ? "sm:col-start-1 sm:row-start-1 sm:pr-10 sm:text-right" : "sm:col-start-2 sm:pl-10 sm:text-left"}`}
            >
              <h3 className="font-body text-[0.95rem] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-brand-cream sm:text-[1.6rem]">{p.t}</h3>
              <p className="mt-1 font-body text-[13px] leading-snug text-brand-cream/70 sm:mt-2 sm:text-base">{p.d}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
