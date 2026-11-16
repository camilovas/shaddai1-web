import { Link, Outlet, useParams } from "react-router-dom";
import { negocio, servicios, propuestas, path, waUrl, waUrlFor, telUrl, BASE, Picture, Icon, WhatsAppFab, Schema, getServicio } from "../components/shared.jsx";
import ServiceBody, { ServiceNotFound } from "../components/ServiceBody.jsx";
import NavMenu from "../components/NavMenu.jsx";
import Footer from "../components/Footer.jsx";
import Crumbs from "../components/Crumbs.jsx";
import ContactBody from "../components/Contact.jsx";
import "./p3.css";

const P = "propuesta-3";
const hero = propuestas[2].hero;
const pad = (n) => String(n).padStart(2, "0");
const short = (n) => n.replace(" Preventivo y Correctivo", "");
const NAV = [
  { to: path(P), label: "Inicio" },
  ...servicios.map((s, i) => ({
    to: path(P, s.slug),
    label: (
      <>
        <i>{pad(i + 1)}</i> {short(s.nombre)}
      </>
    ),
  })),
  { to: path(P, "contacto"), label: "Contacto" },
];

function Gauge() {
  return (
    <svg className="p3-gauge" viewBox="0 0 200 120" aria-hidden="true" focusable="false">
      <path d="M20 110a80 80 0 0 1 160 0" fill="none" stroke="#3a3d47" strokeWidth="14" strokeLinecap="round" />
      <path d="M20 110a80 80 0 0 1 112-73" fill="none" stroke="#d6001c" strokeWidth="14" strokeLinecap="round" />
      <path d="M100 110L146 56" stroke="#ffe600" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="110" r="8" fill="#ffe600" />
    </svg>
  );
}

export function Layout() {
  return (
    <div className="p3" style={{ "--pat": `url(${BASE}brand/pattern-grid.svg)` }}>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <header className="p3-head">
        <div className="p3-wrap p3-head-in">
          <Link to={path(P)} className="p3-brand" aria-label="Shaddai 1, mecánica automotriz multimarcas, inicio">
            <span className="p3-dot" aria-hidden="true" />
            <img src={`${BASE}brand/logo-dark.svg`} alt="" width="168" height="45" />
          </Link>
          <NavMenu items={NAV} />
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <Footer x="p3" n={3} />
      <WhatsAppFab />
      <Schema />
    </div>
  );
}

export function Home() {
  const [a, ...rest] = hero.titular.split(", ");
  const conf = negocio.confianza;
  const c = negocio.comoCoordinar;
  return (
    <>
      <section className="p3-hero">
        <div className="p3-wrap p3-hero-in">
          <div>
            <p className="p3-label">// {negocio.lema.toUpperCase()}</p>
            <h1>
              {rest.length ? <>{a}, <mark>{rest.join(", ")}</mark></> : hero.titular}
            </h1>
            <p className="p3-lead">{hero.subtitulo}</p>
            <ul className="p3-chips" aria-label="Especialidades">
              <li>Multimarcas</li>
              <li>Escaneo de sistemas</li>
              <li>Reprogramación</li>
            </ul>
            <div className="p3-actions">
              <a className="p3-btn p3-btn-y" href={waUrl} target="_blank" rel="noopener">
                <Icon name="wa" size={22} /> {negocio.ctas.principal}
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

      <section className="p3-trust" aria-labelledby="p3-trust-h">
        <div className="p3-wrap">
          <p className="p3-label">// CONFIANZA</p>
          <h2 className="p3-h2" id="p3-trust-h">{conf.titulo}</h2>
          <ul className="p3-spec">
            {conf.puntos.map((p, i) => (
              <li key={p.titulo}>
                <span className="p3-spec-n" aria-hidden="true">{pad(i + 1)}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p3-services" id="servicios" aria-labelledby="p3-serv-h">
        <div className="p3-wrap">
          <p className="p3-label">// SERVICIOS</p>
          <h2 className="p3-h2" id="p3-serv-h">Cuatro servicios, un solo taller</h2>
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

      <section className="p3-process" aria-labelledby="p3-proc-h">
        <div className="p3-wrap">
          <p className="p3-label">// CÓMO FUNCIONA</p>
          <h2 className="p3-h2" id="p3-proc-h">{c.titulo}</h2>
          <ol>
            {c.pasos.map((p) => (
              <li key={p.titulo}><b>{p.titulo}</b><span>{p.texto}</span></li>
            ))}
          </ol>
          <div className="p3-process-cta">
            <a className="p3-btn p3-btn-y" href={waUrl} target="_blank" rel="noopener">
              <Icon name="wa" size={22} /> {negocio.ctas.contacto}
            </a>
            <a className="p3-btn p3-btn-l" href={telUrl}>{negocio.ctas.llamar}</a>
          </div>
          <p className="p3-thanks">{conf.cierre}</p>
        </div>
      </section>
    </>
  );
}

export function Service() {
  const { servicio } = useParams();
  const s = getServicio(servicio);
  if (!s) return <ServiceNotFound prop={P} wrap="p3-wrap p3-pad" />;
  const i = servicios.indexOf(s) + 1;
  return (
    <>
      <section className="p3-hero p3-hero-s">
        <div className="p3-wrap p3-hero-in">
          <div>
            <Crumbs items={[{ to: path(P), label: "Inicio" }]} current={s.nombre} />
            <p className="p3-label">// SERVICIO {pad(i)} / {pad(servicios.length)} · {s.nombre.toUpperCase()}</p>
            <h1>{s.titular}</h1>
            <p className="p3-lead">{s.corto}</p>
            <div className="p3-actions">
              <a className="p3-btn p3-btn-y" href={waUrlFor(s)} target="_blank" rel="noopener">
                <Icon name="wa" size={22} /> {s.cta}
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
      <ContactBody home={path(P)} cls={{ h1: "p3-h2", lead: "p3-lead", wa: "p3-btn p3-btn-y", call: "p3-btn p3-btn-l" }} />
    </div>
  );
}
