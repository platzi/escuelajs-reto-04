const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time || !product || !table) {
      reject(
        new Error(
          'Falta alguno de los siguientes datos para preparar la orden: time, product o table'
        )
      );
    } else {
      switch (product) {
        case menu.hamburger:
        case menu.hotdog:
        case menu.pizza:
          break;
        default:
          reject(
            new Error(
              `=== El producto ${product} no se encuentra en el menú :(`
            )
          );
      }
      setTimeout(() => {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        );
      }, time);
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
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

/**
 * Retorna un valor en mili segundos de forma aleatoria en el rango de
 * 1000ms hasta 8000ms.
 */
const randomTime = () => {
  const MAX = 8000; // excluded
  const MIN = 1000;
  return Math.floor(Math.random() * (MAX - MIN)) + MIN;
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter3 = async () => {
  let time = randomTime();
  let manyOrders = [
    await orders(time, menu.hotdog, table[1]),
    await orders(time, menu.pizza, table[1]),
    await orders(time, menu.hotdog, table[1])
  ];
  Promise.all(manyOrders)
    .then(res => console.log(res))
    .catch(err => new Error(`Hubo un problema en la cocina: ${err}`));
};

const fetchOrders = async () => {
  try {
    const url = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
    const fetch = require('node-fetch');
    const response = await fetch(url);
    const info = await response.json();
    switch (info['data']) {
      case menu.hamburger:
        return await orders(randomTime(), menu.hamburger, table[3]);
      case menu.hotdog:
        return await orders(randomTime(), menu.hotdog, table[3]);
      case menu.pizza:
        return await orders(randomTime(), menu.pizza, table[3]);
      default:
        return await orders(randomTime(), info['data'], table[3]);
    }
  } catch (err) {
    console.log(new Error(`Hubo un problema en la apicocina: ${err}`));
  }
};

const waiter4 = async () => {
  let manyOrders = [];
  for (let i = 0; i < 4; i++) {
    manyOrders.push(await fetchOrders());
  }
  Promise.all(manyOrders)
    .then(res => console.log(res))
    .catch(err => new Error(`Hubo un problema en la cocina: ${err}`));
};

/**
 * Descomentar la línea del problema a resolver
 */
// Primer problema
//waiter();
// Segundo problema
//waiter2();
// Tercer problema
//waiter3();
// Cuarto problema
waiter4();
