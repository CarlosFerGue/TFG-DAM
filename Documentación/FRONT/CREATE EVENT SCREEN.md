## PUBLICACIÓN DE UN NUEVO EVENTO:
El usuario introduce los datos con los que creará un nuevo evento. Primero se comprobará si ya hay un evento publicado con los mismos datos. Si no existe, se publicará el evento.

***IMPORTANTE***: el usuario no puede tener activos más de 3 eventos, esto viene más especificado en el siguiente apartado.

| OUTPUT                                                                         | PETICIÓN                                                                                                          | INPUT          |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | -------------- |
| titulo, fecha, hora, descripcion, edad_min, edad_max, ubicacion, participantes | ***IP:PORT***/eventos/add/[titulo]&[fecha]&[hora]&[descripcion]&[edad_min]&[edad_max]&[ubicacion]&[participantes] | id_evento/0/-1 |

Ejemplo de JSON devuelto por creación de usuario satisfactoria:

```  
id_evento
```

Ejemplos de resultados en caso de fallo en la ejecución o error:
```  
0
```
```  
-1
```

En caso de que el evento ya exista, es decir, que todos los campos que se van a introducir ya coincidan con los de algún evento existente:
```  
-2
```


## RESTRICCIÓN DE EVENTOS MÁXIMOS:
Los usuarios no podrán tener publicados más de 3 eventos cuya fecha de realización sea posterior a la actual, por lo que, en caso de hacer clic en el botón de "crear nuevo evento", se realizará la siguiente consulta:

| OUTPUT     | PETICIÓN                                            | INPUT   |
| ---------- | --------------------------------------------------- | ------- |
| id_usuario | ***IP:PORT***/usuarios/check_user_events/id_usuario | 1+/0/-1 |

En caso de que la consulta devuelva un 3 o superior, el acceso del usuario a la pantalla de eventos será restringido hasta que pase la fecha de realización de alguno de los 3 eventos o los elimine:
```  
3+
```

Si el usuario cuenta con 2 eventos pendientes o menos, podrá acceder a la pantalla:
```  
2 / 1 / 0
```

Si hay un fallo en la realización de la consulta:
```  
-1
```