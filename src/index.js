const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
    if (!time || !product || !table) {
      reject(`!== Ups, el pedido no puede ser completado`);
    }
  });
};

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza'
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

// waiter();

/** Tiempo mínimo de espera */
const minTime = 1;
/** Tiempo máximo de espera */
const maxTime = 9;
/** Método que retorna un número aleatorio entre el 1 y el 8 multiplicado por 1000 */
const randomTime = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min) * 1000;
};

/**
 * Método que toma las órdenes de las mesas 1 y 3, usando promesas encadenadas
 */
const waiter2 = () => {
  orders(randomTime(minTime, maxTime), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      return orders(randomTime(minTime, maxTime), menu.pizza, table[2]);
    })
    .then(res1 => console.log(res1))
    .catch(err => console.log(err));
};

// waiter2();

/**
 * Se agrega método para resolver los pedidos de la mesa 2 de forma paralela
 */
const waiter3 = async () => {
  try {
    const pedido = await Promise.all([
      orders(randomTime(minTime, maxTime), menu.hotdog, table[1]),
      orders(randomTime(minTime, maxTime), menu.pizza, table[1]),
      orders(randomTime(minTime, maxTime), menu.hotdog, table[1])
    ]);
    pedido.map(val => console.log(val));
  } catch (err) {
    console.error(err);
  }
};

waiter3();
