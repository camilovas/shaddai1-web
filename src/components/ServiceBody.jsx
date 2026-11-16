import { Link } from "react-router-dom";
import WaWizard from "./fx/WaWizard.jsx";
import { negocio, servicios, path, waUrl, waUrlFor, telUrl, Picture, Icon } from "./shared.jsx";

/** Servicio inexistente: ofrece salidas útiles. */
export function ServiceNotFound({ prop, wrap }) {
  return (
    <div className={`${wrap} sb-nf`}>
      <h1>No encontramos ese servicio</h1>
      <p>Elige uno de estos o escríbenos por WhatsApp.</p>
      <ul className="sb-more">
        {servicios.map((s) => (
          <li key={s.slug}>
            <Link to={path(prop, s.slug)}>{s.nombre}</Link>
          </li>
        ))}
        <li>
          <Link to={path(prop)}>Volver al inicio</Link>
        </li>
        <li>
          <a href={waUrl} target="_blank" rel="noopener">{negocio.ctas.principal}</a>
        </li>
      </ul>
    </div>
  );
}

/** Contenido común de cada página de servicio: problema, beneficios, incluye, cuándo, FAQ, cómo coordinar, CTA. */
export default function ServiceBody({ s, prop }) {
  const otros = servicios.filter((o) => o.slug !== s.slug);
  const c = negocio.comoCoordinar;
  return (
    <div className="sb">
      <section className="sb-intro">
        <h2>¿Por qué revisarlo a tiempo?</h2>
        <p className="sb-problem">{s.problema}</p>
        <p>{s.descripcion}</p>
      </section>

      <section className="sb-benefits">
        <h2>Lo que ganas</h2>
        <ul>
          {s.beneficios.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
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

      {s.faq?.length > 0 && (
        <section className="sb-faq">
          <h2>Preguntas frecuentes</h2>
          {s.faq.map((f) => (
            <details key={f.p} name="faq">
              <summary>{f.p}</summary>
              <p>{f.r}</p>
            </details>
          ))}
        </section>
      )}

      <section className="sb-steps">
        <h2>{c.titulo}</h2>
        <p className="sb-steps-intro">{c.intro}</p>
        <ol>
          {c.pasos.map((p) => (
            <li key={p.titulo}>
              <b>{p.titulo}</b>
              <span>{p.texto}</span>
            </li>
          ))}
        </ol>
      </section>

      <WaWizard compact servicio={s} />

      <section className="sb-cta" aria-label="Programar este servicio">
        <p>
          {c.nota} {negocio.aviso}
        </p>
        <div className="sb-cta-b">
          <a className="sb-btn" href={waUrlFor(s)} target="_blank" rel="noopener">
            <Icon name="wa" size={22} /> {s.cta}
          </a>
          <a className="sb-btn sb-btn-call" href={telUrl}>
            {negocio.ctas.llamar}
          </a>
        </div>
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
