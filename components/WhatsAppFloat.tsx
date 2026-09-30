import { WhatsAppIcon } from "@/components/BrandIcons";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/59898648853?text=Hola%2C%20quiero%20hacer%20una%20consulta"
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg shadow-black/30 transition hover:scale-110 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
