//@Author William E. Velázquez A. - info@williamvelazquez.com
const fetch = require('node-fetch');

const API_BASE ='https://us-central1-escuelajs-api.cloudfunctions.net';
const API_URL =`${API_BASE}/orders`;

const MIN_TIME = 1000;
const MAX_TIME = 8000;

const fetchOrders = () => {
  return fetch(API_URL).then( res => res.json());
};

const randomTime = () => {
  return Math.floor((Math.random() * (MAX_TIME - MIN_TIME)) + MIN_TIME);
};

const orders = (time, product, table) => {
  return new Promise( (resolve, reject) => {
    if (time && product && table) {
      console.log(`### Orden: ${product} para ${table}`);
      setTimeout( () => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject('Favor de brindar los datos necesarios para solicitar la orden')
    }
  });
};

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then( (res) => console.log(res))
    .catch( (error) => console.error(`No se pudo realizar la orden para la ${table[3]} --- ERROR: ${error}`));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then( (res) => console.log(res))
    .catch( (error) => console.error(`No se pudo realizar la orden para la ${table[0]} --- ERROR: ${error}`));
  
  orders(randomTime(), menu.pizza, table[2])
    .then( (res) => console.log(res))
    .catch( (error) => console.error(`No se pudo realizar la orden para la ${table[2]} --- ERROR: ${error}`));
};

const waiter3 = async () => {
  try {
    const dish1 = await orders(randomTime(), menu.hotdog, table[1]);
    const dish2 = await orders(randomTime(), menu.pizza, table[1]);
    const dish3 = await orders(randomTime(), menu.hotdog, table[1]);
    console.log(`Se sirve en ${table[1]}:
      ${dish1}
      ${dish2}
      ${dish3}
    `);
  } catch (error) {
    console.error(`No se pudo realizar la orden para la ${table[1]} --- ERROR: ${error}`);
  } 
};

const waiter4 = async () => {
  try {
    console.log(`### Solicitando orden para ${table[4]}`);
    const dish1 = await fetchOrders();
    const dish2 = await fetchOrders();
    const dish3 = await fetchOrders();
    const dish4 = await fetchOrders();
    console.log(`Se sirve en ${table[4]}:
      === Pedido servido: ${dish1.data}
      === Pedido servido: ${dish2.data}
      === Pedido servido: ${dish3.data}
      === Pedido servido: ${dish4.data}
    `);
  } catch (error) {
    console.error(`No se pudo realizar la orden para la ${table[4]} --- ERROR: ${error}`);
  }
}

waiter();
waiter2();
waiter3();
waiter4();
