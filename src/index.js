const orders = (time, product, table) => {
  console.log(`### Orden: ${product} para ${table}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(
          `=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`
        );
      } catch (error) {
        reject(new Error(`Lo sentimos. Hubo un error en el pedido: ${error}`));
      }
    }, time);
  });
};

const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza'
};

const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];

// Obtener un número random
function randomTime(min = 1000, max = 8000) {
  return Math.floor(Math.random() * (max - min) + min);
}

const waiter = () => {
  let time = randomTime();
  orders(time, menu.hamburger, table[3])
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

waiter();

const waiter2 = () => {
  let time = randomTime();

  orders(time, menu.hotdog, table[0])
    .then(res => {
      console.log(res);
      orders(time, menu.pizza, table[2]).then(res => console.log(res));
    })
    .catch(err => console.log(err));
};

waiter2();

const waiter3 = async () => {
  let time = randomTime();
  const multipleOrders = [
    await orders(time, menu.hotdog, table[1]),
    await orders(time, menu.pizza, table[1]),
    await orders(time, menu.hotdog, table[1])
  ];
  Promise.all(multipleOrders)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

waiter3();

const ORDERS_API =
  'https://us-central1-escuelajs-api.cloudfunctions.net/orders';

const fetchOrders = async url => {
  let fetchAPI = await fetch(url);
  let response = await fetchAPI.json();
  return response;
};

const waiter4 = async () => {
  //debugger;
  let time = randomTime();
  let differentOrders = [];

  for (let i = 0; i < 4; i++) {
    const product = await fetchOrders(ORDERS_API);
    differentOrders.push(product.data);
  }

  const multipleOrders = [
    await orders(time, differentOrders[0], table[4]),
    await orders(time, differentOrders[1], table[4]),
    await orders(time, differentOrders[2], table[4]),
    await orders(time, differentOrders[3], table[4])
  ];

  Promise.all(multipleOrders)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

waiter4();
