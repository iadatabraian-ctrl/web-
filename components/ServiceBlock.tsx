"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function ServiceBlock({
  eyebrow,
  title,
  description,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}) {
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
        className="mt-2 max-w-lg font-display text-3xl leading-[1.1] text-brand-cream sm:text-4xl"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        className="mt-4 max-w-md font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base"
      >
        {description}
      </motion.p>

      <div
        ref={screenRef}
        className="relative mt-12 aspect-[4/3] w-full max-w-5xl sm:mt-16"
        style={{ perspective: "1400px" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(0,229,255,.22) 0%, transparent 50%)",
            filter: "blur(24px)",
          }}
        />
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
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(0,229,255,0.35)) drop-shadow(0 0 60px rgba(0,229,255,0.2))",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
