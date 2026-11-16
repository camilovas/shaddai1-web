import content from "../content.json";
import credits from "../credits.json";

export const { negocio, servicios, propuestas } = content;
export const waUrl = `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(negocio.mensaje)}`;
export const telUrl = `tel:+${negocio.whatsapp}`;
export const path = (prop, sub = "") => `/${prop}/${sub ? sub + "/" : ""}`;
export const getServicio = (slug) => servicios.find((s) => s.slug === slug);

const W = [480, 800, 1280];
export const BASE = import.meta.env.BASE_URL; // "/" o "/shaddai1-web/"

/** Foto local con WebP responsivo + JPG de respaldo. Todas son 3:2. */
export function Picture({ name, alt, sizes = "100vw", priority = false, className }) {
  const set = W.map((w) => `${BASE}img/${name}-${w}.webp ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/webp" srcSet={set} sizes={sizes} />
      <img
        className={className}
        src={`${BASE}img/${name}-800.jpg`}
        alt={alt}
        width="1280"
        height="853"
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}

const ICONS = {
  car: (
    <>
      <path d="M3 14l2-6a2 2 0 0 1 2-1.4h10a2 2 0 0 1 2 1.4l2 6v4h-3v-2H6v2H3z" />
      <circle cx="7.5" cy="14" r="1" />
      <circle cx="16.5" cy="14" r="1" />
    </>
  ),
  scan: (
    <>
      <path d="M4 9h3l1-2h6l1 2h3v8H4z" />
      <path d="M2 12v3M22 12v3M10 12h4" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2.2-.5-.5-2.2z" />,
  wa: (
    <>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-1.8-1.2-2.2-2.2l.8-1-1-2z" />
    </>
  ),
};

export function Icon({ name, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  );
}

export function WhatsAppFab() {
  return (
    <a className="fab" href={waUrl} target="_blank" rel="noopener">
      <Icon name="wa" size={26} />
      <span>
        WhatsApp <b>{negocio.telefono}</b>
      </span>
    </a>
  );
}

export function Schema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: negocio.nombre,
    description: negocio.lema,
    telephone: `+${negocio.whatsapp}`,
    makesOffer: servicios.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.nombre } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Credits({ className }) {
  const keys = [...new Set(["taller", "banco", ...servicios.flatMap((s) => [s.imagen, ...s.extra.map((e) => e.imagen)])])];
  return (
    <p className={className}>
      Fotos:{" "}
      {keys.map(
        (k, i) =>
          credits[k] && (
            <span key={k}>
              {i ? " · " : ""}
              <a href={credits[k].fuente} target="_blank" rel="noopener">
                {credits[k].autor || "Wikimedia Commons"}
              </a>{" "}
              ({credits[k].licencia})
            </span>
          )
      )}
    </p>
  );
}

/** Título y descripción por ruta (SSR y navegación en el cliente). */
export function metaFor(pathname) {
  const parts = pathname.replace(/^\/|\/$/g, "").split("/");
  const prop = propuestas.find((p) => p.slug === parts[0]);
  if (!prop) return { title: "Shaddai 1 — Propuestas de sitio web", description: "Tres propuestas de diseño para Shaddai 1, mecánica automotriz multimarcas.", noindex: true };
  const sub = parts[1];
  if (!sub) return { title: `Shaddai 1 · ${negocio.lema} | Propuesta ${prop.id}`, description: negocio.aviso, noindex: true };
  if (sub === "contacto") return { title: `Contacto y WhatsApp | Shaddai 1 · Propuesta ${prop.id}`, description: `Escríbenos por WhatsApp al ${negocio.telefono} para programar tu servicio.`, noindex: true };
  const s = getServicio(sub);
  return s
    ? { title: `${s.nombre} | Shaddai 1 · Propuesta ${prop.id}`, description: `${s.corto} Shaddai 1, mecánica automotriz multimarcas. WhatsApp ${negocio.telefono}.`, noindex: true }
    : { title: "Página no encontrada | Shaddai 1", description: "", noindex: true };
}
