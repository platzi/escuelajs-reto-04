const fetch = require("node-fetch");

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
      );
      reject(Error("Ups algo salío mal :c"));
    }, time);
  });
};

async function fetchOrders(table) {
const url = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";
const start = new Date();
try {
  const response = await fetch(url);
  const data = await response.json();
  const timeTaken= (new Date())-start;
  console.log(`### Orden: ${data.data} para ${table}`);
  return `=== Pedido servido: ${data.data}, tiempo de preparación ${timeTaken}ms para la ${table}`;
} catch (error) {
  console.log(error.message)
}
 

}

function randomTime() {
  let min = 1,
    max = 8;
  var rand = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  return rand;
}

const menu = {
  hamburger: "Combo Hamburguesa",
  hotdog: "Combo Hot Dogs",
  pizza: "Combo Pizza"
};

const table = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5"];

const waiter = () => {
  orders(6000, menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hamburger, table[0])
    .then(res1 => {
      console.log(res1);
      orders(randomTime(), menu.hamburger, table[2]).then(res2 => {
        console.log(res2);
      });
    })

    .catch(err => console.error(err));
};

const waiter3 = async () => {
  let personas = [1, 2, 3];
  let promesas = personas.map(persona =>
    orders(randomTime(), menu.hamburger, table[1])
  );
  try {
    let pedidos = await Promise.all(promesas);
    pedidos.forEach(pedido => {
      console.log(pedido);
    });
  } catch (persona) {
    onerror(persona);
  }
};

const waiter4 = async () => {
  let personas = [1, 2, 3, 4];
  let promesas = personas.map(persona => fetchOrders(table[4]));
  try {
    let pedidos = await Promise.all(promesas);
    pedidos.forEach(pedido => {
      console.log(pedido);
    });
  } catch (persona) {
    onerror(persona);
  }
};

waiter();
waiter2();
waiter3();
waiter4();
