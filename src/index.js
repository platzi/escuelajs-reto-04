const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (!table){
      reject(`Error en el pedido, no hay mesa`)
    }
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const API = `https://us-central1-escuelajs-api.cloudfunctions.net/orders`;
const fetch = require("node-fetch");

const randomTime = (min, max) =>{
  return Math.floor(Math.random() * (max - min)) + min;
}


const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  orders(randomTime(1000, 8000), menu.hamburger, table[4])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  orders(randomTime(1000, 8000), menu.hotdog, table[0])
    .then((res) => {
      console.log(res);
      orders(randomTime(1000, 8000), menu.pizza, table[2])
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

async function waiter3 () {
  try{
    let hotdog = await orders(randomTime(1000, 8000), menu.hotdog, table[1])
    let pizza = await orders(randomTime(1000, 8000), menu.pizza, table[1])
    let hotdog2 = await orders(randomTime(1000, 8000), menu.hotdog, table[1])
    console.log(hotdog);
    console.log(pizza);
    console.log(hotdog2);
  } catch(error){
    errorCallback(error);
  }
}

const fetchOrders = async () => {
  const response = await fetch(API);
  let data;
  if (response.ok) {
    data = await response.json();
  } else {
    data = {
      error: `HTTP-Error: ${response.status}`
    };
  }
  return data;
}

async function waiter4 () {
  try{
    numberError=0;
    const ordersOnline = await Promise.all ([
      fetchOrders(), fetchOrders(), fetchOrders(), fetchOrders()
    ]);
    ordersOnline.forEach(item => {
      if (item.error) {
        console.log(`### ${item.error}`);
        numberError++;
      }
    });
    
    if(numberError === 0){
      const completeOrders = await Promise.all ([
        orders(randomTime(1000, 8000), ordersOnline[0].data, table[1]),
        orders(randomTime(1000, 8000), ordersOnline[1].data, table[1]),
        orders(randomTime(1000, 8000), ordersOnline[2].data, table[1]),
        orders(randomTime(1000, 8000), ordersOnline[3].data, table[1])
      ])
      console.log(completeOrders[0]);
      console.log(completeOrders[1]);
      console.log(completeOrders[2]);
      console.log(completeOrders[3]);
    }
    
  } catch(error){
    console.log(`Hubo un error ${error.message}`);
  }
}



waiter();
waiter2();
waiter3();
waiter4();
