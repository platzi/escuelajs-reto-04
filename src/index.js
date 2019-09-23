function randomTime() {
  const max = 8000
  const min = 1000
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
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
    return waiter2()
};
const waiter2 = (orders2, orders3) => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  orders(randomTime(), menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  return waiter3()
};

async function  waiter3  (orders4, orders5, orders6) {
  try{
    const order4 = await orders(randomTime(), menu.hotdog, table[1])
    const order5 = await orders(randomTime(), menu.pizza, table[1])
    const order6 = await orders(randomTime(), menu.hotdog, table[1])
    console.log(order4);
    console.log(order4);
    console.log(order4);
  }
  catch(err) {
    console.error(err)
  }
}
waiter();