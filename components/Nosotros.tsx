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
  "flex h-6 w-6 items-center sm:h-9 sm:w-9 justify-center rounded-full border border-brand-ink-on-cream/25 text-brand-ink-on-cream transition-[transform,background-color,color] duration-200 hover:bg-brand-black hover:text-brand-cream active:scale-[0.95]";

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

      <div className="relative mx-auto grid max-w-6xl grid-cols-[7.5rem_1fr] items-center gap-4 sm:grid-cols-[13rem_1fr] sm:gap-8 lg:grid-cols-[19rem_1fr] lg:gap-16">
        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.8, ease }}
          className="relative w-full overflow-hidden rounded-2xl bg-brand-black sm:rounded-[1.75rem]"
        >
          <div className="relative aspect-square w-full">
            <Image
              src="/img/team/braian.jpg"
              alt="Braian González, fundador de Deploy"
              fill
              sizes="(min-width: 1024px) 19rem, (min-width: 640px) 13rem, 7.5rem"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="flex flex-col gap-2 px-2.5 py-2.5 text-brand-cream sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-3">
            <div>
              <p className="font-body text-[11px] font-semibold leading-tight sm:whitespace-nowrap sm:text-[15px]">Braian González</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-brand-ink-on-black-soft sm:text-[11px]">Fundador</p>
            </div>
            <div className="flex gap-1.5">
              <a href="https://wa.me/59898648853" target="_blank" rel="noopener" aria-label="WhatsApp" className={`${SOCIAL} !border-white/20 !text-brand-cream hover:!bg-white hover:!text-brand-black`}>
                <WhatsAppIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a href="https://instagram.com/deploy.uy" target="_blank" rel="noopener" aria-label="Instagram" className={`${SOCIAL} !border-white/20 !text-brand-cream hover:!bg-white hover:!text-brand-black`}>
                <InstagramIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
              <a href="mailto:deploy.uy@gmail.com" aria-label="Email" className={`${SOCIAL} !border-white/20 !text-brand-cream hover:!bg-white hover:!text-brand-black`}>
                <GmailIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Texto */}
        <div>
          <h2 className="origin-bottom-left -skew-x-[5deg] font-impact text-[9vw] font-black uppercase not-italic leading-[0.92] tracking-[-0.005em] [font-stretch:80%] sm:text-[6vw] lg:text-[6.2rem]">
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
            className="mt-3 max-w-xl font-body text-[12.5px] leading-snug text-brand-ink-on-cream-soft sm:mt-8 sm:text-lg sm:leading-relaxed"
          >
            Braian González, desarrollador de soluciones digitales, autodidacta. Cada proyecto parte de entender el
            problema de fondo del negocio, con criterio real para adaptar el desarrollo a lo que busca cada cliente.
           
          </motion.p>
        </div>
      </div>
    </section>
  );
}
