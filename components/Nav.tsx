"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#diagnostico-rapido", label: "Diagnóstico" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8",
          scrolled ? "h-12 sm:h-14" : "h-14 sm:h-16",
        )}
      >
        <Link href="#inicio" className="flex items-center gap-2.5">
          <Image
            src="/img/logo.webp"
            alt="El Núcleo Digital"
            width={28}
            height={28}
            priority
          />
          <span className="font-display text-[13px] tracking-wide text-brand-cream sm:text-sm">
            EL NÚCLEO DIGITAL
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-brand-ink-on-black-soft transition-colors hover:text-brand-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#hablemos"
            className="rounded-full bg-brand-accent px-5 py-2 font-body text-sm font-semibold text-brand-black transition-opacity hover:opacity-90"
          >
            Hablemos
          </a>
        </nav>

        <button
          type="button"
          aria-label="Menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] sm:hidden"
        >
          <span
            className={cn(
              "h-[1.5px] w-[18px] bg-brand-accent transition-transform",
              open && "translate-y-[6.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-[1.5px] w-[18px] bg-brand-accent transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-[1.5px] w-[18px] bg-brand-accent transition-transform",
              open && "-translate-y-[6.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-brand-line-on-black bg-brand-black/95 px-5 pb-5 pt-3 backdrop-blur sm:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 font-body text-sm text-brand-ink-on-black-soft transition-colors hover:text-brand-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#hablemos"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-brand-accent px-5 py-2.5 text-center font-body text-sm font-semibold text-brand-black"
          >
            Hablemos
          </a>
        </nav>
      )}
    </header>
  );
}
