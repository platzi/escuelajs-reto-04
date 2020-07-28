const fetchOrder = require('./utils/fetchOrders');
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      const error = new Error('Lo sentimos, su pedido no fue realizado.');
      reject(error);
    }
  });
}

function randomTime(min, max) {
  min = 1;
  max = 9;
  return parseInt(Math.random() * (max - min) + min) * 1000;
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
    })
  orders(randomTime(), menu.pizza, table[2])
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.error(err));
};

const waiter3 = async () => {
  try {
    const order1 = await orders(randomTime(), menu.hotdog, table[1])
    const order2 = await orders(randomTime(), menu.pizza, table[1])
    const order3 = await orders(randomTime(), menu.hotdog, table[1])
    console.log(order1)
    console.log(order2)
    console.log(order3)
  }
  catch (error) {
    console.log(error);
  }
}

const waiter4 = async (url_api) => {
  try {
    const food = await fetchOrder(url_api)
    const order1 = await orders(randomTime(), food.data, table[4]);
    const order2 = await orders(randomTime(), food.data, table[4]);
    const order3 = await orders(randomTime(), food.data, table[4])
    const order4 = await orders(randomTime(), food.data, table[4])
    console.log(order1);
    console.log(order2);
    console.log(order3);
    console.log(order4);
  }
  catch (error) {
    console.error(error);
  }
}

waiter();
waiter2();
waiter3();
waiter4(API);
