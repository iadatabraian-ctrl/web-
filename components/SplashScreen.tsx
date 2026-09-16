"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const BLADE_COUNT = 6;
const BLADE_PATH = "M50 50 C58 42 60 25 50 4 C40 25 42 42 50 50 Z";

const BLADES_CLOSE_S = 0.44;
const FLASH_DELAY_S = 0.5;
const REVEAL_DELAY_S = 0.55;
const LOGO_SETTLE_S = 1.05;
const TEXT_DELAY_S = 1.3;

const TEXT = "El Núcleo Digital";
const LETTER_STAGGER = 0.03;
const LETTER_DUR = 0.35;
const TEXT_END_S =
  TEXT_DELAY_S + (TEXT.length - 1) * LETTER_STAGGER + LETTER_DUR;

const SHINE_DELAY_S = TEXT_END_S + 0.12;
const PULSE_DELAY_S = SHINE_DELAY_S + 0.7 + 0.1;
const HOLD_MS = (PULSE_DELAY_S + 0.75) * 1000;

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
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden bg-brand-black"
        >
          <div
            className="flex flex-col items-center"
            style={{ animation: `splash-pulse 0.5s ease-in-out ${PULSE_DELAY_S}s 1` }}
          >
            <div className="relative h-24 w-24 sm:h-28 sm:w-28">
              {/* flash de revelado, tipo obturador de cámara */}
              <div
                aria-hidden
                className="absolute inset-[-120%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(234,247,249,0.95) 0%, rgba(0,229,255,0.5) 35%, transparent 70%)",
                  opacity: 0,
                  animation: `splash-flash 0.35s ease-out ${FLASH_DELAY_S}s forwards`,
                }}
              />

              {/* pétalos tipo iris/obturador, cierran y se abren para revelar el logo */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                {Array.from({ length: BLADE_COUNT }).map((_, i) => (
                  <g key={i} transform={`rotate(${(360 / BLADE_COUNT) * i} 50 50)`}>
                    <motion.path
                      d={BLADE_PATH}
                      fill="var(--brand-accent)"
                      style={{ transformOrigin: "50px 50px" }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1, 1, 0], opacity: [0, 0.95, 0.95, 0] }}
                      transition={{
                        duration: 0.85,
                        delay: i * 0.02,
                        times: [0, BLADES_CLOSE_S / 0.85, REVEAL_DELAY_S / 0.85, 1],
                        ease: [0.65, 0, 0.35, 1],
                      }}
                    />
                  </g>
                ))}
              </svg>

              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: LOGO_SETTLE_S - REVEAL_DELAY_S,
                  delay: REVEAL_DELAY_S,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-[20%]"
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

            <div className="relative mt-6 flex" style={{ whiteSpace: "pre" }}>
              {[...TEXT].map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: LETTER_DUR,
                    delay: TEXT_DELAY_S + i * LETTER_STAGGER,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-xl uppercase tracking-wide text-brand-cream sm:text-2xl"
                >
                  {char}
                </motion.span>
              ))}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-clip-text font-display text-xl uppercase tracking-wide text-transparent opacity-0 sm:text-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, transparent 30%, rgba(0,229,255,0.9) 50%, transparent 70%)",
                  backgroundSize: "300% 100%",
                  backgroundPosition: "100% 0",
                  animation: `splash-shine 0.7s ease-out ${SHINE_DELAY_S}s forwards`,
                }}
              >
                {TEXT}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
