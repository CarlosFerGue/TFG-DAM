# Importamos FastAPI
from fastapi import FastAPI
app = FastAPI()

# Indicamos la carpeta donde almacenaremos las imagenes de las que hará uso la APP.
from fastapi.staticfiles import StaticFiles
app.mount("/images", StaticFiles(directory="images"))

# Aquí importaremos los routers para cada objeto de la base de datos.
from routers import usuarios
app.include_router(usuarios.router)
from routers import categorias
app.include_router(categorias.router)
from routers import eventos
app.include_router(eventos.router)
from routers import participantes
app.include_router(participantes.router)

# Petición raíz de nuestra API.
@app.get("/")
async def root():
    return "Bienvenido a la API de MyEventz"


