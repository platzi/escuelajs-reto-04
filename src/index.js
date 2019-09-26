const API_ORDER = 'https://us-central1-escuelajs-api.cloudfunctions.net/orders';
/*
al ejecutar npm run start,
mandaba un error desde el try catch que era fetch is not fetch is not defined,

La salución fue agregar el modulo fetch con el siguiente comando
npm i node-fetch
seguido de crear la variable fetch y listooo, funciono
*/

const fetch = require('node-fetch');

async function fetchOrders() {
  const response = await fetch(API_ORDER);
  const data = await response.json();
  const order = await data.data;
  return order;
}

let getRandomTime = () => {
  min = Math.ceil(1);
  max = Math.floor(8)
  return (Math.floor(Math.random() * (max - min + 1)) + min)*1000;

}

const orders = ({time, product, table}) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const recogerMesa = (table, product, time) => {
  console.log(`### Se recoge la Orden: ${product} de la ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Se termino de recoger la Orden: ${product}, de la mesa ${table} en un tiempo de ${time}ms`);
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
  let order = {
    time: getRandomTime(),
    product : menu.hamburger,
    table: table[3],
  }

  orders(order)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  let timeMeasa1 = getRandomTime();
  recogerMesa(table[0], menu.hotdog, timeMeasa1)
    .then((res) => {
      console.log(res)
      let timeMesa3 = getRandomTime();
      return recogerMesa(table[2], menu.pizza, timeMesa3)
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};



async function waiter3(){
  let order1 = {
    time: getRandomTime(),
    product : menu.hotdog,
    table: table[1],
  }
  
  let order2 = {
    time: getRandomTime(),
    product : menu.pizza,
    table: table[1],
  }
  let order3 = {
    time: getRandomTime(),
    product : menu.hotdog,
    table: table[1],
  }

  try {
    const food1 = await orders(order1);
    const food2 = await orders(order2);
    const food3 = await orders(order3);
    
    let txt = `
    Se sirve en ${table[1]}:
      ${food1}
      ${food2}
      ${food3}
    `;
    console.log(txt);

    const pedido = `${order1.product}, ${order2.product} ${order3.product}`;
    recogerMesa(table[1], pedido, 2000);

  } catch (error) {
    console.log(`Sorry, for the moment, we cannot prepare your order: ${error}`)
  }
}


const waiter4 = async function() {
  try {
      const food1 = await fetchOrders();
      const food2 = await fetchOrders();
      const food3 = await fetchOrders();
      const food4 = await fetchOrders();

      const order = [food1, food2, food3, food4];

      const txt = `
        Waiter 4 tu orden esta lista, te confirmo tu orden, 
        ${order}
      `;
      console.log(txt);
  } catch (error) {
    console.log(error.message);
  }
}        


// Problem 1
// waiter();

// Problem 2
// waiter2();

//Problem 3
// waiter3();

//Problema 4
// waiter4();