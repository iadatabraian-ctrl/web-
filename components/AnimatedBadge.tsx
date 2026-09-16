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
        className="flex max-w-[210px] items-center gap-2 rounded-2xl border border-brand-accent/30 bg-brand-black/80 px-3.5 py-2.5 shadow-lg shadow-black/30 backdrop-blur"
      >
        <Icon className="h-4 w-4 shrink-0 text-brand-accent" strokeWidth={2} />
        <span className="font-body text-xs font-medium leading-snug text-brand-cream">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
