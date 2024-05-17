 #Python
## Instalación y terminal:
1. Instalamos el conector de MySQL desde la terminal: `pip install mysql-connector-python`
2. Instalamos FastAPI: `pip install fastapi`
3. Ejecutamos el main.py: `uvicorn main:app --reload`
4. Detener el programa: `Ctrl+C`
## Archivos y funcionalidad:
Archivo **"main.py"**: archivo de ejecución del programa. Importa los archivos correspondientes a los objetos de la base de datos para poder realizar las peticiones. También establece la ruta estática con la que podremos acceder a las imágenes guardadas en el servidor.

 Archivo **"mysql.py"**: contiene las funciones de conexión y ejecución de consultas o modificaciones en la base de datos:
 * Al ejecutar modificaciones, puede devolver:

| **RESULTADO** |                            **INTERPRETACIÓN**                             |
| ------------- | :-----------------------------------------------------------------------: |
| 1+            | La ejecución se ha ejecutado correctamente y ha afectado a varias filas.  |
| 0             |    Se ha ejecutado la modificación pero no ha afectado a ninguna fila.    |
| -1            | Ha habido un error durante la ejecución en el servidor de bases de datos. |
* Al realizar consultas, puede devolver:

| **RESULTADO** |                          **INTERPRETACIÓN**                          |
| ------------- | :------------------------------------------------------------------: |
| *string*      | La consulta se ha realizado correctamente y devuelve los resultados. |
| 0             |               La consulta no ha devuelto ningún valor.               |
| -1            |       Ha habido un error durante la ejecución de la consulta.        |
 Carpeta **"/routers"**: contiene los archivos con las llamadas específicas para cada caso de uso.

Carpeta **"/images/..."**: aquí almacenaremos las imágenes de las que hará uso la APP (fotos de perfil y banners de eventos).
