"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BrowserFrame } from "@/components/servicios/BrowserFrame";

export function ShowcaseWeb() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.25"] });
  // la imagen es de 1265x6400: el marco muestra ~0,62 de su ancho en alto, por eso recorre hasta ~-86%
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-86%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.25], [reduce ? 0 : 30, 0]);

  return (
    <section className="relative overflow-hidden bg-brand-black-soft px-5 py-12 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.15em] text-brand-accent">EJEMPLO</p>
        <h2 className="mt-3 max-w-2xl text-2xl text-brand-cream sm:text-5xl">
          Este mismo sitio es el ejemplo.
        </h2>
        <p className="mt-3 max-w-xl font-body text-xs leading-relaxed text-brand-ink-on-black-soft sm:mt-5 sm:text-base">
          Diseñado y programado a medida, sin plantillas. A medida que avanza la lectura, el sitio se recorre
          de principio a fin dentro del marco.
        </p>

        <div ref={ref} className="mt-7 sm:mt-12" style={{ perspective: "1600px" }}>
          <motion.div style={{ rotateX, transformStyle: "preserve-3d" }}>
            <BrowserFrame url="deployuy.com" className="mx-auto w-full max-w-4xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-black-deep">
                <motion.div style={{ y }} className="absolute left-0 top-0 w-full">
                  <Image
                    src="/img/demos/deploy/desktop-scroll.webp"
                    alt="Captura completa de la página de Deploy"
                    width={1265}
                    height={6400}
                    sizes="(min-width: 1024px) 56rem, 95vw"
                    className="h-auto w-full"
                  />
                </motion.div>
              </div>
            </BrowserFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
