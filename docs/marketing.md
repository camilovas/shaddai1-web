# Marketing y conversión — Shaddai 1

## Estrategia resumida
- **Objetivo único del sitio:** que la persona escriba por WhatsApp (300 145 80 18) para programar un servicio.
- **Propuesta de valor (solo hechos de la postal):** taller multimarcas; escaneo de sistemas; reprogramación; mantenimiento preventivo y correctivo; atención programada con anticipación.
- **Tono:** cercano, claro, sin tecnicismos ni promesas. Nada de precios, horarios, años de experiencia, certificaciones, reseñas, cifras ni garantías hasta que el cliente las confirme.
- **Embudo:** búsqueda local o recomendación -> página de servicio (problema + beneficios + FAQ) -> WhatsApp con mensaje prellenado del servicio.
- **Contenido:** todo sale de `tools/gen_content.py` (`python tools/gen_content.py`). Campos nuevos: `negocio.titular/subtitulo/ctas/comoCoordinar/confianza/contactoTexto/pendientes/seo`, `servicio.titular/problema/beneficios/waMensaje/cta/faq`, `propuesta.hero`. Helper `waUrlFor(servicio)` en `shared.jsx`.

## Recomendaciones por propuesta
- **P1 Postal (rojo/negro/amarillo):** la más reconocible para quien ya conoce la postal. Usar el amarillo solo en el CTA principal de WhatsApp; hero con `propuesta.hero.titular`; mostrar la fila de `confianza` justo bajo el hero.
- **P2 Taller Limpio (claro):** la más confiable para clientes nuevos y la más fácil de leer en celular. Priorizar FAQ y "cómo coordinar" (reduce dudas antes de escribir); tarjetas de servicio con `problema` como gancho.
- **P3 Diagnóstico (grafito/técnica):** la que mejor comunica escaneo y reprogramación. Conviene si el negocio quiere posicionarse en diagnóstico electrónico; cuidar el contraste y no sobrecargar el estilo "tablero".
- **En las tres:** botón WhatsApp visible sin hacer scroll en móvil; en cada servicio, CTA con `waMensaje` propio (`servicio.cta`); un solo CTA primario por pantalla; llamada directa como secundario; ocultar cualquier dato de `pendientes` que esté vacío.

## SEO local
- Cada página tiene title/description únicos, canonical, Open Graph y Twitter card; JSON-LD `AutoRepair` + `Service` por servicio + `FAQPage` en servicios.
- `areaServed`, `address`, `openingHours` y `sameAs` se agregan solos al JSON-LD cuando se llenan en `negocio["pendientes"]` (gen_content.py). Hoy no hay dato, así que se omiten.
- Imagen OG: `public/brand/og-propuesta-N.png` (URL absoluta bajo `https://camilovas.github.io/shaddai1-web/`).
- **Quitar noindex al elegir una propuesta:**
  1. En `src/components/shared.jsx`, `metaFor`: cambiar `const noindex = true` a `false` (idealmente solo para el slug elegido; las otras dos siguen en noindex o se eliminan).
  2. Reconstruir y publicar. `entry-server.jsx` solo emite `<meta robots>` cuando `noindex` es true.
  3. Si el sitio final vive en un dominio propio, actualizar `seo.sitio` en `gen_content.py` y generar sitemap.xml/robots.txt (pendiente; hoy no existen).
  4. Enviar el sitio a Google Search Console.

## Pendiente de pedir al cliente
- [ ] Dirección exacta y ciudad/barrio (activa `address`/`areaServed`).
- [ ] Horario habitual de atención (el "hasta las 2:00 p.m." de la postal fue un aviso puntual).
- [ ] Confirmar que 300 145 80 18 es WhatsApp con prefijo +57.
- [ ] Ficha de Google Business Profile (crearla/verificarla y pasar el enlace): es lo que más pesa en "taller cerca de mí".
- [ ] Fotos propias del taller, equipo y trabajos (reemplazan las de banco de imágenes).
- [ ] Reseñas reales de clientes con permiso para publicarlas (Google o WhatsApp).
- [ ] Marcas que atienden o no, y si hay servicios adicionales (para FAQ más precisas).
- [ ] Redes sociales, correo, logo en vectorial.
- [ ] Aprobación de cualquier dato que quieran destacar (años, garantías, certificaciones): solo con prueba.

## KPIs a medir
Sin GA ni trackers por ahora. Opciones sin cookies: pedir al cliente que anote "¿cómo nos conoció?" al primer mensaje.
- Mensajes nuevos de WhatsApp por semana (indicador principal; el cliente lo ve en la app).
- Mensajes que mencionan un servicio específico (los `waMensaje` ya llevan el servicio en el texto).
- Citas/servicios efectivamente programados vs. mensajes recibidos (tasa de cierre).
- Llamadas y solicitudes de ruta desde Google Business Profile.
- Posición y clics en Google Search Console (consultas "taller multimarcas", "escaneo automotriz", etc.).
- Si luego se agrega analítica respetuosa de privacidad: clics al botón de WhatsApp por página/propuesta, rebote en móvil, y Core Web Vitals (LCP < 2,5 s).
- Prueba A/B simple entre propuestas: usar un número/UTM distinto no es posible sin tracker; alternativa, publicar una propuesta por período y comparar mensajes.
