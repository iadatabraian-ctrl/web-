import type { ReactNode } from "react";

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/18] overflow-hidden rounded-[1.8rem] border-[6px] border-[#1b1915] bg-black shadow-2xl shadow-black/70 ring-1 ring-white/10 ${className}`}
    >
      <span className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      {children}
    </div>
  );
}
