const fetch = require("node-fetch");

function randomTime() {
  const max = 8000
  const min = 1000
  return Math.round(Math.random() * (max - min) + min);
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
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
    return waiter2()
};
const waiter2 = (orders2, orders3) => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  orders(randomTime(), menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  return waiter3()
};

async function  waiter3  (orders4, orders5, orders6) {
  try{
    const order4 = await orders(randomTime(), menu.hotdog, table[1])
    const order5 = await orders(randomTime(), menu.pizza, table[1])
    const order6 = await orders(randomTime(), menu.hotdog, table[1])
    console.log(order4);
    console.log(order4);
    console.log(order4);
  }
  catch(err) {
    console.error(err)
  }
}
waiter();

const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'
const apiMenu = [];


async function fetchOrders(){
  await fetch(API)
   .then(function(response) {
    return response.json()
      
   })
   .then(function(json) {
     const apiCombo = json.data;
     apiMenu.push(apiCombo);
     return apiMenu;
   })
 };
 
 fetchOrders();
 fetchOrders();
 fetchOrders();
 fetchOrders();
 
 
 async function  waiter4 (order7, order8, orders9, orders10) {
  
  try{
    const order7 = await orders(randomTime(), apiMenu[0], table[4])
    const order8 = await orders(randomTime(), apiMenu[1], table[4])
    const order9 = await orders(randomTime(), apiMenu[2], table[4])
    const order10 = await orders(randomTime(), apiMenu[3], table[4])
    console.log(order7);
    console.log(order8);
    console.log(order9);
    console.log(order10);
  }
  catch(err) {
    console.error(err)
  }
}

setTimeout(() =>{
  console.log(apiMenu);
  waiter4();
}, 7000);
