"""Sirve dist/ localmente como lo haría GitHub Pages (bajo /<prefijo>/), con los tipos MIME correctos.
Uso: python tools/serve.py [--port 8099] [--prefix shaddai1-web]
Compilar antes con:  BASE=/shaddai1-web/ npm run build   (en Windows/Git Bash: MSYS_NO_PATHCONV=1)"""
import argparse, functools, http.server, mimetypes
from pathlib import Path

mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("text/javascript", ".js")

ap = argparse.ArgumentParser()
ap.add_argument("--port", type=int, default=8099)
ap.add_argument("--prefix", default="shaddai1-web")
a = ap.parse_args()
DIST = Path(__file__).resolve().parent.parent / "dist"


class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, p):
        p = p.split("?", 1)[0].split("#", 1)[0]
        pre = f"/{a.prefix}"
        if a.prefix and p.startswith(pre + "/"):
            p = p[len(pre):]
        elif a.prefix and p == pre:
            p = "/"
        return str(DIST / p.lstrip("/"))

    def send_error(self, code, message=None, explain=None):
        if code == 404 and (DIST / "404.html").exists():
            body = (DIST / "404.html").read_bytes()
            self.send_response(404); self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body)
        else:
            super().send_error(code, message, explain)


print(f"http://localhost:{a.port}/{a.prefix}/  (Ctrl+C para salir)")
http.server.ThreadingHTTPServer(("", a.port), H).serve_forever()
