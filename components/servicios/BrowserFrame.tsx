import type { ReactNode } from "react";

/* tone "dark": marco sobre fondos oscuros (subpáginas).
   tone "paper": marco sobre crema, con borde de tinta y sombra sólida desplazada
   (sin sombras difusas, ver PRODUCT.md). `hard` elige el color de esa sombra. */
export function BrowserFrame({
  url,
  children,
  className = "",
  tone = "dark",
  hard = "ink",
}: {
  url: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "paper";
  hard?: "ink" | "accent";
}) {
  if (tone === "paper") {
    const sombra = hard === "accent" ? "shadow-[6px_6px_0_#ff5c1a]" : "shadow-[6px_6px_0_#1a1712]";
    return (
      <div className={`overflow-hidden rounded-lg border-2 border-[#1a1712] bg-[#fffdf8] ${sombra} ${className}`}>
        <div className="flex items-center gap-3 border-b-2 border-[#1a1712] bg-[#ede5d3] px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full border border-[#1a1712]" />
            <span className="h-2 w-2 rounded-full border border-[#1a1712]" />
            <span className="h-2 w-2 rounded-full border border-[#1a1712]" />
          </div>
          <span className="mx-auto flex-1 truncate rounded-md border border-[#1a1712]/25 bg-[#fffdf8] px-3 py-1 text-center font-mono text-[10px] text-[#5c5142] sm:max-w-sm">
            {url}
          </span>
          <span className="w-[34px]" />
        </div>
        {children}
      </div>
    );
  }
  return (
    <div
      className={`overflow-hidden rounded-lg border border-white/10 bg-[#0d0c0a] shadow-2xl shadow-black/60 ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#161411] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <span className="mx-auto flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[10px] text-brand-ink-on-black-soft sm:max-w-sm">
          {url}
        </span>
        <span className="w-[34px]" />
      </div>
      {children}
    </div>
  );
}
