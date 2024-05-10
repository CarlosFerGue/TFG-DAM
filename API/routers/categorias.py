# Importamos las funciones de consumo de MySQL.
import motorSQL

# Importamos y configuramos el router.
from fastapi import APIRouter
router = APIRouter(prefix="/categorias")

# Encontrar todas las categorias.
@router.get("/find_all")
async def find_all():
    return motorSQL.consultar("SELECT * FROM categorias order by categoria")

# Encontrar categoría por ID.
@router.get("/find_by_id/{id_categoria}")
async def find_all(id_categoria:int):
    categoria = motorSQL.consultar(f"SELECT * FROM categorias WHERE id_categoria={id_categoria}")
    return categoria[0]

# Búsqueda de categoría por nombre.
@router.get("/search/{busqueda}")
async def find_all(busqueda:str):
    return motorSQL.consultar(f"SELECT * FROM categorias WHERE categoria LIKE '%{busqueda}%'")