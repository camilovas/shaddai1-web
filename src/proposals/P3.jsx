import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { negocio, servicios, path, waUrl, telUrl, Picture, Icon, WhatsAppFab, Schema, Credits, getServicio } from "../components/shared.jsx";
import ServiceBody from "../components/ServiceBody.jsx";
import "./p3.css";

const P = "propuesta-3";
const pad = (n) => String(n).padStart(2, "0");

function Gauge() {
  return (
    <svg className="p3-gauge" viewBox="0 0 200 120" aria-hidden="true" focusable="false">
      <path d="M20 110a80 80 0 0 1 160 0" fill="none" stroke="#2f3037" strokeWidth="14" strokeLinecap="round" />
      <path d="M20 110a80 80 0 0 1 112-73" fill="none" stroke="#d6001c" strokeWidth="14" strokeLinecap="round" />
      <path d="M100 110L146 56" stroke="#ffe600" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="110" r="8" fill="#ffe600" />
    </svg>
  );
}

export function Layout() {
  return (
    <div className="p3">
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <header className="p3-head">
        <div className="p3-wrap p3-head-in">
          <Link to={path(P)} className="p3-brand" aria-label="Shaddai 1, inicio">
            <span className="p3-dot" aria-hidden="true" />
            <b>SHADDAI 1</b>
            <small>{negocio.lema}</small>
          </Link>
          <nav aria-label="Principal" className="p3-nav">
            <NavLink to={path(P)} end>Inicio</NavLink>
            {servicios.map((s, i) => (
              <NavLink key={s.slug} to={path(P, s.slug)}>
                <i>{pad(i + 1)}</i> {s.nombre.replace(" Preventivo y Correctivo", "")}
              </NavLink>
            ))}
            <NavLink to={path(P, "contacto")}>Contacto</NavLink>
          </nav>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="p3-foot">
        <div className="p3-wrap">
          <p>
            SHADDAI 1 · {negocio.lema} · WhatsApp{" "}
            <a href={waUrl} target="_blank" rel="noopener">{negocio.telefono}</a>
          </p>
          <p>{negocio.gracias}</p>
          <Credits className="p3-credits" />
          <p className="p3-credits">Propuesta 3 de 3 · <Link to="/">Ver otras propuestas</Link></p>
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
      <section className="p3-hero">
        <div className="p3-wrap p3-hero-in">
          <div>
            <p className="p3-label">// MECÁNICA AUTOMOTRIZ MULTIMARCAS</p>
            <h1>
              Diagnóstico claro. <mark>Servicio a tiempo.</mark>
            </h1>
            <p className="p3-lead">{negocio.aviso}</p>
            <ul className="p3-chips" aria-label="Especialidades">
              <li>Multimarcas</li>
              <li>Escaneo de sistemas</li>
              <li>Reprogramación</li>
            </ul>
            <div className="p3-actions">
              <a className="p3-btn p3-btn-y" href={waUrl} target="_blank" rel="noopener">
                <Icon name="wa" size={22} /> Programar por WhatsApp
              </a>
              <a className="p3-btn p3-btn-l" href="#servicios">Ver servicios</a>
            </div>
          </div>
          <div className="p3-shot">
            <Picture name="escaneo" alt="Mano conectando un escáner OBD2 al carro, con un portátil al lado" priority sizes="(min-width:900px) 45vw, 100vw" />
            <Gauge />
          </div>
        </div>
      </section>

      <section className="p3-services" id="servicios">
        <div className="p3-wrap">
          <p className="p3-label">// SERVICIOS</p>
          <h2 className="p3-h2">Cuatro servicios, un solo taller</h2>
          <ul className="p3-rows">
            {servicios.map((s, i) => (
              <li key={s.slug}>
                <Link to={path(P, s.slug)} className="p3-row">
                  <span className="p3-num">{pad(i + 1)}</span>
                  <span className="p3-row-t">
                    <h3>{s.nombre}</h3>
                    <p>{s.corto}</p>
                  </span>
                  <span className="p3-row-ic"><Icon name={s.icono} size={34} /></span>
                  <span className="p3-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p3-process">
        <div className="p3-wrap">
          <p className="p3-label">// CÓMO FUNCIONA</p>
          <ol>
            <li><b>Escríbenos</b><span>WhatsApp {negocio.telefono}</span></li>
            <li><b>Programa</b><span>Con anticipación, para atenderte oportunamente</span></li>
            <li><b>Revisamos</b><span>Tu vehículo, sea cual sea la marca</span></li>
          </ol>
          <p className="p3-thanks">{negocio.gracias}</p>
        </div>
      </section>
    </>
  );
}

export function Service() {
  const { servicio } = useParams();
  const s = getServicio(servicio);
  if (!s) return <div className="p3-wrap p3-pad"><h1>Servicio no encontrado</h1><Link to={path(P)}>Volver al inicio</Link></div>;
  const i = servicios.indexOf(s) + 1;
  return (
    <>
      <section className="p3-hero p3-hero-s">
        <div className="p3-wrap p3-hero-in">
          <div>
            <p className="p3-label">// SERVICIO {pad(i)} / {pad(servicios.length)}</p>
            <h1>{s.nombre}</h1>
            <p className="p3-lead">{s.corto}</p>
            <div className="p3-actions">
              <a className="p3-btn p3-btn-y" href={waUrl} target="_blank" rel="noopener">
                <Icon name="wa" size={22} /> Consultar por WhatsApp
              </a>
            </div>
          </div>
          <div className="p3-shot">
            <Picture name={s.imagen} alt={s.alt} priority sizes="(min-width:900px) 45vw, 100vw" />
          </div>
        </div>
      </section>
      <div className="p3-wrap p3-pad">
        <ServiceBody s={s} prop={P} />
      </div>
    </>
  );
}

export function Contact() {
  return (
    <div className="p3-wrap p3-pad">
      <p className="p3-label">// CONTACTO</p>
      <h1 className="p3-h2">Programa tu servicio</h1>
      <p className="p3-lead">{negocio.aviso}</p>
      <div className="p3-actions">
        <a className="p3-btn p3-btn-y" href={waUrl} target="_blank" rel="noopener">
          <Icon name="wa" size={22} /> WhatsApp {negocio.telefono}
        </a>
        <a className="p3-btn p3-btn-l" href={telUrl}>Llamar</a>
      </div>
    </div>
  );
}
