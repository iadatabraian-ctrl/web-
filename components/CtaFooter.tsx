import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { Bar } from "@/components/Bar";

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
        className="relative overflow-hidden bg-brand-cream px-5 py-20 text-brand-ink-on-cream sm:px-8 sm:py-28 lg:px-[6vw]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <Bar className="max-sm:hidden" style={{ right: "-4vw", top: 0, width: "9vw", height: "46vw", skew: 37, origin: "100% 0", fill: "rgba(255,92,26,0.12)", edge: "right" }} i={0} />
          <Bar style={{ left: "-6vw", bottom: 0, width: "10vw", height: "26vw", skew: 37, origin: "0 100%", fill: "rgba(255,92,26,0.10)", edge: "left" }} i={1} />
        </div>
        <FadeIn className="relative mx-auto max-w-4xl text-center">
          <h2 className="origin-bottom -skew-x-[5deg] text-balance font-impact text-[9.5vw] font-black uppercase not-italic leading-[0.92] tracking-[-0.005em] [font-stretch:80%] sm:text-[5.4vw] lg:text-[3.9rem]">
            <span className="block">¿Tenés una idea o un</span>
            <span className="block text-brand-ink-on-cream-soft">problema para resolver?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-sm leading-relaxed text-brand-ink-on-cream-soft sm:text-lg">
            Contanos qué necesita tu negocio. Vemos juntos si conviene un sistema a medida, un sitio web o algo más
            simple.
          </p>
          <a
            href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hacer%20una%20consulta"
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-4 font-body text-sm font-bold uppercase tracking-wide text-brand-black transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            Hablemos
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <p className="mt-5 font-body text-xs text-brand-ink-on-cream-soft">
            Cotizamos según el alcance de cada proyecto: no vendemos paquetes cerrados.
          </p>

          <div className="mx-auto mt-10 rounded-[1.75rem] bg-brand-black px-5 pb-8 pt-2 text-brand-cream sm:px-8">
            <ContactForm />
          </div>
        </FadeIn>
      </section>

      <footer className="border-t border-brand-line-on-black px-5 pt-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 pb-14 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex">
              <Image src="/img/deploy-logo.png" alt="Deploy" width={104} height={28} />
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
