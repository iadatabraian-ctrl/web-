import type { ReactNode } from "react";

export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
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
