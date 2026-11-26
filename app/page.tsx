import { Nav } from "@/components/Nav";
import { Splash } from "@/components/Splash";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SeccionesIndice } from "@/components/SeccionesIndice";
import { Hero } from "@/components/Hero";
import { Servicios } from "@/components/Servicios";
import { Proceso } from "@/components/Proceso";
import { Nosotros } from "@/components/Nosotros";
import { Faq } from "@/components/Faq";
import { CtaFooter } from "@/components/CtaFooter";

export default function Home() {
  return (
    <>
      <Splash />
      <SmoothScroll />
      <SeccionesIndice />
      <Nav />
      <div className="home-suave relative">
        <main>
          <Hero />
          <Servicios />
          <Proceso />
          <Nosotros />
          <Faq />
        </main>
        <CtaFooter />
      </div>
    </>
  );
}
