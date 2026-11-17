"use client";

import { Logo } from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#hablemos", label: "Contacto" },
];

const SERVICE_LINKS = [
  { href: "/software-a-medida", label: "Software a medida" },
  { href: "/paginas-web", label: "Páginas web" },
  { href: "/automatizacion", label: "Automatizaciones" },
  { href: "/agentes-whatsapp", label: "Agentes de IA" },
];

const ICON =
  "flex h-9 w-9 items-center justify-center rounded-full border border-brand-ink-on-cream/20 text-brand-ink-on-cream transition hover:scale-110 hover:border-brand-accent hover:text-brand-accent";

export function CtaFooter() {
  return (
    <>
      <section id="hablemos" className="bg-brand-cream px-5 pb-10 pt-14 text-[#0a0a0a] sm:px-8 sm:pb-14 sm:pt-24 lg:px-[6vw]">
        {/* Bloque naranja: texto y botón a la izquierda; formulario con la persona apoyada, a la derecha */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,#FF7E38_0%,#FF5C1A_100%)] px-5 pb-8 pt-14 [--pw:60vw] sm:rounded-[2.2rem] sm:px-12 sm:pb-14 sm:pt-16 sm:[--pw:30vw] lg:grid lg:grid-cols-[1fr_27rem] lg:items-end lg:gap-14 lg:[--pw:15rem]">
          <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.18em] sm:left-12 sm:top-7 sm:text-xs">Contacto</span>
          <span className="absolute right-5 top-5 text-right font-mono text-[10px] uppercase leading-snug tracking-[0.18em] max-sm:hidden sm:right-12 sm:top-7 sm:text-xs">Alcance<br />Precio<br />Plazo</span>

          <div className="lg:pb-6">
            <FadeIn>
              <h2 className="text-balance font-body text-[7.4vw] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-[4.6vw] lg:text-[3.4rem]">
                <span className="block">¿Tenés una idea o un</span>
                <span className="block text-white">problema para resolver?</span>
              </h2>
              <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-[#0a0a0a]/80 sm:text-lg">
                Entendemos tu negocio. Te asesoramos con alcance, precio y plazo.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8">
                <a
                  href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hacer%20una%20consulta"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3.5 font-body text-xs font-bold uppercase tracking-wide text-brand-cream transition-[transform,background-color] duration-200 hover:bg-[#1e1e1e] active:scale-[0.97] sm:px-8 sm:py-4 sm:text-sm"
                >
                  Hablemos
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
                <span className="font-mono text-[11px] uppercase tracking-wide text-[#0a0a0a]/70">Respuesta por WhatsApp</span>
              </div>
            </FadeIn>
          </div>

          {/* Formulario claro: la persona se apoya en su borde y deja caer la mano adentro */}
          <div className="mt-[calc(var(--pw)*0.82)] lg:mt-0 lg:pt-[calc(var(--pw)*0.82)]">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-[1.5rem] border border-white/80 bg-[#fffdf9] px-5 py-7 text-brand-ink-on-cream shadow-[0_2px_4px_rgba(26,23,18,0.05),0_14px_28px_-8px_rgba(26,23,18,0.2),0_44px_70px_-24px_rgba(26,23,18,0.4)] sm:px-8 sm:py-9"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 z-[3]"
                style={{ width: "var(--pw)", bottom: "calc(100% - var(--pw) * 0.194)" }}
              >
                <Image src="/img/contacto-persona-2.png" alt="" width={1199} height={1312} sizes="(min-width: 1024px) 15rem, 60vw" className="h-auto w-full [filter:drop-shadow(0_16px_14px_rgba(10,10,10,0.35))]" />
              </div>
              <ContactForm />
            </motion.div>
          </div>
        </div>

        <p className="mt-6 text-center font-body text-xs text-brand-ink-on-cream-soft">
          Cotizamos según el alcance de cada proyecto: no vendemos paquetes cerrados.
        </p>
      </section>

      <footer className="relative overflow-x-clip bg-brand-cream text-brand-ink-on-cream">
        {/* Información sobre fondo claro: continúa el color de Contacto */}
        <div className="relative z-10 px-5 pt-4 sm:px-8 lg:px-[6vw]">
          <div className="mx-auto max-w-6xl border-t border-brand-ink-on-cream/15 pt-8 sm:pt-10">



          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="inline-flex" aria-label="Deploy, inicio">
              <Logo dark />
            </Link>
            <nav aria-label="Pie de página" className="flex flex-wrap gap-x-7 gap-y-2 font-body text-sm font-semibold">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="transition-colors hover:text-brand-accent">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2.5">
              <a href="https://wa.me/59898648853" target="_blank" rel="noopener" aria-label="WhatsApp" className={ICON}>
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/deploy.uy" target="_blank" rel="noopener" aria-label="Instagram" className={ICON}>
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="mailto:deploy.uy@gmail.com" aria-label="Email" className={ICON}>
                <GmailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-brand-ink-on-cream/15 pt-4 font-mono text-[11px] uppercase tracking-wide text-brand-ink-on-cream-soft lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <span>© 2026 Deploy</span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" strokeWidth={2} />
                Salto, Uruguay
              </span>
            </div>
            <nav aria-label="Servicios" className="flex flex-wrap gap-x-5 gap-y-1">
              {SERVICE_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="transition-colors hover:text-brand-accent">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          </div>
        </div>

        {/* La ciudad (PNG con transparencia) se levanta desde el pie y la ruta cierra la página */}
        <div aria-hidden="true" className="relative mt-2 h-[46vw] overflow-hidden sm:mt-10 sm:h-auto">
          <Image
            src="/img/footer-skyline.webp"
            alt=""
            width={2172}
            height={691}
            sizes="(min-width: 640px) 100vw, 150vw"
            quality={92}
            unoptimized
            className="absolute bottom-0 right-[-20%] h-full w-auto max-w-none translate-y-[5%] sm:static sm:h-auto sm:w-full"
          />
        </div>
      </footer>
    </>
  );
}
