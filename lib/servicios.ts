export type ServicioSlug =
  | "software-a-medida"
  | "paginas-web"
  | "automatizacion"
  | "agentes-whatsapp";

export type Servicio = {
  slug: ServicioSlug;
  nombre: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  incluye: { t: string; d: string }[];
  cuandoConviene: string[];
  proceso: { t: string; d: string }[];
  valores: { precio: string; plazo: string; nota: string };
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
    nombre: "Software a medida",
    eyebrow: "SOFTWARE A MEDIDA",
    metaTitle: "Software a medida en Uruguay | Deploy · Salto",
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
        d: "Se documenta cómo se trabaja hoy para definir qué debe resolver el sistema.",
      },
      {
        t: "Panel de gestión",
        d: "Una vista centralizada con la información que se necesita para tomar decisiones.",
      },
      {
        t: "Usuarios y permisos",
        d: "Cada persona accede solo a lo que le corresponde según su rol.",
      },
      {
        t: "Integraciones",
        d: "Conexión con las herramientas que ya se utilizan, como planillas, facturación o mensajería.",
      },
      {
        t: "Reportes e indicadores",
        d: "Datos organizados para conocer el estado real de la operación.",
      },
      {
        t: "Soporte posterior",
        d: "Ajustes y acompañamiento luego de la entrega, con 30 días de garantía.",
      },
    ],
    cuandoConviene: [
      "La operación depende de planillas, papeles o mensajes sueltos.",
      "Cada área utiliza herramientas distintas que no se comunican entre sí.",
      "La información está dispersa y no existe una visión completa del negocio.",
      "Se repiten tareas manuales que generan errores y consumen tiempo.",
      "El software disponible en el mercado no se ajusta a cómo trabaja la empresa.",
    ],
    proceso: PROCESO_BASE,
    valores: {
      precio: "Desde USD 800–1.200, más USD 40–80 mensuales de mantenimiento",
      plazo: "20 a 30 días",
      nota: "El valor final depende del alcance. Cada proyecto se cotiza de forma individual, sin paquetes cerrados.",
    },
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
    nombre: "Páginas web",
    eyebrow: "PÁGINAS WEB",
    metaTitle: "Diseño de páginas web en Uruguay | Deploy · Salto",
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
        d: "Una identidad visual propia, sin plantillas, alineada con la marca.",
      },
      {
        t: "Estructura y textos orientados a la conversión",
        d: "Contenido organizado para que el visitante comprenda la propuesta y tome contacto.",
      },
      {
        t: "Velocidad y SEO on-page",
        d: "Optimización técnica para una carga rápida y una correcta lectura por parte de los buscadores.",
      },
      {
        t: "Contacto directo",
        d: "Formulario y botón de WhatsApp conectados para recibir consultas sin fricción.",
      },
      {
        t: "Adaptación a celulares",
        d: "El sitio se diseña para funcionar correctamente en cualquier tamaño de pantalla.",
      },
      {
        t: "Puesta en línea y soporte",
        d: "Publicación del sitio y 30 días de garantía posteriores a la entrega.",
      },
    ],
    cuandoConviene: [
      "El negocio solo tiene presencia en redes sociales y necesita un sitio propio.",
      "La página actual es antigua, lenta o no se visualiza bien en el celular.",
      "El sitio fue armado con una plantilla y no refleja la calidad de la empresa.",
      "Se desea aparecer en los resultados de búsqueda de Google.",
      "La web actual no genera consultas ni contactos.",
    ],
    proceso: PROCESO_BASE,
    valores: {
      precio: "Desde $8.000 hasta $25.000 UYU, según complejidad",
      plazo: "7 a 20 días",
      nota: "El valor final depende del alcance. Cada proyecto se cotiza de forma individual, sin paquetes cerrados.",
    },
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
    nombre: "Automatización de procesos",
    eyebrow: "AUTOMATIZACIÓN",
    metaTitle: "Automatización de procesos para empresas en Uruguay | Deploy",
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
        d: "Se identifica qué actividades consumen más tiempo y cuáles conviene automatizar primero.",
      },
      {
        t: "Conexión entre herramientas",
        d: "Planillas, correo, formularios, mensajería y otros sistemas intercambian información de forma automática.",
      },
      {
        t: "Flujos de trabajo",
        d: "Avisos, cargas de datos, seguimientos y generación de documentos sin intervención manual.",
      },
      {
        t: "Pruebas y validación",
        d: "Cada flujo se verifica antes de ponerse en producción.",
      },
      {
        t: "Soporte posterior",
        d: "Ajustes y acompañamiento luego de la entrega, con 30 días de garantía.",
      },
    ],
    cuandoConviene: [
      "Se copian datos de una herramienta a otra de forma manual.",
      "Hay consultas, avisos o seguimientos que dependen de que alguien los recuerde.",
      "Se generan reportes o documentos repetitivos a mano.",
      "Los errores de carga son frecuentes y generan retrabajo.",
      "El equipo dedica tiempo operativo que podría destinarse a la atención de clientes.",
    ],
    proceso: PROCESO_BASE,
    valores: {
      precio: "Desde $10.000 UYU",
      plazo: "10 a 15 días",
      nota: "El valor final depende de la cantidad y complejidad de los flujos. Cada proyecto se cotiza de forma individual.",
    },
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
    nombre: "Agentes de IA para WhatsApp e Instagram",
    eyebrow: "AGENTES DE IA",
    metaTitle: "Agentes de IA para WhatsApp e Instagram en Uruguay | Deploy",
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
        d: "El agente resuelve preguntas habituales sobre productos, servicios, horarios y precios.",
      },
      {
        t: "Filtrado y calificación de contactos",
        d: "Se identifica qué consultas corresponden a clientes con interés real.",
      },
      {
        t: "Derivación a una persona",
        d: "Cuando el caso lo requiere, la conversación se transfiere al equipo.",
      },
      {
        t: "Disponibilidad continua",
        d: "Las consultas se atienden fuera del horario laboral, incluidos los fines de semana.",
      },
      {
        t: "Configuración con información propia",
        d: "El agente responde según los datos, el tono y las reglas definidas por la empresa.",
      },
      {
        t: "Mantenimiento y soporte",
        d: "Funcionamiento continuo, ajustes y 30 días de garantía posteriores a la puesta en marcha.",
      },
    ],
    cuandoConviene: [
      "Se recibe un volumen alto de consultas repetitivas por WhatsApp o Instagram.",
      "Hay mensajes que quedan sin responder fuera del horario de atención.",
      "El equipo pierde tiempo filtrando consultas que no se convierten en ventas.",
      "Se desea atender a más clientes sin aumentar la estructura.",
      "La velocidad de respuesta incide en el cierre de ventas.",
    ],
    proceso: PROCESO_BASE,
    valores: {
      precio: "Mensualidad desde $3.000 UYU",
      plazo: "10 a 15 días",
      nota: "La mensualidad cubre el funcionamiento del agente: API de WhatsApp Business, mantenimiento y el servicio de IA.",
    },
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
