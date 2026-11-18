"use client";

import { Logo } from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";
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
      <section id="hablemos" className="bg-brand-cream px-5 pb-6 pt-10 text-[#0a0a0a] sm:px-8 sm:pb-14 sm:pt-24 lg:px-[6vw]">
        {/* Bloque naranja: texto y botón a la izquierda; formulario con la persona apoyada, a la derecha */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,#FF7E38_0%,#FF5C1A_100%)] px-5 pb-5 pt-12 [--pw:46vw] sm:rounded-[2.2rem] sm:px-12 sm:pb-14 sm:pt-16 sm:[--pw:30vw] lg:grid lg:grid-cols-[1fr_27rem] lg:items-end lg:gap-14 lg:[--pw:15rem]">
          <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.18em] sm:left-12 sm:top-7 sm:text-xs">Contacto</span>
          <span className="absolute right-5 top-5 text-right font-mono text-[10px] uppercase leading-snug tracking-[0.18em] max-sm:hidden sm:right-12 sm:top-7 sm:text-xs">Alcance<br />Precio<br />Plazo</span>

          <div className="lg:pb-6">
            <FadeIn>
              <h2 className="text-balance font-body text-[7.4vw] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-[4.6vw] lg:text-[3.4rem]">
                <span className="block">¿Tenés una idea o un</span>
                <span className="block text-white">problema para resolver?</span>
              </h2>
              <p className="mt-3 max-w-md font-body text-sm leading-snug text-[#0a0a0a]/80 sm:text-lg">
                Entendemos tu negocio. Te asesoramos con alcance, precio y plazo.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-8">
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
              className="relative rounded-[1.5rem] border border-white/80 bg-[#fffdf9] px-4 py-5 text-brand-ink-on-cream shadow-[0_2px_4px_rgba(26,23,18,0.05),0_14px_28px_-8px_rgba(26,23,18,0.2),0_44px_70px_-24px_rgba(26,23,18,0.4)] sm:px-8 sm:py-9"
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

        <p className="mt-4 text-center font-body text-xs text-brand-ink-on-cream-soft">
          Cotizamos según el alcance de cada proyecto: no vendemos paquetes cerrados.
        </p>
      </section>

      <footer className="relative overflow-x-clip bg-brand-cream text-brand-ink-on-cream">
        {/* Información sobre fondo claro: continúa el color de Contacto */}
        <div className="relative z-10 px-5 pt-4 sm:px-8 lg:px-[6vw]">
          <div className="mx-auto max-w-6xl border-t border-brand-ink-on-cream/15 pt-6 sm:pt-12">
            <div className="lg:grid lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-14">
              <div>
                <Link href="/" className="inline-flex [&_.logo-w]:text-[34px] [&_svg]:h-10 sm:[&_.logo-w]:text-[40px] sm:[&_svg]:h-12" aria-label="Deploy, inicio">
                  <Logo dark />
                </Link>
                <p className="mt-4 font-body text-2xl font-medium leading-tight tracking-[-0.01em] sm:text-3xl">Tu negocio, tu sistema.</p>
                <p className="mt-3 max-w-sm font-body text-[15px] leading-snug text-brand-ink-on-cream-soft sm:text-base">
                  Desarrollamos soluciones digitales a medida para empresas de todo el país.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-accent px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide">
                  <MapPin className="h-3.5 w-3.5 text-brand-accent" strokeWidth={2.25} />
                  Desarrollo digital · Salto, Uruguay
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-brand-ink-on-cream/15 pt-6 lg:col-span-2 lg:mt-0 lg:gap-x-14 lg:border-t-0 lg:pt-0">
                <nav aria-label="Pie de página">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink-on-cream-soft">Navegación</h4>
                  <span aria-hidden="true" className="mt-2 block h-[2px] w-10 bg-brand-accent" />
                  <ul className="mt-3 flex flex-col font-body text-[15px] sm:mt-5 sm:text-base">
                    {NAV_LINKS.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} className="group flex items-center justify-between py-1.5 transition-colors sm:py-2 hover:text-brand-accent">
                          {l.label}
                          <ChevronRight className="h-4 w-4 text-brand-accent transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.25} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <nav aria-label="Soluciones">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink-on-cream-soft">Soluciones</h4>
                  <span aria-hidden="true" className="mt-2 block h-[2px] w-10 bg-brand-accent" />
                  <ul className="mt-3 flex flex-col font-body text-[15px] sm:mt-5 sm:text-base">
                    {SERVICE_LINKS.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} className="group flex items-center justify-between py-1.5 transition-colors sm:py-2 hover:text-brand-accent">
                          {l.label}
                          <ChevronRight className="h-4 w-4 text-brand-accent transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.25} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="mt-6 border-t border-brand-ink-on-cream/15 pt-6 sm:mt-9 sm:pt-9">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink-on-cream-soft">Conectemos</h4>
              <span aria-hidden="true" className="mt-2 block h-[2px] w-10 bg-brand-accent" />
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-6 sm:flex-nowrap sm:gap-0">
                <div className="flex items-center gap-2.5 sm:pr-8">
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
                <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide sm:border-l sm:border-brand-ink-on-cream/20 sm:px-8">
                  <MapPin className="h-4 w-4 text-brand-accent" strokeWidth={2.25} />
                  Salto, Uruguay
                </p>
                <a
                  href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hablar%20de%20mi%20proyecto"
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center justify-between gap-4 font-body text-[15px] leading-snug transition-colors hover:text-brand-accent sm:border-l sm:border-brand-ink-on-cream/20 sm:pl-8"
                >
                  Hablemos de tu próximo proyecto.
                  <ArrowRight className="h-5 w-5 shrink-0 text-brand-accent transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-1.5 border-t border-brand-ink-on-cream/15 pt-4 sm:mt-9 sm:pt-5 font-mono text-[10.5px] uppercase tracking-wide text-brand-ink-on-cream-soft sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 Deploy — Todos los derechos reservados.</span>
              <span>Desde Salto, para todo el país.</span>
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
