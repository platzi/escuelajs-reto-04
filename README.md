# escuelajs-reto-04
Reto 4 Septiembre 21: Curso de Profesional de JavaScript

# Actualización

Esta versión introduce cambios importantes en la estructura del proyecto. Se incluye el paquete `node-fetch` para realizar peticiones asíncronas en la aplicación.

El paquete `node-fetch` se utiliza de la siguiente forma:

```
fetch(recurso, [{optiones}])
```

Donde `recurso` es un string hacia el recurso que se desea obtener, y `options` debe ser un objeto con las opciones necesarias para poder realizar y obtener la información.

Para mayor información sobre el paquete, se puede revisar la siguiente documentación: 

* [NPM](https://www.npmjs.com/package/node-fetch)
* [Github](https://github.com/bitinn/node-fetch) 

# Instalación

Para instalar los paquetes requeridos, es necesario ejecutar en la Terminal el comando:

```
npm install
```

# Ejecución

```
npm start
```

### Primer problema
Crea una función llamada "randomTime" que te permita retornar un valor en mili segundos de forma aleatoria en el rango de 1000ms hasta 8000ms.

* Completa la función "orders" manejando el reject.
* Utiliza la función de randomTime

### Segundo Problema

Crea una función llamada "waiter2" que se encargue de recoger dos pedidos, uno de la "Mesa 1" y otro de la "Mesa 3".

Pedido "Mesa 1": Combo Hotdog
Pedido "Mesa 3": Combo Pizza

* Utiliza Promesas Encadenadas
* Utiliza la función de randomTime

### Tercer Problema

Crea una función llamada "waiter3" que se encargue de recoger el pedido de la "Mesa 2" el pedido solo puede ser entregado hasta que todos los plantillos estén listos para ser servidos.

* Pedido "Mesa 2": Combo Hotdog, Combo Pizza, Combo Hotdog

* Utiliza Async/Await
* Manejo de errores
* Utiliza la función de randomTime

### Cuarto Problema (Opcional)

Crea una función llamada "fetchOrders" que realice un llamado a la API de ordenes y una función llamada "waiter4" que se encargue de solicitar 4 pedidos que deban de ser entregados hasta que estén todos listos.

* API: https://us-central1-escuelajs-api.cloudfunctions.net/orders
* Utiliza Async/Await
* Manejo de errores

# Enviar solución de reto

Debes de crear un "Fork" de este proyecto, revolver los problemas y crear un Pull Request hacia este repositorio.

# Contribuir
Si alguien quiere agregar o mejorar algo, lo invito a colaborar directamente en este repositorio: [escuelajs-reto-04](https://github.com/platzi/escuelajs-reto-04/)

# Licencia
escuelajs-reto-04 se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).
