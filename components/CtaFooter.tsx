import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#nosotros", label: "Nosotros" },
];

const SERVICE_LINKS = [
  "Software a medida",
  "Páginas web",
  "Automatizaciones",
  "Agentes",
];

export function CtaFooter() {
  return (
    <>
      <section id="hablemos" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl leading-[1.1] text-brand-cream sm:text-5xl md:text-6xl">
            ¿Tenés una idea o un problema para resolver?
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-lg">
            Contanos qué necesita tu negocio. Vemos juntos si conviene un
            sistema a medida, un sitio web o algo más simple.
          </p>
          <a
            href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hacer%20una%20consulta"
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-4 font-body text-sm font-bold uppercase tracking-wide text-brand-black transition hover:scale-105 hover:opacity-90"
          >
            Hablemos
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <p className="mt-5 font-body text-xs text-brand-ink-on-black-soft/70">
            Cotizamos según el alcance de cada proyecto: no vendemos paquetes
            cerrados.
          </p>

          <div className="mx-auto mt-10 h-px w-full max-w-md bg-brand-line-on-black" />

          <ContactForm />
        </FadeIn>
      </section>

      <footer className="border-t border-brand-line-on-black px-5 pt-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 pb-14 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="#inicio" className="inline-flex">
              <Image src="/img/deploy-logo.png" alt="Deploy" width={104} height={28} />
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-brand-ink-on-black-soft">
              Software a medida y páginas web para tu negocio. Automatización
              y agentes de IA como complemento.
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
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#servicios"
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
