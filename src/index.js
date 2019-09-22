/* eslint-disable no-console */
const getOrders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
    }, time);
  });
};
function randomTime() {
  const max = 8000;
  const min = 1000;
  return Math.round(Math.random() * (max - min) + min);
}

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

const waiter = () => {
  getOrders(randomTime(), menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = () => {
  const orders = [
    // En mi arreglo de mesas me cree una mesa 0 para que funcione con lenguaje natural las mesas
    {
      table: table[0],
      order: 'hotdog',
    },
    {
      table: table[2],
      order: 'pizza',
    },
  ];
  getOrders(randomTime(), orders[0].order, orders[0].table)
    .then((res) => {
      console.log(res);
      return getOrders(randomTime(), orders[1].order, orders[1].table);
    }).then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};

async function waiter3() {
  const orders = [
    {
      table: table[1],
      order1: 'hotdog',
      order2: 'pizza',
      order3: 'hotdog',
    },
  ];
  // * Pedido "Mesa 2": Combo Hotdog, Combo Pizza, Combo Hotdog
  try {
    response1 = await getOrders(randomTime(), orders[0].order1, orders[0].table)
    response2 = await getOrders(randomTime(), orders[0].order2, orders[0].table)
    response3 = await getOrders(randomTime(), orders[0].order3, orders[0].table)
    console.log(response1);
    console.log(response2);
    console.log(response3);
  } catch (error) {
    console.log(error.message);
  }
}


console.log(randomTime());

// waiter();
// waiter2();
waiter3();
