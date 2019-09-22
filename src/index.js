const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time == null || product == null || table == null) {
      reject(new Error("Orden Incompleta, Falto parametro de tiempo o producto o mesa"))
    } else {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
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

function randomTime() {
  return Math.floor(Math.random() * (8001 - 1000)) + 1000
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => { console.log(`Waiter 2 ${res}`) })
  orders(randomTime(), menu.pizza, table[2])
    .then(res => console.log(`Waiter 2 ${res}`))
    .catch((err) => console.error(err));
};

async function waiter3() {
  try {
    order1 = await orders(randomTime(), menu.hotdog, table[1]);
    order2 = await orders(randomTime(), menu.pizza, table[1]);
    order3 = await orders(randomTime(), menu.hotdog, table[1]);
    console.log("waiter 3, Pedidos completados", order1, order2, order3);
  } catch (error) {
    console.log(`Error para waiter 3 ${error} `)
  }
}

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

const fetchOrders = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      const DONE = 4;
      const OK = 200;
      if (this.readyState === DONE) {
        if (this.status === OK) {
          resolve(JSON.parse(this.responseText))
        } else {
          reject(new Error(`Error read API orders ${this.status}`))
        }
      }
    }
    xhttp.open('GET', url_api, false);
    xhttp.send(null);
  })
}

async function waiter4() {
  try {
    order1 = await fetchOrders(API, table[4]);
    order2 = await fetchOrders(API);
    order3 = await fetchOrders(API);
    order4 = await fetchOrders(API);
    console.log("waiter 4, Pedidos completados --> ", order1, order2, order3, order4);
  } catch (error) {
    console.log(`Error para waiter 4 -->  ${error} `)
  }
}

waiter();
waiter2();
waiter3();
waiter4();
