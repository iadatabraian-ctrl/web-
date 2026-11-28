import Image from "next/image";

/* Dos pantallas de celular en diagonal, con "EMY" gigante detrás (como el hero) y una línea fina que las cruza. */
export function TelefonosEmy() {
  return (
    <div className="relative mx-auto h-[108vw] w-full max-w-[28rem] sm:h-[30rem] lg:h-[34rem]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-2%] select-none text-center font-impact text-[44vw] font-black uppercase italic leading-[0.8] tracking-[-0.02em] bg-[linear-gradient(to_bottom,rgba(26,23,18,0.16)_20%,rgba(26,23,18,0.02)_100%)] bg-clip-text text-transparent [font-stretch:50%] sm:text-[11rem] lg:text-[13rem]"
      >
        EMY
      </span>
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <path d="M-30 78 L130 40" fill="none" stroke="#FF6A1F" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute left-[6%] top-[22%] w-[42%] -rotate-[5deg] overflow-hidden rounded-[1.5rem] border-[3px] border-[#2a2a2a] bg-[#161616] shadow-[0_30px_50px_-16px_rgba(0,0,0,0.4)] sm:rounded-[1.8rem]">
        <Image src="/img/emy-movil-home.webp" alt="Portada de la tienda online de EMY Indumentaria en celular" width={780} height={1688} sizes="(min-width: 1024px) 15rem, 50vw" className="h-auto w-full" />
      </div>
      <div className="absolute right-[4%] top-[31%] w-[42%] rotate-[4deg] overflow-hidden rounded-[1.5rem] border-[3px] border-[#2a2a2a] bg-[#161616] shadow-[0_30px_50px_-16px_rgba(0,0,0,0.4)] sm:rounded-[1.8rem]">
        <Image src="/img/emy-movil.webp" alt="Página de producto de la tienda de EMY Indumentaria en celular" width={780} height={1688} sizes="(min-width: 1024px) 15rem, 50vw" className="h-auto w-full" />
      </div>
    </div>
  );
}
