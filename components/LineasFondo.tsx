/* Líneas curvas finas de fondo (referencia del fundador): entran por los bordes, se desvanecen hacia
   adentro y pasan por detrás del contenido. Solo decoración; el trazo no se deforma con el tamaño. */

const LINES = [
  { d: "M100 4 C 90 12, 82 20, 74 32", w: 1.5, o: 0.85 },
  { d: "M100 18 C 90 20, 78 26, 66 38", w: 1.2, o: 0.7 },
  { d: "M100 30 C 94 32, 88 36, 82 42", w: 1, o: 0.55 },
  { d: "M100 62 C 94 64, 90 68, 86 74", w: 1.2, o: 0.7 },
  { d: "M100 78 C 92 80, 86 84, 78 90", w: 1, o: 0.55 },
  { d: "M0 70 C 6 62, 10 58, 14 56", w: 1.6, o: 0.85, glow: true },
  { d: "M0 90 C 8 88, 14 84, 24 80", w: 1.1, o: 0.6 },
  { d: "M0 22 C 6 18, 10 14, 16 8", w: 1, o: 0.45 },
];

export function LineasFondo({ uid = "lf", className = "" }: { uid?: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id={`${uid}-r`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF5C1A" stopOpacity="1" />
          <stop offset="1" stopColor="#FF5C1A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-l`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FF5C1A" stopOpacity="1" />
          <stop offset="1" stopColor="#FF5C1A" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-g`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {LINES.map((l, i) => {
        const left = l.d.startsWith("M0");
        const stroke = `url(#${uid}-${left ? "l" : "r"})`;
        return (
          <g key={i}>
            {l.glow && (
              <path d={l.d} fill="none" stroke={stroke} strokeWidth={l.w * 5} strokeOpacity={0.22} strokeLinecap="round" vectorEffect="non-scaling-stroke" filter={`url(#${uid}-g)`} />
            )}
            <path d={l.d} fill="none" stroke={stroke} strokeWidth={l.w} strokeOpacity={l.o} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </g>
        );
      })}
    </svg>
  );
}
