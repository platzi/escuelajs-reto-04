const fetch = require('node-fetch');
const maxTime = 8000;
const minTime = 1000;
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';


const randomTime = () => (Math.floor(Math.random()* (maxTime - minTime) + minTime));

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
    if(!time || !product || !table){
      reject(new Error(' La orden no ha podido ser creada por que no fue recibido un requerimento '));
    }
  });
}
async function fetchOrders(){
  try {
    const response = await fetch(API);
    const data = await response.json();
    return(data.data);
  }
  catch (err) {
    console.error('Error de conexion para obtener orden ');
    return
  }
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
      console.log(res);
      return orders(randomTime(), menu.pizza, table[2]);
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
async function waiter3(){
  let order = [ menu.hotdog, menu.pizza, menu.hotdog];
  let promises = order.map(menus => orders(randomTime(), menus, table[1]))
  try{
    let askOrders = await Promise.all(promises);
    console.log(askOrders);
  }catch(menus){
    console.error(menus)
  } 
};
const getRandomTable = () =>  table[Math.floor(Math.random() * 5)];

async function waiter4(){
  let order = [];
  for(let i = 0; i < 4;i++){
    order.push(await fetchOrders())
  }
  let promises = order.map(menus => orders(randomTime(), menus, getRandomTable()))
  try{
    let askOrders = await Promise.all(promises);
    console.log(askOrders);
  }
  catch (err){
    console.error(err);
  }
}

waiter();
waiter2();
waiter3();
waiter4();