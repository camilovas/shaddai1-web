import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { propuestas, servicios, negocio, metaFor, path, waUrl, BASE } from "./components/shared.jsx";
import Fx from "./components/fx/Fx.jsx";
import "./base.css";
import "./fx.css";
import * as P1 from "./proposals/P1.jsx";
import * as P2 from "./proposals/P2.jsx";
import * as P3 from "./proposals/P3.jsx";

const THEMES = { 1: P1, 2: P2, 3: P3 };
const ALT = {
  1: "Vista previa de la propuesta 1, Postal: fondo negro con franjas rojas y titulares amarillos",
  2: "Vista previa de la propuesta 2, Taller Limpio: fondo blanco, cabecera negra y acentos rojos",
  3: "Vista previa de la propuesta 3, Diagnóstico: grafito con detalles amarillos estilo tablero",
};

function Logo() {
  return <img className="chooser-logo" src={`${BASE}brand/logo-dark.svg`} alt="Shaddai 1, mecánica automotriz multimarcas" width="224" height="60" />;
}

function Chooser() {
  return (
    <>
      <a className="skip" href="#main">Saltar al contenido</a>
      <div className="chooser-bg" style={{ "--pat": `url(${BASE}brand/pattern-stripes-dark.svg)` }}>
      <main className="chooser" id="main">
        <header className="chooser-head">
          <Logo />
          <h1>
            Elige tu diseño <small>Tres propuestas de sitio web para Shaddai 1</small>
          </h1>
          <p>Los tres usan los colores de la postal y tienen inicio, los 4 servicios y contacto. Abre cada uno, recórrelo en el celular y dinos cuál te gusta más.</p>
        </header>
        <ul>
          {propuestas.map((p) => (
            <li key={p.id} className={`chooser-card c${p.id}`}>
              <Link to={path(p.slug)} className="chooser-shot">
                <picture>
                  <img src={`${BASE}brand/og-propuesta-${p.id}.png`} alt={ALT[p.id]} width="1200" height="630" loading={p.id === 1 ? "eager" : "lazy"} decoding="async" />
                </picture>
              </Link>
              <div className="chooser-body">
                <span className="chooser-tag">{p.tag}</span>
                <h2>
                  Propuesta {p.id}: {p.nombre}
                </h2>
                <p>{p.descripcion}</p>
                <Link className="chooser-go" to={path(p.slug)}>
                  Ver propuesta {p.id} <span aria-hidden="true">→</span>
                </Link>
                <p className="chooser-sub">
                  También: <Link to={path(p.slug, servicios[1].slug)}>un servicio</Link> · <Link to={path(p.slug, "contacto")}>contacto</Link>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>
      </div>
    </>
  );
}

function NotFound() {
  return (
    <>
      <a className="skip" href="#main">Saltar al contenido</a>
      <div className="chooser-bg" style={{ "--pat": `url(${BASE}brand/pattern-stripes-dark.svg)` }}>
      <main className="chooser nf" id="main">
        <header className="chooser-head">
          <Logo />
          <h1>
            Esta página no existe <small>Error 404</small>
          </h1>
          <p>Puede que el enlace esté mal escrito o que la página se haya movido. Entra por alguna de estas opciones.</p>
        </header>
        <ul className="nf-links">
          {propuestas.map((p) => (
            <li key={p.id}>
              <Link to={path(p.slug)}>
                Ir a la propuesta {p.id}: {p.nombre}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/">Ver las tres propuestas</Link>
          </li>
          <li>
            <a className="nf-wa" href={waUrl} target="_blank" rel="noopener">
              {negocio.ctas.principal}
            </a>
          </li>
        </ul>
      </main>
      </div>
    </>
  );
}

function Meta() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = metaFor(pathname).title;
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <Meta />
      <Routes>
        <Route path="/" element={<Chooser />} />
        {propuestas.map((p) => {
          const T = THEMES[p.id];
          return (
            <Route key={p.id} path={`/${p.slug}`} element={<T.Layout />}>
              <Route index element={<T.Home />} />
              <Route path="contacto" element={<T.Contact />} />
              <Route path=":servicio" element={<T.Service />} />
            </Route>
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Fx />
    </>
  );
}
