import { Link, Outlet, useParams } from "react-router-dom";
import { negocio, servicios, propuestas, path, waUrl, waUrlFor, telUrl, BASE, Picture, Icon, WhatsAppFab, Schema, getServicio } from "../components/shared.jsx";
import ServiceBody, { ServiceNotFound } from "../components/ServiceBody.jsx";
import NavMenu from "../components/NavMenu.jsx";
import Footer from "../components/Footer.jsx";
import Crumbs from "../components/Crumbs.jsx";
import ContactBody from "../components/Contact.jsx";
import "./p2.css";

const P = "propuesta-2";
const hero = propuestas[1].hero;
const short = (n) => n.replace(" Preventivo y Correctivo", "");
const NAV = [
  { to: path(P), label: "Inicio" },
  ...servicios.map((s) => ({ to: path(P, s.slug), label: short(s.nombre) })),
  { to: path(P, "contacto"), label: "Contacto" },
];
/** Resalta una frase del titular sin depender de que exista. */
function Emph({ text, phrase }) {
  const i = text.indexOf(phrase);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span>{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  );
}

export function Layout() {
  return (
    <div className="p2" style={{ "--pat": `url(${BASE}brand/pattern-stripes-red.svg)`, "--grain": `url(${BASE}brand/pattern-grain.svg)` }}>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <header className="p2-head">
        <div className="p2-wrap p2-head-in">
          <Link to={path(P)} className="p2-brand" aria-label="Shaddai 1, mecánica automotriz multimarcas, inicio">
            <img src={`${BASE}brand/logo-dark.svg`} alt="" width="168" height="45" />
          </Link>
          <NavMenu items={NAV} />
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <Footer x="p2" n={2} />
      <WhatsAppFab />
      <Schema />
    </div>
  );
}

export function Home() {
  const conf = negocio.confianza;
  const c = negocio.comoCoordinar;
  return (
    <>
      <section className="p2-hero">
        <div className="p2-wrap p2-hero-in">
          <div className="p2-hero-text">
            <p className="p2-eyebrow">{negocio.lema}</p>
            <h1>
              <Emph text={hero.titular} phrase="claro y confiable" />
            </h1>
            <p className="p2-lead">{hero.subtitulo}</p>
            <div className="p2-actions">
              <a className="p2-btn p2-btn-red" href={waUrl} target="_blank" rel="noopener">
                <Icon name="wa" size={22} /> {negocio.ctas.principal}
              </a>
              <a className="p2-btn p2-btn-line" href="#servicios">Ver servicios</a>
            </div>
          </div>
          <div className="p2-hero-img">
            <Picture name="banco" alt="Banco de trabajo de un mecánico con herramientas" priority sizes="(min-width:900px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="p2-trust" aria-labelledby="p2-trust-h">
        <div className="p2-wrap">
          <h2 className="p2-h2" id="p2-trust-h">{conf.titulo}</h2>
          <ul className="p2-trust-l">
            {conf.puntos.map((p) => (
              <li key={p.titulo}>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p2-services" id="servicios" aria-labelledby="p2-serv-h">
        <div className="p2-wrap">
          <h2 className="p2-h2" id="p2-serv-h">Servicios</h2>
          <ul className="p2-grid">
            {servicios.map((s) => (
              <li key={s.slug}>
                <Link to={path(P, s.slug)} className="p2-card">
                  <Picture name={s.imagen} alt={s.alt} sizes="(min-width:900px) 25vw, (min-width:600px) 50vw, 100vw" />
                  <div className="p2-card-b">
                    <h3>
                      <Icon name={s.icono} size={22} /> {s.nombre}
                    </h3>
                    <p>{s.problema}</p>
                    <span>Ver detalle <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p2-how" aria-labelledby="p2-how-h">
        <div className="p2-wrap">
          <h2 className="p2-h2" id="p2-how-h">{c.titulo}</h2>
          <p className="p2-how-i">{c.intro}</p>
          <ol className="p2-steps">
            {c.pasos.map((p) => (
              <li key={p.titulo}>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="p2-band" aria-labelledby="p2-band-h">
        <div className="p2-wrap">
          <h2 id="p2-band-h">{negocio.titular}</h2>
          <p>{c.nota} {conf.cierre}</p>
          <div className="p2-actions p2-actions-c">
            <a className="p2-btn p2-btn-white" href={waUrl} target="_blank" rel="noopener">
              <Icon name="wa" size={22} /> {negocio.telefono}
            </a>
            <a className="p2-btn p2-btn-ghost-w" href={telUrl}>{negocio.ctas.llamar}</a>
          </div>
        </div>
      </section>
    </>
  );
}

export function Service() {
  const s = getServicio(useParams().servicio);
  if (!s) return <ServiceNotFound prop={P} wrap="p2-wrap p2-pad" />;
  return (
    <>
      <section className="p2-hero p2-hero-s">
        <div className="p2-wrap p2-hero-in">
          <div className="p2-hero-text">
            <Crumbs items={[{ to: path(P), label: "Inicio" }]} current={s.nombre} />
            <p className="p2-eyebrow">
              <Icon name={s.icono} size={18} /> {s.nombre}
            </p>
            <h1>{s.titular}</h1>
            <p className="p2-lead">{s.corto}</p>
            <div className="p2-actions">
              <a className="p2-btn p2-btn-red" href={waUrlFor(s)} target="_blank" rel="noopener">
                <Icon name="wa" size={22} /> {s.cta}
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
      <ContactBody home={path(P)} cls={{ h1: "p2-h2", lead: "p2-lead", wa: "p2-btn p2-btn-red", call: "p2-btn p2-btn-line" }} />
    </div>
  );
}
