import { useLocation } from "react-router-dom";
import content from "../content.json";
import credits from "../credits.json";

/** Cambiador flotante "Propuesta 1 · 2 · 3" (solo para la demo con el cliente).
 *  Poner en false para quitarlo de las 3 propuestas, o borrar <Fx/> de App.jsx para quitar todos los extras. */
export const SHOW_PROPOSAL_SWITCHER = true;
export const { negocio, servicios, propuestas } = content;
export const waUrl = `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(negocio.mensaje)}`;
/** WhatsApp con mensaje específico del servicio (si no se pasa, el genérico). */
export const waUrlFor = (s) => `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent((s && s.waMensaje) || negocio.mensaje)}`;
export const SITE = negocio.seo.sitio;
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
  const { pathname } = useLocation();
  const m = metaFor(pathname);
  const data = [];
  const org = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE}#taller`,
    name: negocio.nombre,
    description: `${negocio.lema}. ${negocio.subtitulo}`,
    telephone: `+${negocio.whatsapp}`,
    url: SITE,
    makesOffer: servicios.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.nombre } })),
  };
  // Solo se agregan datos reales: si el campo esta vacio, se omite.
  const pe = negocio.pendientes || {};
  if (pe.direccion || pe.ciudad) org.address = { "@type": "PostalAddress", ...(pe.direccion && { streetAddress: pe.direccion }), ...(pe.ciudad && { addressLocality: pe.ciudad }) };
  if (pe.ciudad) org.areaServed = pe.ciudad;
  if (pe.horario) org.openingHours = pe.horario;
  const sameAs = [pe.googleBusinessUrl, pe.instagram, pe.facebook].filter(Boolean);
  if (sameAs.length) org.sameAs = sameAs;
  data.push(org);
  if (m.servicio) {
    const s = m.servicio;
    data.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.nombre,
      description: s.descripcion,
      serviceType: s.nombre,
      provider: { "@id": `${SITE}#taller` },
    });
    if (s.faq?.length)
      data.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.p, acceptedAnswer: { "@type": "Answer", text: f.r } })),
      });
  }
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

/** Titulo, descripcion, URL absoluta e imagen OG por ruta (SSR y cliente).
 *  Las propuestas son borradores: noindex = true. Para publicar la elegida, ver docs/marketing.md. */
export function metaFor(pathname) {
  const parts = pathname.replace(/^\/|\/$/g, "").split("/");
  const prop = propuestas.find((p) => p.slug === parts[0]);
  const noindex = true; // QUITAR (false) solo en la propuesta elegida
  if (!prop) return { title: "Shaddai 1 — Propuestas de sitio web", description: "Tres propuestas de diseño para Shaddai 1, mecánica automotriz multimarcas.", noindex, url: SITE, image: `${SITE}brand/og-propuesta-1.png` };
  const sub = parts[1];
  const url = `${SITE}${prop.slug}/${sub ? sub + "/" : ""}`;
  const image = `${SITE}brand/og-${prop.slug}.png`;
  if (!sub) return { title: `Taller mecánico multimarcas · Escaneo y reprogramación | Shaddai 1`, description: `Shaddai 1, mecánica automotriz multimarcas: mecánica general, escaneo de sistemas, reprogramación y mantenimiento. Programa con anticipación por WhatsApp ${negocio.telefono}.`, noindex, url, image };
  if (sub === "contacto") return { title: `Contacto y WhatsApp | Shaddai 1 taller multimarcas`, description: `Escríbenos por WhatsApp al ${negocio.telefono} para programar tu servicio, revisión o mantenimiento. Cuéntanos la marca de tu vehículo.`, noindex, url, image };
  const s = getServicio(sub);
  return s
    ? { title: `${s.titular || s.nombre} | Shaddai 1`, description: `${s.problema} ${s.nombre} en Shaddai 1, taller multimarcas. Programa por WhatsApp ${negocio.telefono}.`, noindex, url, image, servicio: s }
    : { title: "Página no encontrada | Shaddai 1", description: "", noindex: true, url, image };
}
