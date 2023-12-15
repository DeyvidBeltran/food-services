
## Primeros pasos

En primer lugar, construya los contenedores docker:

```bash
docker compose up 
```

Reiniciar manualmente unicamente el contenedor de pedidos si no funciona correctamente el consumer de Rabbit.

### BD

Ejecutar los scripts que se encuentran en el archivo: scripts.sql

## Servicio Pedidos

El servicio de pedidos permite crear pedidos por medio de la siguiente URL: [link](localhost:3000/api/pedidos/crear)

Metodo: POST

Utilizar el siguiente json: 
```bash
{
    "id": 1,
    "id_cliente": 1,
    "id_restaurante": 1,
    "descripcion": "Descripcion"
}
```

## Servicio Entregas

El servicio de entregas permite actualizar los datos por medio de la siguiente URL: [link](localhost:3001/api/entregas)

Metodo: PUT

Utilizar el siguiente json: 
```bash
{
    "id": 1,
    "id_cliente": 1,
    "id_restaurante": 1,
    "descripcion": "Descripcion"
}
```

## Servicio Pagos
### Crear pagos
El servicio de pagos permite crear pedidos por medio de la siguiente URL: [link](localhost:3002/api/pagos/crearPago)

Utilizar el siguiente json: 
```bash
{
    "id": 1,
    "id_pedido": 1,
    "valor": 100,
    "metodo": "credito "  
}
```

### Actualizar pagos
El servicio de pagos permite actualizar los datos por medio de la siguiente URL: [link](localhost:3002/api/pagos/actualizarPago)

Metodo: PUT

Utilizar el siguiente json: 
```bash
{
    "id": 1,
    "valor": 50,
    "metodo": "debito"  
}
```

## Servicio Restaurante

### Crear Restaurante

El servicio de restaurante permite crear restaurantes por medio de la siguiente URL: [link](localhost:3003/api/restaurantes/crearRestaurante)

Metodo: POST

Utilizar el siguiente json: 
```bash
{
    "id": 1,
    "nombre": "Restaurante",
    "menu": "Pollo",
    "activo": true
}
```
### Actualizar Restaurante

El servicio de restaurante permite actualizar los datos por medio de la siguiente URL: [link](localhost:3003/api/restaurantes/actualizarRestaurante)

Metodo: PUT

Utilizar el siguiente json: 
```bash
{
    "id": 1,
    "nombre": "Restaurante",
    "menu": "Pollo",
    "activo": true
}
```

## Servicio Notificaciones

El servicio de notificaciones permite enviar correos por medio de la siguiente URL: [link](localhost:3004/api/notificaciones/crear)

Metodo: GET

## Autor

Deyvid Arley Beltran -- Deyvid44@hotmail.com