const fetch = require("node-fetch");

const min = 1000;
const max = 8000;


const randomTime = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      reject(Error);
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
  orders(randomTime(min, max), menu.hamburger, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
waiter();

const waiter2 = () => {
  orders(randomTime(min, max), menu.hotdog, table[3])
    .then((res) => console.log(res))
  orders(randomTime(min, max), menu.pizza, table[2])
    .then((res) => console.log(res))
  .catch((err) => console.error(err));
};
waiter2();

const waiter3 = async () => { 
  try {
      const order1 = await orders(randomTime(min, max), menu.hotdog, table[1])
      const order2 = await orders(randomTime(min, max), menu.pizza, table[1])
      const order3 = await orders(randomTime(min, max), menu.hotdog, table[1])
            console.log(order1)
            console.log(order2)
            console.log(order3)
  } catch (error) {
            console.error(error)
  }
};
waiter3();


// se instalo el modulo de fetch npm i node-fetch --save

fetch('https://us-central1-escuelajs-api.cloudfunctions.net/orders')
  .then(function(response) {
    return response.text();
  })
  .then(function(data) {
    console.log('data = ', data);
    const waiter4 = async () => { 
      try {
          const order1 = await orders(randomTime(min, max), data.slice(9,-2), table[4])
          const order2 = await orders(randomTime(min, max), data.slice(9,-2), table[4])
          const order3 = await orders(randomTime(min, max), data.slice(9,-2), table[4])
                console.log(order1)
                console.log(order2)
                console.log(order3)
      } catch (error) {
                console.error(error)
      }
    };
    waiter4();
  })
  .catch(function(err) {
    console.error(err);
  });