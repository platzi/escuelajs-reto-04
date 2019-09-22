const MIN = 1000;
const MAX = 8000;

const randomTime = (min = MIN, max = MAX) =>
  Math.ceil(Math.random() * (max - min + 1) + min);

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!table) {
      reject("No hay mesas");
    }
    if (!product) {
      reject("No hay productos");
    }
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
  });
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = () => {
  let time = randomTime();
  orders(time, menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = async () => {
  try {
    var take_orders = [
      { menu: menu.hotdog, table: table[0] },
      { menu: menu.pizza, table: table[2] }
    ];
    var promise_orders = take_orders.map(take_order => {
      let time = randomTime();
      return orders(time, take_order.menu, take_order.table);
    });
    var result = await Promise.all(promise_orders);
    result.forEach(res => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

const waiter3 = async () => {
  let take_orders = [
    { menus: [menu.hotdog, menu.pizza, menu.hotdog], table: table[1] }
  ];
  let promise_orders = [];
  try {
    take_orders.forEach(take_order => {
      take_order.menus.forEach(menu => {
        let time = randomTime();
        promise_orders.push(orders(time, menu, take_order.table));
      });
    });
    var result = await Promise.all(promise_orders);
    result.forEach(res => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

const fetchOrders = async () => {
  const URL = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";
  const fetch = require("node-fetch");
  try {
    let response = await fetch(URL);
    let result = await response.json();
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

const waiter4 = async () => {
  let menus = [];
  for (i = 0; i < 4; i++) {
    menu_item = await fetchOrders();
    menus.push(menu_item);
  }
  let take_orders = [{ menus, table: table[4] }];
  let promise_orders = [];
  try {
    take_orders.forEach(take_order => {
      take_order.menus.forEach(menu => {
        let time = randomTime();
        promise_orders.push(orders(time, menu, take_order.table));
      });
    });
    var result = await Promise.all(promise_orders);
    result.forEach(res => console.log(res));
  } catch (err) {
    console.error(err);
  }
};

// waiter();
// waiter2();
// waiter3();
waiter4();
