/* Lista de casos: un solo lugar para la página /casos, las tarjetas de cada servicio y el mapa del sitio.
   Para sumar un caso: agregar un objeto acá y crear su página en app/casos/<slug>/page.tsx. */

/** Colores propios del cliente: cada tarjeta toma la identidad del proyecto que muestra, no la de Deploy. */
export type TemaCaso = { fondo: string; tinta: string; suave: string; acento: string; sobreAcento: string; pastilla: string; sobrePastilla: string };

export type Caso = {
  slug: string;
  servicio: "software-a-medida" | "paginas-web" | "automatizacion" | "agentes-whatsapp";
  etiqueta: string;
  titulo: string;
  destacado: string;
  texto: string;
  imagen: string;
  alt: string;
  tema: TemaCaso;
};

export const CASOS: Caso[] = [
  {
    slug: "emy",
    servicio: "paginas-web",
    etiqueta: "Caso real",
    titulo: "EMY Indumentaria,",
    destacado: "tienda online.",
    texto: "Catálogo con pago por Mercado Pago y un panel donde la dueña carga stock, fotos y pedidos sola.",
    imagen: "/img/emy-movil-home.webp",
    alt: "Tienda online de EMY Indumentaria en celular",
    // Coral y crema de la marca EMY.
    tema: { fondo: "#f58174", tinta: "#2a1e1b", suave: "rgba(42,30,27,0.78)", acento: "#c13b35", sobreAcento: "#faf6f1", pastilla: "#2a1e1b", sobrePastilla: "#faf6f1" },
  },
  {
    slug: "riofit",
    servicio: "software-a-medida",
    etiqueta: "Fitness app",
    titulo: "Río Fit,",
    destacado: "sistema para gimnasios.",
    texto: "Socios, cuotas y rutinas por socio, con panel de administrador y panel de socio.",
    imagen: "/img/riofit-socio-2.webp",
    alt: "Panel del socio de Río Fit en celular",
    // Azul noche y naranja de la app de Río Fit.
    tema: { fondo: "#0b2239", tinta: "#f6f1e7", suave: "rgba(246,241,231,0.72)", acento: "#ff7a1a", sobreAcento: "#0b2239", pastilla: "#ff7a1a", sobrePastilla: "#0b2239" },
  },
];

export const casosDe = (servicio: Caso["servicio"]) => CASOS.filter((c) => c.servicio === servicio);
