import Image from "next/image";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { FadeIn } from "@/components/FadeIn";

export function Nosotros() {
  return (
    <section id="nosotros" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
              QUIÉN ESTÁ DETRÁS
            </p>
            <h2 className="mt-4 font-display text-[9vw] leading-[1.1] text-brand-cream sm:text-5xl md:text-6xl">
              Nosotros
            </h2>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-brand-ink-on-black-soft sm:text-lg">
              Braian, desarrollador de soluciones digitales. Cada proyecto
              parte de entender el problema de fondo del negocio, con
              criterio real para adaptar el desarrollo a lo que busca cada
              cliente.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="rounded-2xl border border-brand-line-on-black p-8">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-brand-accent/60">
                <Image
                  src="/img/team/braian.jpg"
                  alt="Braian, fundador de El Núcleo Digital"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-body text-base font-semibold text-brand-cream">
                  Braian
                </p>
                <p className="font-body text-xs tracking-[0.1em] text-brand-ink-on-black-soft">
                  FUNDADOR
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-line-on-black px-3.5 py-1.5 font-body text-xs text-brand-ink-on-black-soft">
                Desarrollo de software
              </span>
              <span className="rounded-full border border-brand-line-on-black px-3.5 py-1.5 font-body text-xs text-brand-ink-on-black-soft">
                Criterio técnico
              </span>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-brand-line-on-black pt-6">
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
                href="https://instagram.com/elnucleodigital_"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-line-on-black text-brand-ink-on-black-soft transition hover:scale-110 hover:border-brand-accent/50 hover:text-brand-accent"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:elnucleodigital1@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-line-on-black text-brand-ink-on-black-soft transition hover:scale-110 hover:border-brand-accent/50 hover:text-brand-accent"
              >
                <GmailIcon className="h-4 w-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
