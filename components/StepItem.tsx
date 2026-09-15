"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function StepItem({
  icon: Icon,
  index,
  title,
  desc,
  isLast,
}: {
  icon: LucideIcon;
  index: number;
  title: string;
  desc: string;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-brand-accent/60">
          <Icon className="h-6 w-6 text-brand-accent" strokeWidth={1.75} />
        </div>
        {!isLast && (
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.12 + 0.2 }}
            style={{ transformOrigin: "top" }}
            className="mt-2 w-px flex-1 bg-brand-line-on-black"
          />
        )}
      </div>
      <div className={isLast ? "flex-1" : "flex-1 pb-10"}>
        <span className="font-mono text-sm text-brand-accent">0{index + 1}</span>
        <h3 className="mt-1 font-display text-2xl text-brand-cream sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
          {desc}
        </p>
        {!isLast && <hr className="mt-8 max-w-xl border-brand-line-on-black" />}
      </div>
    </motion.div>
  );
}
