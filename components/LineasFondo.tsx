/* Líneas curvas finas de fondo (referencia del fundador): entran por los bordes, van adelgazando hasta
   terminar en una punta afilada, sin desvanecido ni resplandor, y pasan por detrás del contenido.
   Cada curva se dibuja como tramos cortos cuyo grosor baja de a poco; el grosor es en píxeles y no se
   deforma con el tamaño de la sección. Solo decoración. */

const LINES = [
  { d: [100, 4, 90, 12, 82, 20, 74, 32], w: 2.4, o: 0.95 },
  { d: [100, 18, 90, 20, 78, 26, 66, 38], w: 2, o: 0.85 },
  { d: [100, 30, 94, 32, 88, 36, 82, 42], w: 1.6, o: 0.75 },
  { d: [100, 62, 94, 64, 90, 68, 86, 74], w: 2, o: 0.85 },
  { d: [100, 78, 92, 80, 86, 84, 78, 90], w: 1.6, o: 0.75 },
  { d: [0, 70, 6, 62, 10, 58, 14, 56], w: 2.6, o: 0.95 },
  { d: [0, 90, 8, 88, 14, 84, 24, 80], w: 1.8, o: 0.8 },
  { d: [0, 22, 6, 18, 10, 14, 16, 8], w: 1.6, o: 0.7 },
];

const STEPS = 28;

function bezier(p: number[], t: number): [number, number] {
  const u = 1 - t;
  const x = u * u * u * p[0] + 3 * u * u * t * p[2] + 3 * u * t * t * p[4] + t * t * t * p[6];
  const y = u * u * u * p[1] + 3 * u * u * t * p[3] + 3 * u * t * t * p[5] + t * t * t * p[7];
  return [x, y];
}

const SEGMENTS = LINES.flatMap((l, li) =>
  Array.from({ length: STEPS }, (_, i) => {
    const a = bezier(l.d, i / STEPS);
    const b = bezier(l.d, (i + 1) / STEPS);
    const k = Math.pow(1 - (i + 0.5) / STEPS, 1.15); // 1 en el borde, 0 en la punta
    return { key: `${li}-${i}`, d: `M${a[0].toFixed(2)} ${a[1].toFixed(2)} L${b[0].toFixed(2)} ${b[1].toFixed(2)}`, w: Math.max(0.35, l.w * k), o: l.o };
  }),
);

export function LineasFondo({ className = "" }: { uid?: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible ${className}`}
    >
      {SEGMENTS.map((s) => (
        <path key={s.key} d={s.d} fill="none" stroke="#FF5C1A" strokeWidth={s.w} strokeOpacity={s.o} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
