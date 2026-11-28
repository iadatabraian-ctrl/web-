/* Lista de casos: un solo lugar para la página /casos, las tarjetas de cada servicio y el mapa del sitio.
   Para sumar un caso: agregar un objeto acá y crear su página en app/casos/<slug>/page.tsx. */

/** Detalle de color propio del cliente: un punto en la etiqueta y el color del destacado. Todo lo demás es blanco y tinta, igual para todos. */
export type TemaCaso = { punto: string; acento: string };

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
    // Coral de la marca EMY.
    tema: { punto: "#f58174", acento: "#c13b35" },
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
    // Naranja de la app de Río Fit.
    tema: { punto: "#ff7a1a", acento: "#d9570a" },
  },
];

export const casosDe = (servicio: Caso["servicio"]) => CASOS.filter((c) => c.servicio === servicio);
