#!/usr/bin/env python3
"""Genera la identidad visual de Shaddai 1 en public/brand/ (todo por codigo).

Uso:  python tools/make_assets.py
Requiere: Pillow. Fuentes: TTF del sistema (Windows/Linux) con fallback.
No usa ni publica el logo/imagen de la postal: son formas propias.
"""
import math
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "public" / "brand"
IMG = ROOT / "public" / "img"

# Paleta (verificada contra la postal, ver docs/design.md)
RED = "#d6001c"
RED2 = "#ff2a44"
YEL = "#ffe600"
BLACK = "#0d0d0f"
GRAPH = "#101114"
SILVER = "#c8c8c8"
PHONE = "300 145 80 18"
TAGLINE = "Mecánica Automotriz Multimarcas"

FONT_STACK = "'Arial Black','Segoe UI Black','Helvetica Neue',Impact,system-ui,sans-serif"

# ---------------------------------------------------------------- utilidades
def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def find_font(names, size):
    dirs = [r"C:\Windows\Fonts", "/usr/share/fonts/truetype/dejavu",
            "/usr/share/fonts/truetype/liberation", "/Library/Fonts", "/System/Library/Fonts"]
    for n in names:
        for d in dirs:
            p = Path(d) / n
            if p.exists():
                return ImageFont.truetype(str(p), size)
    for n in ("DejaVuSans-Bold.ttf", "arialbd.ttf"):
        try:
            return ImageFont.truetype(n, size)
        except OSError:
            pass
    return ImageFont.load_default()


def f_black(s): return find_font(["ariblk.ttf", "seguibl.ttf", "arialbd.ttf", "LiberationSans-Bold.ttf"], s)
def f_bold(s): return find_font(["segoeuib.ttf", "arialbd.ttf", "LiberationSans-Bold.ttf"], s)
def f_mono(s): return find_font(["consolab.ttf", "consola.ttf", "DejaVuSansMono-Bold.ttf"], s)


def write(name, text):
    p = BRAND / name
    p.write_text(text, encoding="utf-8")
    print(f"  {p.relative_to(ROOT)}  {p.stat().st_size} B")


def italic_text(img, xy, text, font, fill, shear=0.22, anchor="la"):
    """Dibuja texto con inclinacion (cursiva sintetica) sobre img RGBA/RGB."""
    d0 = ImageDraw.Draw(img)
    bbox = d0.textbbox((0, 0), text, font=font, anchor="la")
    w, h = bbox[2] + int(shear * bbox[3]) + 8, bbox[3] + 8
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(layer).text((0, 0), text, font=font, fill=fill, anchor="la")
    layer = layer.transform(layer.size, Image.AFFINE, (1, shear, -shear * h * 0.8, 0, 1, 0), Image.BICUBIC)
    x, y = xy
    if anchor[0] == "m":
        x -= w // 2
    elif anchor[0] == "r":
        x -= w
    img.paste(layer, (int(x), int(y)), layer)
    return w, h


def hgrad(w, h, a0, a1, left_to_right=True):
    """Mascara L con degradado horizontal alpha a0->a1 (0-255)."""
    g = Image.linear_gradient("L").rotate(90, expand=True).resize((w, h))  # negro izq -> blanco der? (rotate 90 CCW)
    g = g.transpose(Image.FLIP_LEFT_RIGHT) if left_to_right else g
    return g.point(lambda v: int(a1 + (a0 - a1) * v / 255))


def cover(path, w, h):
    im = Image.open(path).convert("RGB")
    s = max(w / im.width, h / im.height)
    im = im.resize((math.ceil(im.width * s), math.ceil(im.height * s)), Image.LANCZOS)
    l, t = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((l, t, l + w, t + h))


def gear_points(cx, cy, r_out, r_in, teeth, rot=0.0):
    pts = []
    for i in range(teeth):
        a = rot + 2 * math.pi * i / teeth
        s = math.pi / teeth
        for da, r in ((-0.55 * s, r_in), (-0.3 * s, r_out), (0.3 * s, r_out), (0.55 * s, r_in)):
            pts.append((cx + r * math.cos(a + da), cy + r * math.sin(a + da)))
    return pts


def gear_path(cx, cy, r_out, r_in, teeth):
    pts = gear_points(cx, cy, r_out, r_in, teeth)
    return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"


# ---------------------------------------------------------------- (a) logos SVG
def wordmark(dark_bg: bool):
    ink = "#ffffff" if dark_bg else "#111114"
    one = RED2 if dark_bg else RED
    sw = RED if dark_bg else RED
    gear = "#9a9aa2" if dark_bg else "#8a8a92"
    # viewBox 560x150. Texto con textLength => ancho fijo aunque cambie la fuente.
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 150" role="img" aria-label="Shaddai 1 - Mecánica Automotriz Multimarcas">
<title>Shaddai 1</title>
<path d="M30 58C110 14 250 8 360 24C300 20 160 26 30 58Z" fill="{sw}"/>
<path d="M70 52C150 22 260 18 330 28C260 28 170 34 70 52Z" fill="{ink}" opacity=".85"/>
<g transform="translate(430 0) skewX(-14)" font-family="{FONT_STACK}" font-weight="900">
<text x="-380" y="106" font-size="76" fill="{ink}" textLength="360" lengthAdjust="spacingAndGlyphs">SHADDAI</text>
<text x="-8" y="106" font-size="76" fill="{one}" textLength="44" lengthAdjust="spacingAndGlyphs">1</text>
</g>
<g transform="translate(512 62)"><path d="{gear_path(0, 0, 30, 23, 10)}" fill="none" stroke="{gear}" stroke-width="5" stroke-linejoin="round"/>
<path d="M-11 -11L11 11M11 -11L-11 11" stroke="{one}" stroke-width="6" stroke-linecap="round"/></g>
<text x="80" y="138" font-family="system-ui,'Segoe UI',Arial,sans-serif" font-weight="700" font-size="19" fill="{ink}" textLength="400" lengthAdjust="spacing">MECÁNICA AUTOMOTRIZ MULTIMARCAS</text>
</svg>
'''


def isotipo_svg():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="13" fill="{BLACK}"/><path d="M-4 46L36 -2H52L12 46Z" fill="{RED}"/><path d="{gear_path(32, 32, 27, 22, 10)}" fill="none" stroke="#8a8a92" stroke-width="2.5" stroke-linejoin="round" opacity=".7"/><text x="32" y="43" transform="skewX(-12) translate(8 0)" font-family="{FONT_STACK}" font-weight="900" font-size="30" fill="#fff" text-anchor="middle">S<tspan fill="{YEL}">1</tspan></text></svg>
'''


# ---------------------------------------------------------------- (b) isotipo PNG
def isotipo_png(size):
    S = 8
    n = size * S
    im = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, n - 1, n - 1), radius=int(n * 0.2), fill=rgb(BLACK))
    k = n / 64
    d.polygon([(-4 * k, 46 * k), (36 * k, -2 * k), (52 * k, -2 * k), (12 * k, 46 * k)], fill=rgb(RED))
    if size >= 100:
        pts = gear_points(32 * k, 32 * k, 27 * k, 22 * k, 10)
        d.line(pts + [pts[0]], fill=(138, 138, 146), width=max(1, int(2.5 * k)), joint="curve")
    fnt = f_black(int(30 * k * 1.12))
    t = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    td = ImageDraw.Draw(t)
    w_s = td.textlength("S", font=fnt)
    w_1 = td.textlength("1", font=fnt)
    x0 = n / 2 - (w_s + w_1) / 2
    td.text((x0, 45 * k), "S", font=fnt, fill="#ffffff", anchor="ls")
    td.text((x0 + w_s, 45 * k), "1", font=fnt, fill=YEL, anchor="ls")
    sh = 0.2
    t = t.transform(t.size, Image.AFFINE, (1, sh, -sh * 38 * k, 0, 1, 0), Image.BICUBIC)
    im.alpha_composite(t)
    # clip a esquinas redondas
    mask = Image.new("L", (n, n), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, n - 1, n - 1), radius=int(n * 0.2), fill=255)
    im.putalpha(Image.composite(im.getchannel("A"), Image.new("L", (n, n), 0), mask))
    return im.resize((size, size), Image.LANCZOS)


def apple_icon():
    # iOS aplica sus propias esquinas: sin transparencia, fondo solido.
    big = isotipo_png(180)
    bg = Image.new("RGB", (180, 180), rgb(BLACK))
    bg.paste(big, (0, 0), big)
    return bg


# ---------------------------------------------------------------- (c) Open Graph
def og_base(photo):
    return cover(IMG / photo, 1200, 630)


def stripes(img, x0, x1, color, alpha=255):
    ov = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(ov).polygon([(x0 + 160, 0), (x1 + 160, 0), (x1, 630), (x0, 630)], fill=rgb(color) + (alpha,))
    img.alpha_composite(ov)


def save_png(img, name, colors=160):
    p = BRAND / name
    q = img.convert("RGB").quantize(colors=colors, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    q.save(p, optimize=True)
    print(f"  {p.relative_to(ROOT)}  {p.stat().st_size // 1024} KB")


def og1():
    im = og_base("taller-1280.webp").convert("RGBA")
    ov = Image.new("RGBA", im.size, rgb("#0d0d0f") + (0,))
    ov.putalpha(hgrad(1200, 630, 245, 120, True))
    im.alpha_composite(ov)
    stripes(im, 760, 800, RED)
    stripes(im, 825, 845, YEL)
    stripes(im, 870, 940, RED)
    d = ImageDraw.Draw(im)
    fb = f_black(120)
    wd = d.textlength("SHADDAI", font=fb)
    italic_text(im, (60, 70), "SHADDAI", fb, "#ffffff", 0.2)
    italic_text(im, (60 + wd + 14, 70), "1", fb, RED2, 0.2)
    d.text((64, 232), "Mecánica Automotriz Multimarcas", font=f_bold(40), fill="#ffffff")
    # franja de telefono
    d.polygon([(40, 440), (700, 440), (672, 540), (12, 540)], fill=rgb(RED))
    d.text((80, 490), "WhatsApp", font=f_bold(34), fill="#ffffff", anchor="lm")
    italic_text(im, (260, 452), PHONE, f_black(58), YEL, 0.2)
    d.text((64, 584), "Escaneo · Reprogramación · Mantenimiento", font=f_bold(26), fill="#e4e4e7")
    save_png(im, "og-propuesta-1.png")


def og2():
    im = og_base("general-1280.webp").convert("RGBA")
    ov = Image.new("RGBA", im.size, (255, 255, 255, 0))
    ov.putalpha(hgrad(1200, 630, 255, 20, True).point(lambda v: 255 if v > 235 else v))
    im.alpha_composite(ov)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, 1200, 96), fill=rgb("#111114"))
    d.rectangle((0, 0, 1200, 12), fill=rgb(RED))
    d.rounded_rectangle((48, 28, 112, 84), radius=10, fill=rgb(RED))
    d.text((80, 58), "S1", font=f_black(30), fill="#ffffff", anchor="mm")
    d.text((132, 46), "Shaddai 1", font=f_black(34), fill="#ffffff", anchor="lm")
    d.text((132, 78), "Taller multimarcas", font=f_bold(20), fill="#d4d4d8", anchor="lm")
    d.text((48, 150), "Shaddai 1", font=f_black(110), fill=rgb("#111114"))
    d.text((48, 310), "Mecánica Automotriz", font=f_bold(54), fill=rgb("#111114"))
    d.text((48, 378), "Multimarcas", font=f_bold(54), fill=rgb(RED))
    d.rectangle((48, 460, 400, 468), fill=rgb(YEL))
    d.rounded_rectangle((48, 520, 560, 590), radius=12, fill=rgb(RED))
    d.text((80, 555), "WhatsApp", font=f_bold(28), fill="#ffffff", anchor="lm")
    d.text((236, 555), PHONE, font=f_black(38), fill="#ffffff", anchor="lm")
    save_png(im, "og-propuesta-2.png")


def og3():
    im = og_base("escaneo-1280.webp").convert("RGBA")
    ov = Image.new("RGBA", im.size, rgb(GRAPH) + (0,))
    ov.putalpha(hgrad(1200, 630, 242, 130, True))
    im.alpha_composite(ov)
    grid = Image.new("RGBA", im.size, (0, 0, 0, 0))
    g = ImageDraw.Draw(grid)
    for x in range(0, 1200, 60):
        g.line((x, 0, x, 630), fill=(255, 230, 0, 22), width=1)
    for y in range(0, 630, 60):
        g.line((0, y, 1200, y), fill=(255, 230, 0, 22), width=1)
    im.alpha_composite(grid)
    d = ImageDraw.Draw(im)
    # esquinas de mira
    for (x, y, sx, sy) in ((30, 30, 1, 1), (1170, 30, -1, 1), (30, 600, 1, -1), (1170, 600, -1, -1)):
        d.line((x, y, x + 60 * sx, y), fill=rgb(YEL), width=5)
        d.line((x, y, x, y + 60 * sy), fill=rgb(YEL), width=5)
    d.ellipse((72, 84, 92, 104), fill=rgb(RED))
    d.text((110, 94), "DIAGNÓSTICO // SHADDAI-1", font=f_mono(26), fill=rgb(YEL), anchor="lm")
    d.text((70, 150), "Shaddai 1", font=f_bold(120), fill="#f2f2f4")
    d.text((70, 300), "Mecánica Automotriz", font=f_bold(52), fill="#f2f2f4")
    d.text((70, 365), "Multimarcas", font=f_bold(52), fill=rgb(YEL))
    d.rectangle((70, 470, 780, 560), fill=rgb(YEL))
    d.text((100, 515), "WhatsApp", font=f_mono(30), fill="#000000", anchor="lm")
    d.text((290, 515), PHONE, font=f_mono(46), fill="#000000", anchor="lm")
    d.text((70, 590), "> escaneo · reprogramación · mantenimiento", font=f_mono(22), fill="#b4b4bd", anchor="lm")
    save_png(im, "og-propuesta-3.png")


# ---------------------------------------------------------------- (d) patrones
def patterns():
    write("pattern-stripes-red.svg",
          f'''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="{RED}"/><path d="M-4 52L52 -4M20 56L56 20M-8 28L28 -8" stroke="#8f0012" stroke-width="10"/></svg>
''')
    write("pattern-stripes-dark.svg",
          f'''<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path d="M-2 42L42 -2M18 46L46 18M-6 22L22 -6" stroke="{RED}" stroke-opacity=".16" stroke-width="8"/></svg>
''')
    write("pattern-grid.svg",
          f'''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M48 0H0V48" fill="none" stroke="{YEL}" stroke-opacity=".08" stroke-width="1"/><path d="M12 0V48M24 0V48M36 0V48M0 12H48M0 24H48M0 36H48" stroke="{YEL}" stroke-opacity=".03"/></svg>
''')
    write("pattern-grain.svg",
          '''<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .5 0"/></filter><rect width="160" height="160" filter="url(#n)" opacity=".12"/></svg>
''')


def main():
    BRAND.mkdir(parents=True, exist_ok=True)
    print("Logos / isotipo (SVG)")
    write("logo-dark.svg", wordmark(True))
    write("logo-light.svg", wordmark(False))
    write("isotipo.svg", isotipo_svg())
    (ROOT / "public" / "favicon.svg").write_text(isotipo_svg(), encoding="utf-8")
    print("  public/favicon.svg")
    print("Iconos PNG")
    isotipo_png(32).save(BRAND / "favicon-32.png", optimize=True)
    apple_icon().save(BRAND / "apple-touch-icon.png", optimize=True)
    isotipo_png(512).save(BRAND / "isotipo-512.png", optimize=True)
    for n in ("favicon-32.png", "apple-touch-icon.png", "isotipo-512.png"):
        print(f"  public/brand/{n}  {(BRAND / n).stat().st_size} B")
    print("Open Graph")
    og1(); og2(); og3()
    print("Patrones")
    patterns()


if __name__ == "__main__":
    main()
