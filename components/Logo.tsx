/* Logotipo de Deploy: D de marca (vectorial) + "eploy" en Anton, inclinado 10°. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-end gap-[2px] ${className}`}>
      <svg viewBox="30 50 1115 590" aria-hidden="true" className="h-[21px] w-auto sm:h-6">
        <path d="M343 57H850C1020 57 1140 170 1140 330C1140 500 1010 627 790 627H370L508 474H790C890 474 962 410 962 330C962 250 890 197 830 197H447Z" fill="#fff" />
        <path d="M377 252H609L270 635H37Z" fill="#FF5C1A" />
      </svg>
      <span className="inline-block -skew-x-[10deg] font-display text-[17px] leading-[1] tracking-[0.025em] text-white sm:text-[19px]">
        eploy
      </span>
    </span>
  );
}
