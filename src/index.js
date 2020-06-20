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
  orders(randomTime(), menu.hotdog, table[1])
    .then((res) => console.log(res))
    .then(orders(randomTime(), menu.pizza, table[3])
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
    )
    .catch((err) => console.error(err));
};

const waiter3 = async () => {
  await orders(randomTime(), menu.hamburger, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  await waiter2()
};

const randomTime = () => {
  let time = (Math.round(Math.random() * 7000) + 1000);
  return time;
}

waiter();
waiter2();
waiter3();
