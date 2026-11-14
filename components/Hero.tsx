"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";

/* Hero futurista (sección oscura "noche"): palabra de marca gigante, un objeto de luz
   al centro y etiquetas de vidrio con los 4 servicios reales.
   Para usar una imagen propia en lugar del orbe de CSS: poner el archivo en
   public/img/hero/hero-visual.png (PNG con fondo transparente, ~1600px) y
   cambiar HERO_VISUAL a "/img/hero/hero-visual.png". */
const HERO_VISUAL: string | null = null;

const SERVICES = [
  { n: "01", tag: "SOFTWARE", label: "Software a medida", pos: "left-[1%] bottom-[16%]" },
  { n: "02", tag: "WEB", label: "Páginas web", pos: "right-[1%] bottom-[16%]" },
  { n: "03", tag: "AUTOMATIZACIÓN", label: "Automatización", pos: "left-[19%] bottom-[2%]" },
  { n: "04", tag: "AGENTES IA", label: "Agentes de IA", pos: "right-[19%] bottom-[2%]" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [start, setStart] = useState(false);
  const [live, setLive] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onSplashDone = () => setStart(true);
    window.addEventListener("splash-done", onSplashDone);
    return () => window.removeEventListener("splash-done", onSplashDone);
  }, []);

  // "en producción." se enciende un instante después de que arranca el hero
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setLive(true), reduce ? 0 : 700);
    return () => clearTimeout(t);
  }, [start, reduce]);

  return (
    <section
      id="inicio"
      className="aura-night relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-24 text-ink-on-night sm:px-8 sm:pt-28 min-[900px]:px-12"
    >
      <div className="grid-hud pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Escenario: palabra gigante + objeto de luz + etiquetas de vidrio */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: start ? 1 : 0 }}
        transition={{ duration: 0.8, ease }}
        aria-hidden="true"
        className="relative mx-auto h-[40svh] min-h-[280px] w-full max-w-6xl sm:h-[42svh] lg:h-[38svh]"
      >
        <span
          className="absolute inset-x-0 top-0 select-none text-center font-display text-[clamp(6rem,25vw,20rem)] uppercase leading-[0.9]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(214,219,255,0.95) 0%, rgba(150,160,230,0.55) 55%, rgba(120,130,210,0.06) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Deploy
        </span>

        {/* Objeto de luz */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 aspect-square h-[68%] -translate-x-1/2"
        >
          {HERO_VISUAL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={HERO_VISUAL} alt="" className="h-full w-full object-contain" />
          ) : (
            <>
              <div
                className="absolute -inset-[18%] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(124,58,237,0.55), rgba(47,107,255,0.28) 60%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, #d6c8ff 0%, #8b5cf6 22%, #2f6bff 50%, #0d1030 80%)",
                  boxShadow:
                    "inset -24px -30px 70px rgba(7,8,22,0.85), 0 0 90px rgba(124,58,237,0.45)",
                }}
              />
              <div
                className="absolute inset-0 rounded-full opacity-60 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(circle at 72% 78%, rgba(34,211,238,0.4), transparent 52%), radial-gradient(circle at 20% 80%, rgba(217,70,239,0.3), transparent 45%)",
                }}
              />
            </>
          )}
        </motion.div>

        {/* Etiquetas de vidrio con los servicios (solo en pantallas anchas) */}
        {SERVICES.map((s) => (
          <div
            key={s.n}
            className={`absolute hidden min-[900px]:block ${s.pos}`}
          >
            <div className="glass-tag rounded-2xl border border-white/15 px-4 py-3">
              <p className="hud-tag">
                {s.n} · {s.tag}
              </p>
              <p className="mt-2 font-body text-sm font-semibold text-ink-on-night">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Contenido */}
      <div className="relative z-[1] mx-auto mt-6 grid w-full max-w-6xl flex-1 gap-8 sm:mt-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div className="mx-auto max-w-3xl text-center sm:mx-0 sm:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: start ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-line-on-night px-3 py-1.5 sm:px-4 sm:py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-on-night-soft sm:text-xs">
              Soluciones digitales
            </span>
          </motion.div>

          <h1 className="mt-5 text-balance font-display text-[11vw] leading-[1.02] sm:text-6xl xl:text-[4.2rem]">
            <motion.span
              initial="hidden"
              animate={start ? "show" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.45, ease, delay: 0.1 }}
              className="block text-ink-on-night"
            >
              Tu idea,
            </motion.span>
            <motion.span
              initial="hidden"
              animate={start ? "show" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.45, ease, delay: 0.2 }}
              className={`block transition-opacity duration-700 ${live ? "text-neon opacity-100" : "text-ink-on-night opacity-25"}`}
            >
              en producción.
            </motion.span>
          </h1>

          <motion.p
            initial="hidden"
            animate={start ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, ease, delay: 0.45 }}
            className="mx-auto mt-4 max-w-xl font-body text-[15px] leading-relaxed text-ink-on-night-soft sm:mx-0 sm:mt-5 sm:text-lg"
          >
            Diseñamos e implementamos los{" "}
            <strong className="font-semibold text-ink-on-night">sistemas</strong> que tu negocio
            necesita para dejar atrás las tareas manuales y seguir creciendo sin fricción.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={start ? "show" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, ease, delay: 0.55 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4"
          >
            <a
              href="#hablemos"
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-brand-black transition-[transform,opacity] duration-200 ease-out hover:opacity-90 active:scale-[0.97] sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Hablemos
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <a
              href="#servicios"
              className="edge-neon inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-ink-on-night transition-[transform,opacity] duration-200 ease-out hover:opacity-90 active:scale-[0.97] sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Ver servicios
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate={start ? "show" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5, ease, delay: 0.65 }}
          className="text-center lg:text-right"
        >
          <p className="hidden font-body text-sm font-semibold leading-snug text-ink-on-night sm:block">
            Software a medida, web y automatización
            <br />
            para negocios en Uruguay
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2 min-[900px]:hidden">
            {SERVICES.map((s, i) => (
              <li
                key={s.n}
                className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-on-night-soft sm:text-xs"
              >
                {i > 0 && <span className="text-neon-cyan">/</span>}
                {s.label}
              </li>
            ))}
          </ul>
          <div className="mt-5 hidden items-center justify-end gap-2 lg:flex">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-on-night-soft">
              Explorar
            </span>
            <ArrowDown className="h-3 w-3 text-neon-cyan" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
