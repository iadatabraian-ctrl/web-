"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 font-body text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-8px_14px_-10px_rgba(0,0,0,0.6)] placeholder:text-white/45 outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:border-brand-accent focus:bg-white/[0.1] focus:shadow-[0_0_0_3px_rgba(255,92,26,0.22)]";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      action="https://formsubmit.co/deploy.uy@gmail.com"
      method="POST"
      onSubmit={() => setIsSubmitting(true)}
      className="mx-auto flex max-w-md flex-col gap-4 text-left"
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
          rows={4}
          placeholder="Contanos qué necesita tu negocio"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 font-body text-sm font-bold uppercase tracking-wide text-brand-black shadow-[0_14px_26px_-10px_rgba(255,92,26,0.75)] transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
      </button>
    </form>
  );
}
