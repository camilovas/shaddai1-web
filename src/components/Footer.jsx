import { Link } from "react-router-dom";
import { negocio, servicios, path, waUrl, telUrl, BASE, Credits } from "./shared.jsx";
import CopyNumber from "./fx/CopyNumber.jsx";
import { infoItems } from "./ContactInfo.jsx";

/** Pie completo compartido. x = prefijo de la propuesta (p1/p2/p3), n = número. */
export default function Footer({ x, n }) {
  const P = `propuesta-${n}`;
  const info = infoItems();
  return (
    <footer className={`ft ${x}-foot`}>
      <div className={`${x}-wrap ft-grid`}>
        <div className="ft-brand">
          <img src={`${BASE}brand/logo-dark.svg`} alt="Shaddai 1, mecánica automotriz multimarcas" width="168" height="45" loading="lazy" />
          <p>{negocio.gracias}</p>
          <p>{negocio.aviso}</p>
        </div>
        <nav aria-labelledby={`${x}-ft-s`}>
          <h2 className="ft-h" id={`${x}-ft-s`}>Servicios</h2>
          <ul>
            {servicios.map((s) => (
              <li key={s.slug}>
                <Link to={path(P, s.slug)}>{s.nombre}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="ft-h">Contacto</h2>
          <ul>
            <li>
              <a href={waUrl} target="_blank" rel="noopener">WhatsApp {negocio.telefono}</a>
            </li>
            <li>
              <a href={telUrl}>{negocio.ctas.llamar}</a>
            </li>
            <li className="ft-cp">
              <CopyNumber />
            </li>
            <li>
              <Link to={path(P, "contacto")}>Página de contacto</Link>
            </li>
            {info.map((it) => (
              <li key={it.k} className="ft-info">
                <span>{it.k}:</span> {it.v}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${x}-wrap ft-base`}>
        <Credits className="ft-credits" />
        <p className="ft-credits">
          Propuesta {n} de 3 · <Link to="/">Ver otras propuestas</Link>
        </p>
      </div>
    </footer>
  );
}
