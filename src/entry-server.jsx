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
    <StaticRouter basename={basename} location={basename + url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </StaticRouter>
  );
  const m = metaFor(url);
  const t = esc(m.title), d = esc(m.description);
  const head = `<title>${t}</title>
    <meta name="description" content="${d}" />${m.noindex ? `
    <meta name="robots" content="noindex, nofollow" />` : ""}
    <link rel="canonical" href="${m.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_CO" />
    <meta property="og:site_name" content="Shaddai 1" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:url" content="${m.url}" />
    <meta property="og:image" content="${m.image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${m.image}" />`;
  return { html, head };
}
