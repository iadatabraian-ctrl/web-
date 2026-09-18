// Capa de luz continua para toda la página: reemplaza el patrón anterior de
// un blob aislado por sección (que se sentía "cortado en compartimentos").
// Paleta deliberadamente disciplinada: turquesa de marca + un acento cálido
// reservado solo para este fondo + crema muy tenue como relleno de
// profundidad — nunca los tres compitiendo en el mismo punto.
const GLOWS = [
  { top: "3%", left: "22%", size: "46rem", color: "var(--brand-accent)", opacity: 0.18 },
  { top: "17%", left: "80%", size: "36rem", color: "var(--brand-glow-warm)", opacity: 0.14 },
  { top: "35%", left: "48%", size: "42rem", color: "var(--brand-cream)", opacity: 0.07 },
  { top: "51%", left: "14%", size: "38rem", color: "var(--brand-glow-warm)", opacity: 0.13 },
  { top: "66%", left: "86%", size: "40rem", color: "var(--brand-accent)", opacity: 0.16 },
  { top: "82%", left: "40%", size: "36rem", color: "var(--brand-cream)", opacity: 0.07 },
  { top: "96%", left: "56%", size: "44rem", color: "var(--brand-accent)", opacity: 0.15 },
] as const;

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {GLOWS.map((glow, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
          style={{
            top: glow.top,
            left: glow.left,
            width: glow.size,
            height: glow.size,
            opacity: glow.opacity,
            background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
