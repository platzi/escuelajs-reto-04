const fetch = require('node-fetch');

// Reto 1:
const randomTime = () => {
  const TIME_MIN = 1000;
  const TIME_MAX = 8000;
  return TIME_MIN + Math.floor((TIME_MAX - TIME_MIN + 1) * Math.random());
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (typeof time === 'number' && typeof product === 'string' &&typeof product === 'string' ){
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    } else {
      reject('Error en el tipo de los argumentos recibidos.')
    }
  });
}
// Reto 4:
const fetchOrders = async (table) => {
  const API_URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
  
  console.log(`### Orden para ${table}`);
  
  return fetch(API_URL)
    .then(response => response.json())
    .then(data => {return `=== Pedido servido: ${data.data} para la ${table}`})
    .catch(err => {return 'Error al acceder a la API'});
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
  .then(res => console.log(res))
  .catch(err => console.error(err));
};
// Reto 2:
const waiter2 = () => {
  orders(randomTime(),menu.hotdog,table[0])
    .then(res => console.log(res))
    .catch(err => console.log(err));
  orders(randomTime(),menu.pizza,table[2])
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

// Reto 3: 
const waiter3 = async () => {
  let order1 = orders(randomTime(),menu.hotdog,table[1]);
  let order2 = orders(randomTime(),menu.pizza,table[1]);
  let order3 = orders(randomTime(),menu.hotdog,table[1]);

  try { 
    const res = await Promise.all([order1, order2, order3]);
    res.map(any => console.log(any));
  } catch(err){
    console.log(err);
  }
}

//Reto 4:
const waiter4 = async () => {
  let order1 = fetchOrders(table[4]);
  let order2 = fetchOrders(table[4]);
  let order3 = fetchOrders(table[4]);
  let order4 = fetchOrders(table[4]);

  try { 
    const res = await Promise.all([order1, order2, order3,order4]);
    res.map(any => console.log(any));
  } catch(err){
    console.log(err);
  }
}

waiter();
// Reto 2:
waiter2();
// Reto 3:
waiter3()
// Reto 4:
waiter4()
