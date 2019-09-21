const fetch = require("node-fetch");
const TIME_MAX = 8000;
const TIME_MIN = 1000;
const ORDERS_API = `https://us-central1-escuelajs-api.cloudfunctions.net/orders`;
const ORDER_ONLINE = `DOMICILIO`;

const orders = (time, product, table = ORDER_ONLINE) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para ${table}`
      );
    }, time);
  });
};

const fetchOrders = async () => {
  const response = await fetch(ORDERS_API);
  let json;
  if (response.ok) {
    json = await response.json();
  } else {
    json = {
      error: `HTTP-Error: ${response.status}`
    };
  }
  return json;
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiterTwo = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));
};

const waiterThree = async () => {
  try {
    let orderFull = await Promise.all([
      orders(randomTime(), menu.hotdog, table[1]),
      orders(randomTime(), menu.pizza, table[1]),
      orders(randomTime(), menu.hotdog, table[1])
    ]);
    orderFull.forEach(plates => {
      console.log(plates);
    });
  } catch (err) {
    console.log(err);
  }
};

const waiterFour = async () => {
  try {
    let numberError = 0;
    const ordersOnline = await Promise.all([
      fetchOrders(),
      fetchOrders(),
      fetchOrders(),
      fetchOrders()
    ]);
    ordersOnline.forEach(item => {
      if (item.error) {
        console.log(`### ${item.error}`);
        numberError++;
      }
    });
    if (numberError === 0) {
      const orderFull = await Promise.all([
        orders(randomTime(), ordersOnline[0].data),
        orders(randomTime(), ordersOnline[1].data),
        orders(randomTime(), ordersOnline[2].data),
        orders(randomTime(), ordersOnline[3].data)
      ]);
      orderFull.forEach(plates => {
        console.log(plates);
      });
    }
  } catch (error) {
    console.log(`Hubo un error ${error.message}`);
  }
};

const randomTime = () => {
  return Math.round(Math.random() * (TIME_MAX - TIME_MIN)) + TIME_MIN;
};

waiter();
waiterTwo();
waiterThree();
waiterFour();