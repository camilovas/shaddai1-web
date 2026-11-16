"""Descarga fotos libres de Wikimedia Commons, las recorta a 3:2 y las guarda en WebP + JPG, local.
Uso: python tools/fetch_photos.py   (requiere internet solo esta vez; luego el sitio es 100% local)"""
import json, re, io, html, time, urllib.request, urllib.parse
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "img"
UA = {"User-Agent": "shaddai1-web-proposals/1.0"}
PHOTOS = {  # slug -> título en Commons
    "taller":      "File:Car Restoration Workshop (Unsplash).jpg",
    "banco":       "File:Car mechanic's workbench (Unsplash).jpg",
    "general":     "File:Mechanic works on machine at an automotive service center.jpg",
    "escaneo":     "File:Man holding Obd2 jack for car software diagnostic.jpg",
    "reprogramacion": "File:ECU and wire bundles.JPG",
    "preventivo":  "File:Car mechanic checking oil levels.jpg",
    "aceite":      "File:Checking the oil level in a car engine.jpg",
    "motor":       "File:Engine bay of Merkur XR4Ti.jpg",
}
WIDTHS = (480, 800, 1280)

def get(url, tries=6):
    for i in range(tries):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
        except urllib.error.HTTPError as e:
            if e.code != 429 or i == tries - 1: raise
            time.sleep(5 * (i + 1))

def api_all(titles):  # una sola consulta para todas las fotos
    q = urllib.parse.urlencode({"action": "query", "titles": "|".join(titles), "prop": "imageinfo", "iiprop": "url|extmetadata",
                                "iiurlwidth": 1600, "format": "json", "redirects": 1})
    d = json.loads(get("https://commons.wikimedia.org/w/api.php?" + q))
    return {p["title"]: p["imageinfo"][0] for p in d["query"]["pages"].values()}

def clean(s): return html.unescape(re.sub(r"<[^>]+>", "", s or "")).strip()

credits = {}
INFOS = api_all(list(PHOTOS.values()))
for slug, title in PHOTOS.items():
    info = INFOS[title]; m = info["extmetadata"]
    raw = get(info["thumburl"]); time.sleep(2)
    im = Image.open(io.BytesIO(raw)).convert("RGB")
    w, h = im.size; th = int(w * 2 / 3)           # recorte centrado 3:2
    if th <= h: top = (h - th) // 2; im = im.crop((0, top, w, top + th))
    else: nw = int(h * 3 / 2); l = (w - nw) // 2; im = im.crop((l, 0, l + nw, h))
    for tw in WIDTHS:
        r = im.resize((tw, tw * 2 // 3), Image.LANCZOS)
        r.save(OUT / f"{slug}-{tw}.webp", "WEBP", quality=72, method=6)
        if tw == 800: r.save(OUT / f"{slug}-{tw}.jpg", "JPEG", quality=76, optimize=True, progressive=True)
    credits[slug] = {"titulo": title.replace("File:", ""), "autor": clean(m.get("Artist", {}).get("value")),
                     "licencia": clean(m.get("LicenseShortName", {}).get("value")), "fuente": info["descriptionurl"]}
    print("ok", slug, credits[slug]["licencia"])

(ROOT / "src" / "credits.json").write_text(json.dumps(credits, ensure_ascii=False, indent=2), encoding="utf-8")
lines = ["# Créditos de fotos\n", "Fotos de Wikimedia Commons, guardadas localmente (recortadas y comprimidas).\n"]
for s, c in credits.items():
    lines.append(f"- **{s}** — {c['titulo']} · {c['autor']} · {c['licencia']} · {c['fuente']}")
(ROOT / "CREDITOS.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
