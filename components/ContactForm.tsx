"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-brand-ink-on-cream/20 bg-white px-4 py-2.5 font-body text-sm sm:py-3 text-brand-ink-on-cream placeholder:text-brand-ink-on-cream-soft/70 outline-none transition-colors focus:border-brand-accent";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      action="https://formsubmit.co/deploy.uy@gmail.com"
      method="POST"
      onSubmit={() => setIsSubmitting(true)}
      className="mx-auto flex max-w-md flex-col gap-3 text-left sm:gap-4"
    >
      <input type="hidden" name="_subject" value="Nueva consulta — Deploy" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://deployuy.com/?enviado=1" />

      <div>
        <label htmlFor="nombre" className="sr-only">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          placeholder="Nombre"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contacto" className="sr-only">
          WhatsApp o email
        </label>
        <input
          id="contacto"
          name="contacto"
          type="text"
          required
          placeholder="WhatsApp o email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="rubro" className="sr-only">
          Rubro o tipo de negocio
        </label>
        <input
          id="rubro"
          name="rubro"
          type="text"
          required
          placeholder="Rubro o tipo de negocio"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="sr-only">
          Contanos qué necesita tu negocio
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={3}
          placeholder="Contanos qué necesita tu negocio"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 sm:mt-2 sm:py-4 font-body text-sm font-bold uppercase tracking-wide text-brand-black transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
      </button>
    </form>
  );
}
