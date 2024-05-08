# Importamos el conector de Python a MySQL.
import mysql.connector

# Importamos el módulo JSON para transformas las listas.
import json

# Realizamos la conexión con la base de datos MySQL.
conexion = mysql.connector.connect(user='root',
                                   password='asir2021',
                                   host='localhost',
                                   database='myeventz',
                                   port='3307')

# Función de test.
def test():
    return "Has accedido al módulo de MySQL"

# Función para realizar consultas.
def consultar(sql: str):
    try:
        # Creamos un cursor para ejecutar consultas SQL.
        cursor = conexion.cursor()
        # Ejecutamos la consulta.
        cursor.execute(sql)
        # Obtenemos los nombres de las columnas.
        columnas = [columna[0] for columna in cursor.description]
        # Obtenemos todos los resultados.
        resultados = cursor.fetchall()
        # Creamos una lista de diccionarios con los nombres de las columnas y los valores correspondientes.
        resultados_json = []
        for fila in resultados:
            fila_json = {}
            for i, valor in enumerate(fila):
                columna = columnas[i]
                fila_json[columna] = valor
            resultados_json.append(fila_json)
        # Comprobamos si la consulta ha devuelvo o no valores.
        if resultados_json == []:
            return 0
        else:
            return resultados_json
    except mysql.connector.Error as error:
        print("Error al ejecutar la consulta:", error)
        return -1
    finally:
        # Cerrar el cursor.
        cursor.close()

# Función para ejecutar modificaciones (INSERT, UPDATE, DELETE,...) en la base de datos.
def modificar(sql: str):
    try:
        # Creamos un cursor.
        cursor = conexion.cursor()
        # Ejecutamos la query.
        cursor.execute(sql)
        # Hacemos commit para guardar los cambios.
        conexion.commit()
        # Devolvemos el número de filas afectadas.
        return cursor.rowcount
    except mysql.connector.Error as error:
        print("Error al ejecutar la modificación:", error)
        return -1
    finally:
        # Cerramos el cursor.
        cursor.close()


###### TESTS FUNCIONES ######
# print(consultar("SELECT id, usuario, password FROM usuarios"))
# print(modificar("INSERT INTO usuarios VALUES(3,'moure','12345')"))
# print(modificar("UPDATE usuarios SET usuario='mouredev' WHERE id=3"))
# print(modificar("DELETE FROM usuarios"))