import { useId, useState } from "react";
import { negocio, servicios, Icon } from "../shared.jsx";

const SINTOMAS = [
  ["luz", "Se encendió una luz en el tablero"],
  ["revision", "Quiero una revisión general"],
  ["ruido", "Ruido, vibración o algo raro al manejar"],
  ["arranque", "Falla al encender o al arrancar"],
  ["programado", "Mantenimiento programado"],
  ["modulo", "Consulta de reprogramación o módulos"],
  ["otro", "Otro (lo describo)"],
];
const CUANDO = [
  ["semana", "Esta semana"],
  ["proxima", "La próxima semana"],
  ["sinprisa", "Sin prisa, quiero coordinar con anticipación"],
];
const label = (list, v) => (list.find((x) => x[0] === v) || [])[1];

export function buildMessage({ s, marca, modelo, sintoma, otro, cuando }) {
  const veh = [marca, modelo].filter(Boolean).join(" ") || "___ (marca y modelo)";
  const L = [`Hola Shaddai 1, quisiera programar ${s ? `el servicio de ${s.nombre}` : "un servicio"} para mi vehículo.`, `Vehículo: ${veh}`];
  if (sintoma === "otro") L.push(`Necesito: ${otro || "___"}`);
  else if (sintoma) L.push(`Motivo: ${label(SINTOMAS, sintoma)}`);
  if (cuando) L.push(`Fecha preferida: ${label(CUANDO, cuando)}`);
  L.push("Gracias.");
  return L.join("\n");
}

/** Asistente "Arma tu mensaje de WhatsApp". 100% cliente.
 *  Sin JS: los campos se ocultan (html:not(.js)) y queda el mensaje editable en un <form method="get"> hacia wa.me.
 *  compact + servicio = versión para páginas de servicio (servicio preseleccionado y sin selector). */
export default function WaWizard({ servicio, compact = false }) {
  const uid = useId();
  const [v, setV] = useState({ servicio: servicio ? servicio.slug : "", marca: "", modelo: "", sintoma: "", otro: "", cuando: "" });
  const [edited, setEdited] = useState(null);
  const [err, setErr] = useState({});
  const s = servicios.find((x) => x.slug === v.servicio);
  const auto = buildMessage({ s, ...v });
  const msg = edited ?? auto;
  const id = (k) => `${uid}-${k}`;
  const set = (k) => (e) => {
    const val = e.target.value;
    setV((o) => ({ ...o, [k]: val }));
    if (err[k]) setErr((o) => ({ ...o, [k]: undefined }));
  };

  function validate() {
    const e = {};
    if (!compact && !v.servicio) e.servicio = "Elige el servicio que necesitas.";
    if (!v.marca.trim()) e.marca = "Escribe la marca de tu vehículo.";
    if (!v.modelo.trim()) e.modelo = "Escribe el modelo o el año.";
    if (v.sintoma === "otro" && !v.otro.trim()) e.otro = "Cuéntanos brevemente qué necesitas.";
    if (!msg.trim()) e.msg = "El mensaje no puede estar vacío.";
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErr(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    const a = document.createElement("a");
    a.href = `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(msg.trim())}`;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  const nErr = Object.values(err).filter(Boolean).length;
  const field = (k, lab, control, hint) => (
    <div className={`wz-f${err[k] ? " has-err" : ""}`}>
      <label htmlFor={id(k)}>{lab}</label>
      {control}
      {hint && <p className="wz-hint" id={id(k + "-h")}>{hint}</p>}
      {err[k] && <p className="wz-err" id={id(k + "-e")}>{err[k]}</p>}
    </div>
  );
  const aria = (k, hint) => ({
    id: id(k),
    "aria-invalid": err[k] ? "true" : undefined,
    "aria-describedby": [hint && id(k + "-h"), err[k] && id(k + "-e")].filter(Boolean).join(" ") || undefined,
  });

  return (
    <section className={`wz${compact ? " wz-compact" : ""}`} aria-labelledby={id("t")}>
      <h2 id={id("t")}>Arma tu mensaje de WhatsApp</h2>
      <p className="wz-intro">
        Responde unos datos y se abre WhatsApp con el mensaje listo para enviar. No guardamos nada: todo ocurre en tu dispositivo.
      </p>
      <form className="wz-form" action={`https://wa.me/${negocio.whatsapp}`} method="get" target="_blank" rel="noopener" noValidate onSubmit={onSubmit}>
        <div className="wz-fields">
          {!compact &&
            field(
              "servicio",
              "Servicio",
              <select {...aria("servicio")} aria-required="true" value={v.servicio} onChange={set("servicio")}>
                <option value="">Elige un servicio</option>
                {servicios.map((x) => (
                  <option key={x.slug} value={x.slug}>
                    {x.nombre}
                  </option>
                ))}
              </select>
            )}
          {field("marca", "Marca del vehículo", <input type="text" {...aria("marca")} aria-required="true" autoComplete="off" maxLength={40} placeholder="Ej.: Chevrolet" value={v.marca} onChange={set("marca")} />)}
          {field("modelo", "Modelo o año", <input type="text" {...aria("modelo")} aria-required="true" autoComplete="off" maxLength={40} placeholder="Ej.: Spark 2018" value={v.modelo} onChange={set("modelo")} />)}
          {field(
            "sintoma",
            "¿Qué necesitas? (opcional)",
            <select {...aria("sintoma")} value={v.sintoma} onChange={set("sintoma")}>
              <option value="">Selecciona una opción</option>
              {SINTOMAS.map(([k, t]) => (
                <option key={k} value={k}>
                  {t}
                </option>
              ))}
            </select>
          )}
          {v.sintoma === "otro" &&
            field("otro", "Cuéntanos qué necesitas", <input type="text" {...aria("otro")} aria-required="true" autoComplete="off" maxLength={120} value={v.otro} onChange={set("otro")} />)}
          {field(
            "cuando",
            "¿Cuándo te sirve? (opcional)",
            <select {...aria("cuando")} value={v.cuando} onChange={set("cuando")}>
              <option value="">Sin preferencia</option>
              {CUANDO.map(([k, t]) => (
                <option key={k} value={k}>
                  {t}
                </option>
              ))}
            </select>
          )}
        </div>
        <p className="fx-sr" role="status" aria-live="polite">
          {nErr ? `Hay ${nErr} ${nErr === 1 ? "campo por revisar" : "campos por revisar"}.` : ""}
        </p>
        <div className={`wz-f wz-prev${err.msg ? " has-err" : ""}`}>
          <label htmlFor={id("msg")}>Vista previa del mensaje (puedes editarlo)</label>
          <textarea
            name="text"
            rows={compact ? 6 : 7}
            id={id("msg")}
            aria-invalid={err.msg ? "true" : undefined}
            aria-describedby={err.msg ? id("msg-e") : undefined}
            value={msg}
            onChange={(e) => setEdited(e.target.value)}
          />
          {err.msg && <p className="wz-err" id={id("msg-e")}>{err.msg}</p>}
          {edited !== null && (
            <button type="button" className="wz-reset" onClick={() => setEdited(null)}>
              Volver al mensaje automático
            </button>
          )}
        </div>
        <button type="submit" className="wz-submit">
          <Icon name="wa" size={22} /> Abrir WhatsApp con este mensaje
        </button>
      </form>
    </section>
  );
}
