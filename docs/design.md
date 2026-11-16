# Guía de marca — Shaddai 1

Regenerar assets: `python tools/make_assets.py` · Verificar contraste: `python tools/check_contrast.py`.
Los assets son formas propias (no se publica el logo ni la imagen de la postal).

## Paleta (muestreada de la postal del cliente)
La postal usa degradados: el rojo va de ~#B80000 a ~#F80000, el amarillo ronda #F8E800, el negro es ~#000–#080808 y la plata ~#C8C8C8 (#A8–#D0). Se fijan estos valores web:

| Rol | Hex | Nota |
|---|---|---|
| Rojo marca | `#d6001c` | punto medio del degradado; blanco encima = 5,42:1 |
| Rojo oscuro | `#a80016` | rojo como texto sobre claro (7,85:1 sobre blanco) |
| Rojo claro | `#ff2a44` | solo texto grande/acento sobre negro (5,24:1) |
| Amarillo | `#ffe600` | énfasis; nunca como fondo de texto blanco |
| Negro | `#0d0d0f` / `#101114` (P3) | |
| Plata | `#c8c8c8` | detalles (engranaje) |
| WhatsApp | `#25d366` + texto `#062b12` | 7,77:1 |

## Uso por propuesta
- **P1 Postal:** fondo negro, rojo en franjas/cabecera/CTA, amarillo en títulos y acentos, tipografía pesada cursiva (Arial Black / Segoe UI Black). Patrón `pattern-stripes-dark.svg`.
- **P2 Taller Limpio:** fondo blanco/gris `#f4f4f6`, cabecera negra, rojo solo en botones y acentos; rojo como texto de enlace = `#a80016`. Amarillo solo como subrayado.
- **P3 Diagnóstico:** grafito, amarillo como color principal, monoespaciada (Cascadia/Consolas); rojo solo como punto de estado, nunca como texto. Patrón `pattern-grid.svg`.

## Tipografía (solo sistema, sin web fonts)
Titulares de marca: `"Arial Black","Segoe UI Black","Helvetica Neue",Impact,system-ui,sans-serif` (peso 900, cursiva en P1). Texto: `system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif`. Técnica (P3): `ui-monospace,"Cascadia Code",Consolas,Menlo,monospace`. Los PNG usan Arial Black / Segoe UI Bold / Consolas del sistema con fallback.

## Reglas de logo
- `logo-dark.svg` sobre fondos oscuros; `logo-light.svg` sobre claros. Ancho mínimo 160 px; espacio libre = altura del «1» alrededor.
- El «1» siempre en rojo (`#ff2a44` en oscuro, `#d6001c` en claro). No estirar, no recolorear, no añadir sombras.
- El texto SVG usa `textLength` (ancho fijo): se ve igual aunque falte Arial Black.
- Isotipo `S1` (`isotipo.svg`, `favicon.svg`): cuadrado redondeado negro, banda roja, engranaje plata, «S» blanca y «1» amarilla. Debajo de 48 px el engranaje se omite en PNG.

## Contraste (WCAG 2.2, `tools/check_contrast.py`: 58 pares)
Todo cumple AA salvo lo siguiente:

| Par | Ratio | Estado |
|---|---|---|
| `.p1-banner span` blanco sobre extremo `#ff2a44` (texto 14–18 px, no es «grande») | 3,71 | **FALLA** (4,5) |
| `.p1-call` texto blanco sobre extremo `--red-2` del degradado | 3,71 | **FALLA** |
| `.p3` borde `--line` `#2b2d35` sobre `#101114` | 1,38 | solo decorativo; aceptable |
| rojo `#d6001c` como texto sobre `#101114` | 3,48 | no se usa como texto; no hacerlo |

Casos justos (pasan): `.p2-hero h1 span` rojo sobre subrayado amarillo 4,46 (texto grande, 3:1), `.p3-btn-l` borde 3,67, `.p3-dot` 3,48.

## Cambios CSS sugeridos (para el agente de UX; no se editaron)
1. `src/proposals/p1.css` `.p1-banner`: `background:linear-gradient(90deg,#8f0012,var(--red) 40%,var(--red-2))` → `linear-gradient(90deg,#8f0012,var(--red))` (blanco 5,42:1 en todo el recorrido).
2. `.p1-call`: `background:linear-gradient(135deg,#8f0012,var(--red) 55%,var(--red-2))` → `linear-gradient(135deg,#8f0012,var(--red))`.
3. `.p1 .sb-cta` ya cumple; no cambiar. Mantener `.p1-btn-wa` con texto `#062b12`.
4. `.p3-btn-l`: opcional `border:1px solid #6b6d78` → `#8a8c98` (≈5:1) para más holgura.
5. `.p3 .sb-card`, `.p3-row` (bordes `--line`): opcional `--line:#2b2d35` → `#3a3d47` si se quiere visible; son decorativos.
6. `.p2-hero h1 span`: dejar; si el texto baja de 24 px, cambiar `color:var(--red)` → `var(--red-d)`.
7. `src/base.css` `:focus-visible` (amarillo) es 15:1 sobre oscuro pero sobre blanco (c2) no se ve: ya cubierto en P2 con `.p2 :focus-visible{outline-color:var(--red)}`; en `.chooser .c2` agregar `.c2 a:focus-visible{outline-color:#d6001c}`.

## Assets en `public/brand/`
`logo-dark.svg`, `logo-light.svg`, `isotipo.svg`, `isotipo-512.png`, `favicon-32.png`, `apple-touch-icon.png` (180), `og-propuesta-{1,2,3}.png` (1200×630, 120–265 KB, cuantizados a 160 colores), `pattern-stripes-red.svg`, `pattern-stripes-dark.svg`, `pattern-grid.svg`, `pattern-grain.svg`. Además `public/favicon.svg`.

## Referencia desde React / HTML (respetar `BASE`)
```jsx
<img src={`${BASE}brand/logo-dark.svg`} alt="Shaddai 1" width="280" height="75" />
```
CSS: las rutas en CSS se resuelven relativas al archivo CSS compilado; usar variable inline o `style={{backgroundImage:`url(${BASE}brand/pattern-stripes-dark.svg)`}}`.
`<head>` (index.html; lo aplica quien lo edite): `<link rel="icon" href="%BASE_URL%favicon.svg" type="image/svg+xml">`, `<link rel="icon" href="%BASE_URL%brand/favicon-32.png" sizes="32x32" type="image/png">`, `<link rel="apple-touch-icon" href="%BASE_URL%brand/apple-touch-icon.png">`. Las metaetiquetas `og:image` requieren URL absoluta: `https://camilovas.github.io/shaddai1-web/brand/og-propuesta-N.png` (confirmar dominio final).
