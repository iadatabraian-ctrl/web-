"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Segundo del video en el que el cohete ya despegó: ahí se enciende "en producción." */
const LIFTOFF_S = 2.8;

export function HeroLaunch({ start, onLive }: { start: boolean; onLive: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const fired = useRef(false);
  const reduce = useReducedMotion();
  // null hasta saber el ancho: así se descarga un solo video (vertical en celular, horizontal en laptop)
  const [wide, setWide] = useState<boolean | null>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    setWide(mq.matches);
  }, []);

  const fire = () => {
    if (fired.current) return;
    fired.current = true;
    onLive();
  };

  useEffect(() => {
    if (!start || wide === null) return;
    const v = ref.current;
    if (reduce || !v) {
      fire();
      return;
    }
    // si el navegador bloquea el autoplay (ahorro de energía), el titular se enciende igual
    const fallback = setTimeout(fire, 3500);
    v.play().catch(() => fire());
    return () => clearTimeout(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, wide, reduce]);

  const base = wide ? "/video/hero-launch-wide" : "/video/hero-launch";
  const poster = wide ? "/img/hero/hero-launch-wide-poster.jpg" : "/img/hero/hero-launch-poster.jpg";

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-brand-black-deep">
      {wide !== null && (
        <video
          key={base}
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover object-[50%_72%] transition-opacity duration-[1600ms] ease-out min-[900px]:object-center ${ended ? "opacity-0" : "opacity-100"}`}
          poster={poster}
          muted
          playsInline
          preload="auto"
          onEnded={() => setEnded(true)}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= LIFTOFF_S) fire();
          }}
        >
          <source src={`${base}.webm`} type="video/webm" />
          <source src={`${base}.mp4`} type="video/mp4" />
        </video>
      )}
      {/* oscurece para que el titular se lea sobre el video: arriba en celular, a la izquierda en laptop */}
      <div
        className="absolute inset-0 min-[900px]:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,4,3,.85), rgba(5,4,3,.45) 40%, transparent 62%)",
        }}
      />
      <div
        className="absolute inset-0 hidden min-[900px]:block"
        style={{
          background:
            "linear-gradient(to right, rgba(5,4,3,.88), rgba(5,4,3,.5) 40%, transparent 68%)",
        }}
      />
    </div>
  );
}
