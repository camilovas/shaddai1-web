#!/usr/bin/env python3
"""Ratios de contraste WCAG 2.2 para los pares texto/fondo reales de las 3 propuestas.
Colores tomados de src/base.css y src/proposals/p{1,2,3}.css (definidos aqui; actualizar si cambian).
Uso: python tools/check_contrast.py   (exit 1 si algun par falla AA)
"""
import sys


def _rgb(h):
    h = h.lstrip("#")
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]


def lum(h):
    c = [v / 255 for v in _rgb(h)]
    c = [v / 12.92 if v <= .03928 else ((v + .055) / 1.055) ** 2.4 for v in c]
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]


def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + .05) / (lb + .05)


def mix(fg, bg, a):
    return "#%02x%02x%02x" % tuple(round(x * a + y * (1 - a)) for x, y in zip(_rgb(fg), _rgb(bg)))


# (propuesta, selector/descripcion, texto, fondo, grande)
# grande=1 -> umbral 3:1 (>=24px, o >=18.66px en negrita, o componente de UI); 0 -> 4.5:1
P = [
    ("P1", ".p1 texto base", "#f4f4f5", "#0d0d0f", 0),
    ("P1", ".p1-tag / .p1-card p (--muted)", "#c9c9cf", "#0d0d0f", 0),
    ("P1", ".p1-card p sobre --panel", "#c9c9cf", "#17171a", 0),
    ("P1", ".p1-logo em (--red-2)", "#ff2a44", "#0d0d0f", 1),
    ("P1", ".p1-nav a.active (blanco/rojo)", "#ffffff", "#d6001c", 0),
    ("P1", ".p1-banner span sobre extremo --red-2 (texto 14-18px: NO es grande)", "#ffffff", "#ff2a44", 0),
    ("P1", ".p1-banner span sobre --red", "#ffffff", "#d6001c", 1),
    ("P1", ".p1-h2 / .sb h2 amarillo", "#ffe600", "#0d0d0f", 1),
    ("P1", ".p1-more / .p1-card-ic amarillo sobre panel", "#ffe600", "#17171a", 0),
    ("P1", ".p1-btn-wa / .fab", "#062b12", "#25d366", 0),
    ("P1", ".p1-call texto blanco sobre --red", "#ffffff", "#d6001c", 0),
    ("P1", ".p1-call texto blanco sobre extremo --red-2", "#ffffff", "#ff2a44", 0),
    ("P1", ".p1-call texto blanco sobre #8f0012", "#ffffff", "#8f0012", 0),
    ("P1", ".p1-phone", "#111111", "#ffffff", 1),
    ("P1", ".p1-credits", "#9b9ba3", "#0d0d0f", 0),
    ("P1", ".p1 .sb-cta (blanco sobre --red)", "#ffffff", "#d6001c", 0),
    ("P1", ".p1 .sb-steps li::before", "#ffffff", "#d6001c", 1),
    ("P1", "foco amarillo (UI)", "#ffe600", "#0d0d0f", 1),
    ("P2", ".p2 texto sobre blanco", "#111114", "#ffffff", 0),
    ("P2", ".p2-lead / .p2-card p (--muted)", "#52525b", "#ffffff", 0),
    ("P2", ".p2-lead / .p2-crumb sobre --soft", "#52525b", "#f4f4f6", 0),
    ("P2", ".p2-eyebrow (--red-d sobre --soft)", "#a80016", "#f4f4f6", 0),
    ("P2", ".p2-hero h1 span rojo sobre amarillo 60%", "#d6001c", mix("#ffe600", "#f4f4f6", .6), 1),
    ("P2", ".p2-hero h1 span rojo sobre --soft", "#d6001c", "#f4f4f6", 1),
    ("P2", ".p2-card span (--red-d)", "#a80016", "#ffffff", 0),
    ("P2", ".p2-head blanco/negro", "#ffffff", "#111114", 0),
    ("P2", ".p2-brand small", "#d4d4d8", "#111114", 0),
    ("P2", ".p2-btn-red", "#ffffff", "#d6001c", 0),
    ("P2", ".p2-btn-red:hover", "#ffffff", "#a80016", 0),
    ("P2", ".p2-band blanco sobre rojo", "#ffffff", "#d6001c", 0),
    ("P2", ".p2-foot", "#d4d4d8", "#111114", 0),
    ("P2", ".p2-credits", "#a1a1aa", "#111114", 0),
    ("P2", ".p2 .sb-card li::before (UI)", "#d6001c", "#f4f4f6", 1),
    ("P2", ".p2 .sb-more a:hover (--red-d)", "#a80016", "#ffffff", 0),
    ("P2", ".p2 .sb-cta", "#ffffff", "#111114", 0),
    ("P2", "foco rojo sobre blanco (UI)", "#d6001c", "#ffffff", 1),
    ("P2", ".c2 .chooser-tag", "#b30018", "#ffffff", 0),
    ("P2", ".p2-btn-white (texto sobre blanco)", "#111114", "#ffffff", 0),
    ("P3", ".p3 texto base", "#f2f2f4", "#101114", 0),
    ("P3", ".p3 --muted sobre bg", "#b4b4bd", "#101114", 0),
    ("P3", ".p3 --muted sobre --panel", "#b4b4bd", "#181a1f", 0),
    ("P3", ".p3-label / .p3-num amarillo", "#ffe600", "#101114", 0),
    ("P3", ".p3 amarillo sobre --panel", "#ffe600", "#181a1f", 0),
    ("P3", ".p3-btn-y", "#000000", "#ffe600", 0),
    ("P3", ".p3-btn-l borde #6b6d78 (UI)", "#6b6d78", "#101114", 1),
    ("P3", ".p3-chips li", "#f2f2f4", "#181a1f", 0),
    ("P3", ".p3-credits", "#8e8e98", "#101114", 0),
    ("P3", ".p3-thanks", "#e0e0e5", "#181a1f", 0),
    ("P3", ".p3 --line borde de tarjetas (UI, informativo)", "#2b2d35", "#101114", 1),
    ("P3", ".p3-dot rojo (UI)", "#d6001c", "#101114", 1),
    ("P3", "rojo #d6001c como TEXTO sobre #101114", "#d6001c", "#101114", 0),
    ("Glob", ".chooser h1 small", "#a1a1aa", "#0d0d0f", 0),
    ("Glob", ".c1 p", "#cfcfd4", "#1a0b0e", 0),
    ("Glob", ".c1 a", "#ffffff", "#d6001c", 0),
    ("Glob", ".c2 p", "#444444", "#ffffff", 0),
    ("Glob", ".c3 a", "#000000", "#ffe600", 0),
    ("Glob", ".c3 .chooser-tag", "#ffe600", "#17181c", 0),
    ("Glob", ".fab", "#062b12", "#25d366", 0),
]


def main():
    fails = 0
    print(f"{'Prop':<5}{'Ratio':>7}  {'Min':>4}  {'Estado':<7} {'Texto':<8}{'Fondo':<8} Selector")
    for pr, desc, fg, bg, big in P:
        r = ratio(fg, bg)
        need = 3.0 if big else 4.5
        ok = r >= need
        fails += not ok
        print(f"{pr:<5}{r:7.2f}  {need:4.1f}  {'OK' if ok else 'FALLA':<7} {fg:<8}{bg:<8} {desc}")
    print(f"\n{len(P)} pares, {fails} fallan AA.")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
