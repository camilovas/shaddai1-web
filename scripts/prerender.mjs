// Genera un HTML estático por cada ruta (SSR de React) dentro de dist/.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, routes } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

for (const url of routes) {
  const { html, head } = render(url);
  const page = template.replace("<!--head-->", head).replace("<!--app-->", html);
  const dir = path.join(dist, url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page);
}
fs.writeFileSync(path.join(dist, "404.html"), template.replace("<!--head-->", "<title>Página no encontrada</title>").replace("<!--app-->", ""));
fs.rmSync(path.resolve("dist-ssr"), { recursive: true, force: true });
console.log(`Prerender: ${routes.length} páginas estáticas`);
