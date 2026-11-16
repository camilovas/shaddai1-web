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

# ---------------------------------------------------------------------------
# MARKETING (solo se AGREGAN campos; nada de lo anterior se renombra).
# Regla: nada de precios, horarios, direccion, anos de experiencia, certificaciones,
# resenas, cifras ni garantias. Lo que falte va en negocio["pendientes"] (vacio).
# ---------------------------------------------------------------------------
NEGOCIO.update({
    "titular": "Programa con anticipación el servicio de tu vehículo",
    "subtitulo": "Mecánica automotriz multimarcas: escaneo de sistemas, reprogramación, mantenimiento y reparación. Escríbenos por WhatsApp.",
    "ctas": {
        "principal": "Programar por WhatsApp",
        "agendar": "Agenda tu revisión",
        "cotizar": "Consultar por WhatsApp",
        "llamar": "Llamar ahora",
        "servicio": "Pregunta por este servicio",
        "contacto": "Escríbenos al 300 145 80 18",
    },
    "comoCoordinar": {
        "titulo": "Cómo coordinar tu servicio",
        "intro": "Es simple y todo empieza por WhatsApp.",
        "pasos": [
            {"titulo": "Escríbenos", "texto": "Cuéntanos por WhatsApp la marca de tu vehículo y qué necesitas (revisión, diagnóstico, mantenimiento)."},
            {"titulo": "Programa con anticipación", "texto": "Coordinamos tu servicio con tiempo para poder atenderte oportunamente."},
            {"titulo": "Trae tu vehículo", "texto": "Lo revisamos y te explicamos lo que encontramos antes de continuar."},
        ],
        "nota": "Programar con anticipación nos ayuda a atenderte mejor.",
    },
    "confianza": {
        "titulo": "Por qué escribirnos",
        "puntos": [
            {"titulo": "Todas las marcas", "texto": "Mecánica automotriz multimarcas."},
            {"titulo": "Diagnóstico con escáner", "texto": "Lectura de sistemas para ubicar la falla sin adivinar."},
            {"titulo": "Reprogramación", "texto": "Programación de módulos electrónicos del vehículo."},
            {"titulo": "Atención programada", "texto": "Agenda con anticipación tus servicios, revisiones y mantenimientos."},
        ],
        "cierre": "Agradecemos su confianza y preferencia.",
    },
    "contactoTexto": {
        "titulo": "Escríbenos y programa tu servicio",
        "texto": "El canal más rápido es WhatsApp. Dinos la marca y el modelo de tu vehículo y qué necesitas, y coordinamos contigo.",
        "sugerencia": "Para ayudarte mejor, cuéntanos: marca y modelo, qué notas en el vehículo y para cuándo quieres programar.",
    },
    # PENDIENTES DEL CLIENTE: dejar "" hasta tener el dato real. La UI debe ocultar lo vacío.
    "pendientes": {"direccion": "", "ciudad": "", "horario": "", "googleBusinessUrl": "", "instagram": "", "facebook": "", "email": ""},
    "seo": {"sitio": "https://camilovas.github.io/shaddai1-web/", "palabrasClave": ["taller mecánico", "mecánica automotriz multimarcas", "escaneo automotriz", "reprogramación ECU", "mantenimiento preventivo y correctivo"]},
})

MKT = {
    "mecanica-general": {
        "titular": "Mecánica general para vehículos de todas las marcas",
        "problema": "Ruidos, vibraciones, frenos distintos o un carro que ya no responde como antes: revisarlo a tiempo evita que el daño crezca.",
        "beneficios": ["Revisión de los sistemas mecánicos de tu vehículo", "Atención para cualquier marca", "Te explicamos lo que encontramos"],
        "waMensaje": "Hola Shaddai 1, quisiera programar una revisión de mecánica general para mi vehículo (marca y modelo: ___).",
        "cta": "Programar revisión mecánica",
        "faq": [
            {"p": "¿Atienden todas las marcas?", "r": "Somos un taller multimarcas. Escríbenos la marca y el modelo de tu vehículo y te confirmamos por WhatsApp."},
            {"p": "¿Cómo programo una revisión?", "r": "Escríbenos por WhatsApp al 300 145 80 18 e indícanos qué notas en tu vehículo. Te invitamos a programar con anticipación."},
            {"p": "¿Qué pasa si no sé qué tiene mi carro?", "r": "No hace falta saberlo. Cuéntanos los síntomas (ruidos, vibraciones, calentamiento) y lo revisamos."},
        ],
    },
    "escaneo-de-sistemas": {
        "titular": "Escaneo de sistemas: encuentra la falla sin adivinar",
        "problema": "Se prendió una luz en el tablero o el carro falla y no sabes por qué: el escáner lee los códigos para ubicar el problema.",
        "beneficios": ["Lectura de códigos de falla de los sistemas electrónicos", "Ayuda a ubicar el problema antes de cambiar piezas", "Útil antes de comprar un vehículo usado"],
        "waMensaje": "Hola Shaddai 1, se me encendió una luz en el tablero y quisiera programar un escaneo de sistemas (marca y modelo: ___).",
        "cta": "Programar escaneo",
        "faq": [
            {"p": "¿Para qué sirve el escaneo de sistemas?", "r": "Lee los códigos de falla guardados por los módulos electrónicos del vehículo, lo que orienta el diagnóstico."},
            {"p": "¿Por qué se enciende la luz de «check engine»?", "r": "Puede deberse a causas muy distintas. El escaneo es el primer paso para saber cuál es en tu caso."},
            {"p": "¿Sirve para mi marca?", "r": "Atendemos multimarcas. Escríbenos marca y modelo y confirmamos contigo por WhatsApp."},
            {"p": "¿Borrar el código arregla el problema?", "r": "No necesariamente: el código indica dónde buscar; si la causa sigue, la luz puede volver a encenderse."},
        ],
    },
    "reprogramacion": {
        "titular": "Reprogramación de módulos electrónicos",
        "problema": "Tras cambiar un módulo o sensor, o ante fallas que se resuelven por software, el vehículo puede necesitar programación.",
        "beneficios": ["Programación y actualización de la ECU cuando el diagnóstico lo requiere", "Diagnóstico previo del sistema electrónico", "Adaptación tras cambiar un módulo o sensor"],
        "waMensaje": "Hola Shaddai 1, quisiera consultar por reprogramación de módulos para mi vehículo (marca, modelo y qué necesito: ___).",
        "cta": "Consultar reprogramación",
        "faq": [
            {"p": "¿Qué es reprogramar una ECU?", "r": "Es cargar o actualizar el software de la unidad de control del vehículo, o adaptarla tras un cambio de módulo."},
            {"p": "¿Mi vehículo la necesita?", "r": "Depende del caso. Normalmente se parte de un diagnóstico; cuéntanos por WhatsApp qué ocurre."},
            {"p": "¿Debo programar con anticipación?", "r": "Sí, te invitamos a coordinar con tiempo para poder atenderte oportunamente."},
        ],
    },
    "mantenimiento-preventivo-y-correctivo": {
        "titular": "Mantenimiento preventivo y correctivo para tu vehículo",
        "problema": "Esperar a que el carro falle suele salir más caro: el preventivo cuida antes del daño y el correctivo repara lo que ya falló.",
        "beneficios": ["Revisión periódica de niveles, frenos, correas y mangueras", "Reparación de los daños detectados", "Recomendaciones según el estado de tu carro"],
        "waMensaje": "Hola Shaddai 1, quisiera programar un mantenimiento para mi vehículo (marca, modelo y kilometraje: ___).",
        "cta": "Programar mantenimiento",
        "faq": [
            {"p": "¿Cuál es la diferencia entre preventivo y correctivo?", "r": "El preventivo se hace antes de que algo falle; el correctivo repara lo que ya se dañó."},
            {"p": "¿Cada cuánto debo hacer el mantenimiento?", "r": "Depende de tu vehículo y de su manual. Escríbenos y te orientamos según tu caso."},
            {"p": "¿Por qué programar con anticipación?", "r": "Nos permite organizar la agenda y atenderte oportunamente."},
        ],
    },
}
for sv in SERVICIOS:
    sv.update(MKT[sv["slug"]])

HEROES = {
    1: {"titular": "Tu carro en buenas manos. Programa hoy.", "subtitulo": "Mecánica multimarcas, escaneo y reprogramación. Agenda por WhatsApp."},
    2: {"titular": "Un taller claro y confiable para tu vehículo", "subtitulo": "Revisión, diagnóstico y mantenimiento de todas las marcas. Coordina por WhatsApp."},
    3: {"titular": "Diagnóstico preciso, sin adivinar", "subtitulo": "Escaneo de sistemas, reprogramación y mecánica multimarcas. Programa tu revisión."},
}
for pr in PROPUESTAS:
    pr["hero"] = HEROES[pr["id"]]

(ROOT / "src" / "content.json").write_text(
    json.dumps({"negocio": NEGOCIO, "servicios": SERVICIOS, "propuestas": PROPUESTAS}, ensure_ascii=False, indent=2),
    encoding="utf-8")
print("src/content.json listo")
