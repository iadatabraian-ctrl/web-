/* Cinta que repite «Hablemos» y se desplaza sola, justo antes del cierre de la home. Enlaza al formulario de contacto.
   La animación es CSS (ver .cinta en globals.css); se frena al pasar el mouse y no corre si se pidió menos movimiento. */
export function CintaHablemos() {
  const grupo = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center gap-6 pr-6">
      Hablemos <span aria-hidden="true">•</span>
    </span>
  ));
  return (
    <a href="#hablemos" aria-label="Ir al formulario de contacto" className="cinta relative z-[45] block overflow-hidden bg-brand-accent py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a] sm:py-3.5 sm:text-sm">
      <div className="cinta-pista flex w-max" aria-hidden="true">
        <div className="flex shrink-0">{grupo}</div>
        <div className="flex shrink-0">{grupo}</div>
      </div>
    </a>
  );
}
