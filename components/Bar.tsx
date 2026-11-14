/* Barras de luz de fondo de las secciones oscuras (ver PRODUCT.md): paralelogramos de borde
   duro, con inicio y fin y un degradé a lo ancho de la barra. Nunca halos redondos.
   Solo transform/opacity; respiran en ciclos largos y desfasados (keyframes bar-breathe). */

export type BarStyle = {
  left?: string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  width: string;
  height: string;
  /** inclinación en grados respecto de la vertical (la parte de arriba se corre a la derecha) */
  skew: number;
  origin: string;
  fill: string;
  /** línea fina brillante en uno de los bordes */
  edge?: "left" | "right";
  /** la barra se enciende hacia abajo */
  fadeTop?: boolean;
};

export function Bar({ className = "", style, i = 0 }: { className?: string; style: BarStyle; i?: number }) {
  const { skew, origin, fill, edge, fadeTop, ...pos } = style;
  const line = "1.5px solid rgba(255,92,26,0.88)";
  const mask = fadeTop ? "linear-gradient(to bottom, transparent 0%, #000 65%)" : undefined;
  return (
    <span
      className={`absolute ${className}`}
      style={{
        ...pos,
        background: fill,
        transform: `skewX(-${skew}deg)`,
        transformOrigin: origin,
        borderLeft: edge === "left" ? line : undefined,
        borderRight: edge === "right" ? line : undefined,
        WebkitMaskImage: mask,
        maskImage: mask,
        // ciclos largos y desfasados entre barras: 7 a 10 s, con fase negativa
        animation: `bar-breathe ${7 + (i % 3) * 1.5}s ease-in-out ${-i * 2.3}s infinite`,
      }}
    />
  );
}
