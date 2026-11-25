/* Líneas finas de fondo, copiadas de la referencia del fundador: grosor parejo (unos 2 px), casi rectas
   (el arco de la izquierda es suave), un poco más claras hacia el borde de la pantalla y más fuertes hacia
   adentro. No se afinan ni se desvanecen: salen del borde y terminan escondidas detrás de la persona, del
   formulario o de las tarjetas. Las coordenadas son % de la sección y se midieron sobre cada diseño, por
   eso hay un juego para pantallas grandes y otro para celular y tablet. Solo decoración. */

type Line = readonly number[]; // [x1,y1,x2,y2] recta, o [x0,y0,c1x,c1y,c2x,c2y,x3,y3] curva

const SETS: Record<"contacto" | "nosotros" | "servicios", { lg: Line[]; sm: Line[] }> = {
  contacto: {
    lg: [
      [100, 3, 75, 31],
      [100, 27, 80, 36],
      [100, 60, 79, 69],
      [100, 76, 79, 83.5],
      [0, 74, 6, 68, 12, 62, 19.8, 57],
      [0, 93, 19.8, 82],
    ],
    sm: [
      [100, 22, 76, 36],
      [100, 47, 93, 51],
      [100, 70, 93, 74],
      [0, 76, 3, 73, 5, 71, 6.5, 69],
    ],
  },
  servicios: {
    lg: [[100, 16, 78, 46]],
    sm: [[100, 27, 78, 40]],
  },
  nosotros: {
    lg: [
      [0, 27, 10.8, 20],
      [0, 72, 4, 68, 7, 65, 10.8, 62],
      [0, 92, 10.8, 86],
      [100, 50, 89, 56.5],
      [100, 66, 89, 71.5],
      [100, 82, 89, 87],
    ],
    sm: [
      [0, 40, 10, 54],
      [0, 24, 6, 20],
      [100, 40, 90, 54],
      [100, 70, 93, 74],
    ],
  },
};

function path(l: Line) {
  return l.length === 4 ? `M${l[0]} ${l[1]} L${l[2]} ${l[3]}` : `M${l[0]} ${l[1]} C${l[2]} ${l[3]}, ${l[4]} ${l[5]}, ${l[6]} ${l[7]}`;
}

function Set({ lines, id, className }: { lines: Line[]; id: string; className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible ${className}`}>
      <defs>
        {lines.map((l, i) => (
          <linearGradient key={i} id={`${id}-${i}`} gradientUnits="userSpaceOnUse" x1={l[0]} y1={l[1]} x2={l[l.length - 2]} y2={l[l.length - 1]}>
            <stop offset="0" stopColor="#FFA878" />
            <stop offset="1" stopColor="#FF6A1F" />
          </linearGradient>
        ))}
      </defs>
      {lines.map((l, i) => (
        <path key={i} d={path(l)} fill="none" stroke={`url(#${id}-${i})`} strokeWidth="1.8" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

export function LineasFondo({ kind }: { kind: keyof typeof SETS }) {
  return (
    <>
      <Set lines={SETS[kind].lg} id={`lf-${kind}-lg`} className="max-lg:hidden" />
      <Set lines={SETS[kind].sm} id={`lf-${kind}-sm`} className="lg:hidden" />
    </>
  );
}
