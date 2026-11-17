"use client";

import { Logo } from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { Bar } from "@/components/Bar";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#nosotros", label: "Nosotros" },
];

const SERVICE_LINKS = [
  { href: "/software-a-medida", label: "Software a medida" },
  { href: "/paginas-web", label: "Páginas web" },
  { href: "/automatizacion", label: "Automatizaciones" },
  { href: "/agentes-whatsapp", label: "Agentes de IA" },
];

export function CtaFooter() {
  return (
    <>
      <section
        id="hablemos"
        className="relative overflow-hidden bg-brand-cream px-5 pb-20 pt-20 text-[#0a0a0a] [--pw:62vw] sm:px-8 sm:pb-28 sm:pt-28 sm:[--pw:38vw] lg:px-[6vw] lg:[--pw:24rem]"
      >
        {/* Líneas y barra diagonales a 37°, planas (referencia del fundador) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Bar className="max-sm:hidden" style={{ right: "-3vw", top: "14%", width: "8vw", height: "30vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.16)", edge: "left", edgeAlpha: 0.7 }} i={0} />
          <span className="absolute right-[6vw] top-[2%] h-[44vw] w-px origin-top rotate-[37deg] bg-brand-accent/45" />
          <span className="absolute -left-[4vw] bottom-[18%] h-[26vw] w-px origin-bottom -rotate-[37deg] bg-brand-accent/45" />
          <span className="absolute -left-[2vw] bottom-[12%] h-[20vw] w-px origin-bottom -rotate-[37deg] bg-brand-accent/25" />
        </div>

        <div className="relative z-[2] mx-auto max-w-4xl">
          {/* Texto: ocupa el costado izquierdo, y la persona asoma a la derecha */}
          <FadeIn className="min-h-[calc(var(--pw)*0.84)] max-w-[54%] sm:max-w-[50%]">
            <h2 className="text-balance font-body text-[5.8vw] font-medium leading-[1.12] tracking-[-0.02em] sm:text-[3.4vw] lg:text-[2.7rem]">
              Contanos qué necesita <span className="font-extrabold text-brand-accent">tu negocio.</span>
            </h2>
            <p className="mt-3 font-body text-[12.5px] leading-snug text-brand-ink-on-cream-soft sm:mt-4 sm:text-base">
              Vemos juntos si conviene un sistema a medida, un sitio web o algo más simple.
            </p>
            <a
              href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-3 font-body text-[11px] font-bold uppercase tracking-wide text-[#0a0a0a] transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.97] sm:mt-6 sm:px-8 sm:py-4 sm:text-sm"
            >
              Hablemos
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <p className="mt-3 font-body text-[10px] leading-snug text-brand-ink-on-cream-soft sm:text-xs">
              Cotizamos según el alcance de cada proyecto: no vendemos paquetes cerrados.
            </p>
          </FadeIn>

          {/* Formulario: la persona se apoya en su borde y deja caer la mano adentro */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-[1.75rem] border border-white/80 bg-[#fffdf9] px-5 py-8 text-brand-ink-on-cream shadow-[0_2px_4px_rgba(26,23,18,0.05),0_14px_28px_-8px_rgba(26,23,18,0.14),0_44px_70px_-24px_rgba(26,23,18,0.30)] sm:px-8 sm:py-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-5%] z-[3]"
              style={{ width: "var(--pw)", bottom: "calc(100% - var(--pw) * 0.22)" }}
            >
              <Image src="/img/contacto-persona.webp" alt="" width={900} height={945} sizes="(min-width: 1024px) 24rem, 62vw" className="h-auto w-full" />
            </div>
            <ContactForm />
          </motion.div>

          <FadeIn className="relative mx-auto mt-8 max-w-3xl">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-[1.75rem] border border-brand-ink-on-cream/10 bg-white px-5 py-4 font-body text-[12.5px] font-semibold shadow-[0_14px_26px_-18px_rgba(26,23,18,0.35)] sm:rounded-full sm:px-8 sm:text-sm">
              <li>
                <a href="https://wa.me/59898648853" target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:opacity-70">
                  <WhatsAppIcon className="h-4 w-4" /> +598 98 648 853
                </a>
              </li>
              <li>
                <a href="https://instagram.com/deploy.uy" target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:opacity-70">
                  <InstagramIcon className="h-4 w-4" /> @deploy.uy
                </a>
              </li>
              <li>
                <a href="mailto:deploy.uy@gmail.com" className="inline-flex items-center gap-2 hover:opacity-70">
                  <GmailIcon className="h-4 w-4" /> deploy.uy@gmail.com
                </a>
              </li>
            </ul>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-brand-line-on-black px-5 pt-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 pb-14 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-brand-ink-on-black-soft">
              Software a medida, páginas web, automatización de procesos y
              agentes de IA para WhatsApp e Instagram.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/59898648853"
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-line-on-black text-brand-ink-on-black-soft transition hover:scale-110 hover:border-brand-accent/50 hover:text-brand-accent"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/deploy.uy"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-line-on-black text-brand-ink-on-black-soft transition hover:scale-110 hover:border-brand-accent/50 hover:text-brand-accent"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:deploy.uy@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-line-on-black text-brand-ink-on-black-soft transition hover:scale-110 hover:border-brand-accent/50 hover:text-brand-accent"
              >
                <GmailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] text-brand-ink-on-black-soft">
              NAVEGACIÓN
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-brand-cream/80 transition-colors hover:text-brand-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] text-brand-ink-on-black-soft">
              SERVICIOS
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {SERVICE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-body text-sm text-brand-cream/80 transition-colors hover:text-brand-cream"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-brand-line-on-black py-6 font-body text-xs text-brand-ink-on-black-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Deploy</span>
          <span>Salto, Uruguay</span>
        </div>
      </footer>
    </>
  );
}
