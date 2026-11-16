import { Link, Outlet, useParams } from "react-router-dom";
import { negocio, servicios, propuestas, path, waUrl, waUrlFor, telUrl, BASE, Picture, Icon, WhatsAppFab, Schema, getServicio } from "../components/shared.jsx";
import ServiceBody, { ServiceNotFound } from "../components/ServiceBody.jsx";
import NavMenu from "../components/NavMenu.jsx";
import Footer from "../components/Footer.jsx";
import Crumbs from "../components/Crumbs.jsx";
import ContactBody from "../components/Contact.jsx";
import "./p1.css";

const P = "propuesta-1";
const hero = propuestas[0].hero;
const short = (n) => n.replace(" Preventivo y Correctivo", "");
const NAV = [
  { to: path(P), label: "Inicio" },
  ...servicios.map((s) => ({ to: path(P, s.slug), label: short(s.nombre) })),
  { to: path(P, "contacto"), label: "Contacto" },
];

export function Layout() {
  return (
    <div className="p1" style={{ "--pat": `url(${BASE}brand/pattern-stripes-dark.svg)` }}>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <header className="p1-head">
        <div className="p1-wrap p1-head-in">
          <Link to={path(P)} className="p1-brand" aria-label="Shaddai 1, mecánica automotriz multimarcas, inicio">
            <img src={`${BASE}brand/logo-dark.svg`} alt="" width="168" height="45" />
          </Link>
          <NavMenu items={NAV} />
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <Footer x="p1" n={1} />
      <WhatsAppFab />
      <Schema />
    </div>
  );
}

export function Home() {
  const [a, ...rest] = hero.titular.split(". ");
  const conf = negocio.confianza;
  return (
    <>
      <section className="p1-hero">
        <div className="p1-hero-bg">
          <Picture name="taller" alt="Taller mecánico con un vehículo en restauración" priority sizes="100vw" />
        </div>
        <div className="p1-wrap p1-hero-in">
          <p className="p1-banner">
            <span>{negocio.lema}</span>
          </p>
          <h1>
            {rest.length ? <>{a}. <mark>{rest.join(". ")}</mark></> : hero.titular}
          </h1>
          <p className="p1-lead">{hero.subtitulo}</p>
          <div className="p1-actions">
            <a className="p1-btn p1-btn-wa" href={waUrl} target="_blank" rel="noopener">
              <Icon name="wa" size={22} /> {negocio.ctas.principal}
            </a>
            <a className="p1-btn p1-btn-ghost" href="#servicios">
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      <section className="p1-trust" aria-labelledby="p1-trust-h">
        <div className="p1-wrap">
          <h2 className="p1-h2" id="p1-trust-h">{conf.titulo}</h2>
          <ul className="p1-trust-l">
            {conf.puntos.map((p, i) => (
              <li key={p.titulo}>
                <span className="p1-n" aria-hidden="true">{i + 1}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p1-services" id="servicios" aria-labelledby="p1-serv-h">
        <div className="p1-wrap">
          <h2 className="p1-h2" id="p1-serv-h">Nuestros servicios</h2>
          <ul className="p1-cards">
            {servicios.map((s) => (
              <li key={s.slug}>
                <Link to={path(P, s.slug)} className="p1-card">
                  <span className="p1-card-ic">
                    <Icon name={s.icono} size={40} />
                  </span>
                  <h3>{s.nombre}</h3>
                  <p>{s.corto}</p>
                  <span className="p1-more">Ver servicio <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p1-call" aria-labelledby="p1-call-h">
        <div className="p1-wrap">
          <h2 className="p1-script" id="p1-call-h">{conf.cierre}</h2>
          <p className="p1-call-t">{negocio.titular}</p>
          <a className="p1-phone" href={waUrl} target="_blank" rel="noopener" aria-label={`WhatsApp ${negocio.telefono}`}>
            <Icon name="wa" size={40} /> {negocio.telefono}
          </a>
          <p>
            <a className="p1-call-link" href={telUrl}>{negocio.ctas.llamar}</a>
          </p>
        </div>
      </section>
    </>
  );
}

export function Service() {
  const s = getServicio(useParams().servicio);
  if (!s) return <ServiceNotFound prop={P} wrap="p1-wrap p1-pad" />;
  return (
    <>
      <section className="p1-hero p1-hero-s">
        <div className="p1-hero-bg">
          <Picture name={s.imagen} alt={s.alt} priority sizes="100vw" />
        </div>
        <div className="p1-wrap p1-hero-in">
          <p className="p1-banner">
            <span>
              <Icon name={s.icono} size={22} /> {s.nombre}
            </span>
          </p>
          <h1>{s.titular}</h1>
          <p className="p1-lead">{s.corto}</p>
          <div className="p1-actions">
            <a className="p1-btn p1-btn-wa" href={waUrlFor(s)} target="_blank" rel="noopener">
              <Icon name="wa" size={22} /> {s.cta}
            </a>
          </div>
        </div>
      </section>
      <div className="p1-wrap p1-pad">
        <Crumbs items={[{ to: path(P), label: "Inicio" }]} current={s.nombre} />
        <ServiceBody s={s} prop={P} />
      </div>
    </>
  );
}

export function Contact() {
  return (
    <div className="p1-wrap p1-pad p1-contact">
      <ContactBody home={path(P)} cls={{ h1: "p1-h2", lead: "p1-lead", wa: "p1-btn p1-btn-wa", call: "p1-btn p1-btn-ghost" }} />
    </div>
  );
}
