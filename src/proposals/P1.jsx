import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { negocio, servicios, path, waUrl, telUrl, Picture, Icon, WhatsAppFab, Schema, Credits, getServicio } from "../components/shared.jsx";
import ServiceBody from "../components/ServiceBody.jsx";
import "./p1.css";

const P = "propuesta-1";

function Brand() {
  return (
    <Link to={path(P)} className="p1-brand" aria-label="Shaddai 1, inicio">
      <span className="p1-logo">
        SHADDAI<em>1</em>
      </span>
      <span className="p1-tag">{negocio.lema}</span>
    </Link>
  );
}

export function Layout() {
  return (
    <div className="p1">
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <header className="p1-head">
        <div className="p1-wrap p1-head-in">
          <Brand />
          <nav aria-label="Principal" className="p1-nav">
            <NavLink to={path(P)} end>
              Inicio
            </NavLink>
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
      <footer className="p1-foot">
        <div className="p1-wrap">
          <p className="p1-script">{negocio.gracias}</p>
          <p>
            Shaddai 1 · {negocio.lema} · WhatsApp{" "}
            <a href={waUrl} target="_blank" rel="noopener">
              {negocio.telefono}
            </a>
          </p>
          <Credits className="p1-credits" />
          <p className="p1-credits">Propuesta 1 de 3 · <Link to="/">Ver otras propuestas</Link></p>
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
      <section className="p1-hero">
        <div className="p1-hero-bg">
          <Picture name="taller" alt="Taller mecánico con un vehículo en restauración" priority sizes="100vw" />
        </div>
        <div className="p1-wrap p1-hero-in">
          <p className="p1-banner">
            <span>Mecánica automotriz multimarcas</span>
          </p>
          <h1>
            Programa con anticipación tus <mark>servicios, revisiones y mantenimientos</mark>
          </h1>
          <p className="p1-lead">{negocio.aviso}</p>
          <div className="p1-actions">
            <a className="p1-btn p1-btn-wa" href={waUrl} target="_blank" rel="noopener">
              <Icon name="wa" size={22} /> Escríbenos por WhatsApp
            </a>
            <a className="p1-btn p1-btn-ghost" href="#servicios">
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      <section className="p1-services" id="servicios">
        <div className="p1-wrap">
          <h2 className="p1-h2">Nuestros servicios</h2>
          <ul className="p1-cards">
            {servicios.map((s) => (
              <li key={s.slug}>
                <Link to={path(P, s.slug)} className="p1-card">
                  <span className="p1-card-ic">
                    <Icon name={s.icono} size={40} />
                  </span>
                  <h3>{s.nombre}</h3>
                  <p>{s.corto}</p>
                  <span className="p1-more">Ver servicio →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p1-call">
        <div className="p1-wrap">
          <p className="p1-script">{negocio.gracias}</p>
          <a className="p1-phone" href={waUrl} target="_blank" rel="noopener">
            <Icon name="wa" size={40} /> {negocio.telefono}
          </a>
        </div>
      </section>
    </>
  );
}

export function Service() {
  const s = getServicio(useParams().servicio);
  if (!s) return <div className="p1-wrap p1-pad"><h1>Servicio no encontrado</h1><Link to={path(P)}>Volver al inicio</Link></div>;
  return (
    <>
      <section className="p1-hero p1-hero-s">
        <div className="p1-hero-bg">
          <Picture name={s.imagen} alt={s.alt} priority sizes="100vw" />
        </div>
        <div className="p1-wrap p1-hero-in">
          <p className="p1-banner">
            <span>
              <Icon name={s.icono} size={22} /> Servicio
            </span>
          </p>
          <h1>{s.nombre}</h1>
          <p className="p1-lead">{s.corto}</p>
        </div>
      </section>
      <div className="p1-wrap p1-pad">
        <ServiceBody s={s} prop={P} />
      </div>
    </>
  );
}

export function Contact() {
  return (
    <div className="p1-wrap p1-pad">
      <h1 className="p1-h2">Contacto</h1>
      <p className="p1-lead">{negocio.aviso}</p>
      <a className="p1-phone" href={waUrl} target="_blank" rel="noopener">
        <Icon name="wa" size={40} /> {negocio.telefono}
      </a>
      <p className="p1-actions">
        <a className="p1-btn p1-btn-ghost" href={telUrl}>
          Llamar
        </a>
      </p>
    </div>
  );
}
