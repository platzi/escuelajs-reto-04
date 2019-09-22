const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!time || !product || !table) {
      reject(new Error("Faltó especificar datos de la orden."));
    }
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación: ${time}ms para la ${table}`
      );
    }, time);
  });
};

const randomTime = (max, min) => Math.round(Math.random() * (max - min) + min);
const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};
const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];
const API = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";
const fetch = require("node-fetch");

const waiter = () => {
  orders(randomTime(1000, 8000), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(`Ocurrió un error con el mesero 1: ${err}`));
};

const waiter2 = () => {
  orders(randomTime(1000, 8000), menu.hotdog, table[0]).then(res => {
    console.log(res);
  });
  orders(randomTime(1000, 8000), menu.pizza, table[2])
    .then(res => console.log(res))
    .catch(err => console.log(`Ocurrió un error con el mesero 2: ${err}`));
};

const waiter3 = async () => {
  try {
    const dishes = [
      orders(randomTime(1000, 8000), menu.hotdog, table[1]),
      orders(randomTime(1000, 8000), menu.pizza, table[1]),
      orders(randomTime(1000, 8000), menu.hotdog, table[1])
    ];

    const response = await Promise.all(dishes);
    console.log(response[0]);
    console.log(response[1]);
    console.log(response[2]);
  } catch (error) {
    console.log(`Ocurrió un error con el mesero 3: ${error}`);
  }
};

const fetchOrders = async () => {
  try {
    const response = await fetch(API);
    let ordersResponse = await response.json();
    return ordersResponse.data;
  } catch (error) {
    console.log(`Ocurrió un error al obtener las ordenes: ${error}`);
  }
};

const waiter4 = async () => {
  try {
    const ordersReceived = await Promise.all([
      fetchOrders(),
      fetchOrders(),
      fetchOrders(),
      fetchOrders()
    ]);

    ordersReceived.forEach(dish => {
      if (dish.error) {
        console.log(`Ocurrió un error: ${error}`);
      }
    });

    const dishes = [
      orders(randomTime(1000, 8000), ordersReceived[0], table[4]),
      orders(randomTime(1000, 8000), ordersReceived[1], table[4]),
      orders(randomTime(1000, 8000), ordersReceived[2], table[4]),
      orders(randomTime(1000, 8000), ordersReceived[3], table[4])
    ];

    const serveDishes = await Promise.all(dishes);
    console.log(serveDishes[0]);
    console.log(serveDishes[1]);
    console.log(serveDishes[2]);
    console.log(serveDishes[3]);
  } catch (error) {
    console.log(`Ocurrió un error con el mesero 4: ${error}`);
  }
};

waiter();
waiter2();
waiter3();
waiter4();
