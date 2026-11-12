"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function AnimatedBadge({
  icon: Icon,
  label,
  className,
  index,
}: {
  icon: LucideIcon;
  label: string;
  className: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 + index * 0.15 }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        className="flex max-w-[92px] items-center gap-1 rounded-xl border border-brand-accent/30 bg-brand-black/85 px-2 py-1 shadow-lg shadow-black/30 backdrop-blur sm:max-w-[135px] sm:gap-1.5 sm:px-2.5 sm:py-1.5 lg:max-w-[260px] lg:gap-2.5 lg:rounded-2xl lg:px-4 lg:py-2.5"
      >
        <Icon className="h-3 w-3 shrink-0 text-brand-accent sm:h-3.5 sm:w-3.5 lg:h-9 lg:w-9" strokeWidth={2} />
        <span className="font-body text-[9px] font-medium leading-snug text-brand-cream sm:text-[11px] lg:text-base">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
