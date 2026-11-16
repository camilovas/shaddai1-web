import { useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE, propuestas, getServicio } from "../components/shared.jsx";

/** Ruta interna (sin base) de un clic/hover en <a>, o null si es externo o no aplica. */
function internalTarget(e) {
  if (e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = e.target.closest && e.target.closest("a[href]");
  if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return null;
  const u = new URL(a.href, location.href);
  const base = BASE.replace(/\/$/, "");
  if (u.origin !== location.origin || !(u.pathname === base || u.pathname.startsWith(base + "/"))) return null;
  return { to: u.pathname.slice(base.length) || "/", u, same: u.pathname === location.pathname };
}

/** Efectos de navegación (solo cliente, tras montar):
 *  1) foco al <h1> tras navegar, 2) View Transitions si existen, 3) prefetch de la imagen hero al hover/foco. */
export default function useRouteFx() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // Sin View Transitions (p. ej. Firefox/Safari antiguos): entrada suave de la página con Web Animations.
    const main = document.getElementById("main");
    if (main && !document.startViewTransition && main.animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      main.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }], { duration: 450, easing: "cubic-bezier(.22,1,.36,1)" });
    }
    const t = document.querySelector("main h1") || document.getElementById("main");
    if (!t) return;
    if (!t.hasAttribute("tabindex")) t.setAttribute("tabindex", "-1");
    t.focus({ preventScroll: true });
  }, [pathname]);

  useEffect(() => {
    if (!document.startViewTransition) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (e) => {
      if (mq.matches || e.button !== 0) return;
      const t = internalTarget(e);
      if (!t || t.same) return;
      e.preventDefault(); // el Link de react-router ignora el clic si ya está prevenido
      document.startViewTransition(() => {
        flushSync(() => navigate(t.to + t.u.search + t.u.hash));
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  useEffect(() => {
    const seen = new Set();
    const warm = (e) => {
      const c = navigator.connection;
      if (c && (c.saveData || /2g/.test(c.effectiveType || ""))) return;
      const t = internalTarget(e);
      if (!t) return;
      const [slug, sub] = t.to.replace(/^\/|\/$/g, "").split("/");
      if (!propuestas.some((p) => p.slug === slug) || sub === "contacto") return;
      const name = sub ? getServicio(sub)?.imagen : "taller";
      if (!name) return;
      const w = window.innerWidth * (window.devicePixelRatio || 1);
      const href = `${BASE}img/${name}-${w <= 480 ? 480 : w <= 800 ? 800 : 1280}.webp`;
      if (seen.has(href)) return;
      seen.add(href);
      const l = document.createElement("link");
      l.rel = "prefetch";
      l.as = "image";
      l.href = href;
      document.head.appendChild(l);
    };
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("focusin", warm);
    return () => {
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
    };
  }, []);
}
