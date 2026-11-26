"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Scroll suave con inercia en la home (la misma idea que usa Axus). Solo ruedita y trackpad: en el celular queda el scroll táctil nativo.
   No se activa si la persona pidió menos movimiento. Los enlaces a secciones de la misma página (#servicios, /#proceso, etc.) se
   desplazan con la misma suavidad, porque con Lenis el scroll-behavior del navegador deja de actuar. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || !a.hash || a.origin !== location.origin || a.pathname !== location.pathname) return;
      const dest = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (!dest) return;
      e.preventDefault();
      lenis.scrollTo(dest, { offset: -56, duration: 1.3 });
      history.replaceState(null, "", a.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
