/* Mapa simplificado de Uruguay (contorno aproximado, no es cartográfico) con Salto marcado. */
export function MapaUruguay({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-3 -3 264 304"
      className={className}
      role="img"
      aria-label="Mapa de Uruguay con Salto marcado"
    >
      <path d="M45.3 12.0 L32.7 33.0 L26.7 82.8 L22.6 114.0 L21.1 138.6 L12.6 171.0 L10.1 186.0 L5.0 216.0 L5.0 234.0 L17.6 252.0 L32.7 268.2 L55.4 267.0 L85.5 288.0 L115.7 294.0 L145.9 297.0 L178.6 298.2 L206.3 285.0 L221.4 270.0 L236.5 249.0 L251.6 231.0 L258.1 224.4 L254.1 192.0 L256.6 174.0 L257.6 154.2 L236.5 126.0 L218.4 112.2 L196.2 96.0 L176.1 78.0 L148.4 54.0 L125.8 39.0 L102.2 24.0 L75.5 18.0 Z" fill="rgba(246,241,231,0.08)" stroke="rgba(246,241,231,0.55)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="26.7" cy="82.8" r="11" fill="#FF5C1A" opacity="0.25" />
      <circle cx="26.7" cy="82.8" r="4.5" fill="#FF5C1A" />
    </svg>
  );
}
