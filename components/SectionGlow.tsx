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
      className={`pointer-events-none absolute -z-10 h-[28rem] w-[28rem] rounded-full opacity-[0.16] blur-[90px] sm:h-[36rem] sm:w-[36rem] ${POSITIONS[position]}`}
      style={{
        background: "radial-gradient(circle, var(--brand-accent) 0%, transparent 70%)",
      }}
    />
  );
}
