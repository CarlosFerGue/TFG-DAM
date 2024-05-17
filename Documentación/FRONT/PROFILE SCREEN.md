## CARGA DE DATOS DEL USUARIO:
Al acceder a la pantalla de un usuario, se realizará una petición usando su ID que devolverá toda la información de ese usuario junto a los eventos que ha organizado y aquellos en los que ha participado.
La pantalla que se usará para mostrar otros usuarios como la propia será la misma, simplemente que, al acceder, compruebe que la ID del usuario que esté cargando será la misma que la del inicio de sesión:
1. En caso de que coincidan, quiere decir que está entrando a su propio perfil, por lo que cargará los botones relacionados con la edición el perfil y de cerrar sesión.
2. En caso contrario, no cargará los botones, ya que estará visualizando el perfil de otro usuario.

| OUTPUT     | PETICIÓN                                       | INPUT     |
| ---------- | ---------------------------------------------- | --------- |
| id_usuario | ***IP:PORT***/usuarios/load_profile/id_usuario | JSON/0/-1 |
Ejemplo de JSON devuelto por creación de usuario satisfactoria:
```  JSON
{
  "id_usuario": 1,
  "usuario": "gamiluu",
  "clave": "123",
  "nombre": "Gabriel",
  "apel1": "Milagro",
  "apel2": "López",
  "f_nac": "2002-05-19",
  "bio": "Hola me justa la nintendos y el skate.",
  "ig": null,
  "fb": null,
  "x": null,
  "yt": null,
  "tt": null,
  "organizados": [
    {
      "id_evento": 3,
      "titulo": "Ruta Panticosa",
      "fecha": "2024-06-03"
    },
    {
      "id_evento": 4,
      "titulo": "Torneo MK11",
      "fecha": "2024-06-03"
    }
  ],
  "participados": [
    {
      "id_evento": 4,
      "titulo": "Torneo MK11",
      "fecha": "2024-06-03"
    },
    {
      "id_evento": 5,
      "titulo": "Quedad Parkour",
      "fecha": "2024-06-03"
    },
    {
      "id_evento": 6,
      "titulo": "Furbo",
      "fecha": "2024-06-03"
    }
  ]
}
```

Ejemplos de resultados en caso de fallo en la carga o error:
```  
0
```
```  
-1
```