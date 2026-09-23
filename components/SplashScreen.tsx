"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Code2, Settings2, BrainCircuit, Globe } from "lucide-react";

const ICON_BLINK_S = 0.38;
const ICON_SLOT_S = 0.5;
const ICONS = [Code2, Globe, BrainCircuit, Settings2];
// cada ícono termina de parpadear bien antes de que arranque el siguiente slot
const ICON_SEQUENCE_END_S = (ICONS.length - 1) * ICON_SLOT_S + ICON_BLINK_S;
// colchón explícito para que el flash nunca se solape con el último ícono
const FLASH_DELAY_S = ICON_SEQUENCE_END_S + 0.2;
// el logo arranca a crecer en el mismo instante que estalla el flash, no después
const LOGO_POP_DELAY_S = FLASH_DELAY_S;
const LOGO_SHINE_DELAY_S = LOGO_POP_DELAY_S + 0.38;
const PULSE_DELAY_S = LOGO_SHINE_DELAY_S + 0.7 + 0.1;
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
            <div className="relative aspect-[280/77] w-56 sm:w-72" style={{ perspective: 700 }}>
              {/* flash de remate al terminar el parpadeo de los íconos */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(234,247,249,0.95) 0%, rgba(255,92,26,0.5) 35%, transparent 70%)",
                  opacity: 0,
                  animation: `splash-flash 0.35s ease-out ${FLASH_DELAY_S}s forwards`,
                }}
              />

              {/* onda expansiva que se abre paso hacia el resto de la pantalla */}
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/50"
                style={{ width: "58vmin", height: "58vmin" }}
                initial={{ opacity: 0, scale: 0.15 }}
                animate={{ opacity: [0, 0.55, 0], scale: [0.15, 1, 1.3] }}
                transition={{ duration: 0.9, delay: FLASH_DELAY_S, ease: "easeOut" }}
              />
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/25"
                style={{ width: "88vmin", height: "88vmin" }}
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: [0, 0.35, 0], scale: [0.1, 1, 1.2] }}
                transition={{ duration: 1.1, delay: FLASH_DELAY_S + 0.06, ease: "easeOut" }}
              />

              {/* componentes tecnológicos: chispazo uno a la vez en el núcleo */}
              {ICONS.map((Icon, i) => {
                const delay = i * ICON_SLOT_S;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  >
                    {/* anillo de pulso que se expande detrás del ícono */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-brand-accent/70"
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: [0, 0.65, 0], scale: [0.3, 1, 1.7] }}
                      transition={{
                        duration: ICON_BLINK_S,
                        delay,
                        times: [0, 0.4, 1],
                        ease: "easeOut",
                      }}
                    />
                    <motion.div
                      className="text-brand-accent"
                      initial={{ opacity: 0, scale: 0.3, rotate: -18 }}
                      animate={{
                        opacity: [0, 1, 0.2, 1, 0],
                        scale: [0.3, 1.2, 0.95, 1.05, 0.55],
                        rotate: [-18, 6, -2, 1, 0],
                      }}
                      transition={{
                        duration: ICON_BLINK_S,
                        delay,
                        times: [0, 0.28, 0.45, 0.62, 1],
                        ease: [0.65, 0, 0.35, 1],
                      }}
                      style={{ filter: "drop-shadow(0 0 8px var(--brand-accent))" }}
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </motion.div>
                  </div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.3, rotateY: -55, rotateX: 16 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
                transition={{
                  opacity: { delay: LOGO_POP_DELAY_S, duration: 0.28, ease: "easeOut" },
                  scale: {
                    delay: LOGO_POP_DELAY_S,
                    type: "spring",
                    stiffness: 230,
                    damping: 16,
                    mass: 0.7,
                  },
                  rotateY: {
                    delay: LOGO_POP_DELAY_S,
                    type: "spring",
                    stiffness: 230,
                    damping: 16,
                    mass: 0.7,
                  },
                  rotateX: {
                    delay: LOGO_POP_DELAY_S,
                    type: "spring",
                    stiffness: 230,
                    damping: 16,
                    mass: 0.7,
                  },
                }}
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/img/deploy-logo.png"
                  alt="Deploy"
                  fill
                  priority
                  className="object-contain"
                />
                {/* barrido de luz recortado a la forma real del logo */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    WebkitMaskImage: "url(/img/deploy-logo.png)",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: "url(/img/deploy-logo.png)",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    backgroundImage:
                      "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.95) 50%, transparent 65%)",
                    backgroundSize: "260% 100%",
                    backgroundPosition: "140% 0",
                    opacity: 0,
                    animation: `splash-logo-shine 0.7s ease-out ${LOGO_SHINE_DELAY_S}s forwards`,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
