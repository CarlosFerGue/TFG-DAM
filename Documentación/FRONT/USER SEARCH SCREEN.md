## BARRA DE BÚSQUEDA DE USUARIOS:
Se mostrará un listado de máximo 25 usuarios cuyo nombre completo (nombre y apellidos separados por espacios) o nombre de usuario coincidan con lo proporcionado en la barra de búsqueda.

| OUTPUT   | PETICIÓN                               | INPUT     |
| -------- | -------------------------------------- | --------- |
| busqueda | ***IP:PORT***/usuarios/search/busqueda | JSON/0/-1 |

Usuarios devueltos cuyos datos coinciden con la búsqueda:
```  json
[
  {
    "id_usuario": 2,
    "nombre_completo": "Carlos Fernández Guevara",
    "usuario": "charly"
  },
  {
    "id_usuario": 3,
    "nombre_completo": "Jorge Alquezar ",
    "usuario": "gigantosaurio"
  },
  {
    "id_usuario": 4,
    "nombre_completo": "Noe  ",
    "usuario": "carver"
  }
]
```

Resultado en caso de no encontrar usuarios que coincidan:
```  
0
```

Ejemplo de resultado en caso de error en la ejecución de la consulta:
```  
-1
```