"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Code2, Settings2, BrainCircuit, Globe } from "lucide-react";

const ICON_CONVERGE_S = 1.75;
const ICON_LAST_DELAY_S = 0.15;
const FLASH_DELAY_S = ICON_CONVERGE_S + ICON_LAST_DELAY_S;
const LOGO_POP_DELAY_S = FLASH_DELAY_S + 0.05;
const TEXT_DELAY_S = LOGO_POP_DELAY_S + 0.35;

const ICONS = [
  { Icon: Code2, x: 0, y: -46 },
  { Icon: Globe, x: 46, y: 0 },
  { Icon: BrainCircuit, x: 0, y: 46 },
  { Icon: Settings2, x: -46, y: 0 },
];

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
    const timer = setTimeout(() => {
      setVisible(false);
      window.dispatchEvent(new Event("splash-done"));
    }, HOLD_MS);
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
              {/* flash cuando los componentes convergen en el núcleo */}
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

              {/* componentes tecnológicos que convergen hacia el núcleo */}
              {ICONS.map(({ Icon, x, y }, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 -ml-[10px] -mt-[10px] text-brand-accent"
                  initial={{ opacity: 0, scale: 0.4, x: x * 1.6, y: y * 1.6 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.4, 1, 1, 0.3],
                    x: [x * 1.6, x, x * 0.15, 0],
                    y: [y * 1.6, y, y * 0.15, 0],
                  }}
                  transition={{
                    duration: ICON_CONVERGE_S,
                    delay: i * 0.05,
                    times: [0, 0.45, 0.75, 1],
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  style={{ filter: "drop-shadow(0 0 6px var(--brand-accent))" }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: LOGO_POP_DELAY_S,
                  type: "spring",
                  stiffness: 190,
                  damping: 13,
                  mass: 0.9,
                }}
                className="absolute inset-[8%]"
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
