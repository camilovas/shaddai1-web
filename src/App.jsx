import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { propuestas, metaFor, path } from "./components/shared.jsx";
import * as P1 from "./proposals/P1.jsx";
import * as P2 from "./proposals/P2.jsx";
import * as P3 from "./proposals/P3.jsx";
import "./base.css";

const THEMES = { 1: P1, 2: P2, 3: P3 };

function Chooser() {
  return (
    <main className="chooser" id="main">
      <h1>
        Shaddai 1 <small>Propuestas de sitio web</small>
      </h1>
      <p>Tres diseños con los colores de la postal. Cada uno tiene inicio, los 4 servicios y contacto.</p>
      <ul>
        {propuestas.map((p) => (
          <li key={p.id} className={`chooser-card c${p.id}`}>
            <span className="chooser-tag">{p.tag}</span>
            <h2>
              Propuesta {p.id}: {p.nombre}
            </h2>
            <p>{p.descripcion}</p>
            <Link to={path(p.slug)}>Ver propuesta {p.id} →</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

function NotFound() {
  return (
    <main className="chooser" id="main">
      <h1>Página no encontrada</h1>
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </main>
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
    </>
  );
}
