const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
const fetch = require("node-fetch");

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time, product, table) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject('Aldo salió mal con el pedido');
    }
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const randomTime = (time) => {
  return Math.floor(Math.random() * (8000 - 1000)) + 1000;
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.pizza, table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.err(err))
}

async function waiter3() {
  let order = [
    orders(randomTime(), menu.hotdog, table[1]),
    orders(randomTime(), menu.pizza, table[1]),
    orders(randomTime(), menu.hotdog, table[1])
  ]
  try {
    let result = await Promise.all(order)
    console.log(result)
  } catch (order) {
    console.error('algo salio mal')
  }
} 

const fetchOrders = () => {
  return new Promise((resolve) => {
    resolve(fetch(API)
      .then((response) => response.json())
      .then(combo => combo.data)
      .catch((error) => console.error(`Hubo un problema con la petición: ${error.message}`)))
  })
}

async function waiter4() {
  let combo = [
    fetchOrders(),
    fetchOrders(),
    fetchOrders(),
    fetchOrders(),
  ]  
  try {
    let combos = await Promise.all(combo)
    let order = [
      orders(randomTime(), combos[0], table[4]),
      orders(randomTime(), combos[1], table[4]),
      orders(randomTime(), combos[2], table[4]),
      orders(randomTime(), combos[3], table[4]),
    ]    
    let result = await Promise.all(order)
    console.log(result)
  } catch (order) {
    console.error('algo salio mal')
  }
}

waiter();
waiter2();
waiter3();
waiter4();
