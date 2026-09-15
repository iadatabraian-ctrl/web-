"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      <span className="font-mono text-xs tracking-[0.15em] text-brand-accent">
        {eyebrow}
      </span>
      <h3 className="mt-2 max-w-lg font-display text-3xl leading-[0.98] text-brand-cream sm:text-4xl">
        {title}
      </h3>
      <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-brand-ink-on-black-soft sm:text-base">
        {description}
      </p>

      <div className="relative mt-10 aspect-[4/3] w-full max-w-lg sm:mt-12">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(0,229,255,.22) 0%, transparent 50%)",
            filter: "blur(24px)",
          }}
        />
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain"
          sizes="(min-width: 640px) 32rem, 90vw"
        />
      </div>
    </motion.div>
  );
}
