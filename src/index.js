const fetch = require('node-fetch');

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time === undefined || product === undefined || table === undefined) {
      reject('No se mandaron todos los argumentos');
    } else {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}.`);
      }, time);
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = (min = 1000, max = 8000) => Math.floor(Math.random() * (max - min + 1) + min);

const fetchOrders = (time, table) => fetch('https://us-central1-escuelajs-api.cloudfunctions.net/orders', { mode: 'no-cors' })
  .then((res) => new Promise((resolve, reject) => (res.ok ? resolve(res) : reject("No se pudo procesar"))))
  .then((res) => res.json())
  .then((res) => orders(time, res.data, table))

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  const firstTable = () => new Promise((resolve, reject) => orders(randomTime(), menu.hotdog, table[0])
    .then((res) => resolve(res))
    .catch((err) => reject(err)));
  
  const secondTable = () => new Promise((resolve, reject) => orders(randomTime(), menu.pizza, table[2])
    .then((res) => resolve(res))
    .catch((err) => reject(err)));
  
  firstTable()
    .then((res) => {
      console.log(res);
      return secondTable();
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.error(err))  
}

const waiter3 = async () => {
  const time = [randomTime(), randomTime(), randomTime()];
  const deliveryTime = Math.max.apply(null, time);
  try {
    const ordersInTable = await Promise.all([
      new Promise((resolve, reject) => {
        orders(deliveryTime, menu.hotdog, table[1])
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }),
      new Promise((resolve, reject) => {
        orders(deliveryTime, menu.pizza, table[1])
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }),
      new Promise((resolve, reject) => {
        orders(deliveryTime, menu.hotdog, table[1])
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
    ])
    ordersInTable.forEach((order) => console.log(order));
  } catch(err) {
    console.error(err);
  }
}

const waiter4 = async () => {
  const time = [randomTime(), randomTime(), randomTime()];
  const deliveryTime = Math.max.apply(null, time);
  try {
    const ordersInTable = await Promise.all([
      fetchOrders(deliveryTime, table[4]),
      fetchOrders(deliveryTime, table[4]),
      fetchOrders(deliveryTime, table[4]),
      fetchOrders(deliveryTime, table[4]),
    ]);
    ordersInTable.forEach((order) => console.log(order));
  } catch (err) {
    console.log(err);
  }
}

waiter();
waiter2();
waiter3();
waiter4();