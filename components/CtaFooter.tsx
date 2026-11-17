"use client";

import { Logo } from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
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
        className="relative overflow-hidden bg-brand-accent px-5 pb-20 pt-24 text-[#0a0a0a] [--cw:76vw] [--fw:30vw] sm:px-8 sm:pb-28 sm:pt-32 sm:[--cw:50vw] sm:[--fw:17vw] lg:px-[6vw] lg:[--cw:min(38vw,38rem)] lg:[--fw:min(11.5vw,11.5rem)] lg:[--gap:-5rem]"
      >
        {/* Papel que se despega en la esquina, con la figura colgada de la punta (referencia del fundador) */}
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-[1] aspect-square w-[var(--cw)]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="flapBack" x1="0" y1="0" x2="1" y2="0.6">
                <stop offset="0" stopColor="#e2d2bd" />
                <stop offset="0.35" stopColor="#ffffff" />
                <stop offset="1" stopColor="#f1e9db" />
              </linearGradient>
              <filter id="flapShadow" x="-20%" y="-20%" width="150%" height="150%">
                <feDropShadow dx="-1.2" dy="1.8" stdDeviation="1.6" floodColor="#7a1f00" floodOpacity="0.45" />
              </filter>
              <filter id="foldBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.1" />
              </filter>
            </defs>
            {/* sombra del doblez sobre el papel naranja */}
            <path d="M40 0 C52 14 62 34 66 55" fill="none" stroke="#a52f00" strokeOpacity="0.5" strokeWidth="2.6" filter="url(#foldBlur)" />
            {/* reverso del papel */}
            <path d="M40 0 L100 0 L100 38 C90 40 76 44 66 55 C62 34 52 14 40 0 Z" fill="url(#flapBack)" filter="url(#flapShadow)" />
          </svg>
          <div
            className="hang-swing absolute z-[2]"
            style={{ width: "var(--fw)", left: "calc(66% - var(--fw) * 0.877)", top: "calc(55% - var(--fw) * 0.055)" }}
          >
            <Image src="/img/contacto-figura.webp" alt="" width={437} height={1500} sizes="(min-width: 1024px) 15rem, 40vw" className="h-auto w-full [transform:scaleX(-1)] [filter:drop-shadow(0_14px_14px_rgba(90,20,0,0.35))]" />
          </div>
        </div>

        <div className="relative z-[2] mx-auto max-w-6xl">
          <div className="min-h-[calc(var(--cw)*0.55_+_var(--fw)*3.43_-_6rem)] sm:min-h-[calc(var(--cw)*0.55_+_var(--fw)*3.43_-_8rem)] lg:min-h-[calc(var(--cw)*0.55_+_var(--fw)*3.43_-_14rem)]">
          <FadeIn className="max-w-[56%] sm:max-w-[46%] lg:max-w-[34rem]">
            <p className="font-didone text-[13vw] font-extrabold italic leading-none text-white [font-optical-sizing:none] [font-variation-settings:'opsz'_10] sm:text-[7vw] lg:text-[4.6rem]">
              Hola,
            </p>
            <h2 className="mt-3 origin-bottom-left -skew-x-[5deg] text-balance font-impact text-[8.4vw] font-black uppercase not-italic leading-[0.94] tracking-[-0.005em] [font-stretch:80%] sm:text-[4.6vw] lg:text-[3.6rem]">
              <span className="block">¿Tenés una idea o un</span>
              <span className="block text-white">problema para resolver?</span>
            </h2>
            <p className="mt-5 max-w-md font-body text-[13px] font-medium leading-relaxed text-[#0a0a0a]/85 sm:text-lg">
              Contanos qué necesita tu negocio. Vemos juntos si conviene un sistema a medida, un sitio web o algo más
              simple.
            </p>
            <a
              href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3.5 font-body text-xs font-bold uppercase tracking-wide text-white transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.97] sm:px-8 sm:py-4 sm:text-sm"
            >
              Hablemos
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </FadeIn>
          </div>

          {/* Barra de contacto (referencia: barra inferior en píldora) */}
          <FadeIn className="relative mx-auto mt-6 max-w-3xl">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-[1.75rem] bg-white px-5 py-4 font-body text-[12.5px] font-semibold shadow-[0_18px_30px_-16px_rgba(90,20,0,0.5)] sm:rounded-full sm:px-8 sm:text-sm">
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
            <p className="mt-4 text-center font-body text-xs font-medium text-[#0a0a0a]/75">
              Cotizamos según el alcance de cada proyecto: no vendemos paquetes cerrados.
            </p>
          </FadeIn>

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-10 max-w-4xl rounded-[1.75rem] border border-white/80 bg-[#fffdf9] px-5 py-8 text-brand-ink-on-cream shadow-[0_2px_4px_rgba(26,23,18,0.05),0_14px_28px_-8px_rgba(26,23,18,0.14),0_44px_70px_-24px_rgba(26,23,18,0.30)] sm:px-8 sm:py-10"
          >
            <ContactForm />
          </motion.div>
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
