const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
    if (!time || !product || !table) {
      reject(new Error(`No se puede procesar falta un requerimiento..`))
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];


// Primer problema
// Crea una función llamada "randomTime" que te permita retornar un valor en mili segundos de forma aleatoria en el rango de 1000ms hasta 8000ms.
// Completa la función "orders" manejando el reject.
// Utiliza la función de randomTime
function randomTime() {
  var min = 1000, max = 8000;
  var rand = Math.floor((Math.random() * (max - min + 1)) + min);
  return rand;
}

const waiter = () => {
  console.log(`Atendiendo...bot waiter`)
  orders(randomTime(), menu.hamburger, table[3])
    .then((respuesta) => console.log(respuesta))
    .catch((err) => console.error(err));
};


waiter();

// Segundo Problema
// Crea una función llamada "waiter2" que se encargue de recoger dos pedidos, uno de la "Mesa 1" y otro de la "Mesa 3".

// Pedido "Mesa 1": Combo Hotdog Pedido "Mesa 3": Combo Pizza

// Utiliza Promesas Encadenadas
// Utiliza la función de randomTime
const waiter2 = () => {
  console.log(`Atendiendo...bot waiter2`)
  orders(randomTime(), menu.hotdog, table[0])
    .then((respuesta) => {
      console.log(respuesta);
      return orders(randomTime(), menu.pizza,table[2]);
    })
    .then((respuesta) => console.log(respuesta))
    .catch((err) => console.error(err));
};

waiter2();