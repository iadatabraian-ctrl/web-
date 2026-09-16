import { FadeIn } from "@/components/FadeIn";

export function Nosotros() {
  return (
    <section id="nosotros" className="bg-brand-black px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[0.2em] text-brand-ink-on-black-soft sm:text-xs">
              QUIÉN ESTÁ DETRÁS
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.98] text-brand-cream sm:text-6xl">
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
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-accent/60 font-display text-2xl text-brand-accent">
              B
            </span>
            <p className="mt-5 font-body text-base font-semibold text-brand-cream">
              Braian · Fundador
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-line-on-black px-3.5 py-1.5 font-body text-xs text-brand-ink-on-black-soft">
                Desarrollo de software
              </span>
              <span className="rounded-full border border-brand-line-on-black px-3.5 py-1.5 font-body text-xs text-brand-ink-on-black-soft">
                Criterio técnico
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
