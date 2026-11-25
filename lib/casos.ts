/* Lista de casos: un solo lugar para la página /casos, las tarjetas de cada servicio y el mapa del sitio.
   Para sumar un caso: agregar un objeto acá y crear su página en app/casos/<slug>/page.tsx. */

export type Caso = {
  slug: string;
  servicio: "software-a-medida" | "paginas-web" | "automatizacion" | "agentes-whatsapp";
  etiqueta: string;
  titulo: string;
  destacado: string;
  texto: string;
  imagen: string;
  alt: string;
};

export const CASOS: Caso[] = [
  {
    slug: "emy",
    servicio: "paginas-web",
    etiqueta: "Caso real",
    titulo: "EMY Indumentaria,",
    destacado: "tienda online.",
    texto: "Catálogo, carrito, pedidos y panel para cargar stock y fotos.",
    imagen: "/img/emy-movil-home.webp",
    alt: "Tienda online de EMY Indumentaria en celular",
  },
  {
    slug: "riofit",
    servicio: "software-a-medida",
    etiqueta: "Fitness app",
    titulo: "Río Fit,",
    destacado: "sistema para gimnasios.",
    texto: "Panel de administrador y panel de socio, de punta a punta.",
    imagen: "/img/riofit-socio-2.webp",
    alt: "Panel del socio de Río Fit en celular",
  },
];

export const casosDe = (servicio: Caso["servicio"]) => CASOS.filter((c) => c.servicio === servicio);
