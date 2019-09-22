const API_URL = `https://us-central1-escuelajs-api.cloudfunctions.net/orders`
const fetch = require('node-fetch')
const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
}
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const ramdomTime = ()=>{
  const time = 1000 + Math.random()*7000;
  return Math.floor(time)
}

async function fetchOrders (API_URL){   
  try{
    const data = await fetch(API_URL)  
    const result = await data.json()
    return result.data
  }catch(error){
    console.log(`Error obteniendo el la orden desde el API: ${error}`)
  } 
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if(!product && !table){
      reject(`Orden llegó sin producto ni mesa`)
    }else if(!product){
      reject(`Orden llegó sin producto`)
    }
    else if(!table){
      reject(`Orden llegó sin número de mesa`)
    }
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);      
    }, time);
  })
}

const waiter = () => {
  orders(ramdomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

const waiter2 = ()=>{
  orders(ramdomTime(), menu.hotdog, table[0])
    .then((res) => {
      console.log(res)
      return orders(ramdomTime(), menu.pizza, table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

async function waiter3 () {
  try{
    const pedido1 = await orders(ramdomTime(), menu.hotdog, table[1])
    //console.log(pedido1)
    const pedido2 = await orders(ramdomTime(), menu.pizza, table[1])
    //console.log(pedido2)
    const pedido3 = await orders(ramdomTime(), menu.hotdog, table[1])
    //console.log(pedido3)
    console.log(`=== Platillos de la mesa ${table[1]} servidos`)
  }catch(error){
    console.log(`ha ocurrido el siguiente error: ${error}`)
  }   
}

async function waiter4 (table) {
  try{
    producto1 = await fetchOrders(API_URL)
    const pedido1 = await orders(ramdomTime(),producto1 , table)
    producto2 = await fetchOrders(API_URL)
    const pedido2 = await orders(ramdomTime(), producto2, table)
    producto3 = await fetchOrders(API_URL)
    const pedido3 = await orders(ramdomTime(), producto3, table)
    producto4 = await fetchOrders(API_URL)
    const pedido4 = await orders(ramdomTime(), producto4, table)
    console.log(`=== Platillos de la mesa ${table} servidos`)
  }catch(error){
    console.log(`Ha ocurrido el siguiente error: ${error}`)
  }   
}

waiter();
waiter2();
waiter3();
waiter4(table[4]);
