const fetch = require("node-fetch");


const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
    });
}
function randomTime (){
  const min = 1000;
  const max = 8000;
  var numberRandom =(Math.random()*(max-min)+ min).toFixed(0)
  return numberRandom  ;
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((resolve) => console.log(resolve))
    .catch((reject) => console.error(reject));
};

const waiter2 = () => {
  orders(randomTime(), menu.hotdog, table[0])
    .then((resolve) => console.log(resolve))

  orders(randomTime(), menu.pizza, table[2])
    .then((resolve) => console.log(resolve))
    .catch((reject) => console.error(reject))
};

const waiter3 =  async () =>{
  var orders1 =[
    orders(randomTime(), menu.hotdog, table[1]),
    orders(randomTime(), menu.pizza, table[1]),
    orders(randomTime(), menu.hamburger, table[1])
  ]
  try{
    var order3 = await Promise.all(orders1)
    .then((resolve) => console.log('Entregado el pedido para la mesa 2 :',resolve))
  }catch (reject){
    console.log('tenemos un error en el pedido')
  } 
}
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'

async function fetchData(url){
  const response = await fetch(url)
  const data = await response.json()
  return data.data;
}




async function waiter4 (){
  try{
    const order4 = [
      fetchData(API),
      fetchData(API),
      fetchData(API),
      fetchData(API),
    ]
    const pedidos = await Promise.all(order4)
    var orders2 =[
      orders(randomTime(),pedidos[0], table[3]),
      orders(randomTime(),pedidos[1], table[3]),
      orders(randomTime(),pedidos[2], table[3]),
      orders(randomTime(),pedidos[3], table[3])
    ]
    const pedidos2 = await Promise.all(orders2)
 
    console.log('Entregado el pedido para la mesa 4 repito pedido ',pedidos2)
  } catch (error){
  console.log('tenemos un error con la orden')
  }
 
}
waiter();
waiter2();
waiter3();
waiter4();