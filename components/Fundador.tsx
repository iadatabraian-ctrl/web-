import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { FadeIn } from "@/components/FadeIn";

const WA_URL = `https://wa.me/59898648853?text=${encodeURIComponent("Hola, quiero consultar por un proyecto")}`;

const CONTACTOS = [
  { href: "https://wa.me/59898648853", label: "WhatsApp", icon: WhatsAppIcon, externo: true },
  { href: "https://instagram.com/deploy.uy", label: "Instagram", icon: InstagramIcon, externo: true },
  { href: "mailto:deploy.uy@gmail.com", label: "Email", icon: GmailIcon, externo: false },
];

/* Reemplaza "Cómo trabajamos" (recuadro de texto) y "Nosotros": la propuesta de valor
   es hablar directo con quien programa, así que se muestra a la persona, no solo el texto. */
export function Fundador() {
  return (
    <section id="nosotros" className="tono-claro relative overflow-hidden bg-brand-black-deep px-5 py-14 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <FadeIn className="mx-auto w-full max-w-[16rem] sm:max-w-sm lg:max-w-none">
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-[#1a1712] shadow-[8px_8px_0_#ff5c1a]">
              <Image
                src="/img/team/braian.jpg"
                alt="Braian González, fundador de Deploy"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-lg border-2 border-[#1a1712] bg-[#fffdf8] px-4 py-2 shadow-[4px_4px_0_#1a1712] sm:left-6">
              <p className="font-body text-sm font-semibold text-brand-cream">Braian González</p>
              <p className="font-body text-[11px] tracking-[0.15em] text-brand-ink-on-black-soft">FUNDADOR</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
            QUIÉN ESTÁ DETRÁS
          </p>
          <h2 className="mt-4 font-display text-3xl leading-[1.1] text-brand-cream sm:text-5xl md:text-6xl">
            Hablás directo con quien programa.
          </h2>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-brand-cream sm:text-lg">
            Cuando trabajás con Deploy hablás directo con quien programa, diseña y resuelve tu proyecto, sin pasar por
            vendedores ni intermediarios. Cada proyecto se cotiza a medida, según lo que tu negocio necesita realmente.
          </p>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
            Braian González, desarrollador de soluciones digitales, autodidacta. Cada proyecto parte de entender el
            problema de fondo del negocio, con criterio real para adaptar el desarrollo a lo que busca cada cliente. Este
            mismo sitio que estás viendo es un ejemplo de lo que construyo: hecho a medida, de punta a punta, sin
            plantillas.
          </p>

          <div className="mt-8 flex max-w-xl items-start gap-3">
            <span className="relative mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#1a1712]">
              <Image src="/img/team/braian.jpg" alt="" fill sizes="40px" className="object-cover" />
            </span>
            <div className="rounded-2xl rounded-tl-sm border-2 border-[#1a1712] bg-[#fffdf8] px-4 py-3 shadow-[4px_4px_0_#1a1712]">
              <p className="font-body text-sm font-semibold text-brand-cream sm:text-base">
                Contame qué necesita tu negocio y lo vemos.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1712] bg-brand-accent px-6 py-3 font-body text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0_#1a1712] transition-transform hover:-translate-y-0.5"
            >
              Escribime por WhatsApp
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <div className="flex items-center gap-3">
              {CONTACTOS.map(({ href, label, icon: Icon, externo }) => (
                <a
                  key={label}
                  href={href}
                  {...(externo ? { target: "_blank", rel: "noopener" } : {})}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1a1712] bg-[#fffdf8] transition hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
