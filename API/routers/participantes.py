# Importamos las funciones de consumo de MySQL.
import motorSQL

# Importamos y configuramos el router.
from fastapi import APIRouter
router = APIRouter(prefix="/participantes")

# Encontrar todos los usuarios.
@router.get("/apuntarse/[{id_evento}]&[{id_usuario}]")
async def apuntarse(id_evento:int,id_usuario:int):
    return motorSQL.modificar(f"INSERT INTO participantes_eventos (id_evento, id_usuario, fecha) VALUES ({id_evento},{id_usuario},CURDATE())")


# Desapuntarse de un evento.
@router.get("/desapuntarse/[{id_evento}]&[{id_usuario}]")
async def desapuntarse(id_evento:int,id_usuario:int):
    return motorSQL.modificar(f"DELETE FROM participantes_eventos WHERE id_evento={id_evento} AND id_usuario={id_usuario}")

# Eliminar un evento.
@router.get("/delete_evento/{id_evento}")
async def delete_evento(id_evento:int):
    motorSQL.modificar(f"DELETE FROM participantes_eventos WHERE id_evento={id_evento}")
    return motorSQL.modificar(f"DELETE FROM eventos WHERE id_evento={id_evento}")