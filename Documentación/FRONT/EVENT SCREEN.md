## CARGA DE DATOS DE UN EVENTO:
Al acceder a un evento, se realizará una petición usando la ID del evento. Esta petición devolverá los datos del evento junto al perfil del organizador y el de los participantes.

| OUTPUT    | PETICIÓN                                   | INPUT          |
| --------- | ------------------------------------------ | -------------- |
| id_evento | ***IP:PORT***/eventos/load_event/id_evento | id_evento/0/-1 |
Ejemplo de JSON devuelto por creación de usuario satisfactoria:
```  json
{
  "id_evento": 5,
  "id_usuario": 2,
  "titulo": "Quedad Parkour",
  "fecha": "2024-06-03",
  "hora": 28800,
  "descripcion": "A dar salticos por ahi.",
  "edad_min": 18,
  "edad_max": 25,
  "ubicacion": "Parque Delicias",
  "participantes": [
    {
      "id_usuario": 1,
      "nombre_com": "Gabriel Milagro López",
      "usuario": "gamiluu"
    },
    {
      "id_usuario": 2,
      "nombre_com": "Carlos Fernández Guevara",
      "usuario": "charly"
    }
  ],
  "organizador": {
    "id_usuario": 2,
    "nombre_com": "Carlos Fernández Guevara",
    "usuario": "charly"
  }
}
```

Ejemplos de resultados en caso de fallo en la carga o error:
```  
0
```
```  
-1
```

Además, deberá comprobar si el ID de inicio de sesión corresponde con el de alguno de los participantes o el del organizador:
1. Si coincide con el del **organizador**, el botón dará la opción de eliminar el evento.
2. Si coincide con el de alguno de los **participantes** significará que estará inscrito, por lo que el botón servirá para desapuntarse.
3. Si no coincide con **ninguno**, el botón servirá para apuntarse al evento.

## APUNTARSE A EVENTO:
Se mandará la ID del usuario y la del evento para insertar la nueva fila en la que se almacena la participación del usuario en ese evento.

| OUTPUT                | PETICIÓN                                                     | INPUT  |
| --------------------- | ------------------------------------------------------------ | ------ |
| id_evento, id_usuario | ***IP:PORT***/participantes/apuntar/[id_evento]&[id_usuario] | 1/0/-1 |

## DESAPUNTARSE DEL EVENTO:
Se mandará la ID del usuario y la del evento para eliminar la fila en la que se almacena la participación del usuario en ese evento.

| OUTPUT                | PETICIÓN                                                        | INPUT  |
| --------------------- | --------------------------------------------------------------- | ------ |
| id_evento, id_usuario | ***IP:PORT***/participantes/desapuntar/[id_evento]&[id_usuario] | 1/0/-1 |

## ELIMINAR EVENTO:
En caso de que el usuario organizador lo desee, podrá eliminar el evento. Para ello se hará uso únicamente de la ID del evento.

| OUTPUT    | PETICIÓN                                              | INPUT  |
| --------- | ----------------------------------------------------- | ------ |
| id_evento | ***IP:PORT***/eventos/delete/[id_evento]&[id_usuario] | 1/0/-1 |
Dentro del BACK, se realizarán las siguientes acciones:
1. Se eliminarán las filas de "participantes_eventos" que contengan la ID del evento.
2. Se eliminará el evento de la tabla "eventos".
