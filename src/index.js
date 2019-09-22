
const fetch = require('node-fetch');
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders/';
const MIN_TIME = .1;
const MAX_TIME = .8;

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

function handleError( error ){
  console.log( error );
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

//Reto uno
function randomTime() {
  return Math.ceil(Math.random(MIN_TIME, MAX_TIME) * 10000);
}


//Reto 2
const waiter2 = () => {
  const order1 = orders(randomTime(), menu.hamburger, table[0]);
  const order2 = orders(randomTime(), menu.pizza, table[2]);

  Promise.all([order1, order2]).then((result) => {
    result.forEach(resultOrder => {
      console.log(resultOrder);
    });
  }).catch(handleError);  
}


//Reto 3
async function waiter3() {
  try {
    const result1 = await orders(randomTime(), menu.hotdog, table[1]);
    console.log(result1); 
  } catch (error) {
    console.log(error);
  }
};


//Reto 4
const ordersFetch = (nOrder, table) => {
  console.log(`Orden ${nOrder} para la mesa ${table}`);
  return fetch(API);
}

async function waiter4() {
  const lstOrders = [1,2,3,4];
  const promiseOrders = lstOrders.map(order => ordersFetch(order,table[3]).then(result => result.json()));

  try {
    const resultOrders = await Promise.all(promiseOrders);  
    resultOrders.forEach( (resultOrder) => {
      console.log(`=== Pedido servido: ${resultOrder.data}, para la ${table[3]}`);
    });
  } catch (error) {
    console.log(`Algo salio mal con los pedidos`);
  }
}

//waiter();
//waiter2();
//waiter3();
waiter4();

