"use client";

import { Logo } from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight, MapPin } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, GmailIcon } from "@/components/BrandIcons";
import { cn } from "@/lib/utils";

const SERVICIOS = [
  { href: "/software-a-medida", label: "Software a medida" },
  { href: "/paginas-web", label: "Páginas web" },
  { href: "/automatizacion", label: "Automatizaciones" },
  { href: "/agentes-whatsapp", label: "Agentes de IA" },
];
const LINKS = [
  { id: "proceso", href: "/#proceso", label: "Proceso" },
  { id: "nosotros", href: "/#nosotros", label: "Nosotros" },
  { id: "casos", href: "/casos", label: "Casos" },
  { id: "preguntas", href: "/#preguntas", label: "Preguntas" },
];

const ease = [0.16, 1, 0.3, 1] as const;
const ICONO =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-brand-cream transition-colors hover:border-brand-accent";

/** claro: para páginas con fondo crema; la barra pasa a tinta oscura y el menú de celular sigue oscuro. */
export function Nav({ claro = false }: { claro?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuServicios, setMenuServicios] = useState(false);
  const [activo, setActivo] = useState<string | null>(null);
  const refServicios = useRef<HTMLDivElement>(null);

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

  // Cierra los menús al cambiar de página.
  useEffect(() => {
    setOpen(false);
    setMenuServicios(false);
  }, [pathname]);

  // Desplegable de escritorio: se cierra con Escape y al tocar afuera.
  useEffect(() => {
    if (!menuServicios) return;
    const fuera = (e: MouseEvent) => {
      if (refServicios.current && !refServicios.current.contains(e.target as Node)) setMenuServicios(false);
    };
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setMenuServicios(false);
    document.addEventListener("mousedown", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [menuServicios]);

  // En el inicio, resalta el enlace de la sección que se está viendo.
  useEffect(() => {
    if (pathname !== "/") {
      setActivo(SERVICIOS.some((s) => s.href === pathname) ? "servicios" : pathname.startsWith("/casos") ? "casos" : null);
      return;
    }
    const ids = ["servicios", "proceso", "nosotros", "preguntas"];
    const visibles = new Map<string, number>();
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) visibles.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let mejor: string | null = null;
        let max = 0;
        visibles.forEach((v, k) => {
          if (v > max) {
            max = v;
            mejor = k;
          }
        });
        setActivo(mejor);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  const claseLink = (id: string) =>
    cn(
      "nav-link font-body text-sm transition-colors",
      claro && !open ? "hover:text-brand-ink-on-cream" : "hover:text-brand-cream",
      claro && !open ? (activo === id ? "text-brand-ink-on-cream" : "text-brand-ink-on-cream-soft") : activo === id ? "text-brand-cream" : "text-brand-ink-on-black-soft",
    );

  return (
    <header data-top={!scrolled && !open} className={cn("fixed inset-x-0 top-0 transition-all duration-300", open ? "z-[60]" : "z-50")}>
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 overflow-y-auto bg-brand-black-deep px-6 pb-8 pt-20 sm:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
              <path d="M100 18 L62 40" fill="none" stroke="#FF6A1F" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
              <path d="M0 78 L24 66" fill="none" stroke="#FF6A1F" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
            </svg>

            <div className="relative flex min-h-full flex-col">
              <ul className="flex flex-col">
                <motion.li initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05, ease }} className="border-b border-white/10 py-3">
                  <a href="/#servicios" onClick={() => setOpen(false)} className="flex items-baseline gap-4 font-body text-[1.9rem] font-extrabold uppercase leading-none tracking-[-0.02em] text-brand-cream">
                    <span className="font-mono text-xs font-normal text-brand-accent">01</span>
                    Servicios
                  </a>
                  <ul className="mb-1 ml-9 mt-3 flex flex-col">
                    {SERVICIOS.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} onClick={() => setOpen(false)} className="block py-1.5 font-body text-[15px] text-brand-ink-on-black-soft transition-colors hover:text-brand-accent">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.li>
                {LINKS.map((l, i) => (
                  <motion.li key={l.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.09 + i * 0.04, ease }} className="border-b border-white/10 py-3">
                    <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 font-body text-[1.9rem] font-extrabold uppercase leading-none tracking-[-0.02em] text-brand-cream">
                      <span className="font-mono text-xs font-normal text-brand-accent">0{i + 2}</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3, ease }} className="mt-auto pt-8">
                <a
                  href="/#hablemos"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 font-body text-sm font-bold uppercase tracking-wide text-brand-black"
                >
                  Hablemos
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <a href="https://wa.me/59898648853" target="_blank" rel="noopener" aria-label="WhatsApp" className={ICONO}>
                      <WhatsAppIcon className="h-4 w-4" />
                    </a>
                    <a href="https://instagram.com/deploy.uy" target="_blank" rel="noopener" aria-label="Instagram" className={ICONO}>
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                    <a href="mailto:deploy.uy@gmail.com" aria-label="Email" className={ICONO}>
                      <GmailIcon className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-brand-ink-on-black-soft">
                    <MapPin className="h-3.5 w-3.5 text-brand-accent" strokeWidth={2.25} />
                    Salto, Uruguay
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative border-b border-transparent transition-[height,background-color,border-color] duration-300",
          (scrolled || open) && (claro && !open ? "border-brand-line-on-cream bg-brand-cream/90 backdrop-blur" : "border-brand-line-on-black bg-brand-black-deep/85 backdrop-blur"),
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8",
            scrolled ? "h-12 sm:h-14" : "h-14 sm:h-16",
          )}
        >
          <Link href="/" aria-label="Deploy, inicio" className="relative z-[61] flex items-center">
            <Logo dark={claro && !open} />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 sm:flex">
            <div ref={refServicios} className="relative">
              <button
                type="button"
                aria-expanded={menuServicios}
                aria-haspopup="true"
                onClick={() => setMenuServicios((v) => !v)}
                className={cn(claseLink("servicios"), "inline-flex items-center gap-1")}
              >
                Servicios
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", menuServicios && "rotate-180")} strokeWidth={2.25} />
              </button>
              <AnimatePresence>
                {menuServicios && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease }}
                    className="absolute left-1/2 top-full mt-4 w-64 -translate-x-1/2 rounded-2xl border border-white/15 bg-brand-black-deep p-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]"
                  >
                    {SERVICIOS.map((s) => (
                      <Link key={s.href} href={s.href} onClick={() => setMenuServicios(false)} className="block rounded-xl px-3 py-2.5 font-body text-sm text-brand-cream transition-colors hover:bg-white/10">
                        {s.label}
                      </Link>
                    ))}
                    <a href="/#servicios" onClick={() => setMenuServicios(false)} className="block rounded-xl px-3 py-2 font-body text-xs text-brand-ink-on-black-soft transition-colors hover:text-brand-cream">
                      Ver todos los servicios
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {LINKS.map((l) => (
              <a key={l.id} href={l.href} className={claseLink(l.id)}>
                {l.label}
              </a>
            ))}
            <a
              href="/#hablemos"
              className={cn("nav-cta rounded-full px-5 py-2 font-body text-sm font-semibold transition-colors", claro ? "bg-brand-black text-brand-cream hover:bg-brand-black/85" : "bg-white text-brand-black hover:bg-white/85")}
            >
              Hablemos
            </a>
          </nav>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[61] flex h-8 w-8 flex-col items-center justify-center gap-[5px] sm:hidden"
          >
            <span className={cn("nav-burger h-[1.5px] w-[18px] transition-transform", claro && !open ? "bg-brand-ink-on-cream" : "bg-brand-cream", open && "translate-y-[6.5px] rotate-45")} />
            <span className={cn("nav-burger h-[1.5px] w-[18px] transition-opacity", claro && !open ? "bg-brand-ink-on-cream" : "bg-brand-cream", open && "opacity-0")} />
            <span className={cn("nav-burger h-[1.5px] w-[18px] transition-transform", claro && !open ? "bg-brand-ink-on-cream" : "bg-brand-cream", open && "-translate-y-[6.5px] -rotate-45")} />
          </button>
        </div>
      </div>
    </header>
  );
}
