import { useRef, useState } from "react";
import { negocio } from "../shared.jsx";
import useMounted from "../../hooks/useMounted.js";

/** Botón "Copiar número" (Clipboard API con respaldo execCommand). Solo se pinta tras montar (sin JS no sirve).
 *  El aviso va en una región aria-live. */
export default function CopyNumber({ label = "Copiar número" }) {
  const mounted = useMounted();
  const [st, setSt] = useState("");
  const timer = useRef(0);
  if (!mounted) return null;

  async function copy() {
    const num = negocio.telefono.replace(/\s/g, "");
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(num);
        ok = true;
      }
    } catch {}
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = num;
        ta.setAttribute("readonly", "");
        ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, num.length);
        ok = document.execCommand("copy");
        ta.remove();
      } catch {}
    }
    setSt(ok ? "ok" : "fail");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSt(""), 3500);
  }

  return (
    <span className="cp">
      <button type="button" className="cp-b" onClick={copy}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
        </svg>
        {st === "ok" ? "¡Copiado!" : st === "fail" ? negocio.telefono : label}
      </button>
      <span className="fx-sr" role="status" aria-live="polite">
        {st === "ok" ? `Número copiado: ${negocio.telefono}` : st === "fail" ? `No se pudo copiar. Anótalo: ${negocio.telefono}` : ""}
      </span>
    </span>
  );
}
