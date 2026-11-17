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
        <LineasFondo uid="lc" />

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

          {/* Formulario oscuro con relieve: la persona se apoya en su borde y deja caer la mano adentro */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-[1.75rem] border border-white/10 bg-[#0a0a0a] px-5 py-8 text-white shadow-[0_2px_3px_rgba(10,10,10,0.3),0_26px_44px_-18px_rgba(10,10,10,0.65)]  sm:px-8 sm:py-10"
          >
            {/* Fondo del formulario: luz gris desde arriba y cuadrícula fina */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <span className="absolute inset-0 bg-[radial-gradient(90%_70%_at_82%_0%,#2f2f2f_0%,rgba(10,10,10,0)_70%)]" />
              <span className="grid-hud absolute inset-0 opacity-[0.12] [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 z-[3] lg:right-[-5%]"
              style={{ width: "var(--pw)", bottom: "calc(100% - var(--pw) * 0.194)" }}
            >
              <Image src="/img/contacto-persona-2.png" alt="" width={1199} height={1312} sizes="(min-width: 1024px) 24rem, 62vw" className="h-auto w-full [filter:drop-shadow(0_16px_14px_rgba(10,10,10,0.35))]" />
            </div>
            <div className="relative z-[2]">
              <ContactForm />
            </div>
          </motion.div>

          <p className="mt-6 text-center font-body text-xs text-brand-ink-on-cream-soft">
            Cotizamos según el alcance de cada proyecto: no vendemos paquetes cerrados.
          </p>
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
