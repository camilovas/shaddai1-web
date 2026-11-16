import { Link } from "react-router-dom";

/** Migas de pan: items = [{to,label}], current = texto de la página actual. */
export default function Crumbs({ items, current, className = "" }) {
  return (
    <nav aria-label="Migas de pan" className={`crumbs ${className}`}>
      <ol>
        {items.map((it) => (
          <li key={it.to}>
            <Link to={it.to}>{it.label}</Link>
          </li>
        ))}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
