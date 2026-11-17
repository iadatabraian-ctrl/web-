/* Presupuesto impreso: ticket inclinado con chinche, bordes perforados y total gigante. */

const MASK = {
  WebkitMask: "radial-gradient(circle 7px at 50% 0, #0000 97%, #000) top / 20px 51% repeat-x, radial-gradient(circle 7px at 50% 100%, #0000 97%, #000) bottom / 20px 51% repeat-x",
  mask: "radial-gradient(circle 7px at 50% 0, #0000 97%, #000) top / 20px 51% repeat-x, radial-gradient(circle 7px at 50% 100%, #0000 97%, #000) bottom / 20px 51% repeat-x",
} as const;

function Linea({ a, b, fuerte }: { a: string; b: string; fuerte?: boolean }) {
  return (
    <div className={`flex items-baseline gap-2 ${fuerte ? "text-brand-ink-on-cream" : ""}`}>
      <span className="shrink-0">{a}</span>
      <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b-2 border-dotted border-brand-ink-on-cream/30" />
      <span className="shrink-0 text-right">{b}</span>
    </div>
  );
}

export function Presupuesto({ nombre, v }: { nombre: string; v: { desde: string; hasta?: string; detalle: string; plazo: string } }) {
  const m = v.plazo.match(/(\d+)\s*a\s*(\d+)/);
  const hi = m ? m[2] : null;
  const [num, sufijo] = v.desde.split(" por mes");
  return (
    <div className="mx-auto w-full max-w-md rotate-[-2deg] drop-shadow-[0_28px_28px_rgba(40,25,10,0.28)] sm:max-w-[30rem]">
      <div className="relative">
        <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-b-[3px] border-[#c4430a] bg-brand-accent shadow-[0_6px_10px_rgba(0,0,0,0.4)]" />
        <div style={MASK} className="bg-[#fffdf9] px-6 pb-10 pt-10 font-mono text-[12.5px] uppercase leading-relaxed tracking-wide text-brand-ink-on-cream-soft sm:px-9 sm:text-[13px]">
          <div className="flex items-baseline justify-between text-brand-ink-on-cream">
            <span className="font-body text-lg font-extrabold normal-case tracking-tight">Deploy</span>
            <span>Presupuesto Nº 001</span>
          </div>
          <p className="mt-1">{nombre}</p>
          <div className="my-5 border-t-2 border-dashed border-brand-ink-on-cream/25" />
          <div className="flex flex-col gap-2.5">
            <Linea a="Relevamiento" b="Día 0" />
            <Linea a="Desarrollo" b={m ? `Día ${m[1]}` : "A definir"} />
            <Linea a="Entrega" b={hi ? `Día ${hi}` : v.plazo} fuerte />
            <Linea a="Garantía" b="+30 días" />
          </div>
          <div className="my-5 border-t-2 border-dashed border-brand-ink-on-cream/25" />
          <div className="flex flex-col gap-2.5">
            <Linea a="Desde" b={num + (sufijo !== undefined ? " / mes" : "")} />
            {v.hasta && <Linea a="Hasta" b={v.hasta} />}
          </div>
          <p className="mt-3 text-[11px] normal-case tracking-normal">{v.detalle}</p>
          <div className="my-5 border-t-2 border-dashed border-brand-ink-on-cream/25" />
          <p className="text-[11px] tracking-[0.15em]">Total estimado</p>
          <p className="mt-1 font-body text-[2.1rem] font-extrabold leading-[0.95] tracking-[-0.02em] text-brand-accent sm:text-5xl">
            {num}
            {v.hasta && <span className="text-brand-ink-on-cream"> – {v.hasta.replace(/^USD\s*/, "")}</span>}
            {sufijo !== undefined && <span className="ml-2 text-[0.35em] tracking-normal text-brand-ink-on-cream">por mes</span>}
          </p>
          <p className="mt-4 text-center text-[11px] tracking-[0.2em]">· · · Se confirma con el alcance · · ·</p>
        </div>
      </div>
    </div>
  );
}
