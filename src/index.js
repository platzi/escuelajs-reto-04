const fetch = require("node-fetch");
const now = require("performance-now");

const MS_MIN = 1000;
const MS_MAX = 8000;
const API = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";

const randomTime = () => {
  return Math.floor(Math.random() * (MS_MAX - MS_MIN) + MS_MIN);
};

const randomTable = table => {
  min = 0;
  max = table.length - 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const paramsValidate = (time, product, table) => {
  if (!product) return "el producto no existe.";
  else if (!table) return "la mesa no existe.";
};

const orders = (time, product, table) => {
  return new Promise((resolve, reject) => {
    result = paramsValidate(time, product, table);
    if (result) return reject(result);

    console.log(`### Orden: ${product} para ${table}`);
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
    }, time);
    // }
  });
};

// Primer Problema
const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then(res => {
      console.log("\n ********************* Primer Problema");
      console.log(res);
      console.log(" ********************* \n");
    })
    .catch(err => console.error(`La orden no se pudo procesar: ${err}`));
};
waiter();

// Segundo Problema
// Pedido "Mesa 1": Combo Hotdog
// Pedido "Mesa 3": Combo Pizza

const waiter2 = () => {
  const res = {};
  orders(randomTime(), menu.hotdog, table[0])
    .then(result => {
      res.data = result;
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then(result => {
      console.log("\n ********************* Segundo Problema");
      console.log(res.data);
      console.log(result);
      console.log(" ********************* \n");
    })
    .catch(err => console.error(`La orden no se pudo procesar: ${err}`));
};
waiter2();

// Tercer Problema
// Pedido "Mesa 2": Combo Hotdog, Combo Pizza, Combo Hotdog

const waiter3 = async () => {
  try {
    const pedido1 = await orders(randomTime(), menu.hotdog, table[1]);
    const pedido2 = await orders(randomTime(), menu.pizza, table[1]);
    const pedido3 = await orders(randomTime(), menu.hotdog, table[1]);
    console.log("\n ********************* Tercer Problema");
    console.log(pedido1);
    console.log(pedido2);
    console.log(pedido3);
    console.log(" ********************* \n");
  } catch (error) {
    console.log(`La orden no se pudo procesar: ${error}`);
  }
};
waiter3();

// Cuarto Problema
const fetchOrders = async table => {
  const start = now();
  const response = await fetch(API);

  if (response.status != 200) throw response.statusText;

  const result = await response.json();
  const totalTime = (now() - start).toFixed(0);

  console.log(`### Orden: ${result.data} para la Mesa ${table}`);
  return `=== Pedido servido: ${result.data}, tiempo de preparación ${totalTime}ms para la mesa ${table}`;
};

const waiter4 = async () => {
  try {
    const mesa = randomTable(table);
    const pedido1 = await fetchOrders(mesa);
    const pedido2 = await fetchOrders(mesa);
    const pedido3 = await fetchOrders(mesa);
    const pedido4 = await fetchOrders(mesa);
    console.log("\n ********************* Cuarto Problema");
    console.log(pedido1);
    console.log(pedido2);
    console.log(pedido3);
    console.log(pedido4);
    console.log(" ********************* \n");
  } catch (error) {
    console.log("\n ********************* Cuarto Problema");
    console.log(`La orden no se pudo procesar: ${error} \n`);
    console.log(" ********************* \n");
  }
};
waiter4();
