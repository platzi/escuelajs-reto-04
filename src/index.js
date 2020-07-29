const orders = (randomTime, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${randomTime}ms para la ${table}`);
      }, randomTime);
    } else {
      reject('Error');
    }

  });
}

const randomTime = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(1000, 8001), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders(randomTime(1000, 8001), menu.hotdog, table[0])
  .then((res) => console.log(res))
  return orders(randomTime(1000, 8001), menu.pizza, table[2])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
}

waiter2();