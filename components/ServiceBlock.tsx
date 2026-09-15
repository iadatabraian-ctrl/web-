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
    offset: ["start 0.95", "start 0.4"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-mono text-xs tracking-[0.15em] text-brand-accent">
        {eyebrow}
      </span>
      <h3 className="mt-2 max-w-lg font-display text-3xl leading-[0.98] text-brand-cream sm:text-4xl">
        {title}
      </h3>
      <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
        {description}
      </p>

      <div
        ref={screenRef}
        className="relative mt-12 aspect-[4/3] w-full max-w-4xl sm:mt-16"
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
          style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-contain"
            sizes="(min-width: 640px) 56rem, 95vw"
          />
        </motion.div>
      </div>
    </div>
  );
}
