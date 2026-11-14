"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* Hero oscuro (ver PRODUCT.md): titular a la izquierda y figura con visor naranja a la
   derecha, fundida con el negro. Imagen: public/img/hero/hero-figura.webp (generada con IA; alternativa: hero-figura-alt.webp). */

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const ease = [0.16, 1, 0.3, 1] as const;

// funde los bordes de la imagen con el fondo: izquierda y abajo
const FADE_MASK =
  "linear-gradient(to right, transparent 0%, #000 38%), linear-gradient(to top, transparent 0%, #000 22%)";

export function Hero() {
  const [start, setStart] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const onSplashDone = () => setStart(true);
    window.addEventListener("splash-done", onSplashDone);
    return () => window.removeEventListener("splash-done", onSplashDone);
  }, []);

  // "en producción." se enciende un instante después de que arranca el hero
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setLive(true), 700);
    return () => clearTimeout(t);
  }, [start]);

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-black-deep text-brand-cream lg:flex lg:min-h-[100svh] lg:items-center"
    >
      {/* Imagen: arriba en celular, a la derecha en pantallas anchas */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: start ? 1 : 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative h-[62svh] min-h-[380px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[64%]"
        style={{
          WebkitMaskImage: FADE_MASK,
          maskImage: FADE_MASK,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <Image
          src="/img/hero/hero-figura.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover object-[55%_8%] lg:object-[50%_6%]"
        />
      </motion.div>

      <div className="relative z-[1] -mt-16 px-5 pb-14 sm:px-8 lg:mt-0 lg:w-full lg:px-12 lg:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-xl text-center sm:mx-0 sm:text-left lg:max-w-[42rem]">
            <h1 className="text-balance font-display text-[14vw] leading-[0.92] tracking-[-0.01em] sm:text-[5.5rem] lg:text-[6.4rem] lg:leading-[0.9] xl:text-[8rem]">
              <motion.span
                initial="hidden"
                animate={start ? "show" : "hidden"}
                variants={fadeUp}
                transition={{ duration: 0.45, ease, delay: 0.1 }}
                className="block text-brand-cream"
              >
                Tu idea,
              </motion.span>
              <motion.span
                initial="hidden"
                animate={start ? "show" : "hidden"}
                variants={fadeUp}
                transition={{ duration: 0.45, ease, delay: 0.2 }}
                className={`block transition-colors duration-700 ${live ? "text-brand-accent" : "text-brand-cream/25"}`}
              >
                en producción.
              </motion.span>
            </h1>

            <motion.p
              initial="hidden"
              animate={start ? "show" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, ease, delay: 0.4 }}
              className="mx-auto mt-5 max-w-md font-body text-[15px] leading-relaxed text-brand-ink-on-black-soft sm:mx-0 sm:mt-6 sm:text-lg"
            >
              Diseñamos e implementamos los{" "}
              <strong className="font-semibold text-brand-cream">sistemas</strong> que tu negocio
              necesita para dejar atrás las tareas manuales y seguir creciendo sin fricción.
            </motion.p>

            <motion.div
              initial="hidden"
              animate={start ? "show" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, ease, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4"
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
                className="inline-flex items-center gap-2 rounded-full border border-brand-cream/40 px-6 py-3 font-body text-xs font-bold uppercase tracking-wide text-brand-cream transition-[transform,border-color] duration-200 ease-out hover:border-brand-cream active:scale-[0.97] sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Ver servicios
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
