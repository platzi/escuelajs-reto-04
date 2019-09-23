function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
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
    return waiter2()
};
const waiter2 = (orders2, orders3) => {
  orders(randomTime(1000, 8001), menu.hotdog, table[0])
    .then((res) => {console.log(res)} )
    .catch((err) => console.error(err));
  orders(randomTime(1000, 8001), menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  return waiter3()
};

const waiter3 = (orders4, orders5, orders6) => {
  orders(randomTime(1000, 8001), menu.hotdog, table[1])
  .then((res) => {console.log(res); return orders(randomTime(1000, 8001), menu.pizza, table[1])}) 
  .then((res) => {console.log(res); return orders(randomTime(1000, 8001), menu.hotdog, table[1])})
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

}
waiter();
