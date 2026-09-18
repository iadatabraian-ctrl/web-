"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

// En vez de coreografiar cada objeto de cada sección contra el scroll (lo que
// se descartó antes por no escalar), acá se anima UNA sola cosa: el fondo.
// Dos luces "líder" siguen el progreso de scroll de toda la página con un
// resorte (inercia/retraso, como si tuvieran peso) y van virando de turquesa
// a ámbar y viceversa — dan la sensación de "algo viajando" sin necesidad de
// un objeto literal. El resto son manchas grandes y estáticas, muy fundidas,
// que sostienen la base sin competir.
const STATIC_GLOWS = [
  { top: "8%", left: "82%", size: "50rem", color: "var(--brand-cream)", opacity: 0.07 },
  { top: "48%", left: "50%", size: "58rem", color: "var(--brand-cream)", opacity: 0.06 },
  { top: "90%", left: "16%", size: "52rem", color: "var(--brand-cream)", opacity: 0.07 },
] as const;

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const topRange: [number, number] = prefersReducedMotion ? [32, 32] : [4, 92];
  const rawTop = useTransform(scrollYProgress, [0, 1], topRange);
  const springTop = useSpring(rawTop, { stiffness: 45, damping: 20, mass: 1 });
  const leadTop = useMotionTemplate`${springTop}%`;

  const topRange2: [number, number] = prefersReducedMotion ? [64, 64] : [14, 88];
  const rawTop2 = useTransform(scrollYProgress, [0, 1], topRange2);
  const springTop2 = useSpring(rawTop2, { stiffness: 32, damping: 22, mass: 1.3 });
  const leadTop2 = useMotionTemplate`${springTop2}%`;

  const colorStops: [string, string, string] = prefersReducedMotion
    ? ["#00e5ff", "#00e5ff", "#00e5ff"]
    : ["#00e5ff", "#ff9d52", "#00e5ff"];
  const leadColor = useTransform(scrollYProgress, [0, 0.5, 1], colorStops);
  const leadGradient = useMotionTemplate`radial-gradient(circle, ${leadColor} 0%, transparent 70%)`;

  const colorStops2: [string, string, string] = prefersReducedMotion
    ? ["#ff9d52", "#ff9d52", "#ff9d52"]
    : ["#ff9d52", "#00e5ff", "#ff9d52"];
  const leadColor2 = useTransform(scrollYProgress, [0, 0.5, 1], colorStops2);
  const leadGradient2 = useMotionTemplate`radial-gradient(circle, ${leadColor2} 0%, transparent 70%)`;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {STATIC_GLOWS.map((glow, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
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

      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          top: leadTop,
          left: "26%",
          width: "48rem",
          height: "48rem",
          opacity: 0.22,
          background: leadGradient,
        }}
      />
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          top: leadTop2,
          left: "76%",
          width: "42rem",
          height: "42rem",
          opacity: 0.17,
          background: leadGradient2,
        }}
      />
    </div>
  );
}
