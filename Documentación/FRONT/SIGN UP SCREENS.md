## CREACIÓN DE USUARIO:
El usuario introduce los datos con los que creará su usuario, sin contar con las redes sociales, las cuales podrá añadir en la ventana de edición de perfil.

***IMPORTANTE***: no debe quedar vacío ningún campo.

| OUTPUT                                           | PETICIÓN                                                                            | INPUT            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- | ---------------- |
| usuario, clave, nombre, apel1, apel2, f_nac, bio | ***IP:PORT***/usuarios/add/[usuario]&[clave]&[nombre]&[apel1]&[apel2]&[f_nac]&[bio] | id_usuario<br>-1 |

Ejemplo de JSON devuelto por creación de usuario satisfactoria:

```  json
[{"id_usuario":9}] 
```

Ejemplo de resultado en caso de error por nombre de usuario ya existente:

```  
-1
```
