"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const CIRCLE_R = 42;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

const LOGO_DRAW_MS = 1500;
const LOGO_FADE_DELAY = 1250;
const LOGO_FADE_MS = 400;
const TEXT_DELAY = (LOGO_FADE_DELAY + LOGO_FADE_MS) / 1000;
const TEXT_DRAW_S = 0.9;
const SHINE_DELAY = TEXT_DELAY + TEXT_DRAW_S + 0.1;
const PULSE_DELAY = SHINE_DELAY + 0.55;
const HOLD_MS = (PULSE_DELAY + 0.5) * 1000;

const dashStyle = {
  "--dash": CIRCUMFERENCE,
  strokeDashoffset: CIRCUMFERENCE,
  animation: `splash-draw ${LOGO_DRAW_MS}ms cubic-bezier(0.65,0,0.35,1) forwards`,
} as CSSProperties;

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-brand-black"
        >
          <div
            className="flex flex-col items-center"
            style={{ animation: `splash-pulse 0.5s ease-in-out ${PULSE_DELAY}s 1` }}
          >
            <div className="relative h-20 w-20 sm:h-24 sm:w-24">
              <div
                className="absolute inset-0"
                style={{ animation: `splash-orbit 9s linear ${LOGO_DRAW_MS}ms infinite` }}
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r={CIRCLE_R}
                    fill="none"
                    stroke="var(--brand-accent)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    opacity={0.35}
                    style={{ ...dashStyle, filter: "blur(5px)" }}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={CIRCLE_R}
                    fill="none"
                    stroke="var(--brand-accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    style={dashStyle}
                  />
                  <circle
                    cx="50"
                    cy={50 - CIRCLE_R}
                    r="4"
                    fill="var(--brand-accent)"
                    style={{
                      opacity: 0,
                      animation: `splash-marker-in 0.3s ease-out ${LOGO_DRAW_MS}ms forwards`,
                    }}
                  />
                </svg>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: LOGO_FADE_MS / 1000,
                  delay: LOGO_FADE_DELAY / 1000,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-[16%]"
              >
                <Image
                  src="/img/logo.webp"
                  alt="El Núcleo Digital"
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            </div>

            <div className="relative mt-6">
              <motion.h1
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: TEXT_DRAW_S, delay: TEXT_DELAY, ease: [0.65, 0, 0.35, 1] }}
                className="font-display text-xl uppercase tracking-wide text-brand-cream sm:text-2xl"
              >
                El Núcleo Digital
              </motion.h1>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-clip-text font-display text-xl uppercase tracking-wide text-transparent opacity-0 sm:text-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, transparent 30%, rgba(0,229,255,0.9) 50%, transparent 70%)",
                  backgroundSize: "300% 100%",
                  backgroundPosition: "100% 0",
                  animation: `splash-shine 0.7s ease-out ${SHINE_DELAY}s forwards`,
                }}
              >
                El Núcleo Digital
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
