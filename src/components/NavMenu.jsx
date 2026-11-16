import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

/** Navegación principal. Móvil: menú desplegable con <details> (los enlaces funcionan sin JS).
 *  Escritorio: lista horizontal. NavLink aporta aria-current="page". */
export default function NavMenu({ items }) {
  const ref = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  const links = items.map((it, i) => (
    <li key={it.to}>
      <NavLink to={it.to} end={i === 0}>
        {it.label}
      </NavLink>
    </li>
  ));
  return (
    <nav aria-label="Principal" className="mn">
      <details className="mn-m" ref={ref}>
        <summary>
          <span className="mn-ic" aria-hidden="true" />
          Menú
        </summary>
        <ul>{links}</ul>
      </details>
      <ul className="mn-d">{links}</ul>
    </nav>
  );
}
