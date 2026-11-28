import Image from "next/image";

/* Panel de administrador (escritorio) y panel de socio (celular), superpuestos en diagonal,
   con "RIOFIT" gigante detrás (como el hero) y una línea fina que los cruza. */
export function PantallasRiofit() {
  return (
    <div className="relative mx-auto h-[112vw] w-full max-w-[34rem] sm:h-[32rem] lg:h-[34rem]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-1%] select-none text-center font-impact text-[33vw] font-black uppercase italic leading-[0.8] tracking-[-0.02em] bg-[linear-gradient(to_bottom,rgba(26,23,18,0.16)_20%,rgba(26,23,18,0.02)_100%)] bg-clip-text text-transparent [font-stretch:50%] sm:text-[9.5rem] lg:text-[10.5rem]"
      >
        RIOFIT
      </span>
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <path d="M-30 86 L130 44" fill="none" stroke="#FF6A1F" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute left-0 top-[19%] w-[86%] -rotate-[3deg] overflow-hidden rounded-xl border border-black/15 bg-[#161616] shadow-[0_30px_50px_-18px_rgba(0,0,0,0.4)]">
        <Image src="/img/riofit-admin.webp" alt="Panel de administrador de Río Fit: asignar una rutina a un socio" width={1280} height={720} sizes="(min-width: 1024px) 30rem, 86vw" className="h-auto w-full" priority />
      </div>
      <div className="absolute bottom-0 right-[1%] w-[36%] rotate-[4deg] overflow-hidden rounded-[1.4rem] border-[3px] border-[#2a2a2a] bg-[#161616] shadow-[0_30px_50px_-16px_rgba(0,0,0,0.4)] sm:rounded-[1.8rem]">
        <Image src="/img/riofit-socio-2.webp" alt="Panel del socio de Río Fit en celular: rutina del día" width={780} height={1629} sizes="(min-width: 1024px) 12rem, 36vw" className="h-auto w-full" />
      </div>
    </div>
  );
}
