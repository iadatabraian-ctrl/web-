import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Diagnostico } from "@/components/Diagnostico";
import { Servicios } from "@/components/Servicios";
import { Proceso } from "@/components/Proceso";
import { AccesoDirecto } from "@/components/AccesoDirecto";
import { Nosotros } from "@/components/Nosotros";
import { MiniDiagnostico } from "@/components/MiniDiagnostico";
import { CtaFooter } from "@/components/CtaFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="relative">
        <main>
          <Hero />
          <Diagnostico />
          <Servicios />
          <Proceso />
          <AccesoDirecto />
          <Nosotros />
          <MiniDiagnostico />
        </main>
        <CtaFooter />
      </div>
    </>
  );
}
