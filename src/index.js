let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let minTime = 1000, maxTime = 8000;
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'

const fetchOrders = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true)
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4){
        (xhttp.status === 200)
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error('El mesero se lo comió por que no funcionó', url_api));
      }
    }
    xhttp.send();
  })
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject(new Error('El pedido se lo comió el hombre invisible'))
    }
  });
}

const randomTime = (min, max) => Math.round(Math.random() * (max - min)) + min;

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(minTime, maxTime), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(minTime, maxTime), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(minTime, maxTime), menu.pizza, table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter3 = async () => {
  try {
    const orderOne = await orders(randomTime(minTime, maxTime), menu.hotdog, table[1]);
    const orderTwo = await orders(randomTime(minTime, maxTime), menu.pizza, table[1]);
    const orderThree = await orders(randomTime(minTime, maxTime), menu.hotdog, table[1]);

    console.log(orderOne);
    console.log(orderTwo);
    console.log(orderThree);
  } catch (err) {
    console.error(err);
  }
}

const waiter4 = async (url_api) => {
  try {
    const ped = await fetchOrders(url_api);
    const orderOne = await orders(randomTime(minTime, maxTime), ped.data, table[0]);
    const orderTwo = await orders(randomTime(minTime, maxTime), ped.data, table[1]);
    const orderThree = await orders(randomTime(minTime, maxTime), ped.data, table[2]);
    const orderFour = await orders(randomTime(minTime, maxTime), ped.data, table[4]);

    console.log(orderOne);
    console.log(orderTwo);
    console.log(orderThree);
    console.log(orderFour);
  } catch (err) {
    console.error(err);
  }
}

// waiter();
// waiter2();
// waiter3();
waiter4(API);
