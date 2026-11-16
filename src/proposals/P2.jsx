import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { negocio, servicios, path, waUrl, telUrl, Picture, Icon, WhatsAppFab, Schema, Credits, getServicio } from "../components/shared.jsx";
import ServiceBody from "../components/ServiceBody.jsx";
import "./p2.css";

const P = "propuesta-2";
const CONFIANZA = ["Todas las marcas", "Diagnóstico con escáner", "Programación de módulos", "Programa con anticipación"];

export function Layout() {
  return (
    <div className="p2">
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <header className="p2-head">
        <div className="p2-wrap p2-head-in">
          <Link to={path(P)} className="p2-brand" aria-label="Shaddai 1, inicio">
            <span className="p2-mark" aria-hidden="true">S1</span>
            <span>
              <b>Shaddai 1</b>
              <small>{negocio.lema}</small>
            </span>
          </Link>
          <nav aria-label="Principal" className="p2-nav">
            <NavLink to={path(P)} end>Inicio</NavLink>
            {servicios.map((s) => (
              <NavLink key={s.slug} to={path(P, s.slug)}>
                {s.nombre.replace(" Preventivo y Correctivo", "")}
              </NavLink>
            ))}
            <NavLink to={path(P, "contacto")}>Contacto</NavLink>
          </nav>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="p2-foot">
        <div className="p2-wrap">
          <p>
            <b>Shaddai 1</b> · {negocio.lema} · WhatsApp{" "}
            <a href={waUrl} target="_blank" rel="noopener">{negocio.telefono}</a>
          </p>
          <p>{negocio.gracias}</p>
          <Credits className="p2-credits" />
          <p className="p2-credits">Propuesta 2 de 3 · <Link to="/">Ver otras propuestas</Link></p>
        </div>
      </footer>
      <WhatsAppFab />
      <Schema />
    </div>
  );
}

export function Home() {
  return (
    <>
      <section className="p2-hero">
        <div className="p2-wrap p2-hero-in">
          <div className="p2-hero-text">
            <p className="p2-eyebrow">Mecánica automotriz multimarcas</p>
            <h1>
              Tu vehículo en <span>buenas manos</span>
            </h1>
            <p className="p2-lead">{negocio.aviso}</p>
            <div className="p2-actions">
              <a className="p2-btn p2-btn-red" href={waUrl} target="_blank" rel="noopener">
                <Icon name="wa" size={22} /> Programar por WhatsApp
              </a>
              <a className="p2-btn p2-btn-line" href="#servicios">Ver servicios</a>
            </div>
          </div>
          <div className="p2-hero-img">
            <Picture name="banco" alt="Banco de trabajo de un mecánico con herramientas" priority sizes="(min-width:900px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="p2-trust" aria-label="Por qué elegirnos">
        <ul className="p2-wrap">
          {CONFIANZA.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="p2-services" id="servicios">
        <div className="p2-wrap">
          <h2 className="p2-h2">Servicios</h2>
          <ul className="p2-grid">
            {servicios.map((s) => (
              <li key={s.slug}>
                <Link to={path(P, s.slug)} className="p2-card">
                  <Picture name={s.imagen} alt={s.alt} sizes="(min-width:900px) 25vw, (min-width:600px) 50vw, 100vw" />
                  <div className="p2-card-b">
                    <h3>
                      <Icon name={s.icono} size={22} /> {s.nombre}
                    </h3>
                    <p>{s.corto}</p>
                    <span>Ver detalle →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p2-band">
        <div className="p2-wrap">
          <h2>Programa con anticipación</h2>
          <p>Para tus servicios, revisiones y mantenimientos. {negocio.gracias}</p>
          <a className="p2-btn p2-btn-white" href={waUrl} target="_blank" rel="noopener">
            <Icon name="wa" size={22} /> {negocio.telefono}
          </a>
        </div>
      </section>
    </>
  );
}

export function Service() {
  const s = getServicio(useParams().servicio);
  if (!s) return <div className="p2-wrap p2-pad"><h1>Servicio no encontrado</h1><Link to={path(P)}>Volver al inicio</Link></div>;
  return (
    <>
      <section className="p2-hero p2-hero-s">
        <div className="p2-wrap p2-hero-in">
          <div className="p2-hero-text">
            <p className="p2-crumb">
              <Link to={path(P)}>Inicio</Link> / Servicios
            </p>
            <h1>{s.nombre}</h1>
            <p className="p2-lead">{s.corto}</p>
            <div className="p2-actions">
              <a className="p2-btn p2-btn-red" href={waUrl} target="_blank" rel="noopener">
                <Icon name="wa" size={22} /> Consultar por WhatsApp
              </a>
            </div>
          </div>
          <div className="p2-hero-img">
            <Picture name={s.imagen} alt={s.alt} priority sizes="(min-width:900px) 50vw, 100vw" />
          </div>
        </div>
      </section>
      <div className="p2-wrap p2-pad">
        <ServiceBody s={s} prop={P} />
      </div>
    </>
  );
}

export function Contact() {
  return (
    <div className="p2-wrap p2-pad">
      <h1 className="p2-h2">Contacto</h1>
      <p className="p2-lead">{negocio.aviso}</p>
      <div className="p2-actions">
        <a className="p2-btn p2-btn-red" href={waUrl} target="_blank" rel="noopener">
          <Icon name="wa" size={22} /> WhatsApp {negocio.telefono}
        </a>
        <a className="p2-btn p2-btn-line" href={telUrl}>Llamar</a>
      </div>
    </div>
  );
}
