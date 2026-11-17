"use client";

import { Logo } from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { LineasFondo } from "@/components/LineasFondo";
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
        <LineasFondo kind="contacto" />

        <div className="relative z-[2] mx-auto max-w-4xl">
          {/* Texto de siempre; en celular el botón queda al lado de la cabeza */}
          <div className="sm:mb-8 sm:min-h-[calc(var(--pw)*0.84)] sm:max-w-[50%] lg:max-w-[34rem]">
            <FadeIn>
              <h2 className="text-balance font-body text-[5.6vw] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] sm:text-[3vw] lg:text-[2.6rem]">
                <span className="block">¿Tenés una idea o un</span>
                <span className="block text-brand-accent">problema para resolver?</span>
              </h2>
              <p className="mt-4 max-w-md font-body text-[12.5px] leading-snug text-brand-ink-on-cream-soft sm:mt-5 sm:text-base">
                Entendemos tu negocio. Te asesoramos con alcance, precio y plazo.
              </p>
            </FadeIn>
            <FadeIn className="mt-4 min-h-[calc(var(--pw)*0.84)] max-w-[40%] sm:mt-6 sm:min-h-0 sm:max-w-none">
              <a
                href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-3 font-body text-[11px] font-bold uppercase tracking-wide text-[#0a0a0a] transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.97] sm:px-8 sm:py-4 sm:text-sm"
              >
                Hablemos
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </FadeIn>
          </div>

          {/* Formulario claro: la persona se apoya en su borde y deja caer la mano adentro */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-[1.75rem] border border-white/80 bg-[#fffdf9] px-5 py-8 text-brand-ink-on-cream shadow-[0_2px_4px_rgba(26,23,18,0.05),0_14px_28px_-8px_rgba(26,23,18,0.14),0_44px_70px_-24px_rgba(26,23,18,0.30)] sm:px-8 sm:py-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 z-[3] lg:right-[-5%]"
              style={{ width: "var(--pw)", bottom: "calc(100% - var(--pw) * 0.194)" }}
            >
              <Image src="/img/contacto-persona-2.png" alt="" width={1199} height={1312} sizes="(min-width: 1024px) 24rem, 62vw" className="h-auto w-full [filter:drop-shadow(0_16px_14px_rgba(10,10,10,0.35))]" />
            </div>
            <ContactForm />
          </motion.div>

          <p className="mt-6 text-center font-body text-xs text-brand-ink-on-cream-soft">
            Cotizamos según el alcance de cada proyecto: no vendemos paquetes cerrados.
          </p>
        </div>
      </section>

      <footer className="relative overflow-x-clip bg-[#0a0a0a] px-5 pt-px sm:px-8">
        {/* Barra flotante clara, apoyada sobre el corte entre Contacto y el pie */}
        <div className="relative z-10 mx-auto -mt-7 max-w-6xl rounded-[1.6rem] bg-brand-cream px-6 py-5 text-brand-ink-on-cream shadow-[0_24px_40px_-18px_rgba(0,0,0,0.7)] sm:-mt-9 sm:rounded-full sm:px-10 sm:py-3.5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="inline-flex" aria-label="Deploy, inicio">
              <Logo dark />
            </Link>
            <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm font-semibold">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="transition-colors hover:text-brand-accent">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2.5">
              <a href="https://wa.me/59898648853" target="_blank" rel="noopener" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-ink-on-cream/20 text-brand-ink-on-cream transition hover:scale-110 hover:border-brand-accent hover:text-brand-accent">
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/deploy.uy" target="_blank" rel="noopener" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-ink-on-cream/20 text-brand-ink-on-cream transition hover:scale-110 hover:border-brand-accent hover:text-brand-accent">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="mailto:deploy.uy@gmail.com" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-ink-on-cream/20 text-brand-ink-on-cream transition hover:scale-110 hover:border-brand-accent hover:text-brand-accent">
                <GmailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 pb-10 pt-14 sm:grid-cols-[1.4fr_1fr] sm:pt-20">
          <p className="max-w-md font-body text-base leading-relaxed text-brand-ink-on-black-soft sm:text-lg">
            Software a medida, páginas web, automatización de procesos y agentes de IA para WhatsApp e Instagram.
          </p>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-brand-ink-on-black-soft">Servicios</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="font-body text-sm font-semibold text-brand-cream transition-colors hover:text-brand-accent">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-1 font-mono text-[11px] uppercase tracking-wide text-brand-ink-on-black-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Deploy</span>
          <span>Salto, Uruguay</span>
        </div>

        {/* Palabra gigante cortada por el borde inferior, cruzada por una línea fina naranja */}
        <div aria-hidden="true" className="pointer-events-none relative -mx-5 mt-6 h-[19vw] select-none overflow-hidden sm:-mx-8 sm:mt-8 sm:h-[15vw]">
          <span className="absolute inset-x-0 top-0 block whitespace-nowrap bg-[linear-gradient(to_bottom,rgba(255,255,255,0.9)_10%,rgba(255,255,255,0.04)_85%)] bg-clip-text text-center font-impact text-[34vw] font-black uppercase italic leading-[0.8] tracking-[-0.02em] text-transparent [font-stretch:50%] sm:text-[24vw] sm:[font-stretch:60%]">
            Deploy
          </span>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0 62 C 30 58, 70 52, 100 46" fill="none" stroke="#FF6A1F" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </footer>
    </>
  );
}
