const fetch = require('node-fetch');
const API_URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};
const table = [
  'Mesa 1',
  'Mesa 2',
  'Mesa 3',
  'Mesa 4',
  'Mesa 5'
];

/**
 *  This function return type of product and how long time the order has and the number of the table ;
 * @param time
 * @param product
 * @param table
 * @returns {Promise<*>}
 */
const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`),
          reject(`Something went wrong, try again later`);
    }, time);
  });
};

/**
 * This function fetch data from API which return a json about food information
 * @param api_url string
 * @returns {Promise<*>}
 */

const fetchOrders = async api_url => {
  let response;
  try {
    response = await fetch(api_url)
        .then(res => res.json())
        .then(json => json)
        .catch(() => console.error('Ups! Somenthing went wrong. Try again later.'));
  } catch (error) {
  }
  return response.data;
};

/**
 * This function return a random number between two numbers, in this example return a value between 1000 y 8000
 * @returns {number}
 */
const randomTime = () => parseInt(Math.random() * (8000 - 1000) + 1000);

const waiter = async () => {
  await orders(randomTime(), menu.hamburger, table[3])
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
};

const waiter2 = async () => {
  await orders(randomTime(), menu.hotdog, table[0])
      .then((res) => console.log(res))
      .then(() => {
        return orders(randomTime(), menu.pizza, table[2])
            .then(res => console.log(res))
      })
      .catch((error) => console.error(error));
};

const waiter3 = async () => {
  try {
    await Promise.all([
      orders(randomTime(), menu.hotdog, table[2]),
      orders(randomTime(), menu.pizza, table[2]),
      orders(randomTime(), menu.hotdog, table[2])
    ]).then(values => {
      console.log(values);
    })
  } catch (error) {
    console.error(error);
  }
};

const waiter4 = async (numOrders, numTable) => {
  let dishes = [];
  for (let i = 0; i < numOrders; i++) {
    let combo = await fetchOrders(API_URL);
    await orders(randomTime(), combo, table[numTable])
        .then((res) => {
          dishes.push(res)
        }).then(body => console.log(body))
        .catch((error) => console.log(error));
  }
  console.log(dishes);
};

(async () => {
  try {
    console.log('--------------------- [[ waiter 1 ]] ---------------------');
    await waiter();
    console.log('--------------------- [[ waiter 2 ]] ---------------------');
    await waiter2();
    console.log('--------------------- [[ waiter 3 ]] ---------------------');
    await waiter3();
    console.log('--------------------- [[ waiter 4 ]] ---------------------');
    await waiter4(4,1);
  } catch (error) {
    console.error(error)
  }
})();


