## BÚSQUEDA DE CATEGORÍAS:
En esta pantalla el usuario podrá realizar una búsqueda entre las 140 categorías que contiene la base de datos.

| OUTPUT   | PETICIÓN                                 | INPUT     |
| -------- | ---------------------------------------- | --------- |
| busqueda | ***IP:PORT***/categorias/search/busqueda | JSON/0/-1 |

Ejemplo de JSON devuelto al encontrar resultados:
```  json
[
  {
    "id_categoria": 119,
    "categoria": "Comida española"
  },
  {
    "id_categoria": 38,
    "categoria": "Paracaidismo"
  },
  {
    "id_categoria": 23,
    "categoria": "Parkour"
  },
  {
    "id_categoria": 93,
    "categoria": "Parque de atracciones"
  },
  {
    "id_categoria": 18,
    "categoria": "Patinaje"
  },
  {
    "id_categoria": 70,
    "categoria": "Super Mario Party"
  },
  {
    "id_categoria": 132,
    "categoria": "Tapas"
  }
]
```

Al no encontrar categorías que coincidan:
```  
0
```

Ejemplo de resultado en caso de error en la base de datos:
```  
-1
```