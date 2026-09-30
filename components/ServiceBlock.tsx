"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedBadge } from "@/components/AnimatedBadge";

const BADGE_POSITIONS = [
  "top-[6%] left-[3%] sm:left-[7%]",
  "top-[6%] right-[3%] sm:right-[7%]",
  "bottom-[9%] left-[33%] sm:left-[38%]",
];

export function ServiceBlock({
  eyebrow,
  title,
  description,
  image,
  alt,
  badges,
  includes,
  example,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  badges?: { icon: LucideIcon; label: string }[];
  includes?: string[];
  example?: string;
}) {
  const [open, setOpen] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: screenRef,
    offset: ["start 0.95", "start 0.35"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.75, 1], [0.68, 1.04, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div className="flex flex-col items-center text-center">
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-xs tracking-[0.15em] text-brand-accent"
      >
        {eyebrow}
      </motion.span>
      <motion.h3
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        className="mt-2 max-w-lg font-display text-3xl leading-[1.1] text-brand-ink-on-cream sm:text-4xl"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        className="mt-4 max-w-md font-body text-sm leading-relaxed text-brand-ink-on-cream-soft sm:text-base"
      >
        {description}
      </motion.p>

      {(includes || example) && (
        <div className="mt-4 w-full max-w-md">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wide text-brand-ink-on-cream-soft transition-colors hover:text-brand-accent"
          >
            {open ? "Ver menos" : "Qué incluye"}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden text-left"
              >
                <div className="mt-3 rounded-2xl border border-brand-line-on-cream bg-brand-cream-2/40 p-4 sm:p-5">
                  {includes && (
                    <ul className="flex flex-col gap-1.5 font-body text-sm text-brand-ink-on-cream-soft">
                      {includes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-brand-accent">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {example && (
                    <p className="mt-3 font-body text-sm leading-relaxed text-brand-ink-on-cream-soft">
                      <span className="font-semibold text-brand-ink-on-cream">Por ejemplo: </span>
                      {example}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div
        ref={screenRef}
        className="relative mt-12 aspect-[4/3] w-full max-w-5xl sm:mt-16"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          style={{ rotateX, scale, opacity, y, transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-contain"
            sizes="(min-width: 640px) 64rem, 95vw"
          />
        </motion.div>

        {badges?.map((badge, i) => (
          <AnimatedBadge
            key={badge.label}
            icon={badge.icon}
            label={badge.label}
            index={i}
            className={BADGE_POSITIONS[i % BADGE_POSITIONS.length]}
          />
        ))}
      </div>
    </div>
  );
}
