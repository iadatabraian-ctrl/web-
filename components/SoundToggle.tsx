"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/* Sonido de fondo opcional. Los navegadores bloquean el audio automático, así que arranca apagado
   y suena solo si la persona lo activa. Para cambiar la pista, reemplazar public/audio/fondo.mp3. */

const SRC = "/audio/fondo.mp3";
const VOLUME = 0.25;

export function SoundToggle() {
  const [on, setOn] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const fade = useRef(0);

  useEffect(() => () => {
    cancelAnimationFrame(fade.current);
    audio.current?.pause();
  }, []);

  const ramp = (to: number, done?: () => void) => {
    const a = audio.current;
    if (!a) return;
    cancelAnimationFrame(fade.current);
    const from = a.volume;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 700);
      a.volume = from + (to - from) * k;
      if (k < 1) fade.current = requestAnimationFrame(tick);
      else done?.();
    };
    fade.current = requestAnimationFrame(tick);
  };

  const toggle = async () => {
    if (!on) {
      if (!audio.current) {
        audio.current = new Audio(SRC);
        audio.current.loop = true;
      }
      audio.current.volume = 0;
      try {
        await audio.current.play();
        ramp(VOLUME);
        setOn(true);
      } catch {
        /* el navegador lo bloqueó: no pasa nada */
      }
    } else {
      setOn(false);
      ramp(0, () => audio.current?.pause());
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Silenciar el sonido de fondo" : "Activar el sonido de fondo"}
      className="fixed bottom-4 left-4 z-50 flex h-10 items-center gap-2 rounded-full border border-white/20 bg-[#0a0a0a]/80 px-3.5 font-mono text-[11px] uppercase tracking-wide text-brand-cream backdrop-blur transition-[background-color,transform] duration-200 hover:bg-[#1e1e1e] active:scale-95 sm:bottom-6 sm:left-6"
    >
      {on ? <Volume2 className="h-4 w-4 text-brand-accent" strokeWidth={2.25} /> : <VolumeX className="h-4 w-4" strokeWidth={2.25} />}
      Sonido
    </button>
  );
}
