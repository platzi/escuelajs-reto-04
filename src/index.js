const fetch = require('node-fetch');
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
    if (!time || !product || !table) {
      reject(new Error(`No se puede procesar falta un requerimiento..`))
    }
  });
}



function randomTime() {
  var min = 1000, max = 8000;
  var rand = Math.floor((Math.random() * (max - min + 1)) + min);
  return rand;
}

const waiter = () => {
  console.log(`Atendiendo...bot waiter`)
  orders(randomTime(), menu.hamburger, table[3])
    .then((respuesta) => console.log(respuesta))
    .catch((err) => console.error(err));
};

// Primer problema
waiter();

// Segundo Problema

const waiter2 = () => {
  console.log(`Atendiendo...bot waiter2`)
  orders(randomTime(), menu.hotdog, table[0])
    .then((respuesta) => {
      console.log(respuesta);
      return orders(randomTime(), menu.pizza,table[2]);
    })
    .then((respuesta) => console.log(respuesta))
    .catch((err) => console.error(err));
};

waiter2();

// Tercer Problema

async function waiter3() {
  console.log(`Atendiendo...bot waiter3`)
  var orden_mesa2 = [menu.hotdog, menu.pizza, menu.hotdog]
  var promesas = orden_mesa2.map(menus => orders(randomTime(), menus, table[1]))
  try {
    var Ask_Ordenes = await Promise.all(promesas);
    console.log(Ask_Ordenes);
  } catch (menu) {
    console.log(menus)    
  }  
};

waiter3();

// Cuarto Problema (Opcional)

const RandomTable = () =>  table[Math.floor(Math.random() * 5)];

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

async function waiter4(){
  console.log(`Atendiendo...bot waiter4  atiende 6 pedidos..`)

  let order = [];
  for(let i = 0; i < 6;i++){
    order.push(await fetchOrders())
  }
  let promises = order.map(menus => orders(randomTime(), menus, RandomTable()))
  try{
    let askOrders = await Promise.all(promises);
    console.log(askOrders);
  }
  catch (err){
    console.error(err);
  }
};

waiter4();