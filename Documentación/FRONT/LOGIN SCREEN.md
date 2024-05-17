### INICIO DE SESIÓN:
El usuario introduce su nombre de usuario y clave(contraseña). El BACK devuelve la "id_usuario" para que la APP la pueda usar para realizar peticiones y comprobaciones.

| OUTPUT        | PETICIÓN                                       | INPUT      |
| ------------- | ---------------------------------------------- | ---------- |
| usuario,clave | ***IP:PORT***/usuarios/login/[usuario]&[clave] | id_usuario |

Ejemplo de JSON devuelto por el BACK:

```  JSON
[
  {
    "id_usuario": 1
  }
]  
```
