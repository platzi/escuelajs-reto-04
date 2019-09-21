const fetch = require("node-fetch");
const API = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";

const randomTime = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
    if (!time || !product || !table) {
      reject(new Error("time or pruduct or table not defined"));
    }
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = () => {
  orders(randomTime(1000, 8000), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(1000, 8000), menu.pizza, table[0])
    .then(res => console.log(res))
    .catch(err => console.error(err));
  orders(randomTime(1000, 8000), menu.hotdog, table[2])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter3 = async () => {
  try {
    const order1 = await orders(
      randomTime(1000, 8000),
      menu.hamburger,
      table[1]
    );
    const order2 = await orders(randomTime(1000, 8000), menu.hotdog, table[1]);
    const order3 = await orders(randomTime(1000, 8000), menu.pizza, table[1]);

    const table2 = await [order1, order2, order3];

    return table2.map(value => console.log(value));
  } catch (error) {
    console.error(error);
  }
};

const fetchOrders = async (api, time, table) => {
  const dataCombo = await fetch(api);
  const comboObject = await dataCombo.json();
  const comboString = await comboObject.data;
  const ORDER = await orders(time, comboString, table);
  return ORDER;
};

const waiter4 = async () => {
  try {
    const order1 = await fetchOrders(API, randomTime(1000, 8000), table[4]);
    const order2 = await fetchOrders(API, randomTime(1000, 8000), table[4]);
    const order3 = await fetchOrders(API, randomTime(1000, 8000), table[4]);
    const order4 = await fetchOrders(API, randomTime(1000, 8000), table[4]);

    const table5 = await [order1, order2, order3, order4];

    return table5.map(value => console.log(value));
  } catch (error) {
    console.error(error);
  }
};

waiter();
waiter2();
waiter3();
waiter4();
