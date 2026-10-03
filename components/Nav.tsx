"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#diagnostico-rapido", label: "Diagnóstico" },
  { href: "/#preguntas", label: "Preguntas" },
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 transition-all duration-300", open ? "z-[60]" : "z-50")}>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex flex-col justify-center gap-1 bg-brand-black-deep px-8 sm:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-lg py-3 font-display text-2xl text-brand-cream transition-colors hover:text-brand-accent"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/#hablemos"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 + LINKS.length * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 rounded-full bg-brand-accent px-5 py-3 text-center font-body text-sm font-semibold text-brand-black"
            >
              Hablemos
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative border-b border-transparent transition-[height,background-color,border-color] duration-300",
          (scrolled || open) && "border-brand-line-on-black bg-brand-black-deep/85 backdrop-blur",
        )}
      >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8",
          scrolled ? "h-12 sm:h-14" : "h-14 sm:h-16",
        )}
      >
        <Link href="/" aria-label="Deploy" className="flex items-center">
          <span className="font-display text-[13px] tracking-wide sm:text-sm">
            <span className="text-brand-accent">/</span>
            <span className="text-white">deploy</span>
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
            href="/#hablemos"
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
              "h-[1.5px] w-[18px] bg-brand-cream transition-transform",
              open && "translate-y-[6.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-[1.5px] w-[18px] bg-brand-cream transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-[1.5px] w-[18px] bg-brand-cream transition-transform",
              open && "-translate-y-[6.5px] -rotate-45",
            )}
          />
        </button>
      </div>
      </div>
    </header>
  );
}
