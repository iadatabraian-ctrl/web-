"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export function FadeIn({
  children,
  className,
  style,
  delay = 0,
  y = 24,
  scale,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, ...(scale ? { scale } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
