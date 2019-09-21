const randomTime = () => {
  return Math.floor((Math.random() * 7000) + 1000);
};

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
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.pizza, table[0])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  
  orders(randomTime(), menu.hotdog, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

waiter();
waiter2();
