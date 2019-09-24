const fetch = require("node-fetch");
const URL_API = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";
const TIME_MIN = 2000;
const TIME_MAX = 8000;
const NUM_ORDERS_WAITER4 = 4;


/***
 *  Function than return number random between a min number and
 * max number 
 * Author: @ngmartinezs
 ***/
const randomTime = () => {
  return Math.floor(Math.random() * (TIME_MAX - TIME_MIN)) + TIME_MIN;
}

/**
 * Function used for call API for to get 
 * orders.
 * Author: @ngmartinezs
 */
const fetchOrders = async () => {
  let valueReturn = "";
  try {
    const response = await fetch(URL_API);
    const lDataOrder = await response.json();
    valueReturn = lDataOrder.data;
  }
  catch (catchId) {
    console.error(`Exist errorr on call API ${URL_API}, Error: ${catchId}`);
  }

  return valueReturn;
}


const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      reject(randomTime());
    }, time);
  });
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

/**
 * Function for Waiter2
 * Author: @ngmartinezs
 **/
const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((response) => {
      console.log(response);
      return orders(randomTime(), menu.pizza, table[2])
        .then((response) => console.log(response))
        .catch((error) => console.error(error))
    })
    .catch((error) => console.error(error));
};

/**
 * Function for waiter3
 * Author: @ngmartinezs
 **/
const waiter3 = async () => {
  const promises = [];
  promises.push(orders(randomTime(), menu.hotdog, table[1]));
  promises.push(orders(randomTime(), menu.pizza, table[1]));
  promises.push(orders(randomTime(), menu.hotdog, table[1]));

  try {
    const promisesProcess = await Promise.all(promises);
    promisesProcess.forEach(promise => console.log(promise));
  }
  catch (pException) {
    console.error(pException);
  }
}

/**
 * Function for waiter4
 * Author: @ngmartinezs
 **/
const waiter4 = async () => {
  let data = "";
  const ordersArray = [];

  try {
    
    for (let count = 0; count < NUM_ORDERS_WAITER4; count++) {
      data = await fetchOrders();
      ordersArray.push(data);
    }

    const promises = ordersArray.map(order => orders(randomTime(), order, table[4]));
    const promisesProcess = await Promise.all(promises);
    promisesProcess.forEach(promise => console.log(promise));
  }
  catch (pException) {
    console.error(pException);
  }
}




/**
 *Excecute 
 **/
console.log(`------Execute Waiter-------`);
waiter();
console.log(`  `);

console.log(`------Execute waiter2-------`);
waiter2();
console.log(`  `);

console.log(`------Execute waiter3-------`);
waiter3();
console.log(`  `);

console.log(`------Execute waiter4-------`);
waiter4();
console.log(`  `);





