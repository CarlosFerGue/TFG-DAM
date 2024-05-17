## CARGAR EVENTOS POPULARES
En la parte superior se cargarán los 10 eventos pendientes de realizar más populares, es decir, que cuenten con más participantes.

| OUTPUT | PETICIÓN                       | INPUT     |
| ------ | ------------------------------ | --------- |
|        | ***IP:PORT***/eventos/popular/ | JSON/0/-1 |
Se devolverá un JSON en caso de respuesta exitosa del servidor:
```  json
[
  {
    "id_evento": 5,
    "titulo": "Quedad Parkour",
    "participantes": 3,
    "fecha": "2024-10-06"
  },
  {
    "id_evento": 4,
    "titulo": "Torneo MK11",
    "participantes": 2,
    "fecha": "2024-03-07"
  },
  {
    "id_evento": 7,
    "titulo": "Ruta Moto",
    "participantes": 2,
    "fecha": "2024-04-16"
  },
  {
    "id_evento": 6,
    "titulo": "Furbo",
    "participantes": 1,
    "fecha": "2024-05-21"
  }
]
```

En caso de que no se encuentren eventos:
```  
0
```

Si se produce un error al ejecutar la consulta:
```  
-1
```
## CARGAR EVENTOS MÁS PRÓXIMOS
Se buscarán los 30 pendientes de realizar cuya fecha de realización sea posterior a la actual.

| OUTPUT | PETICIÓN                            | INPUT     |
| ------ | ----------------------------------- | --------- |
|        | ***IP:PORT***/eventos/close_events/ | JSON/0/-1 |
Se devolverá un JSON en caso de respuesta exitosa del servidor:
```  
[
  {
    "id_evento": 6,
    "titulo": "Furbo",
    "fecha": "2024-05-21",
    "ubicacion": "Polideportivo Santa Inés"
  },
  {
    "id_evento": 5,
    "titulo": "Quedad Parkour",
    "fecha": "2024-10-06",
    "ubicacion": "Parque Delicias"
  },
  {
    "id_evento": 11,
    "titulo": "S.K.A.T.E.",
    "fecha": "2025-05-12",
    "ubicacion": "SkateparK"
  }
]
```

En caso de que no se encuentren eventos:
```  
0
```

Si se produce un error al ejecutar la consulta:
```  
-1
```