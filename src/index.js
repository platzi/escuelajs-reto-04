const fetch = require('node-fetch');

const randomTime = () => {
  const min = 1000;
  const max = 8000;
  const time = Math.floor(Math.random() * (max - min)) + min;
  return time;
};

const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
}

const generateOrders = (preOrders) => {
  if(preOrders.length <= 0) return new Error('You orders can not procesed');
  let waitOrders = [];
  preOrders.forEach(order => {
    waitOrders.push(orders(randomTime(), order.dish, order.table));
  });
  return waitOrders;
};

const fetchOrders = () => {
  return fetch('https://us-central1-escuelajs-api.cloudfunctions.net/orders')
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
};

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

// Waithers
const waiter = () => {
  orders(randomTime(), menu.hamburger, table[3])
    .then((res) => {
      console.log(`Waiter 1: ${res}`)
    })
    .catch((err) => {
      console.log(err.message)
    });
};

const waiterTwo = () => {
  orders(randomTime(), menu.pizza, table[0])
    .then((res => {
      console.log(`Waiter 2: ${res}`);
      return orders(randomTime(), menu.hotdog, table[2]);
    }))
    .then((res) => { console.log(`Waiter 2: ${res}`) })
    .catch((err) => {
      console.log(err.message);
    });
}

const waiterThree = async () => {
  const preOrders = [
    { dish: menu.hotdog, table: table[1] },
    { dish: menu.hamburger, table: table[1] },
    { dish: menu.pizza, table: table[1] },
  ];
  try {
    const waitOrders = generateOrders(preOrders);
    const completeOrders = await Promise.all(waitOrders);
    completeOrders.forEach(order => console.log(`Waiter 3: ${order}`));
  } catch(err) {
    console.log(err.message);
  }
}

//waiter();
//waiterTwo();
//waiterThree();

