"use client";

import { useEffect, useState } from "react";

const SECCIONES = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Proceso" },
  { id: "nosotros", label: "Nosotros" },
  { id: "preguntas", label: "Preguntas" },
  { id: "hablemos", label: "Contacto" },
];

/* Índice de secciones a la derecha, solo en pantallas grandes: marca dónde estás y lleva a cada sección.
   mix-blend-difference hace que se lea tanto sobre las secciones claras como sobre las negras. */
export function SeccionesIndice() {
  const [activa, setActiva] = useState("inicio");

  useEffect(() => {
    const els = SECCIONES.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiva(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Secciones de la página" className="seccion-indice fixed right-5 top-1/2 z-40 -translate-y-1/2 text-white mix-blend-difference max-lg:hidden xl:right-8">
      <ul className="flex flex-col items-end gap-2.5">
        {SECCIONES.map((s) => {
          const on = activa === s.id;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={on ? "true" : undefined} className={`flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-100 ${on ? "opacity-100" : "opacity-45"}`}>
                {s.label}
                <span aria-hidden="true" className={`block rounded-full bg-current transition-all duration-300 ${on ? "h-2 w-2" : "h-1.5 w-1.5"}`} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
