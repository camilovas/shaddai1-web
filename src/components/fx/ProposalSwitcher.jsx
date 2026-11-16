import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { propuestas, path, SHOW_PROPOSAL_SWITCHER } from "../shared.jsx";

/** Pastilla flotante (abajo-izquierda, colapsable con <details>, funciona sin JS) que lleva a la MISMA página
 *  en otra propuesta. Solo para la demo con el cliente: ver SHOW_PROPOSAL_SWITCHER en shared.jsx. */
export default function ProposalSwitcher() {
  const { pathname } = useLocation();
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  const parts = pathname.replace(/^\/|\/$/g, "").split("/");
  const cur = propuestas.find((p) => p.slug === parts[0]);
  if (!SHOW_PROPOSAL_SWITCHER || !cur) return null;
  const rest = parts.slice(1).join("/");
  const onKey = (e) => {
    if (e.key === "Escape" && ref.current?.open) {
      ref.current.open = false;
      ref.current.querySelector("summary").focus();
    }
  };
  return (
    <details className="psw" ref={ref} onKeyDown={onKey}>
      <summary>
        <span>Diseño</span> <b>{cur.id}</b> <span>de {propuestas.length}</span>
      </summary>
      <nav aria-label="Cambiar de propuesta (misma página)">
        <ul>
          {propuestas.map((p) => (
            <li key={p.id}>
              <Link to={path(p.slug, rest)} aria-current={p.id === cur.id ? "page" : undefined}>
                <b>{p.id}</b> {p.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
