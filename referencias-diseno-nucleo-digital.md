# Referencias de diseño — Núcleo Digital (rediseño)

## Alcance del proyecto
Rediseño completo de la web desde cero.

## Prioridades de negocio (jerarquía de contenido)
1. **Principal**: software a medida y páginas web.
2. **Secundario / menos presente**: automatización de procesos, agentes de WhatsApp e Instagram.
3. **Eliminar**: el robot "Nexo" — no se incluye en la nueva versión.

> Nota: el mockup visual de referencia (ver abajo) tiene el copy y servicios armados con automatización/IA como protagonista. Al bajar a código hay que reordenar para que software/web quede primero.

## Identidad visual
- **Logo nuevo**: forma de "flor" hecha de nodos/moléculas en negro, con una esfera turquesa tipo chip/circuito en el centro. Pendiente: convertir a PNG con fondo transparente.
- **Paleta**: fondo oscuro (navy/negro), acentos celeste/azul eléctrico, turquesa para detalles del logo.
- **Textura de fondo**: efecto de red de nodos conectados (líneas finas + puntos brillantes) sobre fondo oscuro, usado en hero/secciones destacadas.

## Estructura de página (mockup de referencia)
1. Header: logo + nav (Inicio, Servicios, Proceso, Proyectos, Nosotros) + CTA "Hablemos".
2. Hero: título grande, texto de apoyo, 2 CTAs (WhatsApp / Ver soluciones), badges de beneficios, mockup de producto (dashboard) a la derecha.
3. Sección "El problema": contra-argumento + 3 tarjetas (Tareas repetitivas, Información dispersa, Oportunidades perdidas).
4. Sección "Servicios": 3 tarjetas sobre fondo oscuro (a reordenar según prioridades de negocio).
5. Sección "Cómo trabajamos": proceso en 4 pasos numerados.
6. Sección "Proyectos": caso destacado + lista de proyectos secundarios.
7. CTA final: "Contanos qué te gustaría mejorar" + botones de contacto.
8. Footer: logo, nav, redes, copyright.

Estilo general de tarjetas: fondo oscuro con borde sutil tipo glass, iconos circulares con acento celeste, esquinas redondeadas.

## Animaciones / interacción (pendiente de definir)
- Referencia deseada: sitio hecho en Framer ("Ferea Café", link de proyecto privado — no accesible sin login, pendiente compartir capturas o video para poder analizar el estilo de animación/scroll).
- Link de referencia: https://framer.com/projects/Ferea-Cafe-copy--3qmDsIJta935w2ktO2pc-5ZLpm?id=491c817a-c47a-47a3-a70e-f625d2f12104&reason=web-signup&node=augiA20Il

## Referencias Framer adicionales (sitios publicados)
Nota: el análisis automático solo pudo leer el HTML/contenido de estas páginas, no verlas renderizadas ni sus animaciones reales. Sirve como orientación general, no como spec exacta — para las animaciones conviene revisarlas en vivo o pasar un video navegándolas.

- **https://utomic.framer.website/** — agencia tech/SaaS. Layout modular por secciones (hero, stats, servicios en grilla, pricing, testimonios, blog). Paleta oscura, tono "enterprise".
- **https://sanjaya.framer.ai/** — agencia de IA/automatización, muy orientada a conversión: hero con CTA directo a "agendar llamada", casos de éxito con métricas numéricas grandes (22+, 2.4x, 45%), planes/pricing, FAQ. Este es el más cercano en objetivo de negocio (agencia de soluciones con IA).
- **https://fereacafe.framer.website/** — paleta cálida (no aplica), pero rescatable el ritmo de sección: headline grande → copy corto → bloque visual → CTA, repetido de forma consistente.

Estilo de animación esperado a implementar (estándar Framer, a confirmar viendo los sitios en vivo): scroll reveals (fade + slide sutil al entrar en viewport), hover con leve elevación/glow en tarjetas y botones, transiciones suaves entre secciones.

## Estado
Primera versión implementada en `index.html` / `styles.css` / `main.js` (raíz del proyecto, la carpeta deployada según `.htaccess`). `nucleo-digital-v3/` queda como referencia vieja, sin usar.

Qué se hizo:
- Sin ningún rastro de "Nexo" (ni personaje, ni copy, ni imágenes).
- Jerarquía de servicios: software a medida y páginas web como tarjetas grandes; automatización y agentes de WhatsApp/Instagram como una tercera tarjeta más chica y secundaria.
- Tema oscuro navy con un solo acento celeste/cian, tipografía Space Grotesk + Inter + JetBrains Mono.
- Hero con animación de red de nodos en canvas (nativo, sin librerías), scroll-reveal con IntersectionObserver nativo.
- Probado en Chrome headless a resolución desktop y mobile (~400px), sin overflow horizontal.

Pendiente (placeholders marcados con TODO en el HTML):
- Logo nuevo en PNG con fondo transparente (hoy hay un ícono SVG de nodos genérico como reemplazo temporal).
- Favicon.
- Fotos/capturas reales de proyectos (hoy usa imágenes de stock de Picsum como placeholder, incluida la de RioFit).
- Validar el número de WhatsApp y el texto legal del footer.
