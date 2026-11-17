export type ServicioSlug =
  | "software-a-medida"
  | "paginas-web"
  | "automatizacion"
  | "agentes-whatsapp";

export type Nivel = { nombre: string; etiqueta: string; precio: string; sufijo?: string; plazo: string; resumen: string; incluye: string[] };

export type Servicio = {
  slug: ServicioSlug;
  visual: "software" | "web" | "automatizacion" | "agentes";
  nombre: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  incluye: { t: string; d: string; con?: string[] }[];
  cuandoConviene: string[];
  proceso: { t: string; d: string }[];
  valores: { precio: string; prefijo: string; cifra: string; detalle: string; desde: string; hasta?: string; factores: string[]; plazo: string; nota: string };
  niveles: Nivel[];
  faq: { q: string; a: string }[];
  whatsappTexto: string;
};

const PROCESO_BASE = [
  {
    t: "Relevamiento",
    d: "Se analiza cómo opera hoy el negocio y qué es lo que está generando fricción.",
  },
  {
    t: "Propuesta",
    d: "Se presenta un alcance claro, con plazos y valores definidos antes de comenzar.",
  },
  {
    t: "Desarrollo",
    d: "Se construye la solución con avances visibles y validación en cada etapa.",
  },
  {
    t: "Acompañamiento",
    d: "Una vez en funcionamiento, se realizan ajustes y se brinda soporte. Incluye 30 días de garantía.",
  },
];

export const SERVICIOS: Servicio[] = [
  {
    slug: "software-a-medida",
    visual: "software",
    nombre: "Software a medida",
    eyebrow: "SOFTWARE A MEDIDA",
    metaTitle: "Software a medida | Deploy · Salto",
    metaDescription:
      "Desarrollo de software a medida para empresas en Uruguay: sistemas de gestión, paneles e integraciones diseñados para su operación. Desde Salto, con atención directa.",
    h1: "Software a medida para empresas en Uruguay",
    intro: [
      "Desarrollamos sistemas de gestión, paneles de control y herramientas internas diseñados a partir de la forma en que opera su negocio. No se adapta la operación a un programa genérico: se construye el programa que la operación necesita.",
      "Trabajamos desde Salto, Uruguay, y atendemos proyectos en cualquier departamento del país. El contacto es directo con quien diseña y programa la solución, sin intermediarios.",
    ],
    incluye: [
      {
        t: "Relevamiento del proceso actual",
        d: "Antes de programar se documenta cómo se trabaja hoy: quién hace qué, con qué herramientas y dónde se pierde tiempo. Con eso se define qué debe resolver el sistema y qué queda afuera.",
      },
      {
        t: "Panel de gestión",
        d: "Una pantalla central con lo que hace falta para decidir: ventas, stock, tareas pendientes, clientes. Se arma con los datos de tu operación, no con indicadores genéricos.",
      },
      {
        t: "Usuarios y permisos",
        d: "Cada persona entra con su usuario y ve solo lo que le corresponde según su rol: dueño, administración, vendedores u operarios. Queda registro de quién hizo cada cambio.",
      },
      {
        t: "Integraciones",
        d: "El sistema se conecta con las herramientas que ya usás, para que un dato no se cargue dos veces.",
        con: ["Google Sheets y Excel", "Mercado Pago", "WhatsApp Business", "Correo", "Sistemas o bases de datos existentes"],
      },
      {
        t: "Reportes e indicadores",
        d: "Informes con el estado real del negocio, para ver en pantalla o exportar a Excel y PDF. Los números que hoy se arman a mano, ordenados en un solo lugar.",
      },
      {
        t: "Soporte posterior",
        d: "Ajustes, correcciones y acompañamiento al equipo durante los primeros días de uso. Incluye 30 días de garantía desde la entrega.",
      },
    ],
    cuandoConviene: [
      "Te piden precios por Instagram, WhatsApp y mensajes, y los pedidos quedan perdidos entre chats.",
      "Llevás las ventas en una libreta o una planilla, y a veces no sabés qué te falta entregar.",
      "Cada vez que alguien pregunta \"¿tenés stock?\", tenés que ir a mirar.",
      "Pasás más tiempo anotando y coordinando que vendiendo.",
      "Los programas que existen no se adaptan a cómo vendés vos.",
    ],
    proceso: PROCESO_BASE,
    valores: {
      precio: "Desde USD 800–1.200, más USD 40–80 mensuales de mantenimiento",
      prefijo: "Desde",
      cifra: "USD 800–1.200",
      detalle: "Más USD 40–80 por mes de mantenimiento",
      desde: "USD 800",
      hasta: "USD 1.200",
      factores: ["Cuántas funciones necesita el sistema", "Cuántas personas lo usan y con qué permisos", "Qué herramientas hay que conectar"],
      plazo: "20 a 30 días",
      nota: "El valor final depende del alcance. Cada proyecto se cotiza de forma individual, sin paquetes cerrados.",
    },
    niveles: [
      { nombre: "Básico", etiqueta: "Desde", precio: "USD 800", plazo: "20 días", resumen: "Un proceso resuelto de punta a punta.", incluye: ["Panel de gestión simple", "Hasta 2 usuarios con permisos", "Una función principal bien resuelta", "30 días de garantía"] },
      { nombre: "Medio", etiqueta: "Aprox.", precio: "USD 1.000", plazo: "25 días", resumen: "Varias áreas del negocio en un mismo sistema.", incluye: ["Varios módulos conectados", "Usuarios y permisos por rol", "Una o dos integraciones", "Reportes e indicadores"] },
      { nombre: "Amplio", etiqueta: "Hasta", precio: "USD 1.200", plazo: "30 días", resumen: "El sistema completo de tu operación.", incluye: ["Sistema completo a medida", "Más usuarios y más roles", "Varias integraciones", "Reportes avanzados"] },
    ],
    faq: [
      {
        q: "¿Qué es el software a medida?",
        a: "Es un sistema desarrollado específicamente para una empresa, a partir de sus procesos y necesidades. A diferencia de un programa estándar, incluye solo las funciones que el negocio utiliza y se adapta a su forma de trabajo.",
      },
      {
        q: "¿En qué se diferencia de un sistema ya existente?",
        a: "Un sistema estándar obliga a ajustar la operación a sus límites. El software a medida se diseña a partir de la operación, por lo que puede integrar los procesos propios, las herramientas existentes y los reportes que la empresa realmente necesita.",
      },
      {
        q: "¿Cuánto cuesta un software a medida?",
        a: "Los proyectos parten desde USD 800–1.200, con un mantenimiento mensual de USD 40 a 80. El valor definitivo se establece en la propuesta, una vez relevado el alcance.",
      },
      {
        q: "¿Cuánto tiempo demora el desarrollo?",
        a: "Entre 20 y 30 días, según el alcance acordado.",
      },
      {
        q: "¿Con qué tecnología se desarrolla?",
        a: "Se utiliza Next.js y React, tecnologías actuales y ampliamente adoptadas, lo que facilita futuras ampliaciones.",
      },
      {
        q: "¿Es posible ampliar el sistema más adelante?",
        a: "Sí. Cualquier función nueva se cotiza como un alcance adicional, bajo las mismas condiciones del proyecto original.",
      },
    ],
    whatsappTexto: "Hola, quiero consultar por un software a medida",
  },
  {
    slug: "paginas-web",
    visual: "web",
    nombre: "Páginas web",
    eyebrow: "PÁGINAS WEB",
    metaTitle: "Diseño de páginas web | Deploy · Salto",
    metaDescription:
      "Diseño y desarrollo de páginas web profesionales en Uruguay. Sitios a medida, rápidos y orientados a generar contactos. Desde Salto, con atención directa.",
    h1: "Diseño de páginas web en Uruguay",
    intro: [
      "Diseñamos y desarrollamos sitios web a medida, rápidos y claros, pensados para transmitir confianza y convertir visitas en contactos. Cada sitio se construye desde cero, sin plantillas.",
      "Trabajamos desde Salto, Uruguay, con atención directa durante todo el proyecto. Quien diseña y programa el sitio es también quien lo conversa con el cliente.",
    ],
    incluye: [
      {
        t: "Diseño a medida",
        d: "Cada sitio se diseña desde cero con tu marca: colores, tipografía e imágenes. Sin plantillas ni bloques repetidos de otros sitios.",
      },
      {
        t: "Estructura y textos orientados a la conversión",
        d: "Se ordena el contenido para que quien llega entienda en pocos segundos qué ofrecés y tenga un camino claro para escribirte o comprar.",
      },
      {
        t: "Tienda online (e-commerce)",
        d: "Catálogo de productos, carrito y compra online con los medios de pago que uses. Control de stock y de pedidos, con aviso cuando entra una venta. Se desarrolla a medida o sobre la plataforma que mejor convenga a tu caso.",
        con: ["Mercado Pago", "Transferencia bancaria", "Envíos y couriers", "WhatsApp para pedidos"],
      },
      {
        t: "Velocidad y SEO on-page",
        d: "Carga rápida y estructura técnica para que Google lea bien el sitio: títulos, descripciones, datos estructurados y mapa del sitio, para aparecer cuando te buscan.",
      },
      {
        t: "Contacto directo",
        d: "Formulario y botón de WhatsApp conectados, para recibir consultas sin vueltas y que ninguna se pierda.",
        con: ["WhatsApp", "Correo", "Instagram"],
      },
      {
        t: "Adaptación a celulares",
        d: "El sitio se prueba en celular, tablet y computadora. La mayoría de las visitas llegan desde el celular, y se diseña pensando en esa pantalla primero.",
      },
      {
        t: "Puesta en línea y soporte",
        d: "Publicación del sitio, conexión del dominio y 30 días de garantía posteriores a la entrega.",
      },
    ],
    cuandoConviene: [
      "Vendés solo por Instagram y cuando alguien busca tu negocio en Google, no te encuentra.",
      "Tu página es vieja, lenta o se ve mal en el celular, que es desde donde te miran.",
      "Armaste el sitio con una plantilla y no se parece en nada a tu negocio.",
      "Los clientes te preguntan lo mismo por mensaje, otra vez, porque no está en ningún lado.",
      "Tenés visitas pero nadie te escribe.",
    ],
    proceso: PROCESO_BASE,
    valores: {
      precio: "Desde $8.000 hasta $25.000 UYU, según complejidad",
      prefijo: "Desde",
      cifra: "$8.000 – $25.000 UYU",
      detalle: "Según la complejidad",
      desde: "$8.000",
      hasta: "$25.000",
      factores: ["Cantidad de secciones y páginas", "Si vendés online o solo mostrás tu negocio", "Si necesita textos, fotos o diseño nuevo"],
      plazo: "7 a 20 días",
      nota: "El valor final depende del alcance. Cada proyecto se cotiza de forma individual, sin paquetes cerrados.",
    },
    niveles: [
      { nombre: "Básico", etiqueta: "Desde", precio: "$8.000", sufijo: "UYU", plazo: "7 días", resumen: "Presencia clara y profesional.", incluye: ["Hasta 5 secciones", "Diseño a medida con tu marca", "Adaptada a celulares", "Botón de WhatsApp y formulario"] },
      { nombre: "Medio", etiqueta: "Aprox.", precio: "$16.500", sufijo: "UYU", plazo: "14 días", resumen: "Pensada para generar contactos.", incluye: ["Hasta 10 secciones o páginas", "Textos orientados a la conversión", "Velocidad y SEO on-page", "Redes, mapa y reservas"] },
      { nombre: "Amplio", etiqueta: "Hasta", precio: "$25.000", sufijo: "UYU", plazo: "20 días", resumen: "Para vender online.", incluye: ["Tienda online completa", "Medios de pago", "Todas las páginas necesarias", "Capacitación para cargar productos"] },
    ],
    faq: [
      {
        q: "¿Cuánto cuesta una página web en Uruguay?",
        a: "Los sitios desarrollados por Deploy van desde $8.000 hasta $25.000 UYU, según la cantidad de secciones, funciones y nivel de diseño requerido.",
      },
      {
        q: "¿Cuánto demora el desarrollo de un sitio web?",
        a: "Entre 7 y 20 días, según el alcance acordado en la propuesta.",
      },
      {
        q: "¿El sitio se diseña con plantillas?",
        a: "No. Cada sitio se diseña y programa a medida, de modo que refleje la identidad de la marca y se diferencie de la competencia.",
      },
      {
        q: "¿Hacen tiendas online?",
        a: "Sí. Catálogo, carrito, medios de pago como Mercado Pago o transferencia, control de stock y pedidos. El valor depende de la cantidad de productos, los medios de pago y los envíos, y se cotiza según el alcance.",
      },
      {
        q: "¿La página aparecerá en Google?",
        a: "El sitio se entrega con la optimización técnica y de contenido necesaria para ser indexado correctamente. El posicionamiento depende además de otros factores, como la competencia y la antigüedad del dominio, y se construye con el tiempo.",
      },
      {
        q: "¿Con qué tecnología se desarrolla?",
        a: "Se utiliza Next.js y React, lo que permite sitios rápidos, seguros y fáciles de ampliar.",
      },
      {
        q: "¿Qué ocurre si se necesitan cambios después de la entrega?",
        a: "Durante los 30 días posteriores se corrigen sin costo los errores que pudieran surgir. Pasado ese plazo, los cambios o funciones nuevas se cotizan por separado.",
      },
    ],
    whatsappTexto: "Hola, quiero consultar por una página web",
  },
  {
    slug: "automatizacion",
    visual: "automatizacion",
    nombre: "Automatización de procesos",
    eyebrow: "AUTOMATIZACIÓN",
    metaTitle: "Automatización de procesos para empresas | Deploy",
    metaDescription:
      "Automatización de procesos empresariales en Uruguay: conectamos sus herramientas y eliminamos tareas manuales repetitivas. Desde Salto, con atención directa.",
    h1: "Automatización de procesos para empresas en Uruguay",
    intro: [
      "Conectamos las herramientas que su empresa ya utiliza y automatizamos las tareas repetitivas, para que el equipo dedique su tiempo a actividades de mayor valor y se reduzcan los errores de carga manual.",
      "Trabajamos desde Salto, Uruguay. Cada automatización se diseña a partir de un relevamiento del proceso real, no de una plantilla genérica.",
    ],
    incluye: [
      {
        t: "Relevamiento de tareas repetitivas",
        d: "Se mapea el trabajo repetitivo: cargas de datos, avisos, seguimientos, copias entre planillas. Se ordena por tiempo perdido y se define qué automatizar primero.",
      },
      {
        t: "Conexión entre herramientas",
        d: "Los sistemas que ya usás intercambian datos entre sí, sin copiar y pegar de uno a otro.",
        con: ["Google Sheets y Excel", "Gmail y Outlook", "Formularios", "WhatsApp", "Mercado Pago", "Calendario", "Tiendas online y CRM"],
      },
      {
        t: "Flujos de trabajo",
        d: "Avisos al equipo, carga de datos, seguimiento de clientes y generación de documentos (presupuestos, informes, recordatorios) con reglas que se definen con vos.",
      },
      {
        t: "Pruebas y validación",
        d: "Cada flujo se prueba con datos reales antes de ponerlo en uso, y se define qué pasa si algo falla: aviso, reintento o revisión manual.",
      },
      {
        t: "Soporte posterior",
        d: "Ajustes y acompañamiento después de la entrega. Incluye 30 días de garantía.",
      },
    ],
    cuandoConviene: [
      "Copiás los pedidos de Instagram o WhatsApp a una planilla, uno por uno, a mano.",
      "Te olvidás de avisarle a un cliente que su pedido ya salió, o de cobrarle un pago pendiente.",
      "Todos los días armás el mismo reporte o el mismo comprobante a mano.",
      "Te equivocás al cargar un dato y después hay que arreglarlo.",
      "Perdés horas en tareas repetitivas que no te traen ventas.",
    ],
    proceso: PROCESO_BASE,
    valores: {
      precio: "Desde $10.000 UYU",
      prefijo: "Desde",
      cifra: "$10.000 UYU",
      detalle: "Según la cantidad y complejidad de los flujos",
      desde: "$10.000",
      factores: ["Cuántos procesos querés automatizar", "Cuántas herramientas hay que conectar", "Qué tan seguido cambian tus reglas"],
      plazo: "10 a 15 días",
      nota: "El valor final depende de la cantidad y complejidad de los flujos. Cada proyecto se cotiza de forma individual.",
    },
    niveles: [
      { nombre: "Básico", etiqueta: "Desde", precio: "$10.000", sufijo: "UYU", plazo: "10 días", resumen: "Una tarea repetitiva resuelta.", incluye: ["Un proceso automatizado", "Hasta 2 herramientas conectadas", "Pruebas y validación", "30 días de soporte"] },
      { nombre: "Medio", etiqueta: "", precio: "A cotizar", plazo: "13 días", resumen: "Varios procesos que se pasan datos entre sí.", incluye: ["Varios procesos automatizados", "Más herramientas conectadas", "Flujos con reglas propias", "Pruebas y validación"] },
      { nombre: "Amplio", etiqueta: "", precio: "A cotizar", plazo: "15 días", resumen: "La operación conectada de punta a punta.", incluye: ["Procesos de varias áreas", "Integraciones múltiples", "Reglas que cambian seguido", "Soporte posterior ampliado"] },
    ],
    faq: [
      {
        q: "¿Qué es la automatización de procesos?",
        a: "Es el uso de software para ejecutar de forma automática tareas que hoy se realizan a mano, como cargar datos, enviar avisos o conectar información entre distintas herramientas.",
      },
      {
        q: "¿Qué tipo de tareas se pueden automatizar?",
        a: "Principalmente tareas repetitivas y basadas en reglas claras: cargas de datos, notificaciones, seguimiento de consultas, generación de reportes y sincronización entre sistemas.",
      },
      {
        q: "¿Cuánto cuesta automatizar un proceso?",
        a: "Los proyectos parten desde $10.000 UYU. El valor depende de la cantidad de herramientas involucradas y de la complejidad de los flujos.",
      },
      {
        q: "¿Cuánto tiempo demora?",
        a: "Entre 10 y 15 días, según el alcance acordado.",
      },
      {
        q: "¿Qué herramientas se utilizan?",
        a: "Se trabaja con plataformas como n8n, Make y Zapier, y se elige la más adecuada según el caso.",
      },
      {
        q: "¿Es necesario cambiar las herramientas que ya se utilizan?",
        a: "En general no. El objetivo es conectar lo que ya existe, de modo que el equipo siga trabajando con las mismas herramientas pero sin tareas manuales intermedias.",
      },
    ],
    whatsappTexto: "Hola, quiero consultar por automatización de procesos",
  },
  {
    slug: "agentes-whatsapp",
    visual: "agentes",
    nombre: "Agentes de IA para WhatsApp e Instagram",
    eyebrow: "AGENTES DE IA",
    metaTitle: "Agentes de IA para WhatsApp e Instagram | Deploy",
    metaDescription:
      "Agentes de inteligencia artificial para WhatsApp e Instagram: atienden consultas, califican contactos y están disponibles todo el día. Desde Salto, Uruguay.",
    h1: "Agentes de IA para WhatsApp e Instagram",
    intro: [
      "Desarrollamos agentes de inteligencia artificial que responden y atienden consultas en WhatsApp e Instagram, con criterio de negocio y disponibilidad continua, sin necesidad de ampliar el equipo.",
      "Trabajamos desde Salto, Uruguay. Cada agente se configura con la información, el tono y las reglas propias de la empresa.",
    ],
    incluye: [
      {
        t: "Respuesta a consultas frecuentes",
        d: "Responde en WhatsApp e Instagram lo que más se pregunta: precios, horarios, productos, ubicación y formas de pago.",
      },
      {
        t: "Filtrado y calificación de contactos",
        d: "Hace las preguntas necesarias para saber si hay interés real y deja los datos ordenados: nombre, qué busca y qué tan urgente es.",
      },
      {
        t: "Derivación a una persona",
        d: "Cuando el caso lo requiere, o el cliente lo pide, la conversación pasa a una persona del equipo con todo el historial.",
      },
      {
        t: "Conexión con tus herramientas",
        d: "El agente consulta y carga datos en lo que ya usás: agenda, planillas, stock o CRM.",
        con: ["Google Calendar", "Google Sheets", "CRM", "Tiendas online", "Correo"],
      },
      {
        t: "Disponibilidad continua",
        d: "Atiende consultas fuera del horario laboral, incluidos fines de semana y feriados.",
      },
      {
        t: "Configuración con información propia",
        d: "Responde con los datos, el tono y las reglas que define la empresa. Lo que no sabe, lo deriva en lugar de inventarlo.",
      },
      {
        t: "Mantenimiento y soporte",
        d: "Seguimiento de las conversaciones, ajustes de respuestas y 30 días de garantía posteriores a la puesta en marcha.",
      },
    ],
    cuandoConviene: [
      "Todo el día te preguntan precio, talle, envío y disponibilidad por Instagram y WhatsApp, siempre lo mismo.",
      "Te escriben de noche o el fin de semana y la consulta queda sin contestar hasta el otro día.",
      "Perdés tiempo con gente que solo pregunta y no compra.",
      "Querés atender a más clientes sin contratar a nadie.",
      "El que contesta primero se queda con la venta.",
    ],
    proceso: PROCESO_BASE,
    valores: {
      precio: "Mensualidad desde $3.000 UYU",
      prefijo: "Mensualidad desde",
      cifra: "$3.000 UYU",
      detalle: "Cubre el funcionamiento del agente",
      desde: "$3.000 por mes",
      factores: ["Cuántas consultas distintas tiene que resolver", "Por cuántos canales atiende (WhatsApp, Instagram)", "Si deriva a una persona o toma pedidos"],
      plazo: "10 a 15 días",
      nota: "La mensualidad cubre el funcionamiento del agente: API de WhatsApp Business, mantenimiento y el servicio de IA.",
    },
    niveles: [
      { nombre: "Básico", etiqueta: "Desde", precio: "$3.000", sufijo: "por mes", plazo: "10 días", resumen: "Responde lo que más te preguntan.", incluye: ["Preguntas frecuentes respondidas", "WhatsApp Business", "Tono y reglas de tu empresa", "Mantenimiento incluido"] },
      { nombre: "Medio", etiqueta: "", precio: "A cotizar", plazo: "13 días", resumen: "Atiende y califica contactos.", incluye: ["WhatsApp e Instagram", "Filtra y califica contactos", "Deriva a una persona", "Mantenimiento incluido"] },
      { nombre: "Amplio", etiqueta: "", precio: "A cotizar", plazo: "15 días", resumen: "Atiende, toma pedidos y se conecta.", incluye: ["Toma de pedidos", "Conexión con tus herramientas", "Varios canales", "Mantenimiento incluido"] },
    ],
    faq: [
      {
        q: "¿Qué es un agente de IA para WhatsApp?",
        a: "Es un asistente basado en inteligencia artificial que conversa con los clientes por WhatsApp o Instagram, responde consultas y deriva los casos que requieren atención humana.",
      },
      {
        q: "¿Cuánto cuesta un agente de WhatsApp con IA?",
        a: "Se abona una mensualidad desde $3.000 UYU. Cubre el funcionamiento continuo del agente, incluida la API de WhatsApp Business, el mantenimiento y el servicio de IA.",
      },
      {
        q: "¿Cuánto tiempo demora la implementación?",
        a: "Entre 10 y 15 días, según el alcance acordado.",
      },
      {
        q: "¿Qué tecnología utiliza?",
        a: "WhatsApp Business API junto con modelos de inteligencia artificial como OpenAI, Claude u otros, según el caso.",
      },
      {
        q: "¿Reemplaza al equipo de atención?",
        a: "No. Resuelve las consultas habituales y filtra los contactos, de modo que el equipo se concentre en los casos que requieren atención personalizada.",
      },
      {
        q: "¿Funciona también en Instagram?",
        a: "Sí. El agente puede configurarse para atender mensajes tanto en WhatsApp como en Instagram.",
      },
    ],
    whatsappTexto: "Hola, quiero consultar por un agente de IA para WhatsApp",
  },
];

export function getServicio(slug: ServicioSlug): Servicio {
  return SERVICIOS.find((s) => s.slug === slug)!;
}
