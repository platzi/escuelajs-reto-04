const fetch = require("node-fetch");

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time >= 1000 && time <= 8000) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject(new Error('Error: el tiempo de atención debe ser entre 1000ms y 8000ms'));
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = (minTime, maxTime) => {
  return Math.floor(Math.random() * (maxTime - minTime)) + minTime;
}

const waiter = () => {
  orders(randomTime(1000, 8000), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

//waiter();

const waiter2 = () => {
  orders(randomTime(1000, 8000), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(1000, 8000), menu.pizza, table[2]);
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

//waiter2();

const waiter3 = async () => {
  try {
    const order1 = await orders(randomTime(1000, 8000), menu.hotdog, table[1]);
    const order2 = await orders(randomTime(1000, 8000), menu.pizza, table[1]);
    const order3 = await orders(randomTime(1000, 8000), menu.hotdog, table[1]);
    console.log(`Primer Pedido: ${order1}`);
    console.log(`Segundo Pedido: ${order2}`);
    console.log(`Tercer Pedido: ${order3}`);
  } catch (error) {
    console.error('Error', error);
  }
}

//waiter3();

const fetchOrders = async () => {
  const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
  try {
    const response = await fetch(API);
    const combo = await response.json();
    return combo.data;
  } catch (error) {
    console.error("Fetch Error", error);
  }
}
//fetchOrders();

const waiter4 = async () => {
  try {
    const order1 = await orders(randomTime(1000, 8000), await fetchOrders(), table[0]);
    const order2 = await orders(randomTime(1000, 8000), await fetchOrders(), table[1]);
    const order3 = await orders(randomTime(1000, 8000), await fetchOrders(), table[2]);
    const order4 = await orders(randomTime(1000, 8000), await fetchOrders(), table[3]);
    console.log(`Primer Pedido: ${order1}`);
    console.log(`Segundo Pedido: ${order2}`);
    console.log(`Tercer Pedido: ${order3}`);
    console.log(`Cuarto Pedido: ${order4}`);
  } catch (error) {
    console.error('Error', error);
  }
}
waiter4();