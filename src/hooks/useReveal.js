import { useEffect, useLayoutEffect } from "react";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
// Bloques que aparecen al hacer scroll. Solo se marcan los que están bajo el pliegue.
const SEL = "main > section:not(:first-child), main .sb > *, main .ct-main > *, main .ct-side > *";

/** Revelado al hacer scroll. Todo lo hace JS tras montar: sin JS (o con reduced-motion) el contenido queda visible.
 *  Solo anima opacity/transform, así que no provoca CLS. */
export default function useReveal(key) {
  useIso(() => {
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("js-fx");
    const limit = window.innerHeight * 0.92;
    const targets = [...document.querySelectorAll(SEL)].filter((el) => el.getBoundingClientRect().top > limit);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("fx-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    targets.forEach((el) => {
      el.classList.add("fx-r");
      io.observe(el);
    });
    return () => {
      io.disconnect();
      targets.forEach((el) => el.classList.remove("fx-r", "fx-in"));
    };
  }, [key]);
}
