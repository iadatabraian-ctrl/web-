// Capa de luz continua y estática para toda la página (sin JS atado al
// scroll: animar `top`/gradiente en cada frame de manchas grandes con blur
// resultó pesado). Insinúa la misma progresión turquesa -> ámbar de forma
// fija: más turquesa arriba, más ámbar hacia abajo, crema como relleno.
const GLOWS = [
  { top: "4%", left: "24%", size: "50rem", color: "var(--brand-accent)", opacity: 0.2 },
  { top: "18%", left: "80%", size: "38rem", color: "var(--brand-accent)", opacity: 0.14 },
  { top: "38%", left: "50%", size: "54rem", color: "var(--brand-cream)", opacity: 0.07 },
  { top: "56%", left: "16%", size: "42rem", color: "var(--brand-glow-warm)", opacity: 0.15 },
  { top: "74%", left: "84%", size: "44rem", color: "var(--brand-glow-warm)", opacity: 0.16 },
  { top: "94%", left: "50%", size: "48rem", color: "var(--brand-glow-warm)", opacity: 0.14 },
] as const;

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {GLOWS.map((glow, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[125px]"
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
