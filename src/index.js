const API = `https://us-central1-escuelajs-api.cloudfunctions.net/orders`;
const fetch = require("node-fetch");

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

const randomTime = () => {
  let timeMin = 1000,
  timeMax = 8000;
  const randomNumber = Math.random() * (timeMax - timeMin) + timeMin;
  return randomNumber.toFixed(0)
}

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    if (time < 1000 | time > 8000) {
        reject(new Error('Error: El tiempo debe ser entre 1000 y 8000ms'));
    } else {
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time)
    }
  })
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
    .then((res) => console.log(res))
    orders(randomTime(), menu.pizza, table[2])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter3 = async () => {
  const orderCustomer1 = await orders(randomTime(), menu.hotdog, table[1])
  const orderCustomer2 = await orders(randomTime(), menu.pizza, table[1])
  const orderCustomer3 = await orders(randomTime(), menu.hotdog, table[1])
  return console.log(`${orderCustomer1} \n${orderCustomer2} \n${orderCustomer3}`);
};

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
        orders(randomTime(), ordersOnline[0].data, table[1]),
        orders(randomTime(), ordersOnline[1].data, table[1]),
        orders(randomTime(), ordersOnline[2].data, table[1]),
        orders(randomTime(), ordersOnline[3].data, table[1])
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