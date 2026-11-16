"""Fuente única del contenido del sitio (en Python). Genera src/content.json para React.
Uso: python tools/gen_content.py
Solo se usan datos de la postal; no se inventan dirección, precios, horarios ni reseñas."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

NEGOCIO = {
    "nombre": "Shaddai 1",
    "lema": "Mecánica Automotriz Multimarcas",
    "telefono": "300 145 80 18",
    "whatsapp": "573001458018",  # SUPUESTO: celular colombiano (+57). Confirmar con el cliente.
    "mensaje": "Hola Shaddai 1, quisiera programar un servicio para mi vehículo.",
    "aviso": "Te invitamos a programar con anticipación tus servicios, revisiones y mantenimientos para poder atenderte oportunamente.",
    "gracias": "Agradecemos su confianza y preferencia.",
}

SERVICIOS = [
    {
        "slug": "mecanica-general", "nombre": "Mecánica General", "icono": "car",
        "corto": "Revisión y reparación de tu vehículo, de cualquier marca.",
        "descripcion": "Atendemos vehículos de todas las marcas. Revisamos, diagnosticamos y reparamos los sistemas mecánicos de tu carro para que vuelva a la carretera seguro.",
        "incluye": ["Motor y sistema de refrigeración", "Frenos", "Suspensión y dirección", "Transmisión y embrague", "Sistema de escape", "Llantas, alineación y balanceo"],
        "cuando": ["Ruidos o vibraciones al conducir", "El carro se calienta o pierde potencia", "Los frenos o la dirección se sienten distintos", "Antes de un viaje largo"],
        "imagen": "general", "alt": "Mecánico con una herramienta frente a una balanceadora de ruedas",
        "extra": [],
    },
    {
        "slug": "escaneo-de-sistemas", "nombre": "Escaneo de Sistemas", "icono": "scan",
        "corto": "Lectura de códigos de falla para encontrar el problema con precisión.",
        "descripcion": "Conectamos un escáner al puerto de diagnóstico de tu vehículo para leer los códigos de falla de sus sistemas electrónicos y ubicar el problema sin adivinar.",
        "incluye": ["Lectura y borrado de códigos de falla", "Revisión de la luz «check engine»", "Sistemas de motor, frenos ABS y airbag", "Verificación de sensores", "Diagnóstico de problemas eléctricos"],
        "cuando": ["Se enciende una luz en el tablero", "El carro falla, se ahoga o gasta más combustible", "Antes de comprar un vehículo usado", "Después de una reparación, para confirmar"],
        "imagen": "escaneo", "alt": "Mano conectando un escáner OBD2 al puerto de diagnóstico de un carro con un portátil al lado",
        "extra": [],
    },
    {
        "slug": "reprogramacion", "nombre": "Reprogramación", "icono": "chip",
        "corto": "Actualización y programación de módulos electrónicos del vehículo.",
        "descripcion": "Los vehículos modernos dependen de módulos electrónicos. Trabajamos con la programación de la unidad de control (ECU) y otros módulos cuando el diagnóstico lo requiere.",
        "incluye": ["Programación y actualización de la ECU", "Adaptación tras cambiar un módulo o sensor", "Calibraciones y configuraciones", "Diagnóstico previo del sistema electrónico"],
        "cuando": ["Se reemplazó un módulo o sensor", "Hay fallas que solo se resuelven por software", "El fabricante tiene una actualización disponible"],
        "imagen": "reprogramacion", "alt": "Unidad de control electrónico (ECU) conectada a un haz de cables",
        "extra": [],
    },
    {
        "slug": "mantenimiento-preventivo-y-correctivo", "nombre": "Mantenimiento Preventivo y Correctivo", "icono": "wrench",
        "corto": "Evita daños mayores con revisiones a tiempo y repara lo que ya falló.",
        "descripcion": "El mantenimiento preventivo cuida tu vehículo antes de que falle; el correctivo repara lo que ya se dañó. Programar con anticipación nos permite atenderte oportunamente.",
        "incluye": ["Cambio de aceite y filtros", "Revisión de niveles y fluidos", "Revisión de frenos, correas y mangueras", "Reparación de daños detectados", "Recomendaciones según el estado de tu carro"],
        "cuando": ["Cumpliste el kilometraje o el tiempo de tu próxima revisión", "Quieres evitar reparaciones costosas", "Detectaste una fuga, un ruido o un desgaste"],
        "imagen": "preventivo", "alt": "Mecánico sacando la varilla del aceite para revisar el nivel",
        "extra": [{"imagen": "aceite", "alt": "Revisión del nivel de aceite en el motor"},
                  {"imagen": "motor", "alt": "Compartimiento del motor de un vehículo"}],
    },
]

PROPUESTAS = [
    {"id": 1, "slug": "propuesta-1", "nombre": "Postal", "tag": "Fiel a la postal",
     "descripcion": "Negro, rojo con cortes diagonales y amarillo de énfasis. Es la postal llevada a la web."},
    {"id": 2, "slug": "propuesta-2", "nombre": "Taller Limpio", "tag": "Claro y confiable",
     "descripcion": "Fondo blanco con cabecera negra y acentos rojos. Más aire, tarjetas con fotos y lectura fácil."},
    {"id": 3, "slug": "propuesta-3", "nombre": "Diagnóstico", "tag": "Técnico y moderno",
     "descripcion": "Grafito con detalles amarillos, numeración y estilo de tablero de instrumentos."},
]

(ROOT / "src" / "content.json").write_text(
    json.dumps({"negocio": NEGOCIO, "servicios": SERVICIOS, "propuestas": PROPUESTAS}, ensure_ascii=False, indent=2),
    encoding="utf-8")
print("src/content.json listo")
