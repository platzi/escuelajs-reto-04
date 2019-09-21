const fetch = require('node-fetch');

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const urlApi= 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const tableList = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(geTimeRandom(), menu.hamburger, tableList[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter();

const waiter2 = () => {
  orders(geTimeRandom(), menu.hotdog, tableList[0])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  orders(geTimeRandom(), menu.pizza, tableList[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

waiter2();


 const waiter3 = async () => {
   try {
     const orders3 = await orders(geTimeRandom(), menu.hotdog, tableList[1])
     console.log(orders3);
   }
   catch(err){
     console.log(err)}
};

waiter3();



async  function fetchOrders ()  {
  let response = await fetch(urlApi);
  let dataOrder = await response.json();
  return  dataOrder.data;
};

const waiter4 = async () => {
  try {
    for(let x=0;x<=3;x++){
    const time = geTimeRandom();
    const products = `Desde API : ${await fetchOrders()}`;
    const table = tableList[x];
    const ordersfectch = await orders(time, products,table)
    console.log(ordersfectch);
    }
  }
  catch(err){
    console.log(err)}
};

waiter4();

//utilidades
function geTimeRandom(){
 return (getRandomInteger(1,8) * 1000);
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}
