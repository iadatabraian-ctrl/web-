"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-brand-line-on-black bg-transparent px-4 py-3 font-body text-sm text-brand-cream placeholder:text-brand-ink-on-black-soft/70 outline-none transition-colors focus:border-brand-accent";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      action="https://formsubmit.co/elnucleodigital1@gmail.com"
      method="POST"
      onSubmit={() => setIsSubmitting(true)}
      className="mx-auto mt-10 flex max-w-md flex-col gap-4 text-left"
    >
      <input type="hidden" name="_subject" value="Nueva consulta — El Núcleo Digital" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://elnucleodigital.com/?enviado=1" />

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
        <label htmlFor="mensaje" className="sr-only">
          Contanos qué necesita tu negocio
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          placeholder="Contanos qué necesita tu negocio"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 font-body text-sm font-bold uppercase tracking-wide text-brand-black transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
      </button>
    </form>
  );
}
