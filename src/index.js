const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time} ms para la ${table}`);
    }, time);
  });
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

function randomTime(){
  const min=1000
  const maxi=8000
	const resultado = Math.floor(Math.random() * (maxi - min + 1)) + min
	return 	resultado;
}

function onError(){
  console.log(`Sucedió un error`)
}

const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(), menu.pizza, table[0])
    .then((res) => {
      console.log(res)
      return orders(randomTime(), menu.hotdog, table[2])
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

async function waiter3() {
  const products = [menu.hamburger, menu.pizza, menu.hotdog]
  const promesas = products.map( product => orders(randomTime(), product, table[1]))
  try{
    const resultado = await Promise.all(promesas)
    console.log(resultado)
  } catch(product){
    onError()
  }
};

const API_URL = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders'
const fetch = require("node-fetch");

async function fetchOrders(){
  let response = await fetch(API_URL);
  let data = await response.json();
  return data.data;
}

async function waiter4() {
  var products = []
  
  for (let i = 0; i < 4; i++) {
    products.push(await fetchOrders())
  }
  
  const promesas = products.map( product => orders(randomTime(), product, table[4]))
  try	{
    const resultado = await Promise.all(promesas)
    console.log(resultado)
  } catch(product){
    onError()
  }
};

//waiter();

//Reto 2
//waiter2();

//Reto 3
//waiter3();

//Reto 4
waiter4();
