//Tiempo random. 
const randomTime = (min, max) => {
  return time = Math.floor(Math.random() * (max - min) + min);
}
//Orden random.
const menu = ['Combo Hamburguesa', 'Combo Hot Dogs', 'Combo Pizza'];
const randomOrder = (min, max) => {
  clientOrder = Math.floor(Math.random() * (max - min) + min);
  if(clientOrder === 1){
    return 0
  } else if (clientOrder === 2){
    return 1
  } else {
    return 2
  }
}
//Mesa
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

//Información de la mesa del waiter1.
const waiter1TableInfo = {
  tableID: 3
}

//Información de las mesas del waiter2.
const waiter2TableInfo = {
  tableID: [0, 2] //id, o id´s de la mesa, o mesas.
};

//Información de las mesas del waiter3.
const waiter3TableInfo = {
  tableID: 1
}

const orders = (waiter, time, product, table) => {
  console.log(`${waiter} (### Orden): ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if(waiter1TableInfo.tableID == undefined || waiter1TableInfo.tableID > 4){
      reject('No es valida la información de mesa del Waiter #1')
    } else if(waiter2TableInfo.tableID[0] == undefined || waiter2TableInfo.tableID[0] > 4){
      reject('No es valida la información de mesa del Waiter #2') 
    } else if (waiter2TableInfo.tableID[1] == undefined || waiter2TableInfo.tableID[1] > 4){
      reject('No es valida la información de mesa del Waiter #2') 
    } else if(waiter3TableInfo.tableID == undefined || waiter3TableInfo.tableID > 4){
      reject('No es valida la información de mesa del Waiter #3') 
    } else {
      setTimeout(() => {
        resolve(`${waiter} Pedido servido: ${product}, tiempo de preparación ${time/1000} segundos para la ${table}`);
      }, time);
    }
  });
}

const waiter1 = () => {
  let waiter = 'Waiter #1'
  let tableInfo = table[waiter1TableInfo.tableID]
  orders(waiter, randomTime(1000, 8000), menu[randomOrder(1, 4)], tableInfo)
    .then((res) => console.log(res))
    .catch((rej) => console.error(rej));
};

waiter1();

const waiter2 = () => {
  let waiter = 'Waiter #2'
  let tableInfo = table[waiter2TableInfo.tableID[0]]
  orders(waiter, randomTime(1000, 8000), menu[randomOrder(1, 4)], tableInfo)
    .then((res) => {
      console.log(res);
      let tableInfo = table[waiter2TableInfo.tableID[1]]
      return orders(waiter, randomTime(1000, 8000), menu[randomOrder(1, 4)], tableInfo);
    }).catch((rej) => console.error(rej))
    .then((res) => console.log(res))
    .catch((rej) => console.error(rej))
}

waiter2();

async function waiter3() {
  let waiter = 'Waiter #3'
  let tableInfo = table[waiter3TableInfo.tableID]
  let order1 = await orders(waiter, randomTime(1000, 8000), menu[randomOrder(1, 4)], tableInfo);
  let order2 = await orders(waiter, randomTime(1000, 8000), menu[randomOrder(1, 4)], tableInfo);
  let order3 = await orders(waiter, randomTime(1000, 8000), menu[randomOrder(1, 4)], tableInfo);
  try {
    console.log(order1);
    console.log(order2);
    console.log(order3);
  }
  catch {
    console.log('No es valida la información de mesa del Waiter #3')
  }
}

waiter3();

///////////////////////////////////////////////////////////////////////////////////////////////////
/* 
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
var xhttp = new XMLHttpRequest();

function fetchOrders(url_api, data){
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = (event) =>{
      if (xhttp.readyState === 4 && xhttp.status == 200){
        resolve(JSON.parse(xhttp.responseText), data);
      } else return reject(url_api);
    }
    xhttp.open('GET', url_api, false);
    xhttp.send();
  })  
}

async function waiter4(){
  let order1 = await fetchOrders(API)
  let order2 = await fetchOrders(API)
  let order3 = await fetchOrders(API)
  let order4 = await fetchOrders(API)
  try {
    console.log('Waiter #4 entrega de pedidos solicitados al servicio API');
    console.log(`- ${order1.data}`);
    console.log(`- ${order2.data}`);
    console.log(`- ${order3.data}`);
    console.log(`- ${order4.data}`);
  }
  catch {
    console.error('Hubo algun problema al solicitar su pedido al servicio API');
  }
}

waiter4(); */