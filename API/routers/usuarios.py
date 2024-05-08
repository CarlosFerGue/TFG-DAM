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
    return motorSQL.consultar(f"SELECT * FROM usuarios WHERE id_usuario={id_usuario}")

# Añadimos un nuevo usuario a la base de datos.
@router.get("/add/[{usuario}]&[{clave}]&[{nombre}]&[{apel1}]&[{apel2}]&[{f_nac}]&[{bio}]")
async def add(usuario:str,clave:str,nombre:str,apel1:str,apel2:str,f_nac:str,bio:str):
    resultado = motorSQL.modificar(f"INSERT INTO usuarios (usuario,clave,nombre,apel1,apel2,f_nac,bio) VALUES ('{usuario}','{clave}','{nombre}','{apel1}','{apel2}','{f_nac}','{bio}')")
    if resultado == 1:
        return motorSQL.consultar(f"SELECT id_usuario FROM usuarios WHERE usuario='{usuario}'")
    else:
        return resultado
    

# Login: si las credenciales son erroneas, devuelve un 0, sino, devuelve la ID del usuario.
@router.get("/login/[{usuario}]&[{clave}]")
async def login(usuario:str,clave:str):
    return motorSQL.consultar(f"SELECT id_usuario FROM usuarios WHERE usuario='{usuario}' AND clave='{clave}'")


#Devuelve en un solo JSON los datos del usuario, los eventos que ha organizado y aquellos en los que ha participado.
@router.get("/load_profile/{id_usuario}")
async def load_profile(id_usuario:int):
    usuario = motorSQL.consultar(f"SELECT * FROM usuarios WHERE id_usuario={id_usuario}")
    usuario = usuario[0]
    organizados = motorSQL.consultar(f"SELECT * FROM eventos WHERE id_usuario={id_usuario}")
    usuario["organizados"] = organizados
    participados = motorSQL.consultar(f"SELECT * FROM eventos WHERE id_usuario={id_usuario}")
    usuario["participados"] = participados
    return usuario


