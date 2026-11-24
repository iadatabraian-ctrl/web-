import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Servicios } from "@/components/Servicios";
import { Proceso } from "@/components/Proceso";
import { Nosotros } from "@/components/Nosotros";
import { EjemploReal } from "@/components/EjemploReal";
import { Faq } from "@/components/Faq";
import { CtaFooter } from "@/components/CtaFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="relative">
        <main>
          <Hero />
          <Servicios />
          <Proceso />
          <Nosotros />
          <EjemploReal />
          <Faq />
        </main>
        <CtaFooter />
      </div>
    </>
  );
}
