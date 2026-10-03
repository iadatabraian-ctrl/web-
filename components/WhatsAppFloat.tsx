import { WhatsAppIcon } from "@/components/BrandIcons";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hacer%20una%20consulta"
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg shadow-black/30 transition hover:scale-110 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
      <WhatsAppIcon className="h-8 w-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-brand-black-deep px-3 py-1.5 font-body text-xs text-brand-cream opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        Escribinos
      </span>
    </a>
  );
}
