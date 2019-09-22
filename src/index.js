
const fetch = require('node-fetch');
const maxMiliSeconds = 8000;
const minMiliSeconds = 1000;
const menu = {
  hamburger: 'Combo Hamburguesa',
  hotdog: 'Combo Hot Dogs',
  pizza: 'Combo Pizza',
};
const table = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];
const API_ORDERS = "https://us-central1-escuelajs-api.cloudfunctions.net/orders";

const randomTime = () => {
  return Math.floor(Math.random() * (maxMiliSeconds - minMiliSeconds) + minMiliSeconds);
}

const orders = (time, product, table) => {
  const listErrorMessage = [];

  return new Promise((resolve, reject) => {

    if (!time)
      listErrorMessage.push(`No se especifico el tiempo para la orden`);

    if (!product)
      listErrorMessage.push(`No se especifico el producto para la orden`);

    if (!table)
      listErrorMessage.push(`No se especifico la mesa para la orden`);

    if (listErrorMessage.length > 0)
      reject(listErrorMessage.join('\n'));
    else {
      console.log(`### Orden: ${product} para ${table}`);
      setTimeout(() => {
        resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);
      }, time);
    }

  });
}

const waiter = () => {
  const timeOrder = randomTime();
  orders(timeOrder, menu.hamburger, table[3])
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const waiter2 = async () => {
  try {
    const getOrderTable1 = await orders(randomTime(), menu.hotdog, table[0]);
    console.log(getOrderTable1);
    const getOrderTable3 = await orders(randomTime(), menu.pizza, table[2]);
    console.log(getOrderTable3);
  } catch (error) {
    console.error(`waiter2: Ocurrio un error al intentar generar la orden. error: ${error}`);
  }

}

const waiter3 = async () => {
  try {
    const mesa1 = table[1];
    const listOrders = [
      orders(randomTime(), menu.hotdog, mesa1),
      orders(randomTime(), menu.pizza, mesa1),
      orders(randomTime(), menu.hotdog, mesa1)
    ]

    const getOrderTable2 = await Promise.all(listOrders);
    console.log(`Listo! ya esta listo el pedido para la ${mesa1} ${getOrderTable2.join('\n')}`);

  } catch (error) {
    console.error(`waiter3: Ocurrio un error al intentar generar la orden error: ${error}`);
  }
};


const fetchOrders = async (apiUrL) => {
  const responseOrder = await fetch(apiUrL);
  return await responseOrder.json();
}

const waiter4 = async () => {
  try {
    console.log(`Orden a domicilio`);
    
    const listOrders = [
      fetchOrders(API_ORDERS),
      fetchOrders(API_ORDERS),
      fetchOrders(API_ORDERS),
      fetchOrders(API_ORDERS)
    ];

    const reponseOrders = await Promise.all(listOrders);

    console.log(`== Orden. Pedidos a entregar a domicilio: ${reponseOrders.map(order => order.data).join("\n")}`);

  } catch (error) {
    console.error(`waiter4: Ocurrio un error al intentar generar la orden. error: ${error}`);
  }
}

waiter();
waiter2();
waiter3();
waiter4();