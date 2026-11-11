import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  className = "",
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "paper";
}) {
  const marco =
    tone === "paper"
      ? "border-[6px] border-[#1a1712] shadow-[6px_6px_0_#ff5c1a]"
      : "border-[6px] border-[#1b1915] shadow-2xl shadow-black/70 ring-1 ring-white/10";
  return (
    <div className={`relative aspect-[9/18] overflow-hidden rounded-[1.8rem] bg-black ${marco} ${className}`}>
      <span className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      {children}
    </div>
  );
}
