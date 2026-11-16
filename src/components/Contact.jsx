import { negocio, waUrl, telUrl, Icon } from "./shared.jsx";
import { infoItems } from "./ContactInfo.jsx";
import Crumbs from "./Crumbs.jsx";
import WaWizard from "./fx/WaWizard.jsx";
import CopyNumber from "./fx/CopyNumber.jsx";

/** Cuerpo compartido de la página de contacto. cls = {h1, lead, wa, call} (clases de cada propuesta). */
export default function ContactBody({ cls, home }) {
  const t = negocio.contactoTexto;
  const c = negocio.comoCoordinar;
  const info = infoItems();
  return (
    <>
      <Crumbs items={[{ to: home, label: "Inicio" }]} current="Contacto" />
      <div className="ct">
        <div className="ct-main">
          <h1 className={cls.h1}>{t.titulo}</h1>
          <p className={cls.lead}>{t.texto}</p>
          <div className="ct-actions">
            <a className={cls.wa} href={waUrl} target="_blank" rel="noopener">
              <Icon name="wa" size={22} /> {negocio.ctas.contacto}
            </a>
            <a className={cls.call} href={telUrl}>
              {negocio.ctas.llamar}
            </a>
            <CopyNumber />
          </div>
          <WaWizard />
          <p className="ct-tip">{t.sugerencia}</p>
        </div>
        <div className="ct-side">
          <section className="ct-box">
            <h2>{c.titulo}</h2>
            <p>{c.intro}</p>
            <ol>
              {c.pasos.map((p) => (
                <li key={p.titulo}>
                  <b>{p.titulo}.</b> {p.texto}
                </li>
              ))}
            </ol>
            <p className="ct-note">{c.nota}</p>
          </section>
          {info.length > 0 && (
            <section className="ct-box">
              <h2>Datos del taller</h2>
              <dl>
                {info.map((it) => (
                  <div key={it.k}>
                    <dt>{it.k}</dt>
                    <dd>{it.v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
