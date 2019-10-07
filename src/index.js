const fetch = require('node-fetch');

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
    setTimeout(() => {
      reject(`Error`)
    }, time);
  });
}

const randomTime = () => {
  const time = Math.floor((Math.random() * 7000) + 1000) 
  return time
}

const fetchOrders = async () => {
  const res = await fetch('https://us-central1-escuelajs-api.cloudfunctions.net/orders')
  const data = await res.json()
  return data
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
  .then((res) => {
    console.log(res)
    return orders(randomTime(), menu.pizza, table[2])
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
}

const waiter3 = async () => {
  try {
    const order1 = orders(randomTime(), menu.hotdog, table[1])
    const order2 = orders(randomTime(), menu.pizza, table[1])
    const order3 = orders(randomTime(), menu.hotdog, table[1])
    const ordersCompleted = await Promise.all([order1, order2, order3])
    ordersCompleted.map(order => console.log(order))
  } catch(error){
    console.error(`Error: ${error}`);
  }
}

const waiter4 = async () => {
  const combosRequest = []
  for (let i = 0; i < 4; i++) {
    combosRequest.push(fetchOrders())
  }
  try {
    const combosCompleted = await Promise.all(combosRequest) 
    const ordersRequest = combosCompleted.map(combo => orders(randomTime(), combo.data, table[4]))
    const ordersCompleted = await Promise.all(ordersRequest)
    ordersCompleted.map(order => console.log(order))
  }
  catch(error) {
    console.error(`Error: ${error}`);
  }
}

waiter();
waiter2();
waiter3();
waiter4();
