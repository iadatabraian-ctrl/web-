"use client";

import { motion } from "framer-motion";

/* Diagnóstico (sección clara, ver PRODUCT.md): el título hecho gráfico.
   Dos curvas se dibujan al llegar a la sección: "tu negocio" sube y "tus sistemas" queda casi plana.
   El hueco entre las dos es el problema, y los 4 puntos van numerados sobre ese hueco.
   Sin cifras: el gráfico es ilustrativo y no representa datos reales. */

const PROBLEMAS = [
  { title: "Información fragmentada", desc: "Cada área trabaja por separado." },
  { title: "Procesos manuales", desc: "Más tareas. Más tiempo perdido." },
  { title: "Herramientas desconectadas", desc: "Los datos existen, pero no conversan." },
  { title: "Decisiones a ciegas", desc: "Sin una visión clara de lo que pasa." },
];

const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-12% 0px" } as const;

// Geometría del gráfico (viewBox 1000 x 560)
const W = 1000;
const H = 560;
const BASE = 470;
const negocio = (x: number) => BASE - 410 * Math.pow(x / W, 2.2);
const sistemas = (x: number) => BASE - 45 * (x / W);
const MARCAS = [350, 520, 690, 860];

const steps = Array.from({ length: 61 }, (_, i) => (i / 60) * W);
const pathNegocio = steps.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)} ${negocio(x).toFixed(1)}`).join(" ");
const pathSistemas = steps.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)} ${sistemas(x).toFixed(1)}`).join(" ");
const pathHueco =
  steps.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)} ${negocio(x).toFixed(1)}`).join(" ") +
  " " +
  [...steps].reverse().map((x) => `L${x.toFixed(1)} ${sistemas(x).toFixed(1)}`).join(" ") +
  " Z";

export function Diagnostico() {
  return (
    <section
      id="diagnostico"
      className="relative overflow-hidden bg-brand-cream px-5 py-20 text-brand-ink-on-cream sm:px-8 sm:py-28 lg:px-[6vw]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Título */}
        <h2 className="font-impact text-[13vw] font-black uppercase italic leading-[0.9] tracking-[-0.005em] [font-stretch:50%] sm:text-[9vw] lg:text-[6.6rem]">
          <motion.span
            initial={{ opacity: 0, x: "-10vw" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease }}
            className="block"
          >
            El negocio creció.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: "-10vw" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.75, ease, delay: 0.15 }}
            className="block text-brand-ink-on-cream-soft"
          >
            El sistema no.
          </motion.span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
          className="mt-5 font-body text-lg font-semibold sm:text-2xl"
        >
          Y ahí empieza el problema.
        </motion.p>

        {/* Gráfico */}
        <div className="relative mt-10 sm:mt-14">
          <div className="relative aspect-[1000/560] w-full">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0 h-full w-full overflow-visible"
              role="img"
              aria-label="Gráfico ilustrativo: tu negocio crece mucho más rápido que tus sistemas, y la distancia entre los dos es el problema."
            >
              {/* base */}
              <line x1="0" y1={BASE + 14} x2={W} y2={BASE + 14} stroke="rgba(26,23,18,0.25)" strokeWidth="2" />

              {/* hueco: el problema */}
              <motion.path
                d={pathHueco}
                fill="#FF5C1A"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.16 }}
                viewport={view}
                transition={{ duration: 0.9, ease: "easeOut", delay: 1.5 }}
              />

              {/* sistemas */}
              <motion.path
                d={pathSistemas}
                fill="none"
                stroke="#5c5142"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={view}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5 }}
              />
              {/* negocio */}
              <motion.path
                d={pathNegocio}
                fill="none"
                stroke="#1a1712"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={view}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
              />

              {/* marcas sobre el hueco */}
              {MARCAS.map((x, i) => (
                <motion.line
                  key={x}
                  x1={x}
                  x2={x}
                  y1={negocio(x)}
                  y2={sistemas(x)}
                  stroke="#FF5C1A"
                  strokeWidth="4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={view}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 2.0 + i * 0.22 }}
                />
              ))}
            </svg>

            {/* números de las marcas */}
            {MARCAS.map((x, i) => (
              <motion.span
                key={x}
                aria-hidden="true"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={view}
                transition={{ duration: 0.4, ease, delay: 2.1 + i * 0.22 }}
                className="absolute -translate-x-1/2 -translate-y-full pb-1 font-mono text-[10px] font-bold text-brand-ink-on-cream sm:text-sm"
                style={{ left: `${(x / W) * 100}%`, top: `${((negocio(x) - 6) / H) * 100}%` }}
              >
                0{i + 1}
              </motion.span>
            ))}

            {/* rótulos de las curvas */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={view}
              transition={{ duration: 0.5, delay: 2.2 }}
              className="absolute right-0 font-body text-[10px] font-bold uppercase tracking-wide sm:text-sm"
              style={{ top: `${((negocio(W) - 38) / H) * 100}%` }}
            >
              Tu negocio
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={view}
              transition={{ duration: 0.5, delay: 2.2 }}
              className="absolute right-0 font-body text-[10px] font-bold uppercase tracking-wide text-brand-ink-on-cream-soft sm:text-sm"
              style={{ top: `${((sistemas(W) + 16) / H) * 100}%` }}
            >
              Tus sistemas
            </motion.span>

            {/* Los 4 problemas, en el espacio vacío de arriba a la izquierda (desde md) */}
            <ol className="absolute left-0 top-0 hidden w-[46%] gap-[2.2vw] md:flex md:flex-col lg:gap-5">
              {PROBLEMAS.map((p, i) => (
                <ProblemaItem key={p.title} i={i} title={p.title} desc={p.desc} />
              ))}
            </ol>
          </div>

          {/* En celular, debajo del gráfico */}
          <ol className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:hidden">
            {PROBLEMAS.map((p, i) => (
              <ProblemaItem key={p.title} i={i} title={p.title} desc={p.desc} />
            ))}
          </ol>
        </div>

        {/* Cierre */}
        <div className="mt-14 sm:mt-20">
          <motion.p
            initial={{ opacity: 0, x: "-8vw" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.7, ease }}
            className="font-impact text-[9vw] font-black uppercase italic leading-[0.95] [font-stretch:50%] sm:text-[6vw] lg:text-[4.2rem]"
          >
            El problema no es crecer.
            <br />
            Es seguir operando como antes.
          </motion.p>
          <div aria-hidden="true" className="mt-6 -skew-x-[37deg] sm:mt-8">
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={view}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="block h-3 w-40 bg-brand-accent sm:h-4 sm:w-56"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemaItem({ i, title, desc }: { i: number; title: string; desc: string }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.5, ease, delay: 1.9 + i * 0.22 }}
      className="flex gap-3 sm:gap-4"
    >
      <span className="font-mono text-xs font-bold leading-6 sm:text-sm">0{i + 1}</span>
      <div>
        <h3 className="font-impact text-xl font-black uppercase italic leading-none [font-stretch:50%] sm:text-3xl lg:text-[1.9rem]">
          {title}
        </h3>
        <p className="mt-1 font-body text-sm leading-snug text-brand-ink-on-cream-soft sm:text-base">{desc}</p>
      </div>
    </motion.li>
  );
}
