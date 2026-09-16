const POSITIONS = {
  "top-right": "-top-16 -right-16 sm:-top-20 sm:-right-20",
  "top-left": "-top-16 -left-16 sm:-top-20 sm:-left-20",
  "bottom-right": "-bottom-16 -right-16 sm:-bottom-20 sm:-right-20",
  "bottom-left": "-bottom-16 -left-16 sm:-bottom-20 sm:-left-20",
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
} as const;

export function SectionGlow({
  position = "top-right",
}: {
  position?: keyof typeof POSITIONS;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 h-[30rem] w-[30rem] rounded-full opacity-[0.28] blur-[80px] sm:h-[40rem] sm:w-[40rem] ${POSITIONS[position]}`}
      style={{
        background: "radial-gradient(circle, var(--brand-cream) 0%, transparent 70%)",
      }}
    />
  );
}
