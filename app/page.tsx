import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problema } from "@/components/Problema";
import { Servicios } from "@/components/Servicios";
import { Proceso } from "@/components/Proceso";
import { Fundador } from "@/components/Fundador";
import { Faq } from "@/components/Faq";
import { CtaFooter } from "@/components/CtaFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="relative">
        <main>
          <Hero />
          <Problema />
          <Servicios />
          <Proceso />
          <Fundador />
          <Faq />
        </main>
        <CtaFooter />
      </div>
    </>
  );
}
