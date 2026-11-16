# Shaddai 1 — Propuestas de sitio web

Cliente: **Shaddai 1 — Mecánica Automotriz Multimarcas**. Sitio estático con varias propuestas de diseño.

## Datos del negocio (tomados de la postal)
- WhatsApp: **300 145 80 18**
- Servicios (cada uno = una página estática propia):
  1. Mecánica General
  2. Escaneo de Sistemas
  3. Reprogramación
  4. Mantenimiento Preventivo y Correctivo
- Mensaje de la postal: programar con anticipación servicios, revisiones y mantenimientos. Agradecer la confianza y preferencia.
- No inventar dirección, precios, horarios ni reseñas. El horario "hasta las 2:00 p.m." de la postal fue un aviso puntual, no el horario habitual.

## Paleta (de la postal)
Rojo intenso (~#D6001C), negro/grafito (~#0D0D0F), blanco, amarillo de énfasis (~#FFE600), plata para detalles. Verificar los valores exactos contra la imagen al construir.

## Estructura
- Repo propio en GitHub (cuenta `camilovas`, por SSH). Nombre propuesto: `shaddai1-web`.
- 3 propuestas de diseño, cada una con su propio layout y la misma lista de páginas: `/propuesta-1/`, `/propuesta-2/`, `/propuesta-3/`.
- Páginas por propuesta: inicio, un HTML estático por servicio y contacto.
- **Alcance actual: solo front-end** (sin backend, formularios ni base de datos).
- **Stack:** React 18 + Vite + react-router. `npm run build` prerenderiza (SSR) un `index.html` estático por ruta en `dist/`.
- **Python local** para el tooling: `tools/fetch_photos.py` (descarga y optimiza fotos) y `tools/gen_content.py` (fuente única del contenido → `src/content.json`). Editar el contenido en Python, no en el JSON.
- **Docker:** `docker compose up --build` sirve `dist/` con nginx en http://localhost:8080.
- **Marca y SEO:** `tools/make_assets.py` genera logos, favicon, imágenes OG y patrones en `public/brand/`; `tools/check_contrast.py` valida contraste WCAG. Guías en `docs/design.md` y `docs/marketing.md` (incluye lo que falta pedir al cliente y cómo quitar `noindex`).
- **Extras de experiencia** (`src/components/fx/*`, `src/hooks/*`, `src/fx.css`): asistente de mensaje de WhatsApp, revelado al scroll, copiar número, cambiador de propuesta (`SHOW_PROPOSAL_SWITCHER` en `shared.jsx`, ponerlo en `false` al elegir diseño), progreso de lectura, view transitions, prefetch y manifest PWA. Todo es mejora progresiva y no debe causar warnings de hidratación.
- **Publicación: GitHub Pages** (workflow `.github/workflows/deploy.yml`, rama `main`). Se compila con `BASE=/shaddai1-web/`; en Docker/local `BASE` es `/`. Todo enlace y asset debe respetar la base (`BASE` en `shared.jsx`, `Link` de react-router); nunca rutas absolutas `/img/...`.
- **Todo local:** sin CDN, sin fuentes web, sin hotlinking. Solo fuentes del sistema.
- Cada propuesta vive en `src/proposals/PN.jsx` + `pN.css`; el cuerpo de las páginas de servicio es compartido (`src/components/ServiceBody.jsx`, clases `.sb-*`).
- Supuesto a confirmar: WhatsApp con prefijo +57 (Colombia) en `tools/gen_content.py`.

## Mejores prácticas de front-end
**Rendimiento (Core Web Vitals):** LCP < 2,5 s, INP < 200 ms, CLS < 0,1. Poco JS, `font-display: swap`, fuentes con subconjunto, scripts de terceros diferidos.

**Imágenes:** `<picture>` con WebP y JPEG de respaldo (AVIF si se agrega un encoder). `srcset` y `sizes` con 3 a 5 anchos. `width` y `height` siempre. La imagen principal usa `fetchpriority="high"` y nunca `loading="lazy"`; el resto sí lleva `lazy`. Calidad 60–80.

**CSS:** variables en `:root` para colores, espacios y tipografía. Tipografía fluida con `clamp()` incluyendo `rem`. Container queries para componentes y pocas media queries.

**Accesibilidad (WCAG 2.2):** HTML semántico, jerarquía de encabezados correcta, `alt` útil, contraste suficiente (cuidado con rojo y amarillo sobre negro), foco visible, botones táctiles grandes.

**Conversión (taller local):** diseño mobile-first. Botón de WhatsApp fijo y repetido en cada página, más llamada directa. Una página por servicio con una sola acción principal. SEO local: `<title>` y meta description por página, schema `AutoRepair`, señales de confianza arriba.

## Fotos
- Solo imágenes con licencia libre (p. ej. Wikimedia Commons, Unsplash, Pexels). Guardar la atribución en `CREDITOS.md`.
- Guardarlas localmente optimizadas; no hotlinkear.

## Reglas de trabajo
- Responder en español.
- Crear el repo en GitHub y hacer push solo con confirmación del usuario.
- Probar cada página en ancho de celular (sin scroll horizontal) antes de dar algo por terminado.
