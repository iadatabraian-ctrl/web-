"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/BrandIcons";

/* Botón flotante solo en celular (en pantallas más grandes el menú ya tiene "Hablemos").
   Aparece al pasar el hero y se oculta cuando ya hay un botón de contacto a la vista
   (bloque de Contacto y pie de página). */

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      const pastHero = window.scrollY > vh * 0.8;
      const inView = (sel: string) => {
        const el = document.querySelector(sel);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh * 0.85 && r.bottom > 0;
      };
      setVisible(pastHero && !inView("#hablemos") && !inView("footer"));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a
      href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hacer%20una%20consulta"
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg shadow-black/30 transition-[opacity,transform] duration-300 active:scale-95 sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
