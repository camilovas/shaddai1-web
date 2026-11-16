import { Link } from "react-router-dom";
import { negocio, servicios, path, waUrl, Picture, Icon } from "./shared.jsx";

/** Contenido común de cada página de servicio. Cada propuesta lo estiliza con sus clases .sb-* */
export default function ServiceBody({ s, prop }) {
  const otros = servicios.filter((o) => o.slug !== s.slug);
  return (
    <div className="sb">
      <section className="sb-intro">
        <h2>Sobre este servicio</h2>
        <p>{s.descripcion}</p>
      </section>

      <section className="sb-grid">
        <div className="sb-card">
          <h2>Incluye</h2>
          <ul>
            {s.incluye.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="sb-card">
          <h2>Cuándo traer tu vehículo</h2>
          <ul>
            {s.cuando.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      {s.extra.length > 0 && (
        <section className="sb-gallery" aria-label="Más fotos del servicio">
          {s.extra.map((e) => (
            <Picture key={e.imagen} name={e.imagen} alt={e.alt} sizes="(min-width:800px) 45vw, 100vw" />
          ))}
        </section>
      )}

      <section className="sb-steps">
        <h2>Cómo coordinar tu servicio</h2>
        <ol>
          <li>
            <b>Escríbenos</b> por WhatsApp al {negocio.telefono}.
          </li>
          <li>
            <b>Programa con anticipación</b> tu servicio, revisión o mantenimiento.
          </li>
          <li>
            <b>Trae tu vehículo</b> y lo revisamos.
          </li>
        </ol>
      </section>

      <section className="sb-cta">
        <p>{negocio.aviso}</p>
        <a className="sb-btn" href={waUrl} target="_blank" rel="noopener">
          <Icon name="wa" size={22} /> Programar por WhatsApp
        </a>
      </section>

      <nav className="sb-more" aria-label="Otros servicios">
        <h2>Otros servicios</h2>
        <ul>
          {otros.map((o) => (
            <li key={o.slug}>
              <Link to={path(prop, o.slug)}>
                <Icon name={o.icono} size={22} /> {o.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
