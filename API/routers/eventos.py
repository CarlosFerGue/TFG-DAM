# Importamos las funciones de consumo de MySQL.
import motorSQL

# Importamos y configuramos el router.
from fastapi import APIRouter
router = APIRouter(prefix="/eventos")

# Encontrar los 10 eventos pendientes de realizar con más .
@router.get("/load_evento/{id_evento}")
async def load_evento(id_evento:int):
    evento = motorSQL.consultar(f"SELECT * FROM eventos WHERE id_evento={id_evento}")
    evento = evento[0]

# Obtener los datos, el organizador y los participantes de un evento.
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
#http://127.0.0.1:8000/eventos/add/[1]&[S.K.A.T.E.]&[2024-06-03]&[10:00]&[Game of SKATE en el skatepark del pirulo.]&[14]&[100]&[SkateparK]&[25]
@router.get("/add/[{id_usuario}]&[{titulo}]&[{fecha}]&[{hora}]&[{descripcion}]&[{edad_min}]&[{edad_max}]&[{ubicacion}]&[{participantes}]")
async def add_evento(id_usuario :int,titulo:str,fecha:str,hora:str,descripcion:str,edad_min:int,edad_max:int,ubicacion:str,participantes:int):
    # Primero comprobaremos que no haya un evento con los mismos datos introducidos.
    evento = motorSQL.consultar(f"SELECT * FROM eventos WHERE id_usuario={id_usuario} AND titulo='{titulo}' AND fecha='{fecha}' AND hora='{hora}' AND descripcion='{descripcion}' AND edad_min={edad_min} AND edad_max={edad_max} AND ubicacion='{ubicacion}' AND participantes={participantes}")
    if evento == 0:
        resultado = motorSQL.modificar(f"INSERT INTO eventos (id_usuario, titulo, fecha, hora, descripcion, edad_min, edad_max, ubicacion, participantes) VALUES ({id_usuario},'{titulo}','{fecha}','{hora}','{descripcion}',{edad_min},{edad_max},'{ubicacion}',{participantes})")
        if(resultado == 1):
            evento = motorSQL.consultar(f"SELECT * FROM eventos WHERE id_usuario={id_usuario} AND titulo='{titulo}' AND fecha='{fecha}' AND hora='{hora}' AND descripcion='{descripcion}' AND edad_min={edad_min} AND edad_max={edad_max} AND ubicacion='{ubicacion}' AND participantes={participantes}")
            return evento[0]['id_evento']
        else:
            return resultado
    # En caso de que ya existe, devolveremso un -2 para notificarlo.
    else:
        return -2
    
    
# Eliminar un evento.
@router.get("/delete/{id_evento}")
async def delete_evento(id_evento:int):
    motorSQL.modificar(f"DELETE FROM participantes_eventos WHERE id_evento={id_evento}")
    return motorSQL.modificar(f"DELETE FROM eventos WHERE id_evento={id_evento}")

# Buscar 30 eventos cercanos.
@router.get("/close_events")
async def load_evento():
    return motorSQL.consultar("SELECT id_evento, titulo, fecha, ubicacion FROM eventos WHERE fecha>CURDATE() ORDER BY fecha ASC LIMIT 20")

# Buscar 30 eventos cercanos.
@router.get("/popular")
async def popular_events():
    return motorSQL.consultar("SELECT E.id_evento, E.titulo, COUNT(E.id_evento) AS participantes, E.fecha FROM eventos E INNER JOIN participantes_eventos PE ON E.id_evento = PE.id_evento GROUP BY E.id_evento ORDER BY participantes DESC")
