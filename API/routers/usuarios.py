# Importamos las funciones de consumo de MySQL.
import motorSQL

# Importamos y configuramos el router.
from fastapi import APIRouter
router = APIRouter(prefix="/usuarios")


# Encontrar todos los usuarios.
@router.get("/find_all")
async def find_all():
    return motorSQL.consultar("SELECT * FROM usuarios")


# Obtenemos un usuario en base a su ID.
@router.get("/find_by_id/{id_usuario}")
async def find_by_id(id_usuario:int):
    usuario = motorSQL.consultar(f"SELECT * FROM usuarios WHERE id_usuario={id_usuario}")
    return usuario[0]


# Añadimos un nuevo usuario a la base de datos.
#http://127.0.0.1:8000/usuarios/add/[israelito]&[123]&[Israel]&[Colta]&[Bujalance]&[2003-04-15]&[Estudio%20en%20San%20Valero%20y%20trabajo%20en%20Deloitte]
@router.get("/add/[{usuario}]&[{clave}]&[{nombre}]&[{apel1}]&[{apel2}]&[{f_nac}]&[{bio}]")
async def add(usuario:str,clave:str,nombre:str,apel1:str,apel2:str,f_nac:str,bio:str):
    resultado = motorSQL.modificar(f"INSERT INTO usuarios (usuario,clave,nombre,apel1,apel2,f_nac,bio) VALUES ('{usuario}','{clave}','{nombre}','{apel1}','{apel2}','{f_nac}','{bio}')")
    if resultado == 1:
        id_usuario = motorSQL.consultar(f"SELECT id_usuario FROM usuarios WHERE usuario='{usuario}'")
        return id_usuario[0]
    else:
        return resultado


# Login: si las credenciales son erroneas, devuelve un 0, sino, devuelve la ID del usuario.
@router.get("/login/[{usuario}]&[{clave}]")
async def login(usuario:str,clave:str):
    id_usuario = motorSQL.consultar(f"SELECT id_usuario FROM usuarios WHERE usuario='{usuario}' AND clave='{clave}'")
    return id_usuario[0]


#Devuelve en un solo JSON los datos del usuario, los eventos que ha organizado y aquellos en los que ha participado.
@router.get("/load_profile/{id_usuario}")
async def load_profile(id_usuario:int):
    usuario = motorSQL.consultar(f"SELECT * FROM usuarios WHERE id_usuario={id_usuario}")
    usuario = usuario[0]
    organizados = motorSQL.consultar(f"SELECT id_evento, titulo, fecha FROM eventos WHERE id_usuario={id_usuario}")
    usuario["organizados"] = organizados
    participados = motorSQL.consultar(f"SELECT E.id_evento, E.titulo, E.fecha FROM participantes_eventos PE INNER JOIN eventos E ON E.id_evento = PE.id_evento WHERE PE.id_usuario = {id_usuario}")
    usuario["participados"] = participados
    return usuario


# Comprobamos la cantidad de eventos que ha publicado un usuario.
@router.get("/check_user_events/{id_usuario}")
async def check_user_events(id_usuario:int):
    eventos = motorSQL.consultar(f"SELECT COUNT(id_evento) as eventos FROM eventos WHERE id_usuario={id_usuario} AND fecha>CURDATE()")
    return eventos[0]['eventos']


# Devolvemos usuarios en base a una búsqueda por nombre completo y nombre de usuario.
@router.get("/search/{busqueda}")
async def search_users(busqueda:str):
    return motorSQL.consultar(f"SELECT id_usuario, CONCAT(nombre,' ',apel1,' ',apel2) AS nombre_completo, usuario FROM usuarios WHERE CONCAT(nombre,' ',apel1,' ',apel2) LIKE '%{busqueda}%' OR usuario LIKE '%{busqueda}%' LIMIT 25")