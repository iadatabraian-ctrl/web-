"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { Bar } from "@/components/Bar";

/* Nosotros (sección clara, ver PRODUCT.md): foto grande en tarjeta redondeada con nombre,
   titular en Saira y el texto de Braian. */

const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-10% 0px" } as const;

const SOCIAL =
  "flex h-11 w-11 items-center justify-center rounded-full border border-brand-ink-on-cream/25 text-brand-ink-on-cream transition-[transform,background-color,color] duration-200 hover:bg-brand-black hover:text-brand-cream active:scale-[0.95]";

export function Nosotros() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-brand-cream px-5 py-20 text-brand-ink-on-cream sm:px-8 sm:py-28 lg:px-[6vw]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Bar className="max-sm:hidden" style={{ right: "-4vw", top: 0, width: "9vw", height: "50vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.12)", edge: "right" }} i={0} />
        <Bar style={{ left: "-6vw", bottom: 0, width: "10vw", height: "26vw", skew: 37, origin: "0 100%", fill: "rgba(255,92,26,0.10)", edge: "left" }} i={1} />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-brand-black lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/img/team/braian.jpg"
              alt="Braian González, fundador de Deploy"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-4 text-brand-cream">
            <div>
              <p className="font-body text-base font-semibold">Braian González</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Fundador</p>
            </div>
            <div className="flex gap-2">
              <a href="https://wa.me/59898648853" target="_blank" rel="noopener" aria-label="WhatsApp" className={`${SOCIAL} !border-white/20 !text-brand-cream hover:!bg-white hover:!text-brand-black`}>
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/deploy.uy" target="_blank" rel="noopener" aria-label="Instagram" className={`${SOCIAL} !border-white/20 !text-brand-cream hover:!bg-white hover:!text-brand-black`}>
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="mailto:deploy.uy@gmail.com" aria-label="Email" className={`${SOCIAL} !border-white/20 !text-brand-cream hover:!bg-white hover:!text-brand-black`}>
                <GmailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Texto */}
        <div>
          <h2 className="origin-bottom-left -skew-x-[5deg] font-impact text-[14vw] font-black uppercase not-italic leading-[0.92] tracking-[-0.005em] [font-stretch:80%] sm:text-[8vw] lg:text-[6.2rem]">
            <motion.span
              initial={{ opacity: 0, x: "-10vw" }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={view}
              transition={{ duration: 0.75, ease }}
              className="block"
            >
              Quién está
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: "-10vw" }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={view}
              transition={{ duration: 0.75, ease, delay: 0.15 }}
              className="block text-brand-ink-on-cream-soft"
            >
              detrás.
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="mt-6 max-w-xl font-body text-base leading-relaxed text-brand-ink-on-cream-soft sm:mt-8 sm:text-lg"
          >
            Braian González, desarrollador de soluciones digitales, autodidacta. Cada proyecto parte de entender el
            problema de fondo del negocio, con criterio real para adaptar el desarrollo a lo que busca cada cliente.
            Este mismo sitio que estás viendo es un ejemplo de lo que construyo: hecho a medida, de punta a punta, sin
            plantillas.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
