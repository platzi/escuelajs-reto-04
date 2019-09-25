const fetch = require("node-fetch");

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const orders2 = (orden) => {
  console.log(`### Orden: ${orden.product} para ${orden.table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${orden.product}, tiempo de preparación ${orden.time}ms para la ${orden.table}`);
    }, orden.time);
  });
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(getRandomInt(MIN, MAX), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const MIN = 1000
const MAX = 8000

function Orden (producto,table){
  this.time = getRandomInt(MIN,MAX);
  this.product = producto;
  this.table = table;
  }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const waiter2 = () => {
  orders(getRandomInt(MIN, MAX), menu.pizza, table[0])
    .then((res) => {
      console.log(res)
      return orders(getRandomInt(MIN, MAX), menu.hotdog, table[2])
    })
    .catch((err)=> console.error(err))
    
       .then((res)=>console.log(res))
       .catch((err) => console.error(err));
};


function onError(orden){
  console.log (`Sucedio un error al atender la orden ${orden.product} con tiempo ${orden.time} de la mesa ${orden.table}`)
}

async function waiter3(){
  
  let mesa = table[1]
  let orden1 = new Orden(menu.hotdog,mesa);
  let orden2 = new Orden(menu.pizza,mesa);
  let orden3 = new Orden(menu.hotdog,mesa);

  let ordenes =[orden1,orden2,orden3];

  console.log(ordenes)
  console.log(`*****************GENERANDO ORDEN DEL MESERO 3 PARA ${mesa}*****************`)
  let promesas = ordenes.map(orden => orders2(orden))
  try{
      let comanda = await Promise.all(promesas)
      console.log(comanda)
      
  }catch (orden) {
    onError(orden)
  }
}



async function fetchOrders() {
  let url = `https://us-central1-escuelajs-api.cloudfunctions.net/orders`;
  let response = await fetch(url);
  let datoOrden = await response.json();
    return datoOrden;
   
}

async function waiter4() {
  //const ids = await getTopMoviesIds();
  let ordenes = [];
  
  for (o =1; o<=4; o++) {
    let pedido = await fetchOrders();
    console.log (`Recibiendo orden ${o} : ${pedido.data}`)
    let datosPedido = new Orden (pedido.data,table[3])
    ordenes.push(datosPedido)
  }

  console.log (`***********SOLICITANDO ORDENES********************`)
  
  let promesas = ordenes.map(orden => orders2(orden))
  try{
      let comanda = await Promise.all(promesas)
      console.log(comanda)
      
  }catch (orden) {
    onError(orden)
  }
  

}

//console.log('Generando Reto Uno')
//waiter();
//console.log('Generando Reto 2')
//waiter2();
//console.log('Generando Reto 3')
//waiter3();
//console.log('Generando Reto 4')
waiter4();

//NOTAS
//Install it in your Node application like this
//npm i node-fetch --save
//then put the line below at the top of the files where you are using the fetch API:
//const fetch = require("node-fetch");