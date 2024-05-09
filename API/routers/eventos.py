# Importamos las funciones de consumo de MySQL.
import motorSQL

# Importamos y configuramos el router.
from fastapi import APIRouter
router = APIRouter(prefix="/eventos")

# Encontrar todos los usuarios.
@router.get("/load_evento/{id_evento}")
async def load_evento(id_evento:int):
    evento = motorSQL.consultar(f"SELECT * FROM eventos WHERE id_evento={id_evento}")
    evento = evento[0]
    organizador = motorSQL.consultar(f"SELECT id_usuario, CONCAT(nombre,' ',apel1,' ',apel2) as nombre_com, usuario FROM usuarios WHERE id_usuario = {evento["id_usuario"]}")
    evento["organizador"] = organizador[0]
    participantes = motorSQL.consultar(f"SELECT U.id_usuario, CONCAT(nombre,' ',apel1,' ',apel2) as nombre_com, usuario FROM usuarios U INNER JOIN participantes_eventos PE ON U.id_usuario = PE.id_usuario WHERE PE.id_evento = {id_evento}")
    evento["participantes"] = participantes
    return evento;

# Creamos un nuevo evento.
@router.get("/add_evento/{id_evento}")
async def add_evento(id_evento:int):
    evento = motorSQL.consultar(f"SELECT * FROM eventos WHERE id_evento={id_evento}")