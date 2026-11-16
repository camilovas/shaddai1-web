import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";
import { propuestas, servicios, metaFor, path } from "./components/shared.jsx";

export const routes = [
  "/",
  ...propuestas.flatMap((p) => [path(p.slug), path(p.slug, "contacto"), ...servicios.map((s) => path(p.slug, s.slug))]),
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function render(url) {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");
  const html = renderToString(
    <StaticRouter basename={basename} location={basename + url}>
      <App />
    </StaticRouter>
  );
  const m = metaFor(url);
  const head = `<title>${esc(m.title)}</title>
    <meta name="description" content="${esc(m.description)}" />${m.noindex ? '\n    <meta name="robots" content="noindex" />' : ""}`;
  return { html, head };
}
