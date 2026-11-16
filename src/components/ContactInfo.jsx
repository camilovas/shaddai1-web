import { negocio } from "./shared.jsx";

const isUrl = (v) => /^https?:\/\//i.test(v);
const ext = (v, label) => (isUrl(v) ? <a href={v} target="_blank" rel="noopener">{label}</a> : v);

/** Datos reales del taller (negocio.pendientes). Solo devuelve los que no están vacíos. */
export function infoItems() {
  const p = negocio.pendientes || {};
  const out = [];
  const dir = [p.direccion, p.ciudad].filter(Boolean).join(", ");
  if (dir) out.push({ k: "Dirección", v: dir });
  if (p.horario) out.push({ k: "Horario", v: p.horario });
  if (p.email) out.push({ k: "Correo", v: <a href={`mailto:${p.email}`}>{p.email}</a> });
  if (p.googleBusinessUrl) out.push({ k: "Google", v: ext(p.googleBusinessUrl, "Ver en Google Maps") });
  if (p.instagram) out.push({ k: "Instagram", v: ext(p.instagram, "Instagram") });
  if (p.facebook) out.push({ k: "Facebook", v: ext(p.facebook, "Facebook") });
  return out;
}
