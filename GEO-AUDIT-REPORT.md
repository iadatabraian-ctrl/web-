# Auditoría GEO: Deploy (deployuy.com)

**Fecha:** 2026-11-24 · **Tipo de negocio:** Agencia/Servicios (software a medida, web, automatización, agentes IA) · **Páginas analizadas:** 7 (todo el sitemap)
**Herramienta:** geo-seo-claude (skills + scripts) + chequeos manuales con curl/BeautifulSoup.

## Resumen

**GEO Score: 45/100 (Poor)**

La base técnica es sólida (SSR, HTTPS, sin bloqueo a bots de IA, schema consistente). El problema está afuera del código: la marca casi no existe fuera del propio sitio, no hay `llms.txt` y el contenido tiene pocas pruebas verificables (cifras, clientes, fechas).

| Categoría | Score | Peso | Ponderado | Base del score |
|---|---|---|---|---|
| AI Citability | 45 | 25% | 11.3 | Medido en home (26.7/100 por el script, 3 bloques) + FAQ con cifras concretas; ajustado a criterio |
| Brand Authority | 15 | 20% | 3.0 | Estimado: solo Instagram en `sameAs`. El script de marca no consulta la web, solo genera recomendaciones |
| Content E-E-A-T | 50 | 20% | 10.0 | Medido: autor nombrado, 2 casos reales; sin testimonios, fechas ni blog |
| Technical GEO | 78 | 15% | 11.7 | Medido |
| Schema | 72 | 10% | 7.2 | Medido |
| Platform Optimization | 20 | 10% | 2.0 | Estimado: sin YouTube/Reddit/LinkedIn/Google Business detectables |
| **Total** | | | **45.2** | |

Los scores de Brand y Platform son estimaciones sin consultar plataformas externas. Verificalo a mano buscando "Deploy Salto Uruguay" en Google Maps, LinkedIn y YouTube.

## Crítico

Ninguno. Ningún bot de IA está bloqueado y el contenido se renderiza en servidor.

## Alto

1. **No existe `/llms.txt`** (404). Es lo más rápido de arreglar.
2. **Brand Authority casi nula.** `sameAs` solo tiene Instagram. Para entidad local, faltan Google Business Profile, LinkedIn, GitHub y un perfil de Braian González como autor/fundador.
3. **Sin prueba social verificable.** No hay testimonios, logos de clientes, métricas de resultados ni reseñas. Los dos casos (EMY, Río Fit) describen qué se hizo, pero no qué resultado dio.

## Medio

4. **Citabilidad baja en la home** (26.7/100): bloques de 21-47 palabras, sin cifras ni datos propios. Las páginas de servicio (800-950 palabras, con FAQ) están mejor.
5. **Falta schema `Person`** (Braian González) y `Organization` con `founder`. Hoy el "quién está detrás" no es una entidad para la IA.
6. **`ProfessionalService` incompleto:** sin `contactPoint`, `geo`, `openingHours`, `priceRange`; la dirección solo tiene ciudad.
7. **Sin fechas de publicación/actualización** en páginas ni en el sitemap (`lastmod`). Las IAs priorizan contenido fresco.
8. **Casos de estudio finos:** 215 y 235 palabras, 2 H2 cada uno. Son el contenido más citable de una agencia y es el más corto.
9. **Headers de seguridad ausentes:** solo HSTS. Faltan `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.

## Bajo

10. **Imágenes con `alt=""`:** 4 en home y 5 en cada página de servicio. Si son decorativas, es correcto; las que muestran producto o proyectos necesitan alt descriptivo.
11. **`robots.txt` sin directivas explícitas para bots de IA** (`User-agent: *` + `Allow: /` ya los permite; es solo claridad).
12. **`www.deployuy.com` devolvió 502** desde el proxy del entorno. [Suponiendo] es una limitación del entorno y no del sitio; verificalo desde tu navegador y confirmá que redirige al dominio sin www.
13. **Títulos inconsistentes:** unos terminan en `| Deploy`, otros en `| Deploy · Salto`.

## Lo que está bien

- Prerender estático de Next.js en Vercel (`x-nextjs-prerender`, caché HIT), HTTPS + HSTS.
- Googlebot, GPTBot, ClaudeBot y PerplexityBot reciben 200 en la home.
- Sitemap con las 7 URLs; canonical en todas; Open Graph y Twitter Card en todas; `lang="es"`.
- JSON-LD válido en todas las páginas: `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`.
- FAQ con precios, plazos y garantía explícitos. Es contenido muy citable en consultas tipo "cuánto cuesta una página web en Uruguay".
- Un H1 por página, estructura H2 ordenada.

## Quick wins (esta semana)

1. Crear `public/llms.txt` con descripción, servicios, precios orientativos, ubicación, contacto y las 7 URLs.
2. Crear y completar el perfil de **Google Business Profile** (Salto, servicios, teléfono) y una página de **LinkedIn**; sumarlos a `sameAs`.
3. Agregar schema `Person` (Braian González) con `sameAs` y `founder` en `Organization`.
4. Agregar headers de seguridad en `next.config.ts` (`headers()`).
5. Agregar `lastModified` real en `app/sitemap.ts` y fecha visible en cada caso.

## Plan a 30 días

| Semana | Foco | Entregables |
|---|---|---|
| 1 (hasta 01/12) | Técnica | `llms.txt`, headers de seguridad, `lastmod`, títulos unificados |
| 2 (hasta 08/12) | Entidad | Google Business Profile, LinkedIn, schema `Person`/`founder`, `contactPoint` |
| 3 (hasta 15/12) | Prueba | Ampliar casos EMY y Río Fit a 500+ palabras con cifras reales (tiempos, ventas, usuarios); pedir 2 testimonios |
| 4 (hasta 22/12) | Presencia | 1 video de demo en YouTube por caso; respuestas útiles (sin spam) en comunidades uruguayas de emprendedores |

## Apéndice: páginas

| URL | Palabras | Schema | Alt vacío |
|---|---|---|---|
| / | 441 | ProfessionalService, FAQPage | 4/10 |
| /software-a-medida | 939 | +Service, FAQ, Breadcrumb | 5/7 |
| /paginas-web | 956 | +Service, FAQ, Breadcrumb | 5/7 |
| /automatizacion | 810 | +Service, FAQ, Breadcrumb | 5/6 |
| /agentes-whatsapp | 818 | +Service, FAQ, Breadcrumb | 5/6 |
| /casos/emy | 215 | Breadcrumb | 2/4 |
| /casos/riofit | 235 | Breadcrumb | 2/4 |
