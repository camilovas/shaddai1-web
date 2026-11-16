import { useEffect, useRef, useState } from "react";

/** Barra de progreso de lectura (decorativa) + botón "volver arriba". Mismo marcado en SSR y cliente;
 *  el botón queda oculto (visibility) hasta que hay scroll, así que sin JS nunca aparece. */
export default function ScrollUI() {
  const bar = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const upd = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        bar.current.style.opacity = y > 24 ? "1" : "0";
      }
      setShow(y > 700);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(upd);
    };
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    upd();
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const top = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    const h = document.querySelector("main h1");
    if (h) {
      if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
      h.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <div className="fx-prog" ref={bar} aria-hidden="true" />
      <button type="button" className={`fx-top${show ? " is-on" : ""}`} onClick={top} tabIndex={show ? 0 : -1} aria-hidden={!show} aria-label="Volver arriba">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
