import { useLocation } from "react-router-dom";
import useReveal from "../../hooks/useReveal.js";
import useRouteFx from "../../hooks/useRouteFx.js";
import ScrollUI from "./ScrollUI.jsx";
import ProposalSwitcher from "./ProposalSwitcher.jsx";

/** Raíz de los extras de experiencia. Todo es mejora progresiva: sin JS el sitio se ve completo.
 *  Para quitarlo todo: borrar <Fx /> en App.jsx. Solo el cambiador: SHOW_PROPOSAL_SWITCHER = false en shared.jsx. */
export default function Fx() {
  const { pathname } = useLocation();
  useReveal(pathname);
  useRouteFx();
  return (
    <>
      <ScrollUI />
      <ProposalSwitcher />
    </>
  );
}
