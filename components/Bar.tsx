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
  /** opacidad de la línea del borde (por defecto 0.88) */
  edgeAlpha?: number;
  /** la barra se enciende hacia abajo */
  fadeTop?: boolean;
};

/* Reflejo gris (secciones negras): mismo trazado, en blanco con la opacidad reducida. */
const toGray = (v: string, k: number) =>
  v.replace(/rgba\(255,\s*92,\s*26,\s*([0-9.]+)\)/g, (_, a) => `rgba(255,255,255,${(parseFloat(a) * k).toFixed(3)})`);

export function Bar({ className = "", style, i = 0, gray = false }: { className?: string; style: BarStyle; i?: number; gray?: boolean }) {
  const { skew, origin, fill, edge, edgeAlpha = 0.88, fadeTop, ...pos } = style;
  const line = gray ? `1.5px solid rgba(255,255,255,${(edgeAlpha * 0.4).toFixed(2)})` : `1.5px solid rgba(255,92,26,${edgeAlpha})`;
  const mask = fadeTop ? "linear-gradient(to bottom, transparent 0%, #000 65%)" : undefined;
  return (
    <span
      className={`absolute ${className}`}
      style={{
        ...pos,
        background: gray ? toGray(fill, 0.5) : fill,
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
