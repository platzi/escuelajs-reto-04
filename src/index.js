const fetch = require("node-fetch");
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders/';

const randomTime = () => {
  let minTime = 1000, maxTime = 8000;
  let numRandom = (Math.random() * (maxTime - minTime) + minTime).toFixed(2);
  return numRandom;
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    true 
      ? setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
        }, time)
      : reject();
  });
}

const fetchOrders = async (apiUrl) => {
  try {
    const request = await fetch(apiUrl, { method: 'GET' });
    const data = await request.json();
    console.log(`### Orden: ${data.data}`);
    return new Promise((resolve, reject) => {
      true 
        ? resolve(`=== Pedido servido: ${data.data}`)
        : reject('Al parecer no salio algo bien con la orden');
    });
  } catch (error) {
    return console.error(error);
  }
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then(res => console.log(res))
    .catch(error => console.error(error));
};

const waiter3 = async() => {
  try {
    const orderOne = await orders(randomTime(), menu.hotdog, table[1]);
    const orderTwo = await orders(randomTime(), menu.pizza, table[1]);
    const orderThree = await orders(randomTime(), menu.hotdog, table[1]);
    console.log(`${orderOne}\n${orderTwo}\n${orderThree}`);
  } catch (error) {
    console.log(error);
  }
};

const waiter4 = async (apiUrl) => {
  try {
    const orderOne = await fetchOrders(apiUrl);
    const orderTwo = await fetchOrders(apiUrl);
    const orderThree = await fetchOrders(apiUrl);
    const orderFour = await fetchOrders(apiUrl);
    console.log(`${orderOne}\n${orderTwo}\n${orderThree}\n${orderFour}`);
  } catch (error) {
    console.error(error);
  }
}

waiter();
waiter2();
waiter3();
waiter4(API);