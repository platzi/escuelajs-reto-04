/* eslint-disable no-console */
const randomTime = (min, max) => Math.ceil(Math.random() * (max - min) + min);

const orders = (product, table) => {
  console.log(`### Orden: ${product} para ${table}\n`);
  return new Promise((resolve, reject) => {
    const time = randomTime(1000, 8200);
    setTimeout(() => {
      if (time < 8000) {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}\n`);
      } else {
        // simulate case reject when time is long in ms
        reject(new TypeError(`Demora en la cocina (${time}ms).
        -- No se pudó cumplir el pedido: ${product} de la ${table}`));
      }
    }, time);
  });
};

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(menu.hamburger, table[3])
    .then((response) => { console.log(response); })
    .catch((error) => { console.warn(error); });
};

// Los pedidos también llegan aleatoriamente, como en la vida real :V
setTimeout(() => { waiter(); }, randomTime(1000, 2000));
